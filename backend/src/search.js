import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const rulingsDir = path.resolve(here, "../../rulings");

const STOP = new Set(
  "the a an of to for in on and or by with from at as is are was were be been being this that those these it its not no nor shall will would may can has have had into over under about whether which who whom what when where how many much".split(
    " "
  )
);

let records = null;

function load() {
  if (records) return records;
  records = [];
  for (const file of ["rulings-1999-2017.jsonl", "rulings-1947-1997.jsonl"]) {
    const full = path.join(rulingsDir, file);
    const lines = fs.readFileSync(full, "utf8").split(/\n/);
    for (const line of lines) {
      if (!line.trim()) continue;
      const row = JSON.parse(line);
      const modern = row.volume_id === "rulings-1999-2017";
      records.push({
        id: row.id,
        rulingNo: row.ruling_no,
        subject: row.subject || "",
        headnote: row.headnote || "",
        decision: (row.decision || "").slice(0, 500),
        fullText: row.full_text || "",
        citation: row.citation || {},
        pdfPage: row.source?.pdf_page_start ?? null,
        volume: modern ? "1999-2017" : "1947-1997",
        modern,
        tokens: tokenize(`${row.subject} ${row.headnote}`),
      });
    }
  }
  return records;
}

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

export function searchRulings(questionText, { limit = 5 } = {}) {
  const rows = load();
  const query = tokenize(questionText);
  const querySet = new Set(query);
  if (!querySet.size) return [];

  const scored = [];
  for (const row of rows) {
    let score = 0;
    const hay = `${row.subject} ${row.headnote}`.toLowerCase();
    for (const word of querySet) {
      if (row.tokens.includes(word)) score += hay.startsWith(word) ? 3 : 2;
      else if (row.fullText.toLowerCase().includes(word)) score += 0.25;
    }
    const privilege = /privilege/i.test(row.subject);
    const aboutQuestion = /\bquestions?\b|\bquestion hour\b/i.test(row.subject) && !privilege;
    if (row.modern && aboutQuestion) score += 12;
    else if (aboutQuestion) score += 4;
    else if (privilege && !/privilege/i.test(questionText)) score *= 0.15;
    else score *= 0.2;
    if (row.modern) score += 3;
    const blob = `${row.subject} ${row.headnote}`;
    if (/opinion|view|adequate|whether/i.test(questionText) && /opinion|view|admissib/i.test(blob)) score += 8;
    if (query.length > 80 && /word|length/i.test(blob)) score += 4;
    if (score >= 8) scored.push({ row, score });
  }
  const modernQuestions = scored.filter((item) => item.row.modern && /\bquestions?\b/i.test(item.row.subject) && !/privilege/i.test(item.row.subject));
  const others = scored.filter((item) => !modernQuestions.includes(item));
  modernQuestions.sort((a, b) => b.score - a.score);
  others.sort((a, b) => b.score - a.score || Number(b.row.modern) - Number(a.row.modern));
  const picked = [...modernQuestions, ...others].slice(0, limit);
  const books = {
    "1999-2017": "https://www.na.gov.pk/uploads/documents/Rulings-of-the-Chair-1999-2017.pdf",
    "1947-1997": "https://www.na.gov.pk/uploads/documents/Ruling-Web.pdf",
  };
  return picked.map(({ row }) => ({
    id: row.id,
    rulingNo: row.rulingNo,
    subject: row.subject,
    headnote: row.headnote.slice(0, 280),
    decision: row.decision,
    debateDate: row.citation.debate_date_raw || null,
    citation: row.citation.citation_raw || null,
    pdfPage: row.pdfPage,
    pdfUrl: books[row.volume] || null,
    volume: row.volume,
  }));
}
