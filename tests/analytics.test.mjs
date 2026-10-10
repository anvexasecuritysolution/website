import test from 'node:test';
import assert from 'node:assert/strict';
import { createAnalytics, clearAnalyticsCookies } from '../client/src/privacy/analytics.js';
import { createConsentStore, parseConsent } from '../client/src/privacy/consent.js';

function setup(options = {}) {
  const scripts = [];
  const cookies = [];
  let reloads = 0;
  const windowImpl = { location: { hostname: 'anvexasecuritysolution.vercel.app', reload: () => reloads++ } };
  const documentImpl = { get cookie() { return '_ga=123; _ga_B2XQDE7L8D=456; anvexa_consent=abc'; }, set cookie(value) { cookies.push(value); }, createElement: () => ({ remove() { this.removed = true; } }), querySelector: () => ({ nonce: 'secure' }), head: { appendChild: (script) => scripts.push(script) } };
  const analytics = createAnalytics({ measurementId: 'G-B2XQDE7L8D', enabled: true, origin: 'https://anvexasecuritysolution.vercel.app', windowImpl, documentImpl, ...options });
  return { analytics, scripts, cookies, windowImpl, reloads: () => reloads, events: () => (windowImpl.dataLayer || []).map((entry) => [...entry]).filter((entry) => entry[0] === 'event') };
}

test('Google never loads before consent, after rejection, in development or on private/unknown routes', () => {
  for (const options of [{}, { enabled: false }, { measurementId: '' }]) {
    const env = setup(options);
    env.analytics.sync('/', null);
    env.analytics.sync('/', { analytics: false });
    env.analytics.sync('/admin', { analytics: true });
    env.analytics.sync('/blog/private-email@example.com', { analytics: true });
    if (options.enabled === false || options.measurementId === '') env.analytics.sync('/', { analytics: true });
    assert.equal(env.scripts.length, 0);
    assert.equal(env.events().length, 0);
  }
});

test('consenting public page views load once, deduplicate effects, omit URL queries and disable ads', () => {
  const env = setup();
  env.analytics.sync('/', { analytics: true });
  env.analytics.pause();
  env.analytics.sync('/', { analytics: true });
  env.analytics.sync('/contact', { analytics: true });
  assert.equal(env.scripts.length, 1);
  assert.equal(env.scripts[0].nonce, 'secure');
  assert.equal(env.events().length, 2);
  assert.deepEqual(env.events()[1][2], { send_to: 'G-B2XQDE7L8D', page_location: 'https://anvexasecuritysolution.vercel.app/contact', page_referrer: 'https://anvexasecuritysolution.vercel.app/', page_title: 'Anvexa · /contact' });
  const config = env.windowImpl.dataLayer.map((entry) => [...entry]).find((entry) => entry[0] === 'config')[2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  env.analytics.sync('/admin', { analytics: true });
  assert.equal(env.windowImpl['ga-disable-G-B2XQDE7L8D'], true);
  assert.equal(env.events().length, 2);
});

test('withdrawal disables collection and deletes GA cookies without interrupting the current page', () => {
  const env = setup();
  env.analytics.sync('/', { analytics: true });
  env.analytics.sync('/', { analytics: false });
  assert.equal(env.windowImpl['ga-disable-G-B2XQDE7L8D'], true);
  assert.equal(env.scripts[0].removed, true);
  assert.equal(env.reloads(), 0);
  assert.ok(env.cookies.some((cookie) => cookie.includes('Domain=vercel.app')));
  assert.ok(env.cookies.every((cookie) => cookie.startsWith('_ga')));
  assert.equal(env.events().length, 1);
});

test('cookie cleanup leaves consent and other first-party cookies intact', () => {
  const env = setup();
  clearAnalyticsCookies({ cookie: 'anvexa_consent=abc; theme=dark' }, 'example.com');
  assert.equal(env.cookies.length, 0);
});

test('analytics and preferences are independent and old consent cannot grant analytics', () => {
  let cookie = '';
  const store = createConsentStore({ documentImpl: { get cookie() { return cookie; }, set cookie(value) { cookie = value; } }, storage: { setItem() {}, removeItem() {} } });
  assert.deepEqual([store.save({ preferences: false, analytics: true }).preferences, store.read().analytics], [false, true]);
  assert.deepEqual([store.save({ preferences: true, analytics: false }).preferences, store.read().analytics], [true, false]);
  assert.equal(parseConsent('anvexa_consent=' + encodeURIComponent(JSON.stringify({ version: 1, necessary: true, preferences: true, savedAt: Date.now() }))), null);
});
