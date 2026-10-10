import test from 'node:test';
import assert from 'node:assert/strict';
import { createApi } from '../client/src/api/createClient.js';
import { validateLead, isValidPhone, isValidEmail, isValidName } from '../client/shared/leads.js';

const lead = { firstName: ' Asha ', email: ' ASHA@example.com ', phone: ' +91 98765 43210 ' };
const post = { slug: 'article', body: ['Text'], publishedAt: '2026-01-01' };
const response = (data, status = 200) => new Response(JSON.stringify(data), { status });

test('lead validation normalizes fields and rejects oversized or invalid values', () => {
  const { data, errors } = validateLead(lead);
  assert.deepEqual(errors, {});
  assert.equal(data.email, 'asha@example.com');
  assert.equal(data.firstName, 'Asha');
  assert.equal(data.phone, '+91 98765 43210');
  assert.equal(validateLead({ firstName: 'Asha', email: 'asha@example.com' }).errors.phone, 'Phone number is required');
  for (const phone of ['', '   ', '123', 'call me', '1234567890123456']) assert.ok(validateLead({ ...lead, phone }).errors.phone);
  assert.ok(validateLead({ ...lead, firstName: 'a'.repeat(81), industry: 'invalid' }).errors.firstName);
  assert.ok(validateLead({ ...lead, company: {} }).errors.company);
  assert.ok(validateLead(null).errors.form);
});

test('phone, email and name checks reject malformed values and accept common formats', () => {
  for (const value of ['9876543210', '+91 98765 43210', '09876543210', '919876543210', '+1 (212) 555-1234', '+44 20 7946 0958']) assert.equal(isValidPhone(value), true, value);
  for (const value of ['1234567', '0000000000', '1111111111', '+91 1111111111', '+91 987654321', '+0919876543210', '98765abc43210', '+1 (212 555-1234', '+1 ()2125551234', '+91 09876543210']) assert.equal(isValidPhone(value), false, value);
  for (const value of ['asha@example.com', 'asha.rao+security@example.co.in']) assert.equal(isValidEmail(value), true, value);
  for (const value of ['asha..rao@example.com', '.asha@example.com', 'asha@-example.com', 'asha@example..com', 'asha@example', 'asha@example.c', 'asha@example.com ']) assert.equal(isValidEmail(value), false, value);
  for (const value of ['Asha', 'O’Connor', 'Anne-Marie', 'आशा', '李']) assert.equal(isValidName(value), true, value);
  for (const value of ['12345', '<script>', 'Asha123']) assert.equal(isValidName(value), false, value);
});

test('backend submission requires explicit success and sends normalized fields', async () => {
  let body;
  const api = createApi({ fetchImpl: async (_url, options) => { body = JSON.parse(options.body); return response({ ok: true }, 201); } });
  assert.deepEqual(await api.submitLead(lead), { ok: true });
  assert.equal(body.email, 'asha@example.com');
  assert.equal(body.phone, '+91 98765 43210');
  await assert.rejects(createApi({ fetchImpl: async () => response({}) }).submitLead(lead), /confirm/);
});

test('server field errors and authentication errors are preserved', async () => {
  const api = createApi({ fetchImpl: async () => response({ message: 'Invalid', errors: { email: 'Invalid email' } }, 422) });
  await assert.rejects(api.submitLead(lead), (error) => error.status === 422 && error.fields.email === 'Invalid email');
  await assert.rejects(createApi({ fetchImpl: async () => response({ message: 'Denied' }, 401) }).leads('token'), (error) => error.status === 401);
});

test('honeypot submissions do not contact any provider', async () => {
  const api = createApi({ fetchImpl: async () => { throw new Error('Unexpected fetch'); } });
  assert.deepEqual(await api.submitLead({ website: 'spam' }), { ok: true });
});

test('an unpublished article remains a 404 even if bundled locally', async () => {
  const api = createApi({ localPosts: [post], fetchImpl: async () => response({ message: 'Article not found.' }, 404) });
  await assert.rejects(api.post(post.slug), (error) => error.status === 404);
});

test('bundled blog works for network failures, server outages and static SPA HTML', async () => {
  for (const fetchImpl of [async () => { throw new Error('offline'); }, async () => response({}, 503), async () => new Response('<html>Static SPA</html>')]) {
    const api = createApi({ localPosts: [post], fetchImpl });
    assert.deepEqual(await api.post(post.slug), post);
    assert.equal((await api.posts())[0].body, undefined);
  }
});

test('unconfirmed email delivery and unconfirmed sheets never become success', async () => {
  for (const data of [{}, { success: false }]) {
    const api = createApi({ web3formsKey: 'key', fetchImpl: async () => response(data) });
    await assert.rejects(api.submitLead(lead), /confirm delivery/);
  }
  const api = createApi({ sheetsUrl: 'url', submitSheets: async () => { throw new Error('not saved'); } });
  await assert.rejects(api.submitLead(lead), /confirm delivery/);
});

test('one verified provider can accept the enquiry if the second fails', async () => {
  const api = createApi({ web3formsKey: 'key', sheetsUrl: 'url', fetchImpl: async () => response({ success: true }), submitSheets: async () => { throw new Error('offline'); } });
  assert.deepEqual(await api.submitLead(lead), { ok: true });
});

test('requests are bounded and carry admin authorization', async () => {
  let headers;
  const api = createApi({ fetchImpl: async (_url, options) => { headers = options.headers; return response([]); } });
  await api.leads('admin-token');
  assert.equal(headers.Authorization, 'Bearer admin-token');
  const hanging = createApi({ timeoutMs: 10, fetchImpl: (_url, options) => new Promise((_resolve, reject) => options.signal.addEventListener('abort', () => reject(new Error('aborted')))) });
  await assert.rejects(hanging.submitLead(lead), /timed out/);
});
