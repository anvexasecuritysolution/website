/**
 * Anvexa leads -> Google Sheet (+ optional email alert).
 * Paste into a Google Sheet: Extensions > Apps Script. Then Deploy > New deployment >
 * Web app > Execute as: Me, Who has access: Anyone. Copy the /exec URL.
 */
var NOTIFY_EMAIL = ''; // optional: your email to get an alert on every lead

var HEADERS = ['Submitted at', 'First name', 'Last name', 'Email', 'Company', 'Industry', 'Service', 'Message', 'Status'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var d = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }
    var clean = function (v) { // stop spreadsheet formula injection
      v = String(v == null ? '' : v).slice(0, 4000);
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    };
    sheet.appendRow([d.submittedAt, d.firstName, d.lastName, d.email, d.company, d.industry, d.service, d.message, d.status || 'new'].map(clean));
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, 'New Anvexa lead: ' + d.email,
        HEADERS.map(function (h, i) { return h + ': ' + clean([d.submittedAt, d.firstName, d.lastName, d.email, d.company, d.industry, d.service, d.message, d.status][i]); }).join('\n'));
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return ContentService.createTextOutput('Anvexa leads endpoint is running.'); }
