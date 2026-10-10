import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';

process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/anvexa-test-not-connected';
process.env.JWT_SECRET = 'test-secret-that-is-not-used-in-production';
process.env.GITHUB_TOKEN = '';
const { createApp } = await import('../server/src/app.js');
const { Lead } = await import('../server/src/models/Lead.js');
const { User } = await import('../server/src/models/User.js');
const { env } = await import('../server/src/config/env.js');
const { default: jwt } = await import('../server/node_modules/jsonwebtoken/index.js');

async function start(t) {
  const server = createServer(createApp());
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }));
  return `http://127.0.0.1:${server.address().port}`;
}

const valid = { firstName: 'Asha', email: 'asha@example.com', phone: '+91 98765 43210' };
const auth = () => ({ Authorization: `Bearer ${jwt.sign({ sub: 'admin-id', role: 'admin' }, env.jwtSecret)}` });

test('Express saves a normalized enquiry and preserves its response contract', async (t) => {
  let saved;
  t.mock.method(Lead, 'create', async (data) => { saved = data; return {}; });
  const url = await start(t);
  const response = await fetch(url + '/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...valid, email: ' ASHA@example.com ' }) });
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(saved.email, valid.email);
  assert.equal(saved.phone, valid.phone);
});

test('Express validates before storing and retains the honeypot', async (t) => {
  let writes = 0;
  t.mock.method(Lead, 'create', async () => { writes += 1; });
  const url = await start(t);
  const send = (body) => fetch(url + '/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  assert.equal((await send({ ...valid, email: 'invalid' })).status, 422);
  assert.equal((await send({ ...valid, phone: '' })).status, 422);
  assert.equal((await send({ ...valid, phone: undefined })).status, 422);
  assert.equal((await send({ ...valid, website: 'bot' })).status, 201);
  assert.equal(writes, 0);
});

test('admin routes reject missing, expired and non-admin tokens', async (t) => {
  const url = await start(t);
  assert.equal((await fetch(url + '/api/leads')).status, 401);
  const expired = jwt.sign({ sub: 'admin', role: 'admin' }, env.jwtSecret, { expiresIn: -1 });
  assert.equal((await fetch(url + '/api/leads', { headers: { Authorization: `Bearer ${expired}` } })).status, 401);
  const other = jwt.sign({ sub: 'user', role: 'viewer' }, env.jwtSecret);
  assert.equal((await fetch(url + '/api/leads', { headers: { Authorization: `Bearer ${other}` } })).status, 403);
});

test('authenticated lead listing and status updates keep the existing API', async (t) => {
  t.mock.method(Lead, 'find', () => ({ sort: () => ({ limit: () => ({ lean: async () => [{ _id: 'id', ...valid, status: 'new' }] }) }) }));
  t.mock.method(Lead, 'findByIdAndUpdate', (_id, update) => ({ lean: async () => ({ _id, ...valid, ...update }) }));
  const url = await start(t);
  const response = await fetch(url + '/api/leads', { headers: auth() });
  assert.equal((await response.json())[0].email, valid.email);
  const changed = await fetch(url + '/api/leads/id', { method: 'PATCH', headers: { ...auth(), 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'contacted' }) });
  assert.equal((await changed.json()).status, 'contacted');
});

test('login still issues an admin token and rejects bad passwords', async (t) => {
  t.mock.method(User, 'findOne', () => ({ select: async () => ({ id: 'admin-id', role: 'admin', email: 'admin@example.com', verifyPassword: async (password) => password === 'correct-password' }) }));
  const url = await start(t);
  const login = (password) => fetch(url + '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'admin@example.com', password }) });
  assert.equal((await login('wrong')).status, 401);
  const response = await login('correct-password');
  assert.equal(response.status, 200);
  assert.equal(jwt.verify((await response.json()).token, env.jwtSecret).role, 'admin');
});

test('production HTML includes CSP nonces and allows the configured form providers', async (t) => {
  env.isProd = true;
  t.after(() => { env.isProd = false; });
  const url = await start(t);
  const response = await fetch(url + '/contact');
  assert.equal(response.status, 200);
  const html = await response.text();
  const nonce = html.match(/<script nonce="([^"]+)"/)[1];
  const policy = response.headers.get('content-security-policy');
  assert.ok(policy.includes(`'nonce-${nonce}'`));
  assert.ok(policy.includes('https://script.google.com'));
  assert.ok(policy.includes('https://api.web3forms.com'));
  assert.ok(html.includes('href="https://anvexasecuritysolution.vercel.app/contact"'));
  assert.equal((await fetch(url + '/missing-page')).status, 404);
  const admin = await fetch(url + '/admin/login');
  assert.equal(admin.headers.get('x-robots-tag'), 'noindex, nofollow');
  const redirect = await fetch(url + '/services/', { redirect: 'manual' });
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get('location'), '/services');
  const contactRedirect = await fetch(url + '/contact/?plan=retain', { redirect: 'manual' });
  assert.equal(contactRedirect.headers.get('location'), '/contact?plan=retain');
  assert.equal((await fetch(url + '/api/unknown')).status, 404);
});
