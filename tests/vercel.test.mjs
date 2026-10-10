import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../client/api/leads.js';

function request(body, method = 'POST') { return { method, body, headers: { 'x-forwarded-for': '192.0.2.1' } }; }
function response() {
  return { headers: {}, setHeader(key, value) { this.headers[key] = value; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
}
const lead = { firstName: 'Asha', email: 'asha@example.com', phone: '+91 98765 43210' };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status });

function configuration(t) {
  const saved = { ...process.env };
  process.env.GITHUB_TOKEN = 'test-token';
  process.env.GITHUB_REPO = 'owner/private';
  process.env.GITHUB_STORAGE_MODE = 'array';
  process.env.GITHUB_LEADS_PATH = 'data/leads.json';
  t.after(() => {
    for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key];
    Object.assign(process.env, saved);
  });
}

test('Vercel rejects invalid methods, JSON, sizes and fields before any storage access', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('Unexpected network access'); });
  for (const [req, expected] of [[request({}, 'GET'), 405], [request('{invalid'), 400], [request({ message: 'a'.repeat(21000) }), 413], [request({ ...lead, service: 'invalid' }), 422], [request({ ...lead, phone: '' }), 422], [request({ ...lead, phone: undefined }), 422]]) {
    const res = response();
    await handler(req, res);
    assert.equal(res.code, expected);
  }
});

test('Vercel honeypot keeps the success response without storage', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('Unexpected network access'); });
  const res = response();
  await handler(request({ website: 'bot' }), res);
  assert.equal(res.code, 201);
});

test('Vercel success requires both a shared rate reservation and a saved record', async (t) => {
  configuration(t);
  const writes = [];
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    if (options.method !== 'PUT') return json({}, 404);
    writes.push(JSON.parse(options.body));
    return json({});
  });
  const res = response();
  await handler(request(lead), res);
  assert.equal(res.code, 201);
  assert.deepEqual(res.body, { ok: true });
  assert.equal(writes.length, 2);
  const leads = JSON.parse(Buffer.from(writes[1].content, 'base64'));
  assert.equal(leads[0].email, lead.email);
  assert.equal(leads[0].phone, lead.phone);
  assert.ok(writes.every((write) => !write.message.includes(lead.email)));
});

test('Vercel shared limits reject further requests without writing a lead', async (t) => {
  configuration(t);
  let writes = 0;
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    if (options.method === 'PUT') writes += 1;
    return json({ encoding: 'base64', content: Buffer.from(JSON.stringify(Array(8).fill(Date.now()))).toString('base64'), sha: 'sha' });
  });
  const res = response();
  await handler(request(lead), res);
  assert.equal(res.code, 429);
  assert.equal(res.headers['Retry-After'], '3600');
  assert.equal(writes, 0);
});

test('Vercel returns a failure if GitHub cannot persist the lead', async (t) => {
  configuration(t);
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (url.includes('/data/leads.json')) return json({}, 503);
    return options.method === 'PUT' ? json({}) : json({}, 404);
  });
  t.mock.method(console, 'error', () => {});
  const res = response();
  await handler(request(lead), res);
  assert.equal(res.code, 503);
  assert.equal(res.body.ok, undefined);
});
