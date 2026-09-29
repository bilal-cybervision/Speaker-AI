import { demoRequest } from "../demo.js";
import { currentUser } from "./login.js";
import sheetCss from "./styles/file-sheet.css?raw";
import { retrieveRulings } from "./rulings-search.js";

const FLOW_PAGES = new Set(["files", "approvals", "directions"]);

export function isFlowPage(page) {
  return FLOW_PAGES.has(page);
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function loadFiles() {
  const data = await demoRequest("/api/files");
  return data.files;
}

export function stripHtml(files, page) {
  const mine = files.filter((file) => file.desk !== "done");
  const onDesk = files.filter((file) => {
    const user = currentUser();
    if (!user) return false;
    if (user.role === "speaker") return file.desk === "speaker";
    if (user.role === "officer") return file.desk === "section_officer" || file.desk === "section_officer_return";
    return file.desk === user.role;
  });
  const rows = (page === "approvals" ? files.filter((file) => String(file.id).startsWith("NA-")) : onDesk.length ? onDesk : mine)
    .map((file) => `<button type="button" data-open-file="${esc(file.id)}" class="w-full text-left bg-surface-container-lowest border border-outline-variant rounded p-3 hover:bg-surface-container-low">
      <b class="font-label-md text-label-md">${esc(file.id)}</b>
      <span class="block font-body-sm text-body-sm text-secondary">${esc(file.subject)}</span>
      <span class="font-label-sm text-label-sm text-primary-container">${esc(file.desk)}</span>
    </button>`)
    .join("");
  return `<section id="flow-strip" class="bg-surface-container-low border border-outline-variant rounded p-4 mb-4 space-y-2">
    <div class="flex items-center justify-between gap-3">
      <h2 class="font-headline-sm text-headline-sm text-on-surface">Files on the desks</h2>
      <span class="font-label-sm text-label-sm text-secondary">${onDesk.length} on your desk · ${files.length} in this cut</span>
    </div>
    <p class="font-body-sm text-body-sm text-secondary">Same walk as the question file: Section Officer, Joint Secretary, Special Secretary, Secretary, Speaker, then back to the Section Officer.</p>
    <div class="grid gap-2">${rows || `<p class="font-body-sm text-secondary">Nothing is on your desk.</p>`}</div>
  </section>`;
}

function pctOf(item) {
  const total = item.daysTotal || 1;
  return ((total - (item.daysLeft ?? 0)) / total) * 100;
}

function kindLabel(item) {
  return { question: "Question", adjournment: "Adjournment motion", privilege: "Privilege", letter: "Letter" }[item.kind] || "Question";
}

function bodyHtml(item) {
  const phrase = item.opinionPhrase || "";
  const at = (item.body || "").indexOf(phrase);
  if (!phrase || at < 0) return esc(item.body);
  return `${esc(item.body.slice(0, at))}<mark>${esc(phrase)}</mark>${esc(item.body.slice(at + phrase.length))}`;
}

function moveBar(file) {
  return `<div class="move">${(file.timeline || []).map((step) => `<span class="${esc(step.status)}">${esc(step.desk)}</span>`).join("")}</div>`;
}

function fileHeaderCard(item) {
  return `<div class="file-header-card"><div class="top-strip"><div class="file-no">FILE ${esc(item.id)}</div><h2>${esc(item.subject)}</h2></div>
    <div class="body">
      <div class="meta-row"><span class="k">Type</span><span class="v"><span class="pill pill-starred">${esc(kindLabel(item))}</span></span></div>
      <div class="meta-row"><span class="k">Now with</span><span class="v">${esc(item.desk)}</span></div>
      <div class="meta-row"><span class="k">Member</span><span class="v">${esc(item.memberName)}</span></div>
      <div class="meta-row"><span class="k">Addressed to</span><span class="v">${esc(item.minister)}</span></div>
      <div class="meta-row"><span class="k">Received</span><span class="v">${esc(item.received)}</span></div>
    </div></div>`;
}

function clockCard(item) {
  return `<div class="clock-card"><div class="clock-viz" style="--pct:${pctOf(item)}"><div class="num"><b>${item.daysLeft ?? ""}</b><span>Days left</span></div></div>
    <div class="clock-info"><b>Deadline ${esc(item.deadline)}</b><small>Rule 81 requires the Speaker's decision on admissibility within five clear days of receipt.</small></div></div>`;
}

function timelineCard(item) {
  return `<div class="timeline-card"><h4>Where this file has been</h4><div class="timeline">${(item.timeline || []).map((step, i) => `<div class="timeline-step ${step.status}"><div class="dot">${step.status === "done" ? "✓" : i + 1}</div><div class="desk">${esc(step.desk)}</div><div class="who">${esc(step.who)}</div><div class="ts">${esc(step.ts)}</div></div>`).join("")}</div></div>`;
}

function questionCard(item) {
  const words = item.note?.wordCount ?? String(item.body || "").trim().split(/\s+/).filter(Boolean).length;
  return `<div class="question-card"><h4>The notice · as received</h4><div class="question-body">${bodyHtml(item)}</div>
    <div class="question-meta"><div><div class="k">Word count</div><div class="v">${words} words</div></div><div><div class="k">Language</div><div class="v">${esc(item.language)}</div></div></div></div>`;
}

function rulingsHtml(file) {
  const found = file.retrieved || [];
  if (!found.length) {
    return `<div class="rulings-empty"><b>No past ruling found.</b> This screen searched the 1947–1997 scan and the 1999–2017 book. None was close enough to put on the note.</div>`;
  }
  return `<p style="padding-left:34px;font-size:12px;color:var(--text-muted);margin-bottom:8px;">Retrieved from both rulings books. ${found.length} closest. A 1947–1997 hit is a scan: confirm the PDF page. The note does not decide.</p>
    <div class="rulings-list">${found.map((ruling) => `<div class="ruling-card"><div class="rc-head"><span class="id">${esc(ruling.id)}</span><span class="pg">PDF page ${esc(ruling.pdfPage)} · ${esc(ruling.volume)}</span></div>
    <div class="rc-body"><div class="page-thumb"><div class="page-num">p.${esc(ruling.pdfPage)}</div></div><div><div class="subject">${esc(ruling.subject)}</div><div class="quote">"${esc(ruling.headnote)}"</div><div class="ctx">Chair · ${esc(ruling.debateDate || "date as printed")}</div></div></div></div>`).join("")}</div>`;
}

function checklistHtml(clauses) {
  const ordered = [...(clauses || [])].sort((a, b) => Number(a.pass) - Number(b.pass));
  return `<div class="checklist">${ordered.map((clause) => `<div class="check-item ${clause.pass ? "pass" : "fail"}"><div class="mark">${clause.pass ? "✓" : "✗"}</div><div class="body"><div class="rule">${esc(clause.text)} <span class="clause">${esc(clause.id)}</span></div><div class="verdict">${esc(clause.verdict)}</div>${clause.quoted ? `<div class="quoted">"${esc(clause.quoted)}"</div>` : ""}</div></div>`).join("")}</div>`;
}

function stamps(file) {
  return `<div class="stamp-row">${(file.minutes || []).map((minute) => `<div class="ink-stamp seen">${esc(minute.name)}<div>${esc(minute.text)} · ${esc(minute.at)}</div></div>`).join("") || `<div class="ink-stamp">No stamp yet<div>The file has not been seen</div></div>`}</div>`;
}

function leftColumn(file) {
  return `${fileHeaderCard(file)}${clockCard(file)}${timelineCard(file)}${questionCard(file)}`;
}

function sheetBody(file, user) {
  const note = file.note;
  const test = file.kind === "letter" ? "What this letter needs" : file.kind === "adjournment" ? "Test against Rule 111" : file.kind === "privilege" ? "Test against Rule 95" : "Test against Rule 78";
  if (user?.role === "officer" && file.desk === "section_officer") {
    return `${moveBar(file)}<div class="note-layout"><div>${leftColumn(file)}</div>
      <div class="note-sheet"><div class="note-header"><div class="note-stamp">Note on the file</div><div class="note-eyebrow">Section Officer's note</div><div class="note-title">${esc(file.id)}</div>
        <div class="note-subtitle">Prepared from the rule and the rulings already on the file. The Speaker decides.</div></div>
        <div class="note-body">
          <div class="note-section"><h3><span class="num">1</span> What is being asked</h3><div class="prose"><p>${esc(note?.summary || "")}</p></div></div>
          <div class="note-section"><h3><span class="num">2</span> ${test}</h3>${checklistHtml(note?.clauses)}</div>
          <div class="note-section"><h3><span class="num">3</span> Closest rulings of the Chair</h3>${rulingsHtml(file)}</div>
          <div class="note-section"><h3><span class="num">4</span> Your note</h3><div class="officer-edit"><div class="lbl">Edit this before the file walks up.</div><textarea id="officerLine">${esc(file.officerLine || note?.officerLine || "")}</textarea></div></div>
          <div class="ask-box"><span class="ico">Ask</span><input id="askInput" placeholder="Ask about this note…"><button class="send-btn" id="askBtn" type="button">Ask</button></div>
          <div class="ask-reply" id="askReply"></div>
        </div>
        <div class="note-actions"><div class="caveat"><b>The note does not decide.</b> Save it, then send the file to the Joint Secretary.</div>
          <div style="display:flex;gap:8px;"><button class="btn btn-ghost" id="saveDraft" type="button">Save note</button><button class="btn btn-primary" id="sendUp" type="button">Send to the Joint Secretary</button></div></div>
      </div></div>`;
  }
  if (["js", "special", "secgen"].includes(user?.role) && file.desk === user.role) {
    const next = { js: "the Special Secretary", special: "the Secretary", secgen: "the Speaker" }[user.role];
    return `${moveBar(file)}<div class="note-layout"><div>${leftColumn(file)}</div>
      <div class="note-sheet"><div class="note-header"><div class="note-stamp">For your stamp</div><div class="note-eyebrow">${esc(user.name)}</div><div class="note-title">${esc(file.id)}</div>
        <div class="note-subtitle">Read the note and the ruling. You do not decide. You stamp the file and send it to ${next}.</div></div>
        <div class="note-body">
          <div class="note-section"><h3><span class="num">1</span> The officer's line</h3><div class="prose"><p>${esc(file.officerLine || note?.summary || "")}</p></div></div>
          <div class="note-section"><h3><span class="num">2</span> ${test}</h3>${checklistHtml(note?.clauses)}</div>
          <div class="note-section"><h3><span class="num">3</span> Rulings retrieved</h3>${rulingsHtml(file)}</div>
          <div class="note-section"><h3><span class="num">4</span> Stamps already on the file</h3>${stamps(file)}
            <div class="officer-edit" style="margin-top:14px;"><div class="lbl">Your note, then your stamp.</div><textarea id="minuteLine">Seen. The note is complete. Forwarded.</textarea></div></div>
          <div class="ask-box"><span class="ico">Ask</span><input id="askInput" placeholder="Ask what the note says…"><button class="send-btn" id="askBtn" type="button">Ask</button></div>
          <div class="ask-reply" id="askReply"></div>
        </div>
        <div class="note-actions"><div class="caveat"><b>Your stamp is not the Speaker's signature.</b></div>
          <button class="btn btn-primary" id="stampBtn" type="button">Stamp and send to ${next}</button></div>
      </div></div>`;
  }
  if (user?.role === "speaker" && file.desk === "speaker") {
    const failed = (note?.clauses || []).filter((clause) => !clause.pass);
    return `${moveBar(file)}<div class="speaker-header-card"><div class="speaker-avatar">AS</div><div class="who"><h2>Sardar Ayaz Sadiq</h2><div class="role">Speaker of the National Assembly</div></div>
      <div class="rule-cite"><b>RULE 28</b><p>Your decision on the file is final unless the House rescinds it. The note does not sign.</p></div></div>
      <div class="note-layout"><div>${leftColumn(file)}</div><div>
        <div class="note-sheet"><div class="note-header"><div class="note-stamp">On your desk</div><div class="note-eyebrow">Note and stamps already on the file</div><div class="note-title">${esc(file.id)}</div></div>
          <div class="note-body">
            <div class="note-section"><h3><span class="num">1</span> What is being asked</h3><div class="prose"><p>${esc(note?.summary || "")}</p></div></div>
            <div class="note-section"><h3><span class="num">2</span> ${failed.length} point${failed.length === 1 ? "" : "s"} marked</h3>${checklistHtml(failed.length ? failed : note?.clauses)}</div>
            <div class="note-section"><h3><span class="num">3</span> Rulings of the Chair</h3>${rulingsHtml(file)}</div>
            <div class="note-section"><h3><span class="num">4</span> The line, and the stamps</h3><div class="officer-edit"><div class="prose"><p>${esc(file.officerLine || "")}</p></div>${stamps(file)}</div></div>
          </div></div>
        <div class="decision-panel"><h3>Your decision</h3><div class="sub">Choose one. Then sign. The file goes back to the Section Officer.</div>
          <div class="decision-choices">
            <button class="decision-choice allow" type="button" data-choice="allow"><div class="verdict">${file.kind === "letter" ? "Approve" : "Allow"}</div><div class="desc">Send it on.</div></button>
            <button class="decision-choice reject" type="button" data-choice="reject"><div class="verdict">${file.kind === "letter" ? "Send back" : "Reject"}</div><div class="desc">It does not go forward.</div></button>
            <button class="decision-choice amend" type="button" data-choice="amend"><div class="verdict">${file.kind === "letter" ? "Record a direction" : "Fix the wording"}</div><div class="desc">Write the words below.</div></button>
          </div>
          <div class="amend-box" id="amendBox"><label>Wording</label><textarea id="amendText" placeholder="Write the wording as it should stand…"></textarea></div>
          <div class="sign-block"><div><div class="caption">Signature</div><div class="signature-preview">Ayaz Sadiq</div></div>
            <div class="stamp">Office of<b>Speaker</b></div>
            <button class="btn-sign" id="signBtn" type="button" disabled>Sign and record on the file</button></div>
          <p id="flowError"></p>
        </div></div></div>`;
  }
  if (file.decision) {
    const when = file.decidedAt ? new Date(file.decidedAt) : new Date();
    const banner = file.decision === "allow" ? "Admitted" : file.decision === "reject" ? "Disallowed" : "Amended in form";
    const carry = user?.role === "officer" && file.desk === "section_officer_return"
      ? `<div class="next-step-card"><div class="icon-big">→</div><div class="body"><h4>${esc(file.followUp?.action || "Carry out the decision")}</h4><p>Due ${esc(file.followUp?.due || "")}</p></div><button class="btn btn-primary" id="carryOut" type="button">Carry out</button></div>`
      : "";
    return `${moveBar(file)}<div class="note-layout"><div>${leftColumn(file)}</div><div>
      <div class="decision-record ${esc(file.decision)}"><span class="verdict-banner">${banner}</span>
        <div class="quoted-decision">${esc(file.officerLine || note?.summary || "")}</div>
        <div class="sig-row"><div class="sig-left"><div class="signature">Ayaz Sadiq</div><div class="printed">Sardar Ayaz Sadiq · Speaker</div><div class="ts">Signed ${esc(when.toDateString())}</div></div>
        <div class="sig-right"><div class="stamp">Office of<b>Speaker</b></div></div></div>${stamps(file)}</div>${carry}</div></div>`;
  }
  return `${moveBar(file)}<div class="note-layout"><div>${leftColumn(file)}</div>
    <div class="note-sheet"><div class="note-body"><p>This file is not on your desk. It is with <b>${esc(file.desk)}</b>.</p>${stamps(file)}<div class="note-section"><h3><span class="num">3</span> Rulings on the file</h3>${rulingsHtml(file)}</div></div></div></div>`;
}

function askAnswer(file, question) {
  const failed = (file.note?.clauses || []).filter((clause) => !clause.pass);
  const ruling = file.retrieved?.[0];
  if (!String(question || "").trim()) return "Ask about the failed rule, the ruling, or the officer's line.";
  if (failed.length) return `The note marks ${failed.map((clause) => clause.id).join(", ")} as not met. ${failed[0].verdict}`;
  if (ruling) return `Closest ruling ${ruling.id}, PDF page ${ruling.pdfPage}: ${ruling.headnote}`;
  return file.officerLine || "No ruling was found. The Speaker still decides.";
}

function mountSheet(file) {
  file.retrieved = retrieveRulings(file);
  let host = document.getElementById("file-sheet");
  if (!host) {
    host = document.createElement("div");
    host.id = "file-sheet";
    document.body.appendChild(host);
    host.attachShadow({ mode: "open" });
  }
  const root = host.shadowRoot;
  root.innerHTML = `<style>${sheetCss}</style><div class="pad"><button class="back-link" id="closeSheet" type="button">← Close the file</button>${sheetBody(file, currentUser())}<p id="flowError" style="color:#b91c1c;margin-top:8px;"></p></div>`;
  const fail = (err) => {
    const slot = root.getElementById("flowError");
    if (slot) slot.textContent = err.message;
  };
  const refresh = () => {
    document.dispatchEvent(new CustomEvent("files-changed"));
    openFlow(file.id);
  };
  root.getElementById("closeSheet").onclick = () => host.remove();
  const ask = root.getElementById("askBtn");
  if (ask) {
    ask.onclick = () => {
      root.getElementById("askReply").textContent = askAnswer(file, root.getElementById("askInput").value);
    };
  }
  const save = root.getElementById("saveDraft");
  if (save) {
    save.onclick = async () => {
      try {
        await demoRequest(`/api/files/${file.id}/line`, { method: "POST", body: JSON.stringify({ officerLine: root.getElementById("officerLine").value }) });
        refresh();
      } catch (err) { fail(err); }
    };
  }
  const send = root.getElementById("sendUp");
  if (send) {
    send.onclick = async () => {
      try {
        await demoRequest(`/api/files/${file.id}/line`, { method: "POST", body: JSON.stringify({ officerLine: root.getElementById("officerLine").value }) });
        await demoRequest(`/api/files/${file.id}/send`, { method: "POST" });
        refresh();
      } catch (err) { fail(err); }
    };
  }
  const stamp = root.getElementById("stampBtn");
  if (stamp) {
    stamp.onclick = async () => {
      try {
        await demoRequest(`/api/files/${file.id}/forward`, { method: "POST", body: JSON.stringify({ minute: root.getElementById("minuteLine").value }) });
        refresh();
      } catch (err) { fail(err); }
    };
  }
  let choice = null;
  root.querySelectorAll(".decision-choice").forEach((choiceBtn) => {
    choiceBtn.onclick = () => {
      choice = choiceBtn.dataset.choice;
      root.querySelectorAll(".decision-choice").forEach((el) => el.classList.remove("active"));
      choiceBtn.classList.add("active");
      root.getElementById("amendBox")?.classList.toggle("show", choice === "amend");
      const sign = root.getElementById("signBtn");
      if (sign) sign.disabled = false;
    };
  });
  const sign = root.getElementById("signBtn");
  if (sign) {
    sign.onclick = async () => {
      try {
        await demoRequest(`/api/files/${file.id}/decide`, {
          method: "POST",
          body: JSON.stringify({ decision: choice, wording: root.getElementById("amendText")?.value || "" }),
        });
        refresh();
      } catch (err) { fail(err); }
    };
  }
  const carry = root.getElementById("carryOut");
  if (carry) {
    carry.onclick = async () => {
      try {
        await demoRequest(`/api/files/${file.id}/carry-out`, { method: "POST" });
        refresh();
      } catch (err) { fail(err); }
    };
  }
}

export async function openFlow(id) {
  let data = await demoRequest(`/api/files/${id}`);
  const user = currentUser();
  if (user?.role === "officer" && data.file.desk === "section_officer" && !data.file.note) {
    data = await demoRequest(`/api/files/${id}/note`, { method: "POST" });
  }
  mountSheet(data.file);
}

const SIMPLE = "portal-simple-status";

export function readStatus() {
  try {
    return JSON.parse(sessionStorage.getItem(SIMPLE) || "{}");
  } catch {
    return {};
  }
}

export function writeStatus(key, value) {
  const all = readStatus();
  all[key] = value;
  sessionStorage.setItem(SIMPLE, JSON.stringify(all));
}
