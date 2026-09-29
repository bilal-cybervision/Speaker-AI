import { searchRulings } from "../portal/rulings-search.js";
import { sentenceCase, rulingHref } from "./ui.js";
import { hasGemini, geminiJSON, geminiText } from "./gemini.js";

export function briefing(state) {
  const waiting = state.actionable || [];
  const urgent = waiting.filter((file) => (file.daysLeft ?? 9) <= 1);
  const overdue = state.overdue || [];
  const now = new Date();
  const current = state.agenda?.find((slot) => slot.start <= now && slot.end > now);
  const next = state.agenda?.find((slot) => slot.start > now);
  const clash = (state.conflicts || []).find((item) => item.tone === "red") || state.agenda?.find((slot) => slot.tone === "amber");
  const lines = [
    waiting.length
      ? `${waiting.length} paper${waiting.length === 1 ? " is" : "s are"} waiting for your decision${urgent.length ? `, ${urgent.length} of them due today` : ""}.`
      : "No paper is waiting for your decision.",
    overdue.length
      ? `${overdue.length} direction${overdue.length === 1 ? " is" : "s are"} overdue. Oldest: ${overdue[0].text}.`
      : "No direction is overdue.",
    current ? `You are now at ${current.title}, ${current.place}.` : "",
    next ? `Next: ${next.title} at ${next.time}.` : "No further engagement today.",
    clash ? `A clash is flagged: ${clash.title || clash.detail}.` : "",
  ].filter(Boolean);
  const speak = lines.join(" ");
  const chips = [
    { q: "What is pending for me before the sitting?", label: "What needs my attention?" },
    { q: "Show today's agenda", label: "Today's agenda" },
    { q: "Find rulings on adjournment motions", label: "Rulings on adjournment" },
    { q: "Which directions are overdue?", label: "Overdue directions" },
  ];
  return { lines, speak, chips, urgent, overdue, next, clash };
}

export function liveContext(state) {
  const brief = briefing(state);
  const files = (state.actionable || []).slice(0, 8).map((file) => `${file.id}: ${file.subject} (${file.kind}, ${file.daysLeft ?? "?"} days left)`).join("\n");
  const dirs = (state.overdue || []).map((item) => `${item.id}: ${item.text} · ${item.owner}`).join("\n");
  const agenda = (state.agenda || []).map((slot) => `${slot.time} ${slot.title} @ ${slot.place}${slot.tag ? ` [${slot.tag}]` : ""}`).join("\n");
  return `Desk now:\n${brief.lines.join("\n")}\n\nPapers:\n${files || "none"}\n\nOverdue directions:\n${dirs || "none"}\n\nToday's agenda:\n${agenda || "none"}\n\nDesk facts are only for questions about the queue, agenda, or directions. If the Speaker asks for a ruling, do not recap the desk. Wait for retrieved rulings. If none are sent, say that no past ruling was found. Do not invent ids.`;
}

function officeAnswer(text, state) {
  const q = text.toLowerCase();
  const brief = briefing(state);
  const pending = /pending|await|desk|attention|waiting|signature|decide|فیصل|التوا|اجلاس|پہلے|معاملات/.test(q);
  const agenda = /agenda|today|schedule|sitting|engagement|calendar|اجلس|شیڈول/.test(q);
  const dirs = /direction|overdue|follow.?up|احکام|تاخیر/.test(q);
  if (pending || /what.*(need|require)|summarise|summarize|brief|صبح|صبح کی/.test(q)) {
    return {
      kind: "office",
      confidence: "High",
      title: "What is on your desk",
      paragraphs: brief.lines,
      speak: brief.speak,
      links: [
        { href: "#/desk", label: "M1 queue" },
        { href: "#/directions", label: "M2 overdue" },
        { href: "#/schedule", label: "Schedule" },
      ],
      sources: [],
      followUps: ["Find rulings on adjournment motions", "Open the first file on my desk"],
    };
  }
  if (agenda) {
    const slots = (state.agenda || []).map((slot) => `${slot.time} · ${slot.title} · ${slot.place}${slot.tag ? ` (${slot.tag})` : ""}`);
    return {
      kind: "office",
      confidence: "High",
      title: "Today's agenda",
      paragraphs: slots.length ? slots : ["No engagements are on today's calendar."],
      speak: slots.join(". ") || "No engagements today.",
      links: [{ href: "#/schedule", label: "Open schedule" }],
      sources: [],
      followUps: ["What is pending for me before the sitting?"],
    };
  }
  if (dirs) {
    const overdue = state.overdue || [];
    const paras = overdue.length ? overdue.map((item) => `${item.id}: ${item.text} · ${item.owner}`) : ["No direction is overdue."];
    return {
      kind: "office",
      confidence: "High",
      title: "Directions",
      paragraphs: paras,
      speak: overdue.length ? `${overdue.length} overdue. ${overdue[0].text}` : "No direction is overdue.",
      links: [{ href: "#/directions", label: "Open directions" }],
      sources: [],
      followUps: ["What is pending for me before the sitting?"],
    };
  }
  return null;
}

function localRulingAnswer(trimmed, sources, started) {
  if (!sources.length) {
    return {
      kind: "none",
      confidence: "Low",
      title: "No authorised source",
      paragraphs: [
        "No past ruling in the 1947–1997 or 1999–2017 books is close enough to cite for this question.",
        "The assistant does not invent a ruling number. Ask the Legislation Branch, or rephrase with the subject of the motion.",
      ],
      speak: "No past ruling was found. The assistant does not invent a source.",
      links: [{ href: "#/search", label: "Open knowledge search" }],
      sources: [],
      followUps: ["Find rulings on adjournment motions", "Find rulings on privilege"],
      ms: Math.max(1, Math.round(performance.now() - started)),
    };
  }
  const paragraphs = sources.slice(0, 2).map((source, i) => {
    const quote = sentenceCase(source.headnote || source.decision);
    return `${source.subject ? `${source.subject}. ` : ""}${quote} (${source.id}, ${source.volume || "rulings"}, PDF page ${source.pdfPage}${source.debateDate ? `, ${source.debateDate}` : ""}). [${i + 1}]`;
  });
  paragraphs.push("These are retrieved from the Rulings of the Chair. They do not decide the paper before you. Confirm the page in the book before you rely on them.");
  return {
    kind: "ruling",
    confidence: sources[0].relevance > 0.7 ? "High" : "Medium",
    title: "Closest rulings of the Chair",
    paragraphs,
    speak: `${sentenceCase(sources[0].headnote)}. Cited ${sources[0].id}, PDF page ${sources[0].pdfPage}. This is advisory. You decide.`,
    links: sources.slice(0, 2).map((source) => ({ href: rulingHref(source), label: `Open ${source.id}`, external: true })),
    sources,
    followUps: [`Show the full text of ${sources[0].id}`, "Other rulings on this subject", "What is pending for me before the sitting?"],
    ms: Math.max(1, Math.round(performance.now() - started)),
    engine: "archive",
  };
}

export function askSpeakerAILocal(text, state) {
  const started = performance.now();
  const trimmed = String(text || "").trim();
  if (!trimmed) {
    return {
      kind: "empty",
      confidence: "Low",
      title: "",
      paragraphs: ["Ask about a paper on your desk, or about a past ruling of the Chair."],
      speak: "Ask about a paper on your desk, or about a past ruling of the Chair.",
      links: [],
      sources: [],
      followUps: briefing(state).chips.map((chip) => chip.q),
      ms: 0,
    };
  }
  const office = officeAnswer(trimmed, state);
  if (office) {
    office.ms = Math.max(1, Math.round(performance.now() - started));
    return office;
  }
  return localRulingAnswer(trimmed, searchRulings(trimmed, 4), started);
}

export async function askSpeakerAI(text, state, extra = {}) {
  const local = askSpeakerAILocal(text, state);
  if (extra.skipGemini || local.kind === "office" || local.kind === "empty") return local;
  if (!hasGemini()) return local;
  const sources = local.sources || [];
  if (!sources.length) return local;
  try {
    const pack = await geminiJSON(
      `Question from the Hon. Speaker:\n${text}\n\nAuthorised retrieved rulings (cite only these; do not mention today's desk, Question Hour, or papers waiting):\n${
        sources.map((s, i) => `[${i + 1}] ${s.id} ${s.volume || ""} PDF page ${s.pdfPage} (${s.debateDate || ""})${s.scan ? " SCAN: confirm this page before citing" : ""}\nSubject: ${s.subject}\nHeadnote: ${s.headnote}\nDecision: ${s.decision || ""}`).join("\n\n")
      }\n\nReturn JSON: {"title":"","paragraphs":["...","..."],"speak":"one spoken paragraph","confidence":"High|Medium|Low"}
Write two short paragraphs from those rulings only. Cite (id, PDF page n). End by saying this is advisory and the Speaker decides. Do not say that no ruling was found.`,
    );
    const paragraphs = Array.isArray(pack.paragraphs) ? pack.paragraphs.filter(Boolean) : local.paragraphs;
    return {
      ...local,
      title: pack.title || local.title,
      paragraphs,
      speak: pack.speak || local.speak,
      confidence: pack.confidence || local.confidence,
      engine: "gemini+archive",
      ms: local.ms,
    };
  } catch (err) {
    return { ...local, geminiError: err.message || "The model did not answer." };
  }
}

export function citationText(answer) {
  const body = (answer.paragraphs || []).join("\n\n");
  const cites = (answer.sources || []).map((source, i) => `[${i + 1}] ${source.id} · PDF page ${source.pdfPage} · ${source.volume}${source.debateDate ? ` · ${source.debateDate}` : ""}`).join("\n");
  return `${body}\n\n${cites}\n\nAdvisory only. The Speaker decides.`;
}

export function detectUrdu(text) {
  return /[\u0600-\u06FF]/.test(text || "");
}

export async function checkEvidenceAI(direction, evidence) {
  const text = String(evidence || "").trim();
  if (text.length < 8) {
    return { adequate: false, confidence: 0.9, reason: "Evidence is too short. A letter number and a date, or a file reference, is needed." };
  }
  const localPass = /\d/.test(text) && (/letter|no\.|dated|file|memo|u\.o|office|despatch|dispatch|email|sent/i.test(text) || text.length > 24);
  if (!hasGemini()) {
    return {
      adequate: localPass,
      confidence: localPass ? 0.72 : 0.64,
      reason: localPass
        ? "Local check: a reference number or dated action is present. Confirm on the file before closing."
        : "Local check: no letter number or date found. Ask the owner for the despatch reference.",
      engine: "local",
    };
  }
  try {
    const pack = await geminiJSON(
      `Direction to close:\n${direction.id}: ${direction.text}\nOwner: ${direction.owner}\nEvidence offered:\n${text}\n\nReturn JSON {"adequate":true|false,"confidence":0-1,"reason":"one sentence"}. Adequate means a verifiable action (letter no., date, file id). Do not invent missing numbers.`,
    );
    return {
      adequate: Boolean(pack.adequate),
      confidence: Number(pack.confidence) || 0.6,
      reason: pack.reason || (pack.adequate ? "Evidence is enough to close." : "Evidence is not enough."),
      engine: "gemini",
    };
  } catch {
    return {
      adequate: localPass,
      confidence: 0.6,
      reason: localPass ? "Could not reach the model. Local check found a reference." : "Could not reach the model. Add a letter number and date.",
      engine: "local",
    };
  }
}

export async function polishBriefing(state) {
  const pack = briefing(state);
  if (!hasGemini()) return pack;
  try {
    const speak = await geminiText(
      `Turn this morning briefing into one spoken paragraph for the Hon. Speaker, under 80 words. Keep the facts. Do not add papers that are not listed.\n${pack.lines.join("\n")}`,
      { temperature: 0.3 },
    );
    if (speak) pack.speak = speak.replace(/\s+/g, " ").trim();
  } catch {
    /* keep local speak */
  }
  return pack;
}
