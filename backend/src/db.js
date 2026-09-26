import fs from "node:fs";
import path from "node:path";
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(here, "../data");
fs.mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(path.join(dataDir, "portal.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    email TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    password_hash TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS files (
    id TEXT PRIMARY KEY,
    payload TEXT NOT NULL
  );
`);

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

function checkPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const next = scryptSync(password, salt, 32);
  const prev = Buffer.from(hash, "hex");
  return next.length === prev.length && timingSafeEqual(next, prev);
}

const NOTICE = `Will the Health Minister be pleased to state the total number of Basic Health Units (BHUs) currently functioning in constituency NA-120 (Lahore), the number among them presently without a posted Medical Officer, and the average duration each such vacancy has remained unfilled during the past twelve months, together with a district-wise breakdown of sanctioned posts, filled posts and vacant posts of Medical Officers, Lady Health Visitors and Dispensers, indicating for each BHU the last date a doctor was physically present at the facility, the reason recorded on file for the vacancy, and the steps being taken by the Ministry to recruit and retain qualified doctors in the aforementioned rural union councils; and further, in the Minister's view, whether the current allocation of doctors is adequate for the population served, and if not, what corrective measures have been proposed, including any additional recruitment already approved for the rural union councils of this constituency during the present financial year?`;

function seed() {
  const count = db.prepare("SELECT COUNT(*) AS n FROM users").get().n;
  if (count > 0) return;
  const insertUser = db.prepare(
    "INSERT INTO users (email, name, role, password_hash) VALUES (?, ?, ?, ?)"
  );
  insertUser.run(
    "so.questions@na.gov.pk",
    "Saima Malik",
    "officer",
    hashPassword("questions123")
  );
  insertUser.run(
    "speaker@na.gov.pk",
    "Sardar Ayaz Sadiq",
    "speaker",
    hashPassword("speaker123")
  );

  const file = {
    id: "Q-2026-0917",
    subject: "Doctor vacancies at Basic Health Units in NA-120 (Lahore)",
    memberName: "Ms. Farah Naz Isphahani (MNA, NA-120)",
    memberSample: "Sample MNA · not a real notice",
    minister: "Minister for National Health Services, Regulations & Coordination",
    starred: true,
    received: "1 September 2026",
    deadline: "6 September 2026",
    daysLeft: 2,
    daysTotal: 5,
    language: "English",
    sample: true,
    body: NOTICE,
    opinionPhrase: "in the Minister's view, whether the current allocation of doctors is adequate",
    desk: "section_officer",
    note: null,
    officerLine: "",
    decision: null,
    amendedText: "",
    decidedAt: null,
    dispatched: false,
  };
  db.prepare("INSERT INTO files (id, payload) VALUES (?, ?)").run(file.id, JSON.stringify(file));
}

seed();

const extraUsers = [
  ["js.admin@na.gov.pk", "Tariq Mehmood", "js", "js123"],
  ["specsec@na.gov.pk", "Farah Jameel", "special", "special123"],
  ["secgen@na.gov.pk", "Saeed Ahmad Maitla", "secgen", "secretary123"],
];
const insertExtra = db.prepare(
  "INSERT INTO users (email, name, role, password_hash) VALUES (?, ?, ?, ?)"
);
for (const [email, name, role, password] of extraUsers) {
  if (!findUser(email)) insertExtra.run(email, name, role, hashPassword(password));
}

export function findUser(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
}

export function verifyUser(email, password) {
  const user = findUser(email);
  if (!user || !checkPassword(password, user.password_hash)) return null;
  return { email: user.email, name: user.name, role: user.role };
}

export function createSession(email) {
  const token = randomBytes(24).toString("hex");
  db.prepare("INSERT INTO sessions (token, email, created_at) VALUES (?, ?, ?)").run(
    token,
    email,
    new Date().toISOString()
  );
  return token;
}

export function userForToken(token) {
  if (!token) return null;
  const row = db.prepare("SELECT email FROM sessions WHERE token = ?").get(token);
  if (!row) return null;
  const user = findUser(row.email);
  if (!user) return null;
  return { email: user.email, name: user.name, role: user.role };
}

export function deleteSession(token) {
  db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

export function listFiles() {
  return db
    .prepare("SELECT payload FROM files")
    .all()
    .map((row) => JSON.parse(row.payload));
}

export function getFile(id) {
  const row = db.prepare("SELECT payload FROM files WHERE id = ?").get(id);
  return row ? JSON.parse(row.payload) : null;
}

export function saveFile(file) {
  db.prepare("UPDATE files SET payload = ? WHERE id = ?").run(JSON.stringify(file), file.id);
}

export function insertFile(file) {
  db.prepare("INSERT INTO files (id, payload) VALUES (?, ?)").run(file.id, JSON.stringify(file));
}

function speakerFile(partial) {
  return {
    memberSample: "Sample paper, already seen by the secretariat",
    starred: false,
    language: "English",
    sample: true,
    daysLeft: 2,
    daysTotal: 5,
    opinionPhrase: "",
    amendedText: "",
    decidedAt: null,
    dispatched: false,
    followUp: null,
    decision: null,
    desk: "speaker",
    ...partial,
  };
}

export function ensureSpeakerFiles() {
  const files = [
    speakerFile({
      id: "Q-2026-0881",
      kind: "question",
      subject: "Vacant teaching posts in federal schools, NA-54",
      memberName: "Sample MNA, NA-54",
      minister: "Minister for Federal Education",
      starred: true,
      received: "20 September 2026",
      deadline: "25 September 2026",
      body: "Will the Minister for Federal Education state how many sanctioned teaching posts in federal schools in NA-54 are vacant, and for how many months each vacancy has lasted?",
      officerLine: "Submitted for the Hon. Speaker. The question asks for numbers only. Rule 78 is met. It may be admitted.",
      note: {
        source: "rules-and-archive",
        summary: "The member asks only for the number of vacant teaching posts in federal schools in NA-54, and how long each vacancy has lasted.",
        wordCount: 32,
        failedCount: 0,
        emptyRulings: false,
        clauses: [
          { id: "d", text: "It shall not ask for an opinion.", pass: true, verdict: "It asks for figures, not a view.", quoted: null },
          { id: "f", text: "It shall not ordinarily exceed 150 words.", pass: true, verdict: "32 words.", quoted: null },
        ],
        rulings: [
          { id: "NA-ROC-1999-2017-p0146-r0118", subject: "QUESTION", headnote: "A question seeking figures of vacancies in a federal institution was admitted.", pdfPage: 146, volume: "1999-2017", debateDate: "12-03-2012" },
        ],
      },
      minutes: [
        { name: "Saima Malik", text: "Examined. Fit to admit.", at: "21 Sep 2026" },
        { name: "Tariq Mehmood", text: "Seen. Note is complete.", at: "22 Sep 2026" },
        { name: "Farah Jameel", text: "Agreed.", at: "23 Sep 2026" },
        { name: "Saeed Ahmad Maitla", text: "Placed before the Speaker.", at: "24 Sep 2026" },
      ],
    }),
    speakerFile({
      id: "AM-2026-0441",
      kind: "adjournment",
      subject: "Overnight power cuts in Peshawar",
      memberName: "Sample MNA, Peshawar",
      minister: "Minister for Energy",
      received: "24 September 2026",
      deadline: "25 September 2026",
      daysTotal: 1,
      daysLeft: 1,
      body: "The member seeks leave to move adjournment of the House to discuss the overnight failure of electricity supply in Peshawar.",
      officerLine: "Submitted for refusal of consent. Supply in the city is a provincial matter. A question on the federal plants would be in order.",
      note: {
        source: "rules-and-archive",
        summary: "One city, one night, one issue. The member wants the day’s business paused.",
        wordCount: 24,
        failedCount: 1,
        emptyRulings: false,
        clauses: [
          { id: "111-b", text: "It must relate to one definite issue.", pass: true, verdict: "Power cuts in Peshawar on one night.", quoted: null },
          { id: "111-g", text: "It must be primarily the concern of the Federal Government.", pass: false, verdict: "City distribution is a provincial matter.", quoted: null },
        ],
        rulings: [
          { id: "NA-ROC-1999-2017-p0015-r0010", subject: "ADJOURNMENT MOTION", headnote: "Where the facts were disputed by the Minister, the adjournment motion was not allowed.", pdfPage: 15, volume: "1999-2017", debateDate: "08-06-2004" },
        ],
      },
      minutes: [
        { name: "Saima Malik", text: "Consent should be refused.", at: "24 Sep 2026" },
        { name: "Tariq Mehmood", text: "Seen.", at: "24 Sep 2026" },
        { name: "Farah Jameel", text: "Agreed. Not for adjournment.", at: "24 Sep 2026" },
        { name: "Saeed Ahmad Maitla", text: "Placed before the Speaker.", at: "25 Sep 2026" },
      ],
    }),
    speakerFile({
      id: "LTR-2026-019",
      kind: "letter",
      subject: "Request for a return visit by the Maldives Speaker",
      memberName: "Protocol Branch",
      minister: "As addressed on the letter",
      received: "23 September 2026",
      deadline: "30 September 2026",
      body: "Protocol submits three dates in November for a return visit by the Speaker of the People’s Majlis of Maldives, and asks which date may be offered.",
      officerLine: "Submitted for a direction. No rule of admissibility. Three dates are attached.",
      note: {
        source: "rules-and-archive",
        summary: "Protocol asks which of three November dates may be offered for the return visit.",
        wordCount: 28,
        failedCount: 0,
        emptyRulings: true,
        clauses: [
          { id: "letter", text: "A letter is put up for a direction.", pass: true, verdict: "The Speaker chooses a date, or refuses.", quoted: null },
        ],
        rulings: [],
      },
      minutes: [
        { name: "Protocol", text: "Three dates attached.", at: "23 Sep 2026" },
        { name: "Tariq Mehmood", text: "Seen.", at: "24 Sep 2026" },
        { name: "Farah Jameel", text: "Fit to go up.", at: "24 Sep 2026" },
        { name: "Saeed Ahmad Maitla", text: "Placed before the Speaker.", at: "25 Sep 2026" },
      ],
    }),
  ];
  for (const file of files) {
    if (!getFile(file.id)) insertFile(file);
  }
}

export function resetFiles() {
  db.prepare("DELETE FROM files").run();
  db.prepare("DELETE FROM users").run();
  db.prepare("DELETE FROM sessions").run();
  seed();
  ensureSpeakerFiles();
}

ensureSpeakerFiles();
