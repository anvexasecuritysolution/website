/**
 * Paste into the Sheet's Apps Script project and redeploy its existing web app.
 * Keep the same deployment URL. Deploy this version BEFORE updating the website.
 * Execute as: Me; access: Anyone. Only receipt status, never lead data, is public.
 */
var NOTIFY_EMAIL = '';
var HEADERS = ['Submitted at', 'First name', 'Last name', 'Email', 'Company', 'Industry', 'Service', 'Message', 'Status', 'Phone'];
var INDUSTRIES = ['Fintech / BFSI', 'Healthcare / Pharma', 'E-commerce / Retail', 'Manufacturing / Logistics', 'IT / SaaS', 'Other'];
var SERVICES = ['Security Assessment (VAPT & Risk)', 'Continuous Security Operations', 'Managed MDR + Incident Response', 'Not sure — need a consultation'];

function output(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function isValidPhone(value) {
  if (typeof value !== 'string') return false;
  value = value.trim();
  const digits = value.replace(/\D/g, '');
  const national = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : !value.startsWith('+') && digits.startsWith('0') && digits.length === 11 ? digits.slice(1) : digits;
  if (!/^\+?[\d(][\d\s().-]*$/.test(value) || value.length > 32 || /^(\d)\1+$/.test(national)) return false;
  let open = false;
  for (const char of value) {
    if (char === '(') { if (open) return false; open = true; }
    if (char === ')') { if (!open) return false; open = false; }
  }
  if (open || /\(\s*\)/.test(value)) return false;
  if (value.startsWith('+')) return /^[1-9]\d{7,14}$/.test(digits) && (!digits.startsWith('91') || /^91[1-9]\d{9}$/.test(digits));
  return /^[1-9]\d{9}$/.test(digits) || /^0[1-9]\d{9}$/.test(digits) || /^91[1-9]\d{9}$/.test(digits);
}

function isValidEmail(value) {
  if (typeof value !== 'string' || value.length > 160) return false;
  const parts = value.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local) || /^\.|\.$|\.\./.test(local)) return false;
  const labels = domain.split('.');
  return labels.length >= 2 && labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label)) && /^(?:[a-z]{2,63}|xn--[a-z0-9-]+)$/i.test(labels[labels.length - 1]);
}

function isValidName(value) {
  return /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u.test(value);
}

function validate(d) {
  if (!d || typeof d !== 'object' || Array.isArray(d)) throw new Error('Invalid request.');
  var limits = { firstName: 80, lastName: 80, email: 160, phone: 32, company: 160, industry: 80, service: 80, message: 4000 };
  var fields = {};
  Object.keys(limits).forEach(function (key) {
    var value = d[key] == null ? '' : d[key];
    if (typeof value !== 'string' || value.trim().length > limits[key]) throw new Error('Please check the form fields.');
    fields[key] = value.trim();
  });
  fields.email = fields.email.toLowerCase();
  if (!isValidName(fields.firstName) || (fields.lastName && !isValidName(fields.lastName))) throw new Error('Enter a valid name.');
  if (!isValidEmail(fields.email)) throw new Error('Enter a valid email.');
  if (!isValidPhone(fields.phone)) throw new Error('A valid phone number is required.');
  if (fields.industry && INDUSTRIES.indexOf(fields.industry) < 0) throw new Error('Invalid industry.');
  if (fields.service && SERVICES.indexOf(fields.service) < 0) throw new Error('Invalid service.');
  return fields;
}

function rememberReceipt(properties, receipt, value) {
  if (!receipt) return;
  var text = JSON.stringify({ ok: value.ok, message: value.message, savedAt: Date.now() });
  if (value.ok) properties.setProperty('receipt_' + receipt, text);
  else CacheService.getScriptCache().put('receipt_' + receipt, text, 60);
}

function limitSubmissions(properties, email, now) {
  // Apps Script does not expose a trustworthy visitor IP. Limit by email and a global ceiling.
  var hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email).map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
  var key = 'rate_email_' + hash;
  var recent = function (name) { return JSON.parse(properties.getProperty(name) || '[]').filter(function (t) { return now - t < 3600000; }); };
  var global = recent('rate_global');
  var person = recent(key);
  if (global.length >= 100 || person.length >= 8) throw new Error('Too many submissions. Please try again later.');
  properties.setProperty('rate_global', JSON.stringify(global.concat(now)));
  properties.setProperty(key, JSON.stringify(person.concat(now)));
  if (now - Number(properties.getProperty('maintenanceAt') || 0) > 60000) {
    var all = properties.getProperties();
    Object.keys(all).forEach(function (name) {
      if (name.indexOf('receipt_') === 0 && now - JSON.parse(all[name]).savedAt > 3600000) properties.deleteProperty(name);
      if (name.indexOf('rate_email_') === 0 && JSON.parse(all[name]).every(function (t) { return now - t >= 3600000; })) properties.deleteProperty(name);
    });
    properties.setProperty('maintenanceAt', String(now));
  }
}

function doPost(e) {
  var receipt = '';
  var lock = LockService.getScriptLock();
  var acquired = false;
  var properties = PropertiesService.getScriptProperties();
  try {
    var raw = e && e.postData && e.postData.contents;
    if (typeof raw !== 'string' || Utilities.newBlob(raw).getBytes().length > 20480) return output({ ok: false, message: 'Invalid or oversized request.' });
    var d = JSON.parse(raw);
    if (d && typeof d.receipt === 'string' && /^[a-f0-9]{32}$/.test(d.receipt)) receipt = d.receipt;
    if (d && d.receipt && !receipt) return output({ ok: false, message: 'Invalid receipt.' });
    if (d && d.website) {
      return output({ ok: true });
    }
    var fields = validate(d);
    lock.waitLock(20000);
    acquired = true;
    // A retry with the same receipt must never append a duplicate row.
    var previous = receipt && properties.getProperty('receipt_' + receipt);
    if (previous && JSON.parse(previous).ok) return output({ ok: true });
    limitSubmissions(properties, fields.email, Date.now());
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }
    // Append the phone column so every existing column keeps its position.
    sheet.getRange(1, HEADERS.length).setValue('Phone');
    var clean = function (v) {
      v = String(v == null ? '' : v);
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    };
    var row = [new Date().toISOString(), fields.firstName, fields.lastName, fields.email, fields.company, fields.industry, fields.service, fields.message, 'new', fields.phone].map(clean);
    sheet.appendRow(row);
    rememberReceipt(properties, receipt, { ok: true });
    // Email failure must not turn a successfully saved row into a failed submission.
    if (NOTIFY_EMAIL) {
      try { MailApp.sendEmail(NOTIFY_EMAIL, 'New Anvexa enquiry', HEADERS.map(function (h, i) { return h + ': ' + row[i]; }).join('\n')); }
      catch (mailError) { console.error('Lead saved; email notification failed.'); }
    }
    return output({ ok: true });
  } catch (err) {
    var result = { ok: false, message: 'Could not save the enquiry. Please check the form or try again later.' };
    rememberReceipt(properties, receipt, result);
    return output(result);
  } finally { if (acquired) lock.releaseLock(); }
}

function doGet(e) {
  var params = e && e.parameter || {};
  if (!params.receipt && !params.callback) return ContentService.createTextOutput('Anvexa leads endpoint is running (v2).');
  if (!/^[a-f0-9]{32}$/.test(params.receipt || '') || params.callback !== 'anvexaReceipt_' + params.receipt) return output({ ok: false, message: 'Invalid receipt query.' });
  var stored = PropertiesService.getScriptProperties().getProperty('receipt_' + params.receipt) || CacheService.getScriptCache().get('receipt_' + params.receipt);
  var value = stored ? JSON.parse(stored) : { pending: true };
  var result = { version: 2, ok: value.ok, pending: value.pending, message: value.message };
  return ContentService.createTextOutput(params.callback + '(' + JSON.stringify(result) + ');').setMimeType(ContentService.MimeType.JAVASCRIPT);
}
