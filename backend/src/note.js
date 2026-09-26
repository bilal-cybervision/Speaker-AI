import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { searchRulings } from "./search.js";
import { writeWithModel, modelConfigured } from "./llm.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const rule = JSON.parse(
  fs.readFileSync(path.resolve(here, "../data/rule-78.json"), "utf8")
);

export function wordCount(text) {
  return (text || "").trim().split(/\s+/).filter(Boolean).length;
}

function faceCheck(file) {
  const words = wordCount(file.body);
  const opinion = /minister'?s view|in your view|whether the current allocation of doctors is adequate/i.test(
    file.body
  );
  return rule.clauses.map((clause) => {
    if (clause.id === "d" && opinion) {
      return {
        id: clause.id,
        text: clause.text,
        pass: false,
        verdict: "Fails. The notice asks the Minister for an opinion.",
        quoted: file.opinionPhrase,
      };
    }
    if (clause.id === "f" && words > 150) {
      return {
        id: clause.id,
        text: clause.text,
        pass: false,
        verdict: `Fails. The notice runs to ${words} words. The ordinary limit is 150.`,
        quoted: null,
      };
    }
    return {
      id: clause.id,
      text: clause.text,
      pass: true,
      verdict: "No breach identified on the face of this notice.",
      quoted: null,
    };
  });
}

function checksFor(file) {
  const kind = file.kind || "question";
  if (kind === "question") return faceCheck(file);
  if (kind === "adjournment") {
    const urgent = /urgent|today|yesterday|this morning|recent/i.test(file.body);
    return [
      { id: "111-b", text: "An adjournment motion must relate to one definite issue.", pass: wordCount(file.body) > 12, verdict: wordCount(file.body) > 12 ? "The notice states a matter." : "The notice is too short to show one definite issue.", quoted: null },
      { id: "111-a", text: "It must be urgent and of recent occurrence.", pass: urgent, verdict: urgent ? "The notice shows urgency." : "The notice does not say why this cannot wait.", quoted: null },
    ];
  }
  if (kind === "privilege") {
    const named = /privilege/i.test(file.body);
    return [
      { id: "95", text: "A privilege notice must state the breach of privilege.", pass: named, verdict: named ? "The notice uses the word privilege." : "The notice does not state which privilege was breached.", quoted: null },
    ];
  }
  return [
    { id: "letter", text: "A letter is put up for a direction. It is not an admissibility test.", pass: true, verdict: "The Speaker records what is to be done with this letter.", quoted: null },
  ];
}

function localNote(file, rulings) {
  const clauses = checksFor(file);
  const failed = clauses.filter((c) => !c.pass);
  const summary = (file.body || "").replace(/\s+/g, " ").trim().slice(0, 420) || "The attached PDF has no readable text. A scan has to be read before a note can be written.";
  const kind = file.kind || "question";
  return {
    source: "rules-and-archive",
    summary,
    wordCount: wordCount(file.body),
    clauses,
    failedCount: failed.length,
    rulings,
    emptyRulings: rulings.length === 0,
    officerLine:
      kind === "letter"
        ? "Submitted for the Hon. Speaker's direction on this letter."
        : failed.length
          ? `Submitted for the Hon. Speaker's kind decision. ${failed.map((c) => c.id).join(", ")} need his attention.`
          : "Submitted for the Hon. Speaker's kind decision.",
  };
}

export async function prepareNote(file) {
  const rulings = searchRulings(file.body);
  if (!modelConfigured()) return localNote(file, rulings);

  const clauses = checksFor(file);
  try {
    const drafted = await writeWithModel({ file, clauses, rulings });
    const allowed = new Set(rulings.map((r) => r.id));
    const cited = (drafted.citedRulingIds || []).filter((id) => allowed.has(id));
    const kept = rulings.filter((r) => cited.includes(r.id));
    const useRulings = cited.length ? kept : rulings;
    return {
      source: "llm",
      model: process.env.OPENROUTER_MODEL || process.env.GEMINI_MODEL || process.env.CLOUDFLARE_AI_MODEL || "model",
      summary: drafted.summary || localNote(file, rulings).summary,
      wordCount: wordCount(file.body),
      clauses: mergeClauses(clauses, drafted.clauses),
      failedCount: mergeClauses(clauses, drafted.clauses).filter((c) => !c.pass).length,
      rulings: useRulings,
      emptyRulings: useRulings.length === 0,
      officerLine: drafted.officerLine || localNote(file, rulings).officerLine,
    };
  } catch (err) {
    const note = localNote(file, rulings);
    note.modelError = err.message;
    return note;
  }
}

function mergeClauses(computed, fromModel) {
  if (!Array.isArray(fromModel)) return computed;
  const byId = new Map(fromModel.map((c) => [c.id, c]));
  return computed.map((clause) => {
    if (clause.id === "d" || clause.id === "f") return clause;
    const extra = byId.get(clause.id);
    if (!extra) return clause;
    return {
      ...clause,
      pass: extra.pass !== false,
      verdict: extra.verdict || clause.verdict,
      quoted: extra.quoted || null,
    };
  });
}
