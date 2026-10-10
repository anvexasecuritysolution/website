import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { CONSENT_COOKIE, CONSENT_MAX_AGE, THEME_KEY, parseConsent, createConsentStore } from '../client/src/privacy/consent.js';

const now = Date.now();
const cookie = (preferences, savedAt = now) => `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify({ version: 2, necessary: true, analytics: false, preferences, savedAt }))}`;
function environment() {
  let cookieValue = '';
  let written = '';
  const values = new Map();
  const documentImpl = {
    documentElement: { dataset: { theme: 'light' } },
    get cookie() { return cookieValue; },
    set cookie(value) { written = value; cookieValue = value.split(';')[0]; },
  };
  const storage = { setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) };
  const choices = [];
  const store = createConsentStore({ documentImpl, storage, locationImpl: { protocol: 'https:' }, now: () => now, dispatch: (value) => choices.push(value) });
  return { documentImpl, storage, values, choices, store, written: () => written };
}

test('missing, malformed, unsupported and expired choices default to no consent', () => {
  assert.equal(parseConsent(''), null);
  assert.equal(parseConsent('anvexa_consent=%broken'), null);
  assert.equal(parseConsent('anvexa_consent=' + encodeURIComponent(JSON.stringify({ version: 9 }))), null);
  assert.equal(parseConsent(cookie(true, now - CONSENT_MAX_AGE * 1000), now), null);
  assert.equal(parseConsent(cookie(true, now + 120_000), now), null);
  assert.equal(parseConsent('another=1; ' + cookie(false), now).preferences, false);
});

test('theme storage is blocked before consent and after rejection', () => {
  const env = environment();
  env.values.set(THEME_KEY, 'light');
  env.store.persistTheme('light');
  assert.equal(env.values.has(THEME_KEY), false);
  env.store.save(false);
  env.store.persistTheme('dark');
  assert.equal(env.values.has(THEME_KEY), false);
});

test('acceptance persists the current preference and a first-party consent cookie', () => {
  const env = environment();
  const choice = env.store.save(true);
  assert.equal(choice.preferences, true);
  assert.equal(choice.necessary, true);
  assert.equal(env.values.get(THEME_KEY), 'light');
  assert.ok(env.written().includes(`Max-Age=${CONSENT_MAX_AGE}`));
  assert.ok(env.written().includes('Path=/; SameSite=Lax; Secure'));
  assert.equal(env.choices.length, 1);
});

test('revoking preference consent removes the stored theme without changing the current display', () => {
  const env = environment();
  env.store.save(true);
  env.store.save(false);
  assert.equal(env.store.read().preferences, false);
  assert.equal(env.values.has(THEME_KEY), false);
  assert.equal(env.documentImpl.documentElement.dataset.theme, 'light');
});

test('a saved choice survives a fresh store instance', () => {
  const env = environment();
  env.store.save(false);
  const fresh = createConsentStore({ documentImpl: env.documentImpl, storage: env.storage, now: () => now });
  assert.equal(fresh.read().preferences, false);
});

test('blocked cookies or storage do not stop consent choices or allow rejected preferences', () => {
  const documentImpl = { documentElement: { dataset: { theme: 'light' } }, get cookie() { return cookie(true); }, set cookie(_value) {} };
  const storage = { setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); } };
  const store = createConsentStore({ documentImpl, storage, now: () => now });
  assert.equal(store.save(false).preferences, false);
  assert.equal(store.read().preferences, false);
  assert.doesNotThrow(() => store.persistTheme('light'));
});

test('local HTTP previews omit Secure while keeping SameSite and expiry', () => {
  const env = environment();
  const store = createConsentStore({ documentImpl: env.documentImpl, storage: env.storage, locationImpl: { protocol: 'http:' }, now: () => now });
  store.save(false);
  assert.equal(env.written().includes('; Secure'), false);
  assert.ok(env.written().includes('SameSite=Lax'));
});

test('initial HTML never restores an optional theme before consent or after expiry', () => {
  const source = readFileSync(new URL('../client/index.html', import.meta.url), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const consentCookie of ['', cookie(false), cookie(true, now - CONSENT_MAX_AGE * 1000 - 1000), 'anvexa_consent=%invalid', cookie(true)]) {
    const values = new Map([[THEME_KEY, 'light']]);
    const document = { cookie: consentCookie, documentElement: { dataset: {} }, querySelector: () => ({ content: '' }) };
    const localStorage = { getItem: (key) => values.get(key), removeItem: (key) => values.delete(key) };
    vm.runInNewContext(source, { document, localStorage });
    if (consentCookie === cookie(true)) assert.equal(document.documentElement.dataset.theme, 'light');
    else {
      assert.equal(document.documentElement.dataset.theme, undefined);
      assert.equal(values.has(THEME_KEY), false);
    }
  }
});
