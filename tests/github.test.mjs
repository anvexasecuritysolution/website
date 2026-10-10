import test from 'node:test';
import assert from 'node:assert/strict';
import { appendJson, consumeRateLimit } from '../client/api/_lib/github.js';

const config = { token: 'test-token', repo: 'owner/private', branch: 'main', apiUrl: 'https://api.github.test', path: 'data/leads.json', storageMode: 'array', recordsPath: 'data/leads', ratePath: 'data/_rate-limits' };
const record = { id: 'lead-id', submittedAt: '2026-10-08T00:00:00.000Z', email: 'asha@example.com' };
const json = (value, status = 200) => new Response(JSON.stringify(value), { status });
const file = (value, sha = 'sha') => json({ content: Buffer.from(JSON.stringify(value)).toString('base64'), encoding: 'base64', sha });

test('legacy arrays retain existing leads and omit email from commit metadata', async (t) => {
  let written;
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    assert.ok(options.signal);
    if (options.method !== 'PUT') return file([{ id: 'existing' }]);
    written = JSON.parse(options.body);
    return json({});
  });
  await appendJson(record, config);
  assert.deepEqual(JSON.parse(Buffer.from(written.content, 'base64')), [{ id: 'existing' }, record]);
  assert.equal(written.sha, 'sha');
  assert.equal(written.message.includes(record.email), false);
});

test('large files are fetched raw instead of overwriting the lead list', async (t) => {
  let written;
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    if (options.method === 'PUT') { written = JSON.parse(Buffer.from(JSON.parse(options.body).content, 'base64')); return json({}); }
    if (options.headers.Accept.includes('raw')) return new Response(JSON.stringify([{ id: 'old' }]));
    return json({ encoding: 'none', content: '', sha: 'large-sha' });
  });
  await appendJson(record, config);
  assert.equal(written[0].id, 'old');
});

test('malformed existing storage is never overwritten', async (t) => {
  let writes = 0;
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    if (options.method === 'PUT') writes += 1;
    return file({ invalid: true });
  });
  await assert.rejects(appendJson(record, config), /JSON array/);
  assert.equal(writes, 0);
});

test('conflicting appends re-read and preserve the other submission', async (t) => {
  let reads = 0;
  let writes = 0;
  let saved;
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    if (options.method !== 'PUT') return file(++reads === 1 ? [] : [{ id: 'concurrent' }], `sha-${reads}`);
    saved = JSON.parse(Buffer.from(JSON.parse(options.body).content, 'base64'));
    return json({}, ++writes === 1 ? 409 : 200);
  });
  await appendJson(record, config);
  assert.equal(saved[0].id, 'concurrent');
  assert.equal(saved[1].id, record.id);
});

test('retries with an already saved record are idempotent', async (t) => {
  let writes = 0;
  t.mock.method(globalThis, 'fetch', async (_url, options) => { if (options.method === 'PUT') writes += 1; return file([record]); });
  await appendJson(record, config);
  assert.equal(writes, 0);
});

test('record mode writes a dated independent file, preserving the legacy array', async (t) => {
  const urls = [];
  let saved;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    urls.push(url);
    if (options.method !== 'PUT') return json({}, 404);
    saved = JSON.parse(Buffer.from(JSON.parse(options.body).content, 'base64'));
    return json({});
  });
  await appendJson(record, { ...config, storageMode: 'records' });
  assert.ok(urls.every((url) => url.includes('data/leads/2026/10/08/lead-id.json')));
  assert.deepEqual(saved, record);
});

test('rate limits persist across invocations and concurrent reservations', async (t) => {
  let timestamps = [];
  let version = 0;
  const urls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    urls.push(url);
    if (options.method !== 'PUT') return version ? file(timestamps, String(version)) : json({}, 404);
    const write = JSON.parse(options.body);
    if ((write.sha || '0') !== String(version)) return json({}, 409);
    timestamps = JSON.parse(Buffer.from(write.content, 'base64'));
    version += 1;
    return json({});
  });
  const now = Date.now();
  await Promise.all([consumeRateLimit('192.0.2.1', config, now), consumeRateLimit('192.0.2.1', config, now)]);
  for (let i = 0; i < 6; i += 1) await consumeRateLimit('192.0.2.1', config, now);
  await assert.rejects(consumeRateLimit('192.0.2.1', config, now), (error) => error.status === 429);
  assert.equal(timestamps.length, 8);
  assert.ok(urls.every((url) => !url.includes('192.0.2.1')));
  await consumeRateLimit('192.0.2.1', config, now + 3600_001);
  assert.equal(timestamps.length, 1);
});

test('GitHub operations abort stalled fetches', async (t) => {
  const keepAlive = setTimeout(() => {}, 100);
  t.after(() => clearTimeout(keepAlive));
  t.mock.method(globalThis, 'fetch', (_url, options) => new Promise((_resolve, reject) => options.signal.addEventListener('abort', () => reject(options.signal.reason))));
  await assert.rejects(appendJson(record, { ...config, timeoutMs: 10 }), (error) => error.name === 'TimeoutError');
});
