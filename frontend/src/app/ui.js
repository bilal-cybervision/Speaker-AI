export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function rulingHref(item) {
  const pdf = item?.pdfUrl || "/rulings/rulings-1999-2017.pdf";
  return `${pdf}#page=${item?.pdfPage || 1}`;
}

/** Drop the vendor name from text that is shown on screen. */
export function shown(value) {
  return String(value ?? "")
    .replace(/gemini|elevenlabs?/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,:;])/g, "$1")
    .replace(/^[\s:.\-–—]+|[\s:\-–—]+$/g, "")
    .trim();
}

export const ROLES = {
  speaker: { name: "Sardar Ayaz Sadiq", title: "Speaker, National Assembly", initials: "AS", desk: "speaker", email: "speaker@na.gov.pk", password: "speaker123" },
  officer: { name: "Saima Malik", title: "Section Officer · Questions Branch", initials: "SM", desk: "section_officer", email: "so.questions@na.gov.pk", password: "questions123" },
  js: { name: "Tariq Mehmood", title: "Joint Secretary", initials: "TM", desk: "js", email: "js.admin@na.gov.pk", password: "js123" },
  special: { name: "Farah Jameel", title: "Special Secretary", initials: "FJ", desk: "special", email: "specsec@na.gov.pk", password: "special123" },
  secgen: { name: "Saeed Ahmad Maitla", title: "Secretary", initials: "SA", desk: "secgen", email: "secgen@na.gov.pk", password: "secretary123" },
};

export const STAFF_ORDER = ["officer", "js", "special", "secgen"];

export const DESK = {
  section_officer: "Section Officer",
  js: "Joint Secretary",
  special: "Special Secretary",
  secgen: "Secretary",
  speaker: "Speaker",
  section_officer_return: "Section Officer, to act",
  done: "Closed",
};

export const NEXT_DESK = { officer: "js", js: "special", special: "secgen", secgen: "speaker" };

export const KIND = {
  question: "Question",
  adjournment: "Adjournment motion",
  privilege: "Privilege notice",
  letter: "Letter",
};

export const RULE_FOR = {
  question: "Rule 78",
  adjournment: "Rule 111",
  privilege: "Rule 95",
  letter: "Put up for a direction",
};

export function choicesFor(file) {
  if (file.kind === "letter") {
    return {
      allow: ["Approve", "As put up"],
      reject: ["Return", "For a fuller note"],
      amend: ["Direct", "Write the order"],
    };
  }
  if (file.kind === "adjournment") {
    return {
      allow: ["Give consent", "It may be moved"],
      reject: ["Refuse consent", "Not in order"],
      amend: ["Fix the wording", "Admit as amended"],
    };
  }
  return {
    allow: ["Allow", "Admit as it stands"],
    reject: ["Reject", "Disallow"],
    amend: ["Fix the wording", "Admit as amended"],
  };
}

export function verdictFor(file) {
  const letter = file.kind === "letter";
  if (file.decision === "allow") return letter ? "Approved" : file.kind === "adjournment" ? "Consent given" : "Admitted";
  if (file.decision === "reject") return letter ? "Returned" : file.kind === "adjournment" ? "Consent refused" : "Disallowed";
  return letter ? "Direction recorded" : "Admitted as amended";
}

export function failedClauses(file) {
  return (file.note?.clauses || []).filter((clause) => !clause.pass);
}

export function daysChip(file) {
  if (file.decision) {
    const tone = { allow: "green", reject: "red", amend: "amber" }[file.decision];
    return `<span class="chip ${tone}">${esc(verdictFor(file))}</span>`;
  }
  if (file.desk === "done") return `<span class="chip">Closed</span>`;
  const left = file.daysLeft ?? 0;
  const tone = left <= 1 ? "red" : left <= 2 ? "amber" : "";
  const text = left <= 0 ? "Overdue" : left === 1 ? "Due today" : `${left} days left`;
  return `<span class="chip ${tone}">${text}</span>`;
}

export function sortUrgent(list) {
  return [...list].sort((a, b) => (a.daysLeft ?? 9) - (b.daysLeft ?? 9) || failedClauses(b).length - failedClauses(a).length);
}

export function shortDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function stamp(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function today() {
  return new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function shouting(segment) {
  const letters = segment.replace(/[^A-Za-z]/g, "");
  return letters.length > 0 && letters.replace(/[^A-Z]/g, "").length / letters.length > 0.6;
}

export function sentenceCase(text) {
  const value = String(text || "").trim();
  return value
    .split(/(:\s+)/)
    .map((segment) => (shouting(segment) ? segment.toLowerCase() : segment))
    .join("")
    .replace(/(^|[.:!?]\s+)([a-z])/g, (_, lead, char) => lead + char.toUpperCase())
    .replace(/\b(na|pm|mna|mnas|mpa|mpas|pti|ppp|pml|wapda)\b/g, (word) => word.toUpperCase())
    .replace(/\b(speaker|chair|house|assembly|minister|government|pakistan|senate|rule|rules|karachi|lahore|islamabad|peshawar|quetta|balochistan|sindh|punjab|khyber|pakhtunkhwa|capital|territory)\b/g, (word) => word[0].toUpperCase() + word.slice(1))
    .replace(/\b(mr|mrs|ms|dr)\.\s+([a-z]+)(\s+(?!in\b|of\b|on\b|at\b|for\b|and\b|mpa\b|mna\b)[a-z]+)?/gi, (match) => match.replace(/\b[a-z]/g, (char) => char.toUpperCase()));
}

export function titleCase(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\b([a-z])/g, (char) => char.toUpperCase());
}

export function clip(text, max) {
  const value = String(text || "");
  return value.length > max ? `${value.slice(0, max).replace(/\s+\S*$/, "")}…` : value;
}
