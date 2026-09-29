import cleanRaw from "../data/rulings-1999-2017.jsonl?raw";
import scanRaw from "../data/rulings-1947-1997.jsonl?raw";

const STOP = new Set("that this with from have been were will shall does into over than them they their there about after before under where which while would could should being only also such each both same very just more most some any not and the for are was you your".split(" "));

function parseBook(raw) {
  return raw.trim().split(/\n/).filter(Boolean).map((line) => JSON.parse(line));
}

const records = [...parseBook(cleanRaw), ...parseBook(scanRaw)];

export const RULING_BOOKS = {
  total: records.length,
  clean: records.filter((record) => record.volume_id === "rulings-1999-2017").length,
  scan: records.filter((record) => record.volume_id === "rulings-1947-1997").length,
};

function words(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !STOP.has(word));
}

function isScan(record) {
  return record.volume_id === "rulings-1947-1997";
}

function present(record, relevance) {
  const scan = isScan(record);
  const quote = scan
    ? String(record.full_text || record.headnote || "").replace(/\s+/g, " ").trim().slice(0, 700)
    : (record.headnote || record.decision || "");
  return {
    id: record.id,
    subject: record.subject,
    headnote: quote,
    decision: scan ? "" : (record.decision || ""),
    pdfPage: record.source?.pdf_page_start,
    pdfUrl: scan ? "/rulings/rulings-1947-1997.pdf" : "/rulings/rulings-1999-2017.pdf",
    volume: scan ? "1947–1997" : "1999–2017",
    scan,
    debateDate: record.citation?.debate_date_raw || "",
    citation: record.citation?.citation_raw || "",
    relevance,
  };
}

function kindBoost(kind, subject) {
  const label = String(subject || "").toUpperCase();
  if (kind === "question" && /QUESTION/.test(label)) return 8;
  if (kind === "adjournment" && /ADJOURNMENT/.test(label)) return 8;
  if (kind === "privilege" && /PRIVILEGE/.test(label)) return 8;
  return 0;
}

function byRank(a, b) {
  return b.score - a.score || Number(isScan(a.record)) - Number(isScan(b.record)) || a.record.sequence - b.record.sequence;
}

export function searchRulings(text, limit = 5) {
  const raw = String(text || "");
  const exact = records.filter((record) => raw.includes(record.id));
  if (exact.length) {
    return exact.slice(0, limit).map((record) => present(record, 0.99));
  }
  const query = [...new Set(words(text))];
  if (!query.length) return [];
  const parl = /adjournment|privilege|question|motion|ruling|committee|quorum|speaker|chair|defection|starred|unstarred|point of order/i.test(raw);
  const ranked = records
    .map((record) => {
      const subject = String(record.subject || "");
      const hay = `${subject} ${record.headnote || ""} ${record.decision || ""} ${record.full_text || ""}`.toLowerCase();
      let score = 0;
      let hits = 0;
      for (const word of query) {
        if (subject.toLowerCase().includes(word)) {
          score += 6;
          hits += 1;
        } else if (hay.includes(word)) {
          score += 1;
          hits += 1;
        }
      }
      if (/adjournment/i.test(text) && /ADJOURNMENT/.test(subject)) score += 10;
      if (/privilege/i.test(text) && /PRIVILEGE/.test(`${subject} ${record.headnote || ""}`)) score += 12;
      if (/question hour|starred|unstarred/i.test(text) && /QUESTION/.test(subject)) score += 8;
      else if (/\bquestions?\b/i.test(text) && /QUESTION/.test(subject) && !/privilege/i.test(text)) score += 8;
      if (!parl && hits < 2) score = 0;
      return { record, score };
    })
    .filter((item) => item.score >= 8)
    .sort(byRank)
    .slice(0, limit);
  const top = ranked[0]?.score || 1;
  return ranked.map(({ record, score }) => present(record, Math.min(0.99, score / (top + 2))));
}

export function retrieveRulings(file, limit = 3) {
  const query = [...new Set(words(`${file.subject || ""} ${file.body || ""}`))];
  const ranked = records
    .map((record) => {
      const subject = String(record.subject || "");
      const hay = `${subject} ${record.headnote || ""} ${record.decision || ""}`.toLowerCase();
      let score = kindBoost(file.kind, subject);
      for (const word of query) {
        if (subject.toLowerCase().includes(word)) score += 4;
        else if (hay.includes(word)) score += 1;
      }
      return { record, score };
    })
    .filter((item) => item.score >= 8)
    .sort(byRank)
    .slice(0, limit);
  return ranked.map(({ record }) => present(record, 0));
}
