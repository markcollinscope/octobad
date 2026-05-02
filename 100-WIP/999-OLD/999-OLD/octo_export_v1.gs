/**
 * Octopus Gmail Export Probe / V1
 */
const CFG = {
  LABEL_NAME: 'octo-export-test',
  ROOT_FOLDER_ID: 'PASTE_DRIVE_FOLDER_ID_HERE',
  INDEX_SHEET_ID: 'PASTE_SHEET_ID_HERE',
  TXT_BODY_MAX_CHARS: 5000,
  EXPECT_AT_LEAST_ONE_PDF: false,
  STRICT_SENDER_MODE: false,
  OCTOPUS_DOMAIN_HINTS: ['octopus.energy', 'octo.energy'],
  TZ: Session.getScriptTimeZone(),
};

function probeExport() { runExport_(3); }
function exportAll() { runExport_(null); }

function runExport_(maxThreads) {
  validateConfig_();
  const label = GmailApp.getUserLabelByName(CFG.LABEL_NAME);
  if (!label) throw new Error(`Missing Gmail label: ${CFG.LABEL_NAME}`);
  const root = DriveApp.getFolderById(CFG.ROOT_FOLDER_ID);
  const runStamp = Utilities.formatDate(new Date(), CFG.TZ, 'yyyyMMdd_HHmmss');
  const runFolder = root.createFolder(`run_${runStamp}`);
  const txtFolder = runFolder.createFolder('txt');
  const pdfFolder = runFolder.createFolder('pdf');
  const ss = SpreadsheetApp.openById(CFG.INDEX_SHEET_ID);
  const sh = getOrCreateIndexSheet_(ss);
  const threads = label.getThreads();
  const limit = maxThreads ? Math.min(maxThreads, threads.length) : threads.length;

  for (let i = 0; i < limit; i++) {
    const thread = threads[i];
    const messages = thread.getMessages();
    for (let j = 0; j < messages.length; j++) {
      const msg = messages[j];
      try {
        exportMessage_(msg, txtFolder, pdfFolder, sh, runStamp);
      } catch (err) {
        logIndexRow_(sh, {
          runStamp, status: 'ERROR', gmailDate: msg.getDate(), dir: safeDir_(msg),
          from: msg.getFrom(), subject: msg.getSubject(), threadId: thread.getId(),
          messageId: msg.getId(), txtName: '', txtFileId: '', pdfName: '',
          pdfFileId: '', hasPdf: '', errorText: String(err)
        });
      }
    }
  }
}

function exportMessage_(msg, txtFolder, pdfFolder, sh, runStamp) {
  const gmailDate = msg.getDate();
  const from = msg.getFrom();
  const subject = msg.getSubject() || '(no-subject)';
  const dir = deriveDir_(from);
  const threadId = msg.getThread().getId();
  const messageId = msg.getId();
  const stamp = Utilities.formatDate(gmailDate, CFG.TZ, 'yyyy-MM-dd_HHmm');
  const slug = slugify_(subject).slice(0, 80) || 'no-subject';
  const base = `${stamp}_${dir}_${slug}`;
  const plainBody = (msg.getPlainBody() || '').slice(0, CFG.TXT_BODY_MAX_CHARS);
  const txtName = `${base}.txt`;
  const txtFile = createUniqueTextFile_(txtFolder, txtName, buildTxt_(msg, dir, plainBody));
  const atts = msg.getAttachments({includeInlineImages: false, includeAttachments: true}) || [];
  const pdfAtts = atts.filter(att => {
    const name = (att.getName() || '').toLowerCase();
    const type = (att.getContentType() || '').toLowerCase();
    return type === 'application/pdf' || name.endsWith('.pdf');
  });

  if (CFG.EXPECT_AT_LEAST_ONE_PDF && pdfAtts.length === 0) {
    throw new Error('Expected at least one PDF attachment but found none');
  }
  if (CFG.STRICT_SENDER_MODE) validateSender_(from);

  if (pdfAtts.length === 0) {
    logIndexRow_(sh, {
      runStamp, status: 'OK_NO_PDF', gmailDate, dir, from, subject, threadId, messageId,
      txtName, txtFileId: txtFile.getId(), pdfName: '', pdfFileId: '', hasPdf: 'N', errorText: ''
    });
    return;
  }

  for (let i = 0; i < pdfAtts.length; i++) {
    const pdfName = `${base}_att${String(i + 1).padStart(2, '0')}.pdf`;
    const pdfFile = createUniqueBlobFile_(pdfFolder, pdfName, pdfAtts[i].copyBlob());
    logIndexRow_(sh, {
      runStamp, status: 'OK', gmailDate, dir, from, subject, threadId, messageId,
      txtName, txtFileId: txtFile.getId(), pdfName, pdfFileId: pdfFile.getId(), hasPdf: 'Y', errorText: ''
    });
  }
}

function getOrCreateIndexSheet_(ss) {
  let sh = ss.getSheetByName('INDEX');
  if (!sh) sh = ss.insertSheet('INDEX');
  if (sh.getLastRow() === 0) {
    sh.appendRow(['RUN_STAMP','STATUS','GMAIL_DATE','DIR','FROM','SUBJECT','THREAD_ID','MESSAGE_ID','TXT_NAME','TXT_FILE_ID','PDF_NAME','PDF_FILE_ID','HAS_PDF','ERROR']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function logIndexRow_(sh, row) {
  sh.appendRow([row.runStamp,row.status,row.gmailDate,row.dir,row.from,row.subject,row.threadId,row.messageId,row.txtName,row.txtFileId,row.pdfName,row.pdfFileId,row.hasPdf,row.errorText]);
}

function buildTxt_(msg, dir, body) {
  return [
    `DATE: ${msg.getDate().toISOString()}`,
    `DIR: ${dir}`,
    `FROM: ${msg.getFrom()}`,
    `TO: ${msg.getTo()}`,
    `SUBJECT: ${msg.getSubject()}`,
    `THREAD_ID: ${msg.getThread().getId()}`,
    `MESSAGE_ID: ${msg.getId()}`,
    '',
    body
  ].join('\n');
}

function deriveDir_(from) {
  const f = (from || '').toLowerCase();
  if (CFG.OCTOPUS_DOMAIN_HINTS.some(h => f.includes(h))) return 'IN';
  const me = Session.getActiveUser().getEmail().toLowerCase();
  if (me && f.includes(me)) return 'OUT';
  return 'UNK';
}
function safeDir_(msg) { try { return deriveDir_(msg.getFrom()); } catch (e) { return 'UNK'; } }
function validateSender_(from) { if (deriveDir_(from) === 'UNK') throw new Error(`Sender does not match expected IN/OUT rules: ${from}`); }

function slugify_(s) {
  return String(s || '')
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function createUniqueTextFile_(folder, name, content) {
  const unique = makeUniqueName_(folder, name);
  return folder.createFile(unique, content, MimeType.PLAIN_TEXT);
}
function createUniqueBlobFile_(folder, name, blob) {
  const unique = makeUniqueName_(folder, name);
  blob.setName(unique);
  return folder.createFile(blob);
}
function makeUniqueName_(folder, name) {
  if (!folder.getFilesByName(name).hasNext()) return name;
  const dot = name.lastIndexOf('.');
  const stem = dot >= 0 ? name.slice(0, dot) : name;
  const ext = dot >= 0 ? name.slice(dot) : '';
  let n = 2;
  while (folder.getFilesByName(`${stem}__dup${n}${ext}`).hasNext()) n++;
  return `${stem}__dup${n}${ext}`;
}
function validateConfig_() {
  if (!CFG.LABEL_NAME) throw new Error('CFG.LABEL_NAME is empty');
  if (!CFG.ROOT_FOLDER_ID || CFG.ROOT_FOLDER_ID.includes('PASTE_')) throw new Error('Set CFG.ROOT_FOLDER_ID');
  if (!CFG.INDEX_SHEET_ID || CFG.INDEX_SHEET_ID.includes('PASTE_')) throw new Error('Set CFG.INDEX_SHEET_ID');
}
