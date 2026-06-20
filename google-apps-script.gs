/**
 * New Look Mowing & Landscaping — quote form backend (Google Apps Script)
 *
 * What it does on each website submission:
 *   1. Appends a row to the linked Google Sheet
 *   2. Emails YOU (the business) an alert with the lead details
 *   3. Emails the CUSTOMER a "we received your request" confirmation
 *
 * SETUP / UPDATING (do this in the Sheet's Apps Script editor):
 *   1. Paste this whole file in, replacing what's there, then Save.
 *   2. Run the `sendTestEmail` function once and approve the permissions
 *      (you'll see an "unverified app" screen — Advanced → Allow). This grants
 *      the new permission to send email.
 *   3. Deploy → Manage deployments → edit (pencil) → Version: "New version" →
 *      Deploy. (Keeps the SAME /exec URL, so the website needs no change.)
 *   4. Because a new "Email" column was added, clear the Sheet once (select all
 *      rows incl. the header and delete) so the new header is rebuilt cleanly.
 */

// ===== Settings =====
var BUSINESS_EMAIL = 'jaidevbector11@gmail.com';
var BUSINESS_NAME  = 'New Look Mowing & Landscaping';
var BUSINESS_PHONE = '(646) 824-0022';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Address', 'Service', 'Details']);
    }

    var p = (e && e.parameter) || {};
    var name    = p.name    || '';
    var phone   = p.phone   || '';
    var email   = p.email   || '';
    var address = p.address || '';
    var service = p.service || '';
    var details = p.details || '';

    sheet.appendRow([new Date(), name, phone, email, address, service, details]);

    var summary =
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '\n' +
      'Email: ' + email + '\n' +
      'Address: ' + address + '\n' +
      'Service: ' + service + '\n' +
      'Details: ' + (details || '—');

    // 1) Alert the business (reply goes straight to the customer's email)
    MailApp.sendEmail({
      to: BUSINESS_EMAIL,
      subject: 'New quote request – ' + (service || 'Landscaping') + ' (' + name + ')',
      replyTo: email || BUSINESS_EMAIL,
      body: 'You have a new quote request from your website:\n\n' + summary
    });

    // 2) Confirm to the customer (only if a valid-looking email was provided)
    if (email && /\S+@\S+\.\S+/.test(email)) {
      MailApp.sendEmail({
        to: email,
        name: BUSINESS_NAME,
        replyTo: BUSINESS_EMAIL,
        subject: 'We received your request – ' + BUSINESS_NAME,
        body:
          'Hi ' + (name || 'there') + ',\n\n' +
          'Thanks for reaching out to ' + BUSINESS_NAME + '! We received your request' +
          (service ? ' for ' + service.toLowerCase() : '') + ' and will get back to you shortly.\n\n' +
          'For the fastest response, you can also call or text us at ' + BUSINESS_PHONE + '.\n\n' +
          'Here is a copy of what you sent us:\n' + summary + '\n\n' +
          '— The ' + BUSINESS_NAME + ' Team'
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('New Look quote endpoint is running.');
}

// Run this once from the editor to authorize email sending and verify it works.
function sendTestEmail() {
  MailApp.sendEmail(BUSINESS_EMAIL, 'Test – New Look form', 'If you received this, email sending is authorized and working.');
}
