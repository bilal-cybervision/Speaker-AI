const STORE = "speaker-office-demo-v4";

const USERS = [
  { email: "so.questions@na.gov.pk", password: "questions123", name: "Saima Malik", role: "officer" },
  { email: "speaker@na.gov.pk", password: "speaker123", name: "Sardar Ayaz Sadiq", role: "speaker" },
  { email: "js.admin@na.gov.pk", password: "js123", name: "Tariq Mehmood", role: "js" },
  { email: "specsec@na.gov.pk", password: "special123", name: "Farah Jameel", role: "special" },
  { email: "secgen@na.gov.pk", password: "secretary123", name: "Saeed Ahmad Maitla", role: "secgen" },
];

const RULES = [
  { id: "a", text: "It shall not bring in any name or statement not strictly necessary to make the question intelligible." },
  { id: "b", text: "If it contains a statement, the member shall make himself responsible for the accuracy of the statement." },
  { id: "c", text: "It shall not contain arguments, inferences, ironical expressions, imputations, epithets or defamatory statements." },
  { id: "d", text: "It shall not ask for an expression of opinion or the solution of an abstract legal question or a hypothetical proposition." },
  { id: "e", text: "It shall not refer to the character or conduct of any person except in his official or public capacity." },
  { id: "f", text: "It shall not ordinarily exceed one hundred and fifty words." },
  { id: "g", text: "It shall not relate to a matter which is not primarily the concern of the Government." },
  { id: "h", text: "It shall not make or imply a charge of a personal character." },
  { id: "i", text: "It shall not raise a question of policy too large to be dealt with within the limits of an answer to a question." },
  { id: "j", text: "It shall not repeat in substance a question already answered or disallowed during the last two sessions." },
  { id: "k", text: "It shall not be trivial, vexatious, vague or meaningless." },
  { id: "l", text: "It shall not ask for information contained in documents accessible to the public or in ordinary works of reference." },
  { id: "m", text: "It shall not ask for information on matters under the control of bodies not primarily responsible to the Government." },
  { id: "n", text: "It shall not contain references to newspapers by name or ask whether statements in the press are accurate." },
  { id: "o", text: "It shall not ask for information regarding Cabinet discussions or advice given to the President." },
  { id: "p", text: "It shall not ask for information on matters under consideration before a Committee of the Assembly, unless the proceedings have been placed before the Assembly." },
  { id: "q-i", text: "It shall not contain any reflection on the conduct of the President or a Judge of the Supreme Court or of a High Court." },
  { id: "q-ii", text: "It shall not ask for information on matters already discussed by an adjournment motion during the same session." },
  { id: "q-iii", text: "It shall not contain any criticism of a decision of the Assembly or the Senate." },
  { id: "q-iv", text: "It shall not seek information about matters which are secret or sensitive." },
  { id: "q-v", text: "It shall not criticise or refer discourteously to a foreign country." },
  { id: "r", text: "It shall not reflect on a decision of a court or prejudice a matter which is sub judice." },
  { id: "s", text: "It shall not amount in substance to a suggestion for a particular course of action." },
  { id: "t", text: "It shall not ordinarily ask for information on matters of past history." },
  { id: "u", text: "It shall not ordinarily ask about matters pending before a tribunal, commission or court of inquiry." },
  { id: "v", text: "It shall not relate to correspondence between the Federal Government and a Provincial Government, except as to a matter of fact." },
];

const NOTICE = `Will the Health Minister be pleased to state the total number of Basic Health Units (BHUs) currently functioning in constituency NA-120 (Lahore), the number among them presently without a posted Medical Officer, and the average duration each such vacancy has remained unfilled during the past twelve months, together with a district-wise breakdown of sanctioned posts, filled posts and vacant posts of Medical Officers, Lady Health Visitors and Dispensers, indicating for each BHU the last date a doctor was physically present at the facility, the reason recorded on file for the vacancy, and the steps being taken by the Ministry to recruit and retain qualified doctors in the aforementioned rural union councils; and further, in the Minister's view, whether the current allocation of doctors is adequate for the population served, and if not, what corrective measures have been proposed, including any additional recruitment already approved for the rural union councils of this constituency during the present financial year?`;

const NEXT = { js: "special", special: "secgen", secgen: "speaker" };

const DIRECTIONS_STORE = "speaker-office-directions-v1";

let session = null;
let files = loadFiles();
let directions = loadDirections();

function dayOffset(days) {
  const date = new Date();
  date.setHours(17, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function seedDirections() {
  return [
    {
      id: "D-2026-0412",
      text: "Report why Secretaries of the Ministries were absent from the official gallery during Question Hour.",
      owner: "Parliamentary Affairs Division",
      due: dayOffset(-3),
      status: "open",
      source: "Chair, sitting of 22 September",
      createdAt: dayOffset(-8),
      reminders: 1,
    },
    {
      id: "D-2026-0415",
      text: "Share the revised seating plan for the joint sitting with both Whips.",
      owner: "Legislation Branch",
      due: dayOffset(1),
      status: "open",
      source: "Meeting with Chief Whip, 25 September",
      createdAt: dayOffset(-3),
      reminders: 0,
    },
    {
      id: "D-2026-0409",
      text: "Arrange a briefing on the Maldives delegation before the courtesy call.",
      owner: "Protocol Branch",
      due: dayOffset(-5),
      status: "done",
      source: "File LTR-2026-011",
      createdAt: dayOffset(-12),
      reminders: 0,
      evidence: "Briefing held 23 September. Note placed on file.",
    },
  ];
}

function loadDirections() {
  try {
    const saved = sessionStorage.getItem(DIRECTIONS_STORE);
    if (saved) return JSON.parse(saved);
  } catch {
    /* a fresh sample set is enough */
  }
  return seedDirections();
}

function saveDirections() {
  try {
    sessionStorage.setItem(DIRECTIONS_STORE, JSON.stringify(directions));
  } catch {
    /* the sample set still lives in this tab */
  }
}

function loadFiles() {
  try {
    const saved = sessionStorage.getItem(STORE);
    if (saved) return JSON.parse(saved);
  } catch {
    /* a fresh sample set is enough */
  }
  return seedFiles();
}

function saveFiles() {
  try {
    const plain = files.map(({ pdfUrl, ...file }) => file);
    sessionStorage.setItem(STORE, JSON.stringify(plain));
  } catch {
    /* the sample set still lives in this tab */
  }
}

function seedFiles() {
  return [
    {
      id: "Q-2026-0917",
      kind: "question",
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
      plainAsk: "How many Basic Health Units in NA-120 have no Medical Officer, how long each post has been vacant, and what the Ministry is doing to fill them. It also asks the Minister whether the present allocation of doctors is adequate.",
      opinionPhrase: "in the Minister's view, whether the current allocation of doctors is adequate",
      desk: "section_officer",
      note: null,
      officerLine: "",
      decision: null,
      amendedText: "",
      decidedAt: null,
      dispatched: false,
      followUp: null,
    },
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
      recommend: "allow",
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
      recommend: "reject",
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
      recommend: "amend",
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
    speakerFile({
      id: "NA-2024-LEG-091",
      kind: "letter",
      subject: "Notification of the Special Parliamentary Committee under Article 175A",
      memberName: "Ministry of Law and Justice",
      minister: "As addressed on the letter",
      received: "21 October 2024",
      deadline: "25 October 2024",
      body: "The Constitution (Twenty-sixth Amendment) Act, 2024 received assent on 21 October 2024. This letter asks for the Speaker's order notifying the Special Parliamentary Committee under Article 175A.",
      officerLine: "Submitted for the Speaker's order on the notification. The Act is already law.",
      recommend: "allow",
      note: {
        source: "rules-and-archive",
        summary: "Post-assent notification of the Special Parliamentary Committee. Not a request to introduce the Bill again.",
        wordCount: 40,
        failedCount: 0,
        emptyRulings: true,
        clauses: [
          { id: "letter", text: "A letter is put up for a direction.", pass: true, verdict: "The Speaker signs the notification.", quoted: null },
        ],
        rulings: [],
        officerLine: "Submitted for the Speaker's order on the notification. The Act is already law.",
      },
      minutes: [
        { name: "Saima Malik", text: "Act assented 21 October 2024. Put up for notification.", at: "22 Oct 2024" },
        { name: "Tariq Mehmood", text: "Seen. Complete.", at: "22 Oct 2024" },
        { name: "Farah Jameel", text: "Agreed.", at: "23 Oct 2024" },
        { name: "Saeed Ahmad Maitla", text: "Placed before the Speaker.", at: "24 Oct 2024" },
      ],
    }),
    {
      id: "NA-24-DEF-012",
      kind: "letter",
      subject: "Urgent medical treatment grant for secretariat staff",
      memberName: "Administration Wing",
      memberSample: "Sample paper",
      minister: "As addressed on the letter",
      starred: false,
      received: "23 October 2024",
      deadline: "28 October 2024",
      daysLeft: 4,
      daysTotal: 5,
      language: "English",
      sample: true,
      body: "Administration Wing asks for remote clearance of a medical grant while the Speaker is away from Parliament House.",
      opinionPhrase: "",
      desk: "js",
      note: {
        source: "rules-and-archive",
        summary: "A grant letter for remote clearance. It walks the same desks as any other file.",
        wordCount: 22,
        failedCount: 0,
        emptyRulings: true,
        clauses: [
          { id: "letter", text: "A letter is put up for a direction.", pass: true, verdict: "Clearance is the Speaker's order.", quoted: null },
        ],
        rulings: [],
        officerLine: "Sent up for remote clearance.",
      },
      officerLine: "Sent up for remote clearance.",
      decision: null,
      amendedText: "",
      decidedAt: null,
      dispatched: false,
      followUp: null,
      minutes: [
        { name: "Saima Malik", text: "Put up for clearance.", at: "23 Oct 2024" },
      ],
    },
  ];
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
    note: null,
    officerLine: "",
    ...partial,
  };
}

function wordCount(text) {
  return (text || "").trim().split(/\s+/).filter(Boolean).length;
}

function timeline(file) {
  const order = ["section_officer", "js", "special", "secgen", "speaker", "section_officer_return", "done"];
  const at = Math.max(0, order.indexOf(file.desk));
  const decided = Boolean(file.decision);
  const step = (label, who, index) => ({
    desk: label,
    who,
    ts: at === index ? "On this desk" : at > index ? "Forwarded" : "Waiting",
    status: at === index ? "current" : at > index ? "done" : "pending",
  });
  return [
    { desk: "Notice Office", who: "Received and registered", ts: "Registered", status: "done" },
    step("Section Officer", "Questions Branch · Saima Malik", 0),
    step("Joint Secretary", "Tariq Mehmood", 1),
    step("Special Secretary", "Farah Jameel", 2),
    step("Secretary", "Saeed Ahmad Maitla", 3),
    {
      desk: "Hon. Speaker",
      who: "Sardar Ayaz Sadiq",
      ts: file.desk === "speaker" ? "Awaiting decision" : decided ? "Decided" : "Waiting",
      status: file.desk === "speaker" ? "current" : decided ? "done" : "pending",
    },
    {
      desk: "Section Officer",
      who: "Carry out the decision",
      ts: file.dispatched ? "Dispatched" : file.desk === "section_officer_return" ? "Ready to act" : "Waiting",
      status: file.desk === "section_officer_return" ? "current" : file.dispatched ? "done" : "pending",
    },
  ];
}

function publicFile(file) {
  const { pdfPath, ...rest } = file;
  return { ...rest, hasPdf: Boolean(file.pdfUrl || pdfPath || file.pdfName), timeline: timeline(file) };
}

function visible(file, user) {
  if (user.role === "officer") return true;
  if (user.role === "speaker") return file.desk === "speaker" || Boolean(file.decision);
  return file.desk === user.role;
}

function requireUser() {
  if (!session) {
    const error = new Error("Sign in required.");
    error.status = 401;
    throw error;
  }
  return session;
}

function findFile(id) {
  return files.find((file) => file.id === id) || null;
}

function healthNote(file) {
  const words = wordCount(file.body);
  const opinion = /minister'?s view|in your view|whether the current allocation of doctors is adequate/i.test(file.body || "");
  const clauses = RULES.map((clause) => {
    if (clause.id === "d" && opinion) {
      return { ...clause, pass: false, verdict: "Fails. The notice asks the Minister for an opinion.", quoted: file.opinionPhrase };
    }
    if (clause.id === "f" && words > 150) {
      return { ...clause, pass: false, verdict: `Fails. The notice runs to ${words} words. The ordinary limit is 150.`, quoted: null };
    }
    return { ...clause, pass: true, verdict: "No breach identified on the face of this notice.", quoted: null };
  });
  const failed = clauses.filter((clause) => !clause.pass);
  return {
    source: "rules-and-archive",
    summary: file.plainAsk || (file.body || "").replace(/\s+/g, " ").trim().slice(0, 420) || "The attached PDF has no readable text. A scan has to be read before a note can be written.",
    wordCount: words,
    clauses,
    failedCount: failed.length,
    rulings: [
      {
        id: "NA-ROC-1999-2017-p0015-r0010",
        subject: "ADJOURNMENT MOTION",
        headnote: "Where the facts were disputed by the Minister, the adjournment motion was not allowed.",
        pdfPage: 15,
        volume: "1999-2017",
        debateDate: "08-06-2004",
      },
    ],
    emptyRulings: false,
    officerLine: failed.length
      ? `Submitted for the Hon. Speaker's kind decision. ${failed.map((clause) => clause.id).join(", ")} need his attention.`
      : "Submitted for the Hon. Speaker's kind decision.",
  };
}

function noteFor(file) {
  if ((file.kind || "question") === "question") return healthNote(file);
  if (file.kind === "adjournment") {
    return {
      source: "rules-and-archive",
      summary: (file.body || "").replace(/\s+/g, " ").trim().slice(0, 420),
      wordCount: wordCount(file.body),
      failedCount: 1,
      emptyRulings: false,
      clauses: [
        { id: "111-b", text: "It must relate to one definite issue.", pass: true, verdict: "The notice states a matter.", quoted: null },
        { id: "111-g", text: "It must be primarily the concern of the Federal Government.", pass: false, verdict: "City distribution is a provincial matter.", quoted: null },
      ],
      rulings: [
        { id: "NA-ROC-1999-2017-p0015-r0010", subject: "ADJOURNMENT MOTION", headnote: "Where the facts were disputed by the Minister, the adjournment motion was not allowed.", pdfPage: 15, volume: "1999-2017", debateDate: "08-06-2004" },
      ],
      officerLine: "Submitted for refusal of consent.",
    };
  }
  if (file.kind === "privilege") {
    return {
      source: "rules-and-archive",
      summary: (file.body || "").replace(/\s+/g, " ").trim().slice(0, 420) || "The attached PDF has no readable text.",
      wordCount: wordCount(file.body),
      failedCount: 0,
      emptyRulings: true,
      clauses: [
        { id: "95", text: "A privilege notice must state the breach of privilege.", pass: /privilege/i.test(file.body || ""), verdict: "Read against the notice as attached.", quoted: null },
      ],
      rulings: [],
      officerLine: "Submitted for the Hon. Speaker's kind decision.",
    };
  }
  return {
    source: "rules-and-archive",
    summary: (file.body || "").replace(/\s+/g, " ").trim().slice(0, 420) || "The letter is attached for a direction.",
    wordCount: wordCount(file.body),
    failedCount: 0,
    emptyRulings: true,
    clauses: [
      { id: "letter", text: "A letter is put up for a direction.", pass: true, verdict: "The Speaker records what is to be done with this letter.", quoted: null },
    ],
    rulings: [],
    officerLine: "Submitted for the Hon. Speaker's direction on this letter.",
  };
}

function fail(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  throw error;
}

export function demoRequest(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};
  const url = new URL(path, "http://demo.local");
  const parts = url.pathname.split("/").filter(Boolean);

  if (method === "POST" && url.pathname === "/api/login") {
    const user = USERS.find((item) => item.email === String(body.email || "") && item.password === String(body.password || ""));
    if (!user) fail("Email or password is wrong.", 401);
    session = { email: user.email, name: user.name, role: user.role };
    return { user: session };
  }

  if (method === "POST" && url.pathname === "/api/logout") {
    session = null;
    return { ok: true };
  }

  if (method === "POST" && url.pathname === "/api/reset") {
    session = null;
    files = seedFiles();
    directions = seedDirections();
    saveFiles();
    saveDirections();
    return { ok: true };
  }

  const user = requireUser();

  if (method === "GET" && url.pathname === "/api/files") {
    return { files: files.filter((file) => visible(file, user)).map(publicFile) };
  }

  if (method === "POST" && url.pathname === "/api/files") {
    if (user.role !== "officer") fail("Only the section officer can register a file.", 403);
    const kind = ["question", "adjournment", "privilege", "letter"].includes(body.kind) ? body.kind : "question";
    const text = String(body.body || "").trim();
    if (!text) fail("Paste the text of the notice.");
    const received = new Date();
    const prefix = { question: "Q", adjournment: "AM", privilege: "PRV", letter: "LTR" }[kind];
    const serial = String(900 + files.length + Math.floor(Math.random() * 90)).padStart(4, "0");
    const days = kind === "question" ? 5 : kind === "letter" ? 7 : 1;
    const due = new Date(received);
    due.setDate(due.getDate() + days);
    const format = (date) => date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const file = {
      id: `${prefix}-${received.getFullYear()}-${serial}`,
      kind,
      subject: String(body.subject || "").trim() || text.split(/\s+/).slice(0, 10).join(" "),
      memberName: String(body.memberName || "").trim() || "Sample member",
      memberSample: "Registered in this demo",
      minister: String(body.minister || "").trim() || "the Minister concerned",
      starred: kind === "question",
      received: format(received),
      deadline: format(due),
      daysLeft: days,
      daysTotal: days,
      language: "English",
      sample: true,
      body: text,
      opinionPhrase: (text.match(/in the Minister'?s view[^,;?]*/i) || [""])[0],
      desk: "section_officer",
      note: null,
      officerLine: "",
      decision: null,
      amendedText: "",
      decidedAt: null,
      dispatched: false,
      followUp: null,
      minutes: [],
    };
    files.unshift(file);
    saveFiles();
    return { file: publicFile(file) };
  }

  if (method === "GET" && url.pathname === "/api/directions") {
    return { directions };
  }

  if (method === "POST" && url.pathname === "/api/directions") {
    const text = String(body.text || "").trim();
    if (!text) fail("A direction needs its text.");
    const direction = {
      id: `D-2026-${String(420 + directions.length).padStart(4, "0")}`,
      text,
      owner: String(body.owner || "").trim() || "Speaker's Office",
      due: dayOffset(Number(body.days) || 7),
      status: "open",
      source: String(body.source || "Speaker's Office"),
      createdAt: new Date().toISOString(),
      reminders: 0,
    };
    directions.unshift(direction);
    saveDirections();
    return { direction };
  }

  if (parts[0] === "api" && parts[1] === "directions" && parts[2]) {
    const direction = directions.find((item) => item.id === parts[2]);
    if (!direction) fail("Direction not found.", 404);
    if (method === "POST" && parts[3] === "remind") {
      direction.reminders = (direction.reminders || 0) + 1;
      direction.lastReminded = new Date().toISOString();
      saveDirections();
      return { direction };
    }
    if (method === "POST" && parts[3] === "done") {
      if (user.role === "speaker") fail("The office closes a direction with evidence.", 403);
      direction.status = "done";
      direction.evidence = String(body.evidence || "").trim() || "Action reported complete.";
      direction.closedAt = new Date().toISOString();
      saveDirections();
      return { direction };
    }
    if (method === "POST" && parts[3] === "reopen") {
      if (user.role !== "speaker") fail("Only the Speaker reopens a direction.", 403);
      direction.status = "open";
      direction.due = dayOffset(3);
      saveDirections();
      return { direction };
    }
  }

  if (parts[0] === "api" && parts[1] === "files" && parts[2]) {
    const file = findFile(parts[2]);
    const action = parts[3];
    if (!file || !visible(file, user)) fail("File not on this desk.", 404);

    if (method === "GET" && !action) return { file: publicFile(file) };

    if (method === "POST" && action === "note") {
      if (user.role !== "officer") fail("Only the section officer prepares the note.", 403);
      if (file.desk !== "section_officer") fail("File is not on this desk.", 409);
      file.note = noteFor(file);
      if (!file.officerLine) file.officerLine = file.note.officerLine;
      if (!file.recommend) {
        const failed = file.note.clauses.some((clause) => !clause.pass);
        file.recommend = file.kind === "letter" ? "allow" : !failed ? "allow" : file.kind === "question" ? "amend" : "reject";
      }
      saveFiles();
      return { file: publicFile(file) };
    }

    if (method === "POST" && action === "line") {
      if (user.role !== "officer") fail("Only the section officer edits the line.", 403);
      file.officerLine = String(body.officerLine || "");
      if (["allow", "reject", "amend"].includes(body.recommend)) file.recommend = body.recommend;
      saveFiles();
      return { file: publicFile(file) };
    }

    if (method === "POST" && action === "send") {
      if (user.role !== "officer") fail("Only the section officer can send the file up.", 403);
      if (file.desk !== "section_officer") fail("File is not on this desk.", 409);
      if (!file.note) fail("Prepare the note before sending the file.", 409);
      file.desk = "js";
      file.sentAt = new Date().toISOString();
      file.minutes = file.minutes || [];
      saveFiles();
      return { file: publicFile(file) };
    }

    if (method === "POST" && action === "forward") {
      if (file.desk !== user.role) fail("This file is not on your desk.", 409);
      const next = NEXT[user.role];
      if (!next) fail("You do not forward this file.", 403);
      file.minutes = file.minutes || [];
      file.minutes.push({
        role: user.role,
        name: user.name,
        text: String(body.minute || "Seen. Forwarded.").trim(),
        at: new Date().toISOString(),
      });
      file.desk = next;
      saveFiles();
      return { file: publicFile(file) };
    }

    if (method === "POST" && action === "decide") {
      if (user.role !== "speaker") fail("Only the Speaker decides.", 403);
      if (file.desk !== "speaker") fail("File is not on the Speaker's desk.", 409);
      if (!["allow", "reject", "amend"].includes(body.decision)) fail("Decision must be allow, reject, or amend.");
      if (body.decision === "amend" && !String(body.wording || "").trim()) fail("Write the amended wording.");
      file.decision = body.decision;
      file.amendedText = String(body.wording || "");
      file.speakerRemark = String(body.remark || "").trim();
      file.decidedAt = new Date().toISOString();
      const instruction = String(body.instruction || "").trim();
      if (instruction) {
        directions.unshift({
          id: `D-2026-${String(420 + directions.length).padStart(4, "0")}`,
          text: instruction,
          owner: file.kind === "letter" ? file.memberName : "Questions Branch",
          due: dayOffset(7),
          status: "open",
          source: `File ${file.id}`,
          createdAt: new Date().toISOString(),
          reminders: 0,
        });
        saveDirections();
      }
      file.desk = "section_officer_return";
      const office = file.kind === "letter" ? "Section Officer" : "Questions Branch";
      file.followUp = body.decision === "reject"
        ? { who: office, action: file.kind === "letter" ? "Return the letter for a fuller note" : `Tell ${file.memberName} the paper will not go forward`, due: file.deadline }
        : body.decision === "amend"
          ? { who: office, action: file.kind === "letter" ? "Carry out the Speaker's direction" : "Send the amended text to the Minister", due: file.deadline }
          : { who: office, action: file.kind === "letter" ? "Dispatch the approved letter" : `Send the admitted paper to ${file.minister}`, due: file.deadline };
      saveFiles();
      return { file: publicFile(file) };
    }

    if (method === "POST" && action === "carry-out") {
      if (user.role !== "officer") fail("Only the section officer carries out the decision.", 403);
      if (file.desk !== "section_officer_return") fail("Nothing to carry out.", 409);
      file.dispatched = true;
      file.desk = "done";
      saveFiles();
      return { file: publicFile(file) };
    }
  }

  fail("Request failed.", 404);
}

export function deskCounts() {
  const counts = {};
  for (const file of files) counts[file.desk] = (counts[file.desk] || 0) + 1;
  return {
    officer: (counts.section_officer || 0) + (counts.section_officer_return || 0),
    js: counts.js || 0,
    special: counts.special || 0,
    secgen: counts.secgen || 0,
    speaker: counts.speaker || 0,
  };
}

export function demoUpload(form) {
  const user = requireUser();
  if (user.role !== "officer") fail("Only the section officer can register a file.", 403);
  const upload = form.get("pdf");
  if (!upload || typeof upload === "string") fail("Attach a PDF.");
  const kind = ["question", "adjournment", "privilege", "letter"].includes(form.get("kind")) ? form.get("kind") : "letter";
  const received = new Date();
  const prefix = { question: "Q", adjournment: "AM", privilege: "PRV", letter: "LTR" }[kind];
  const id = `${prefix}-2026-${String(received.getHours()).padStart(2, "0")}${String(received.getMinutes()).padStart(2, "0")}${String(received.getSeconds()).padStart(2, "0")}`;
  const file = {
    id,
    kind,
    subject: String(form.get("subject") || upload.name || "Attached paper").replace(/\.pdf$/i, "").trim(),
    memberName: "As on the attached paper",
    memberSample: "Received with an attached PDF",
    minister: kind === "letter" ? "As addressed on the letter" : "the Minister concerned",
    starred: kind === "question",
    received: received.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    deadline: received.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    daysLeft: kind === "question" ? 5 : 1,
    daysTotal: kind === "question" ? 5 : 1,
    language: "As in the PDF",
    sample: true,
    body: "",
    opinionPhrase: "",
    pdfName: upload.name || `${id}.pdf`,
    pdfUrl: URL.createObjectURL(upload),
    desk: "section_officer",
    note: null,
    officerLine: "",
    decision: null,
    amendedText: "",
    decidedAt: null,
    dispatched: false,
    followUp: null,
  };
  files.unshift(file);
  saveFiles();
  return { file: publicFile(file) };
}
