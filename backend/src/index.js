import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { serve } from "@hono/node-server";
import {
  verifyUser,
  createSession,
  userForToken,
  deleteSession,
  listFiles,
  getFile,
  saveFile,
  insertFile,
  resetFiles,
} from "./db.js";
import { prepareNote } from "./note.js";
import { textFromPdf } from "./pdftext.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(here, "../.env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const i = trimmed.indexOf("=");
    const key = trimmed.slice(0, i).trim();
    const value = trimmed.slice(i + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

const app = new Hono();

function currentUser(c) {
  return userForToken(getCookie(c, "session"));
}

function requireUser(c) {
  const user = currentUser(c);
  if (!user) return null;
  return user;
}

function visible(file, user) {
  if (user.role === "officer") return true;
  if (user.role === "speaker") return file.desk === "speaker" || Boolean(file.decision);
  return file.desk === user.role;
}

function publicFile(file) {
  const { pdfPath, ...rest } = file;
  return {
    ...rest,
    hasPdf: Boolean(pdfPath),
    timeline: timeline(file),
  };
}

function timeline(file) {
  const order = ["section_officer", "js", "special", "secgen", "speaker", "section_officer_return", "done"];
  const at = Math.max(0, order.indexOf(file.desk));
  const decided = Boolean(file.decision);
  const step = (desk, label, who, index) => ({
    desk: label,
    who,
    ts: at === index ? "On this desk" : at > index ? "Forwarded" : "Waiting",
    status: at === index ? "current" : at > index ? "done" : "pending",
  });
  return [
    { desk: "Notice Office", who: "Received and registered", ts: "Registered", status: "done" },
    step("section_officer", "Section Officer", "Questions Branch · Saima Malik", 0),
    step("js", "Joint Secretary", "Tariq Mehmood", 1),
    step("special", "Special Secretary", "Farah Jameel", 2),
    step("secgen", "Secretary", "Saeed Ahmad Maitla", 3),
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

app.post("/api/login", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const user = verifyUser(String(body.email || ""), String(body.password || ""));
  if (!user) return c.json({ error: "Email or password is wrong." }, 401);
  const token = createSession(user.email);
  setCookie(c, "session", token, { httpOnly: true, path: "/", sameSite: "Lax" });
  return c.json({ user });
});

app.post("/api/logout", (c) => {
  const token = getCookie(c, "session");
  if (token) deleteSession(token);
  deleteCookie(c, "session", { path: "/" });
  return c.json({ ok: true });
});

app.get("/api/me", (c) => {
  const user = requireUser(c);
  if (!user) return c.json({ user: null }, 401);
  return c.json({ user });
});

app.get("/api/files", (c) => {
  const user = requireUser(c);
  if (!user) return c.json({ error: "Sign in required." }, 401);
  const files = listFiles().filter((file) => visible(file, user)).map(publicFile);
  return c.json({ files });
});

app.post("/api/files", async (c) => {
  const user = requireUser(c);
  if (!user || user.role !== "officer") return c.json({ error: "Only the section officer can register a file." }, 403);
  const form = await c.req.parseBody();
  const upload = form.pdf;
  if (!upload || typeof upload === "string" || !upload.arrayBuffer) {
    return c.json({ error: "Attach a PDF." }, 400);
  }
  const kind = ["question", "adjournment", "privilege", "letter"].includes(form.kind) ? form.kind : "letter";
  const bytes = Buffer.from(await upload.arrayBuffer());
  let text = "";
  try {
    text = await textFromPdf(bytes);
  } catch {
    text = "";
  }
  const received = new Date();
  const deadline = new Date(received);
  deadline.setDate(deadline.getDate() + (kind === "question" ? 5 : 1));
  const opinion = text.match(/in the minister'?s view[^.]{0,120}/i);
  const prefix = { question: "Q", adjournment: "AM", privilege: "PRV", letter: "LTR" }[kind];
  const id = `${prefix}-2026-${String(received.getHours()).padStart(2, "0")}${String(received.getMinutes()).padStart(2, "0")}${String(received.getSeconds()).padStart(2, "0")}`;
  const uploads = path.resolve(here, "../data/uploads");
  fs.mkdirSync(uploads, { recursive: true });
  const pdfPath = path.join(uploads, `${id}.pdf`);
  fs.writeFileSync(pdfPath, bytes);
  const file = {
    id,
    kind,
    subject: String(form.subject || upload.name || "Attached paper").replace(/\.pdf$/i, "").trim(),
    memberName: String(form.from || "As on the attached paper").trim(),
    memberSample: "Received with an attached PDF",
    minister: kind === "letter" ? "As addressed on the letter" : "the Minister concerned",
    starred: kind === "question",
    received: received.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    deadline: deadline.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    daysLeft: kind === "question" ? 5 : 1,
    daysTotal: kind === "question" ? 5 : 1,
    language: "As in the PDF",
    sample: true,
    body: text,
    opinionPhrase: opinion ? opinion[0] : "",
    pdfName: upload.name || `${id}.pdf`,
    pdfPath,
    desk: "section_officer",
    note: null,
    officerLine: "",
    decision: null,
    amendedText: "",
    decidedAt: null,
    dispatched: false,
    followUp: null,
  };
  insertFile(file);
  return c.json({ file: publicFile({ ...file, pdfPath: undefined }) }, 201);
});

app.get("/api/files/:id/pdf", (c) => {
  const user = requireUser(c);
  if (!user) return c.json({ error: "Sign in required." }, 401);
  const file = getFile(c.req.param("id"));
  if (!file?.pdfPath || !fs.existsSync(file.pdfPath)) return c.json({ error: "No PDF on this file." }, 404);
  const bytes = fs.readFileSync(file.pdfPath);
  return c.body(bytes, 200, { "content-type": "application/pdf" });
});

app.get("/api/files/:id", (c) => {
  const user = requireUser(c);
  if (!user) return c.json({ error: "Sign in required." }, 401);
  const file = getFile(c.req.param("id"));
  if (!file || !visible(file, user)) return c.json({ error: "File not on this desk." }, 404);
  return c.json({ file: publicFile(file) });
});

app.post("/api/files/:id/note", async (c) => {
  const user = requireUser(c);
  if (!user || user.role !== "officer") return c.json({ error: "Only the section officer prepares the note." }, 403);
  const file = getFile(c.req.param("id"));
  if (!file || file.desk !== "section_officer") return c.json({ error: "File is not on this desk." }, 409);
  file.note = await prepareNote(file);
  if (!file.officerLine) file.officerLine = file.note.officerLine;
  saveFile(file);
  return c.json({ file: publicFile(file) });
});

app.post("/api/files/:id/line", async (c) => {
  const user = requireUser(c);
  if (!user || user.role !== "officer") return c.json({ error: "Only the section officer edits the line." }, 403);
  const file = getFile(c.req.param("id"));
  if (!file) return c.json({ error: "File not found." }, 404);
  const body = await c.req.json().catch(() => ({}));
  file.officerLine = String(body.officerLine || "");
  saveFile(file);
  return c.json({ file: publicFile(file) });
});

app.post("/api/files/:id/send", (c) => {
  const user = requireUser(c);
  if (!user || user.role !== "officer") return c.json({ error: "Only the section officer can send the file up." }, 403);
  const file = getFile(c.req.param("id"));
  if (!file || file.desk !== "section_officer") return c.json({ error: "File is not on this desk." }, 409);
  if (!file.note) return c.json({ error: "Prepare the note before sending the file." }, 409);
  file.desk = "js";
  file.sentAt = new Date().toISOString();
  file.minutes = file.minutes || [];
  saveFile(file);
  return c.json({ file: publicFile(file) });
});

const NEXT = { js: "special", special: "secgen", secgen: "speaker" };

app.post("/api/files/:id/forward", async (c) => {
  const user = requireUser(c);
  const file = getFile(c.req.param("id"));
  if (!user || !file) return c.json({ error: "File not found." }, 404);
  if (file.desk !== user.role) return c.json({ error: "This file is not on your desk." }, 409);
  const next = NEXT[user.role];
  if (!next) return c.json({ error: "You do not forward this file." }, 403);
  const body = await c.req.json().catch(() => ({}));
  file.minutes = file.minutes || [];
  file.minutes.push({
    role: user.role,
    name: user.name,
    text: String(body.minute || "Seen. Forwarded.").trim(),
    at: new Date().toISOString(),
  });
  file.desk = next;
  saveFile(file);
  return c.json({ file: publicFile(file) });
});

app.post("/api/files/:id/decide", async (c) => {
  const user = requireUser(c);
  if (!user || user.role !== "speaker") return c.json({ error: "Only the Speaker decides." }, 403);
  const file = getFile(c.req.param("id"));
  if (!file || file.desk !== "speaker") return c.json({ error: "File is not on the Speaker's desk." }, 409);
  const body = await c.req.json().catch(() => ({}));
  const decision = body.decision;
  if (!["allow", "reject", "amend"].includes(decision)) {
    return c.json({ error: "Decision must be allow, reject, or amend." }, 400);
  }
  if (decision === "amend" && !String(body.wording || "").trim()) {
    return c.json({ error: "Write the amended wording." }, 400);
  }
  file.decision = decision;
  file.amendedText = String(body.wording || "");
  file.decidedAt = new Date().toISOString();
  file.desk = "section_officer_return";
  const office = file.kind === "letter" ? "Section Officer" : "Questions Branch";
  file.followUp = decision === "reject"
    ? { who: office, action: file.kind === "letter" ? "Return the letter for a fuller note" : `Tell ${file.memberName} the paper will not go forward`, due: file.deadline }
    : decision === "amend"
      ? { who: office, action: file.kind === "letter" ? "Carry out the Speaker's direction" : "Send the amended text to the Minister", due: file.deadline }
      : { who: office, action: file.kind === "letter" ? "Dispatch the approved letter" : `Send the admitted paper to ${file.minister}`, due: file.deadline };
  saveFile(file);
  return c.json({ file: publicFile(file) });
});

app.post("/api/files/:id/carry-out", (c) => {
  const user = requireUser(c);
  if (!user || user.role !== "officer") return c.json({ error: "Only the section officer carries out the decision." }, 403);
  const file = getFile(c.req.param("id"));
  if (!file || file.desk !== "section_officer_return") return c.json({ error: "Nothing to carry out." }, 409);
  file.dispatched = true;
  file.desk = "done";
  saveFile(file);
  return c.json({ file: publicFile(file) });
});

app.post("/api/reset", (c) => {
  resetFiles();
  deleteCookie(c, "session", { path: "/" });
  return c.json({ ok: true });
});

const port = Number(process.env.PORT || 8787);
serve({ fetch: app.fetch, port }, () => {
  console.log(`backend http://localhost:${port}`);
});
