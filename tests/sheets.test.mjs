import test from 'node:test';
import assert from 'node:assert/strict';
import { submitSheets } from '../client/src/api/sheets.js';

const url = 'https://script.google.com/macros/s/test-deployment/exec';
const id = '12345678-1234-1234-1234-123456789abc';
function environment(receipts) {
  const scripts = [];
  const windowImpl = { crypto: { randomUUID: () => id } };
  const documentImpl = {
    createElement: () => ({ remove() { this.removed = true; } }),
    head: { appendChild(script) {
      scripts.push(script);
      const callback = new URL(script.src).searchParams.get('callback');
      const result = receipts.shift();
      if (result) queueMicrotask(() => windowImpl[callback]?.(result));
    } },
  };
  return { windowImpl, documentImpl, scripts, timeoutMs: 30, pollMs: 1 };
}

test('opaque POST is insufficient: a confirmed receipt is required', async () => {
  const env = environment([{ version: 2, pending: true }, { version: 2, ok: true }]);
  let posted;
  await submitSheets(url, { firstName: 'Asha' }, { ...env, fetchImpl: async (_url, options) => { posted = JSON.parse(options.body); return {}; } });
  assert.equal(posted.receipt, id.replaceAll('-', ''));
  assert.equal(env.scripts.length, 2);
  assert.ok(env.scripts.every((script) => script.removed));
  assert.deepEqual(Object.keys(env.windowImpl), ['crypto']);
});

test('a failed or missing receipt does not clear the form as successful', async () => {
  for (const result of [{ version: 2, ok: false }, null]) {
    const env = environment([{ version: 2, pending: true }, result]);
    await assert.rejects(submitSheets(url, {}, { ...env, fetchImpl: async () => ({}) }));
    assert.ok(env.scripts.every((script) => script.removed));
    assert.deepEqual(Object.keys(env.windowImpl), ['crypto']);
  }
});

test('an outdated Apps Script is detected before any POST is sent', async () => {
  let posts = 0;
  const env = environment([{ pending: true }]);
  await assert.rejects(submitSheets(url, {}, { ...env, fetchImpl: async () => { posts += 1; } }), /update/);
  assert.equal(posts, 0);
});

test('receipt polling waits for persistence and does not resubmit', async () => {
  let posts = 0;
  const env = environment([{ version: 2, pending: true }, { version: 2, pending: true }, { version: 2, ok: true }]);
  await submitSheets(url, {}, { ...env, fetchImpl: async () => { posts += 1; return {}; } });
  assert.equal(posts, 1);
});

test('receipt scripts cannot be loaded from an arbitrary domain', async () => {
  await assert.rejects(submitSheets('https://evil.example/exec', {}, environment([])), /Invalid/);
});
