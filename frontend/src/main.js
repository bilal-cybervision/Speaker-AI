import { demoRequest, demoUpload } from "./demo.js";

let user = null;
let files = [];
let file = null;
let screen = "inbox";
let filter = "desk";
let pendingChoice = null;

const $ = (id) => document.getElementById(id);
const DEMO = {
  officer: { email: "so.questions@na.gov.pk", password: "questions123" },
  speaker: { email: "speaker@na.gov.pk", password: "speaker123" },
  js: { email: "js.admin@na.gov.pk", password: "js123" },
  special: { email: "specsec@na.gov.pk", password: "special123" },
  secgen: { email: "secgen@na.gov.pk", password: "secretary123" },
};
const PEOPLE = {
  officer: { name: "Saima Malik", title: "Section Officer · Questions Branch", initials: "SM", root: "Questions Branch" },
  speaker: { name: "Sardar Ayaz Sadiq", title: "Hon. Speaker", initials: "AS", root: "Speaker's Desk" },
  js: { name: "Tariq Mehmood", title: "Joint Secretary", initials: "TM", root: "Joint Secretary" },
  special: { name: "Farah Jameel", title: "Special Secretary", initials: "FJ", root: "Special Secretary" },
  secgen: { name: "Saeed Ahmad Maitla", title: "Secretary", initials: "SM", root: "Secretary" },
};

async function api(path, options = {}) {
  if (import.meta.env.PROD) return demoRequest(path, options);
  const res = await fetch(path, {
    credentials: "same-origin",
    headers: { "content-type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

function toast(msg) {
  const holder = $("toastHolder");
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<span class="ico">✓</span><span>${msg}</span>`;
  holder.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function kindLabel(item) {
  return { question: "Question", adjournment: "Adjournment motion", privilege: "Privilege", letter: "Letter" }[item.kind] || "Question";
}

function pctOf(item) {
  return ((item.daysTotal - item.daysLeft) / item.daysTotal) * 100;
}

function bodyHtml(item) {
  const phrase = item.opinionPhrase || "";
  const at = item.body.indexOf(phrase);
  if (at < 0) return esc(item.body);
  return `${esc(item.body.slice(0, at))}<mark>${esc(phrase)}</mark>${esc(item.body.slice(at + phrase.length))}`;
}

function showApp(on) {
  $("loginScreen").style.display = on ? "none" : "flex";
  $("app").classList.toggle("show", on);
}

async function refreshFiles() {
  const data = await api("/api/files");
  files = data.files;
  if (file) file = files.find((item) => item.id === file.id) || file;
}

async function loginAs(role) {
  const creds = DEMO[role];
  const data = await api("/api/login", {
    method: "POST",
    body: JSON.stringify(creds),
  });
  user = data.user;
  await refreshFiles();
  showApp(true);
}

function render() {
  const speaker = user.role === "speaker";
  const who = PEOPLE[user.role] || PEOPLE.officer;
  $("pillName").textContent = who.name;
  $("pillRole").textContent = who.title;
  const av = $("pillAvatar");
  av.textContent = who.initials;
  av.style.background = speaker ? "linear-gradient(135deg,#fef3c7,#fbbf24)" : "linear-gradient(135deg,#a7f3d0,#6ee7b7)";
  av.style.color = speaker ? "#422006" : "#022c22";
  $("crumbRoot").textContent = who.root;
  const names = { home: "This morning", inbox: "Inbox", note: file ? `File · ${file.id}` : "File", speaker: file ? `Awaiting decision · ${file.id}` : "Awaiting decision", returned: file ? `Decision recorded · ${file.id}` : "Decision recorded", meetings: "Meetings", diary: "Diary", speech: "Speeches", calls: "Calls", press: "Press", cards: "Cards", directions: "Directions", q0917: "Q-2026-0917", am441: "AM-2026-441", mail: "Email · 22:14" };
  $("crumbCurrent").textContent = names[screen] || "Inbox";
  document.querySelectorAll("#roleMenu button").forEach((btn) => btn.classList.toggle("active", btn.dataset.role === user.role));
  renderSidebar();
  const stage = $("mainStage");
  stage.innerHTML = `<div class="screen"></div>`;
  const root = stage.firstChild;
  if (screen === "home") root.innerHTML = viewHome();
  else if (screen === "note" && file) root.innerHTML = viewNote();
  else if (screen === "speaker" && file) root.innerHTML = viewSpeaker();
  else if (screen === "returned" && file) root.innerHTML = viewReturned();
  else if (screen === "chain") root.innerHTML = viewChain();
  else if (["meetings", "diary", "speech", "calls", "press", "cards", "directions", "q0917", "am441", "mail"].includes(screen)) root.innerHTML = viewDay(screen);
  else root.innerHTML = viewInbox();
  bind();
}

function whoExists() {
  return (PEOPLE[user.role] || PEOPLE.officer).root;
}

function renderSidebar() {
  const speaker = user.role === "speaker";
  const onDesk = files.filter((item) => item.desk === "section_officer").length;
  const sent = files.filter((item) => ["js", "special", "secgen", "speaker"].includes(item.desk)).length;
  const done = files.filter((item) => item.dispatched).length;
  const waitingSpeaker = files.filter((item) => item.desk === "speaker").length;
  const chain = !speaker && user.role !== "officer";
  const items = chain
    ? [
        { key: "chain", ico: "📍", label: "The file on my desk", active: screen === "chain" },
      ]
    : speaker
    ? [
        { key: "home", ico: "☀", label: "This morning", active: screen === "home" },
        { key: "inbox", ico: "📂", label: "Files awaiting my decision", count: waitingSpeaker, active: screen === "inbox" || screen === "speaker" },
        { key: "directions", ico: "🎯", label: "Directions", count: 3, active: screen === "directions" },
        { key: "meetings", ico: "🤝", label: "Meetings", count: 2, active: screen === "meetings" },
        { key: "diary", ico: "📅", label: "Diary", active: screen === "diary" },
        { key: "speech", ico: "🎤", label: "Speeches", active: screen === "speech" },
        { key: "calls", ico: "📞", label: "Calls", active: screen === "calls" },
        { key: "press", ico: "📰", label: "Press", active: screen === "press" },
        { key: "cards", ico: "✉️", label: "Cards", active: screen === "cards" },
      ]
    : [
        { key: "inbox", ico: "📥", label: "Inbox", count: onDesk, active: screen === "inbox" },
        { key: "note", ico: "📝", label: "Notes in progress", count: onDesk, active: screen === "note" },
        { key: "sent", ico: "⬆️", label: "Sent to Speaker", count: sent, active: screen === "inbox" && filter === "sent" },
        { key: "done", ico: "✅", label: "Decisions carried out", count: done, active: screen === "returned" },
      ];
  $("sidebar").innerHTML = `
    <div class="sidebar-cat">${whoExists()}</div>
    ${items.map((it) => `<button class="sidebar-item ${it.active ? "active" : ""}" ${it.disabled ? "disabled" : ""} data-nav="${it.key}"><span class="ico">${it.ico}</span><span>${it.label}</span>${it.count ? `<span class="count">${it.count}</span>` : ""}</button>`).join("")}
    <div class="sidebar-cat">Reference</div>
    <button class="sidebar-item" disabled><span class="ico">📖</span><span>Rules of Procedure</span></button>
    <button class="sidebar-item" disabled><span class="ico">🏛️</span><span>Rulings of the Chair</span><span class="count">1,107</span></button>
    ${speaker ? "" : `<div class="sidebar-cat">Other branches</div>
    <button class="sidebar-item" disabled><span class="ico">📰</span><span>Press Releases</span></button>
    <button class="sidebar-item" disabled><span class="ico">✉️</span><span>Greeting Cards</span></button>
    <button class="sidebar-item" disabled><span class="ico">🎤</span><span>Speeches</span></button>
    <button class="sidebar-item" disabled><span class="ico">🤝</span><span>Meetings</span></button>`}
    <div style="flex:1"></div>
    <button class="sidebar-item" id="resetDemo"><span class="ico">↺</span><span>Reset demo</span></button>`;
}

function filteredFiles() {
  if (user.role === "speaker") return files.filter((item) => item.desk === "speaker");
  if (filter === "sent") return files.filter((item) => ["js", "special", "secgen", "speaker"].includes(item.desk));
  if (filter === "returned") return files.filter((item) => item.desk === "section_officer_return");
  if (filter === "closed") return files.filter((item) => item.desk === "done");
  return files.filter((item) => item.desk === "section_officer");
}

function viewInbox() {
  const speaker = user.role === "speaker";
  const rows = filteredFiles();
  const onDesk = files.filter((item) => item.desk === "section_officer").length;
  const sent = files.filter((item) => ["js", "special", "secgen", "speaker"].includes(item.desk)).length;
  const returned = files.filter((item) => item.desk === "section_officer_return").length;
  const closed = files.filter((item) => item.desk === "done").length;
  const tabs = speaker
    ? ""
    : `<div class="filter-row">
        <button class="filter-tab ${filter === "desk" ? "active" : ""}" data-filter="desk">On my desk<span class="n">${onDesk}</span></button>
        <button class="filter-tab ${filter === "sent" ? "active" : ""}" data-filter="sent">Sent to Speaker<span class="n">${sent}</span></button>
        <button class="filter-tab ${filter === "returned" ? "active" : ""}" data-filter="returned">Returned for action<span class="n">${returned}</span></button>
        <button class="filter-tab ${filter === "closed" ? "active" : ""}" data-filter="closed">Answered / closed<span class="n">${closed}</span></button>
        <div class="spacer"></div>
        <div class="search-box"><span class="ico">🔍</span><input id="inboxSearch" placeholder="Search file number, member, subject…"></div>
      </div>`;
  const banner = speaker
    ? ""
    : `<div class="desk-banner"><div class="info"><div class="icon-ring">📥</div><div><b>Your desk · Questions Branch, Section II</b><small>${onDesk} file waiting · ${sent} files sent up · ${returned} files returned for action</small></div></div><div class="rule-tag">Rule 78 · Admissibility · Rule 81 · 5-day clock</div></div>`;
  const body = rows.map((item) => {
    const pct = pctOf(item);
    return `<tr class="clickable" data-id="${item.id}">
      <td><div class="file-no">${esc(item.id)}</div><div style="margin-top:4px;"><span class="pill pill-warn">Notice</span></div></td>
      <td class="subject"><b>${esc(item.subject)}</b><small>From ${esc(item.memberName)} · to the ${esc(item.minister)}</small></td>
      <td><span class="pill ${item.kind === "question" || !item.kind ? "pill-starred" : "pill-ok"}">${esc(kindLabel(item))}</span>${item.hasPdf ? `<div style="font-size:10px;color:var(--text-muted);margin-top:4px;">PDF attached</div>` : ""}</td>
      <td><div style="font-weight:700;">${esc(item.received)}</div><div style="font-size:10px;color:var(--text-muted);margin-top:2px;">Notice Office</div></td>
      <td><div class="days-cell"><div class="days-ring" style="--pct:${pct}"><b>${item.daysLeft}</b></div><div class="lbl"><b>${item.daysLeft} of ${item.daysTotal} days</b>Deadline ${esc(item.deadline)}</div></div></td>
      <td><div class="desk-cell"><div class="avatar-mini">${speaker ? "AS" : "SM"}</div><div style="line-height:1.2;"><div style="font-size:12px;font-weight:700;">${speaker ? "You (Speaker)" : "You (Saima Malik)"}</div><div style="font-size:10px;color:var(--text-muted);">${item.desk === "section_officer" ? "Writing the note" : item.desk === "speaker" ? "Awaiting decision" : "Carry out"}</div></div></div></td>
      <td><span class="open-arrow">→</span></td></tr>`;
  }).join("");
  return `<div class="page-head"><h1>${speaker ? "Speaker's desk" : "Section Officer inbox"}</h1><div class="sub">${speaker ? "Files waiting for your decision." : "Question files that have arrived from the Notice Office and are waiting on the Questions Branch desk."}</div></div>
    ${banner}${tabs}
    ${speaker ? "" : `<div class="timeline-card" style="margin-bottom:16px;"><h4>Attach the paper</h4><p style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">The Notice Office, the post, or an official email leaves a PDF on the file. Choose what it is, then attach it.</p><select id="newKind" style="width:100%;padding:8px;margin-bottom:8px;border:1px solid var(--border);border-radius:8px;"><option value="question">Question</option><option value="adjournment">Adjournment motion</option><option value="privilege">Privilege notice</option><option value="letter">Letter</option></select><input id="newSubject" placeholder="Subject on the paper" style="width:100%;padding:8px;margin-bottom:8px;border:1px solid var(--border);border-radius:8px;"><input id="newPdf" type="file" accept="application/pdf" style="margin-bottom:8px;"><button class="btn btn-primary" id="newFile" type="button">Register this file</button></div>`}
    <div class="file-table"><table><thead><tr><th style="width:130px;">File</th><th>Subject &amp; member</th><th style="width:110px;">Type</th><th style="width:140px;">Received</th><th style="width:170px;">Days left (Rule 81)</th><th style="width:170px;">Current desk</th><th></th></tr></thead>
    <tbody>${body || `<tr><td colspan="7" style="text-align:center;padding:30px;color:var(--text-soft);">Nothing in this list.</td></tr>`}
    ${rows.length ? `<tr><td colspan="7" style="text-align:center;padding:30px 16px;color:var(--text-soft);font-size:12px;"><em>Sample data. Other secretariat files are not in this cut.</em></td></tr>` : ""}</tbody></table></div>`;
}

function fileHeaderCard(item) {
  return `<div class="file-header-card"><div class="top-strip"><div class="file-no">FILE ${esc(item.id)}</div><h2>${esc(item.subject)}</h2></div>
    <div class="body">
      <div class="meta-row"><span class="k">Type</span><span class="v"><span class="pill pill-starred">${esc(kindLabel(item))}</span></span></div>
      <div class="meta-row"><span class="k">Paper</span><span class="v">${item.pdfUrl ? `<a href="${esc(item.pdfUrl)}" target="_blank" rel="noreferrer">${esc(item.pdfName || "Open PDF")}</a>` : item.hasPdf ? `<a href="/api/files/${esc(item.id)}/pdf" target="_blank" rel="noreferrer">${esc(item.pdfName || "Open PDF")}</a>` : "Sample text, no PDF"}</span></div>
      <div class="meta-row"><span class="k">Member</span><span class="v">${esc(item.memberName)}</span></div>
      <div class="meta-row"><span class="k">Addressed to</span><span class="v" style="max-width:200px;font-size:11px;">${esc(item.minister)}</span></div>
      <div class="meta-row"><span class="k">Received</span><span class="v">${esc(item.received)}</span></div>
      <div class="meta-row"><span class="k">On this desk since</span><span class="v">${esc(item.arrivedDesk || "2 September 2026 · 10:14")}</span></div>
      <div class="meta-row"><span class="k">House</span><span class="v">${esc(item.house || "National Assembly · sample")}</span></div>
    </div></div>`;
}

function clockCard(item) {
  return `<div class="clock-card"><div class="clock-viz" style="--pct:${pctOf(item)}"><div class="num"><b>${item.daysLeft}</b><span>Days left</span></div></div>
    <div class="clock-info"><b>Deadline ${esc(item.deadline)}</b><small>Rule 81 requires the Speaker's decision on admissibility within five clear days of receipt.</small><div class="rule">${item.daysLeft <= 2 ? "⚠ Urgent · walk this file up today" : "On track"}</div></div></div>`;
}

function timelineCard(item) {
  return `<div class="timeline-card"><h4>Desk-by-desk timeline</h4><div class="timeline">${(item.timeline || []).map((step, i) => `<div class="timeline-step ${step.status}"><div class="dot">${step.status === "done" ? "✓" : i + 1}</div><div class="desk">${esc(step.desk)}</div><div class="who">${esc(step.who)}</div><div class="ts">${esc(step.ts)}</div></div>`).join("")}</div></div>`;
}

function questionCard(item) {
  const words = item.note?.wordCount ?? item.body.trim().split(/\s+/).filter(Boolean).length;
  const over = words > 150;
  return `<div class="question-card"><h4>The notice · as received</h4><div class="question-body">${bodyHtml(item)}</div>
    <div class="question-meta"><div><div class="k">Word count</div><div class="v" style="color:${over ? "var(--danger)" : "inherit"}">${words} words <span style="font-weight:500;color:var(--text-muted);font-size:10px;">(limit 150)</span></div></div>
    <div><div class="k">Language</div><div class="v">${esc(item.language)}</div></div>
    <div><div class="k">Type</div><div class="v">Starred (oral)</div></div>
    <div><div class="k">Question Hour</div><div class="v">Not on a Tuesday</div></div></div></div>`;
}

function rulingsHtml(note) {
  if (!note || note.emptyRulings || !note.rulings?.length) {
    return `<div class="rulings-empty"><b>No past ruling found.</b> Search of the rulings archive (1999–2017 clean set; 1947–1997 scan) returned no directly applicable holding.</div>`;
  }
  return `<div class="rulings-list">${note.rulings.map((ruling) => `<div class="ruling-card"><div class="rc-head"><span class="id">${esc(ruling.id)}</span><span class="pg">${ruling.pdfUrl ? `<a href="${esc(ruling.pdfUrl)}#page=${esc(ruling.pdfPage)}" target="_blank" rel="noreferrer">Open PDF page ${esc(ruling.pdfPage)}</a>` : `PDF page ${esc(ruling.pdfPage)}`} · ${esc(ruling.volume)}</span></div>
    <div class="rc-body"><div class="page-thumb"><div class="page-num">p.${esc(ruling.pdfPage)}</div></div><div><div class="subject">${esc(ruling.subject)}</div><div class="quote">"${esc(ruling.headnote || ruling.decision)}"</div><div class="ctx">Chair · ${esc(ruling.debateDate || "date as printed")} · ${esc(ruling.volume)}</div></div></div></div>`).join("")}</div>`;
}

function checklistHtml(clauses) {
  const ordered = [...clauses].sort((a, b) => Number(a.pass) - Number(b.pass));
  return `<div class="checklist">${ordered.map((clause) => `<div class="check-item ${clause.pass ? "pass" : "fail"}"><div class="mark">${clause.pass ? "✓" : "✗"}</div><div class="body"><div class="rule">${esc(clause.text)} <span class="clause">78(${esc(clause.id)})</span></div><div class="verdict">${esc(clause.verdict)}</div>${clause.quoted ? `<div class="quoted">"${esc(clause.quoted)}"</div>` : ""}</div></div>`).join("")}</div>`;
}

function viewNote() {
  const note = file.note;
  const source = note?.modelError
    ? `The model call failed (${note.modelError}). This draft was prepared from Rule 78 and the rulings archive instead.`
    : note?.source === "llm"
      ? `Drafted by ${note.model || "the connected model"}. Only rulings the search returned are shown.`
      : "Prepared from Rule 78 and a search of the rulings archive. No model was called.";
  return `<button class="back-link" id="backInbox" type="button"><span>←</span><span>Back to inbox</span></button>
    <div class="note-layout"><div>${fileHeaderCard(file)}${clockCard(file)}${timelineCard(file)}${questionCard(file)}</div>
    <div class="note-sheet"><div class="note-header"><div class="note-stamp">Note on the file</div><div class="note-eyebrow">Section Officer's note · Questions Branch</div><div class="note-title">Admissibility of ${esc(file.id)}</div>
      <div class="note-subtitle">${source} <b style="color:var(--warning);"> Draft for the officer. The Speaker decides.</b></div></div>
      <div class="note-body">
        <div class="note-section"><h3><span class="num">1</span> What the member is asking</h3><div class="prose"><p>${esc(note?.summary || "")}</p></div></div>
        <div class="note-section"><h3><span class="num">2</span> ${file.kind === "letter" ? "What this letter needs" : file.kind === "adjournment" ? "Test against Rule 111" : file.kind === "privilege" ? "Test against Rule 95" : "Test against Rule 78 (Rules of Procedure, 2007)"}</h3>${note ? checklistHtml(note.clauses) : ""}</div>
        <div class="note-section"><h3><span class="num">3</span> Closest rulings of the Chair</h3>${rulingsHtml(note)}</div>
        <div class="note-section"><h3><span class="num">4</span> Section Officer's line</h3><div class="officer-edit"><div class="lbl">You may edit this before the file walks up:</div><textarea id="officerLine">${esc(file.officerLine || note?.officerLine || "")}</textarea></div></div>
        <div class="ask-box"><span class="ico">💬</span><input id="askInput" placeholder="Ask about this note…"><button class="send-btn" id="askBtn" type="button">Ask</button></div>
      </div>
      <div class="note-actions"><div class="caveat"><b>The model does not decide.</b> This note is a working aid. The Hon. Speaker's decision on the file is final under Rule 28.</div>
      <div style="display:flex;gap:8px;"><button class="btn btn-ghost" id="saveDraft" type="button">Save draft</button><button class="btn btn-primary" id="sendUp" type="button"><span>Send to the Joint Secretary</span><span>↗</span></button></div></div>
    </div></div>`;
}

function viewSpeaker() {
  const note = file.note;
  const failed = (note?.clauses || []).filter((clause) => !clause.pass);
  const passed = (note?.clauses || []).length - failed.length;
  const now = new Date();
  const nowStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} · Islamabad`;
  return `<div class="speaker-header-card"><div class="speaker-avatar">AS</div><div class="who"><h2>Sardar Ayaz Sadiq</h2><div class="role">Speaker of the National Assembly · elected 1 March 2024</div><div class="now">${nowStr}</div></div>
    <div class="rule-cite"><b>RULE 28</b><p>The decision of the Speaker on the file or from the Chair shall be final unless the House rescinds it.</p></div></div>
    <div class="note-layout"><div>${fileHeaderCard(file)}${clockCard(file)}${timelineCard(file)}${questionCard(file)}</div><div>
      <div class="note-sheet"><div class="note-header"><div class="note-stamp" style="border-color:rgba(4,120,87,0.5);color:rgba(4,120,87,0.7);">Received on Speaker's desk</div><div class="note-eyebrow">Section Officer's note · from Saima Malik, Questions Branch</div><div class="note-title">Admissibility of ${esc(file.id)}</div><div class="note-subtitle">Reviewed by the officer and forwarded.</div></div>
        <div class="note-body">
          <div class="note-section"><h3><span class="num">1</span> What the member is asking</h3><div class="prose"><p>${esc(note?.summary || "")}</p></div></div>
          <div class="note-section"><h3><span class="num">2</span> Rule 78 — ${failed.length} failure${failed.length === 1 ? "" : "s"} noted</h3>${checklistHtml(failed)}<div style="padding-top:6px;font-size:11px;color:var(--text-muted);">${passed} other clauses of Rule 78 pass on the face of this notice.</div></div>
          <div class="note-section"><h3><span class="num">3</span> Rulings of the Chair on point</h3>${rulingsHtml(note)}</div>
          <div class="note-section"><h3><span class="num">4</span> The line, and who has already seen it</h3><div class="officer-edit"><div style="padding:12px 14px;background:rgba(255,255,255,0.7);border:1px solid var(--note-line);border-radius:8px;font-family:'Fraunces',serif;font-size:13px;line-height:1.6;">${esc(file.officerLine || "")}</div><div class="stamp-row">${(file.minutes || []).map((m) => `<div class="ink-stamp seen">${esc(m.name)}<div>${esc(m.text)} · ${esc(m.at)}</div></div>`).join("")}</div></div></div>
        </div></div>
      <div class="decision-panel"><h3>Your decision, Speaker</h3><div class="sub">Under Rule 28, your decision on the file is final. The model does not sign.</div>
        <div class="decision-choices">
          <div class="decision-choice allow" data-choice="allow"><div class="verdict">${file.kind === "letter" ? "Approve" : "Allow"}</div><div class="rule-ref">${file.kind === "letter" ? "Direction on the letter" : "Admit"}</div><div class="desc">${file.kind === "letter" ? "Approve what the letter asks and send it on." : "Admit the paper and send it on."}</div></div>
          <div class="decision-choice reject" data-choice="reject"><div class="verdict">${file.kind === "letter" ? "Send back" : "Reject"}</div><div class="rule-ref">${file.kind === "letter" ? "More work needed" : "Disallow"}</div><div class="desc">${file.kind === "letter" ? "Send the letter back. It is not ready." : "Disallow the notice. The member will be told."}</div></div>
          <div class="decision-choice amend" data-choice="amend"><div class="verdict">${file.kind === "letter" ? "Record a direction" : "Fix the wording"}</div><div class="rule-ref">${file.kind === "letter" ? "In the Speaker's words" : "Amend in form"}</div><div class="desc">${file.kind === "letter" ? "Write the direction below. That is what the office will carry out." : "Rewrite the notice below. The amended text is what will be sent on."}</div></div>
        </div>
        <div class="amend-box" id="amendBox"><label>Amended wording (in your words)</label><textarea id="amendText" placeholder="Write the wording as it should stand…"></textarea></div>
        <div class="sign-block"><div><div class="caption">Signature</div><div class="signature-preview" id="sigPreview">Ayaz Sadiq</div><div style="font-size:10px;color:var(--text-muted);margin-top:2px;font-family:'JetBrains Mono',monospace;">Will bear the seal of the Office of the Speaker</div></div>
        <div class="stamp">Office of<b>Speaker</b>NA</div>
        <button class="btn-sign" id="signBtn" type="button" disabled><span>✒</span><span>Sign &amp; record on file</span></button></div>
      </div></div></div>`;
}

function viewReturned() {
  const dec = file.decision || "allow";
  const when = file.decidedAt ? new Date(file.decidedAt) : new Date();
  const banner = dec === "allow" ? "✓ Admitted" : dec === "reject" ? "✗ Disallowed" : "✎ Amended in form";
  const decisionText = dec === "allow"
    ? "Admitted. Let the question be placed on the list for oral answer by the Health Minister."
    : dec === "reject"
      ? "Disallowed. The member will be told the question will not be asked."
      : `Admitted in the following amended form —\n\n"${file.amendedText || ""}"`;
  const next = file.dispatched
    ? `<div class="next-step-card"><div class="icon-big" style="background:#ecfdf5;color:var(--success);">✓</div><div class="body"><h4>Decision carried out</h4><p>Under Rule 82, the Minister's answer is printed with the question if it arrives at least 48 hours before Question Hour. It does not return to the Speaker for approval.</p></div></div>`
    : dec === "reject"
      ? `<div class="next-step-card reject"><div class="icon-big">✉</div><div class="body"><h4>Next step: inform the Member</h4><p>Tell ${esc(file.memberName)} the question will not be asked.</p></div><button class="btn btn-primary" id="carryOut" type="button"><span>Send letter to Member</span><span>↗</span></button></div>`
      : `<div class="next-step-card"><div class="icon-big">↗</div><div class="body"><h4>Next step: send this question to the Health Minister</h4><p>The admitted ${dec === "amend" ? "amended " : ""}text goes to the Ministry for a starred answer.</p></div><button class="btn btn-primary" id="carryOut" type="button"><span>Dispatch to Minister</span><span>↗</span></button></div>`;
  return `<button class="back-link" id="backInbox" type="button"><span>←</span><span>Back to inbox</span></button>
    <div class="page-head"><h1>File returned to your desk</h1><div class="sub">The Speaker has signed. Carry out the decision.</div></div>
    <div class="note-layout"><div>${fileHeaderCard(file)}${clockCard(file)}${timelineCard(file)}</div><div>
      ${file.followUp ? `<div class="next-step-card" style="margin-bottom:14px;"><div class="icon-big">→</div><div class="body"><h4>Follow-up</h4><p><b>${esc(file.followUp.who)}</b> · ${esc(file.followUp.action)}</p><p>Due ${esc(file.followUp.due)}</p></div></div>` : ""}
      <div class="decision-record ${dec}"><span class="verdict-banner">${banner}</span><div class="quoted-decision" style="white-space:pre-wrap;">${esc(decisionText)}</div>
        <div class="sig-row"><div class="sig-left"><div class="signature">Ayaz Sadiq</div><div class="printed">Sardar Ayaz Sadiq · Speaker of the National Assembly</div><div class="ts">Signed ${when.toDateString()} · ${String(when.getHours()).padStart(2, "0")}:${String(when.getMinutes()).padStart(2, "0")}</div></div><div class="sig-right"><div class="stamp">Office of<b>Speaker</b>NA</div></div></div></div>
      ${next}</div></div>`;
}

async function openFile(id) {
  let data = await api(`/api/files/${id}`);
  file = data.file;
  if (user.role === "officer" && file.desk === "section_officer" && !file.note) {
    data = await api(`/api/files/${file.id}/note`, { method: "POST" });
    file = data.file;
    toast(file.note?.source === "llm" ? "Note drafted with the model." : "Note prepared from the rules and the archive.");
  }
  if (file.desk === "speaker" && user.role === "speaker") screen = "speaker";
  else if (file.desk === "section_officer_return" || file.desk === "done") screen = "returned";
  else if (file.desk === "speaker") screen = "inbox";
  else screen = "note";
  render();
}

function viewChain() {
  const mine = files.find((item) => item.desk === user.role);
  const posts = {
    js: {
      title: "Joint Secretary",
      name: "Tariq Mehmood",
      job: "You do not decide the question. You check that Saima Malik’s note has the rule, the ruling page, and the five-day clock, then you send it to the Special Secretary.",
      help: "The note cites Rule 78(d) and 78(f), and a ruling at PDF page 15. The clock ends 6 September. Nothing is missing.",
      next: "Stamp and send to the Special Secretary",
    },
    special: {
      title: "Special Secretary",
      name: "Farah Jameel",
      job: "You are the last look before the Secretary. You agree with the note, or you send it back. You do not sign for the Speaker.",
      help: "Joint Secretary has seen it. The recommendation is still disallow. If you agree, it goes to the Secretary to be placed before the Speaker.",
      next: "Agree and send to the Secretary",
    },
    secgen: {
      title: "Secretary",
      name: "Saeed Ahmad Maitla",
      job: "Notices are addressed to you. You place a complete file before the Speaker. The decision on the question is his.",
      help: "Section Officer, Joint Secretary, and Special Secretary have all seen this note. It is fit to go up.",
      next: "Place before the Speaker",
    },
  }[user.role];
  if (!mine) {
    return `<div class="page-head"><h1>${posts.title}</h1><div class="sub">${posts.job}</div></div><article class="note-sheet"><div class="note-body"><p>Nothing is on your desk. The health-units file is still with an earlier officer. It reaches you only after they stamp it forward. Sign in as the section officer and send it up if you are showing the line from the start.</p></div></article>`;
  }
  const minutes = (mine.minutes || []).map((m) => `<div class="ink-stamp seen">${esc(m.name)}<div>${esc(m.text)}</div></div>`).join("");
  return `<div class="page-head"><h1>${posts.title}</h1><div class="sub">${posts.job}</div></div>
    <article class="note-sheet"><div class="note-header"><div class="note-stamp">${posts.name}</div><div class="note-title">${esc(mine.id)} · ${esc(mine.subject)}</div><div class="note-subtitle">${aiTag("06:10")} · ${posts.help}</div></div>
    <div class="note-body"><p>${esc(mine.officerLine || mine.note?.summary || "The section officer’s note is on the file.")}</p>
    <div class="stamp-row"><div class="ink-stamp seen">Saima Malik<div>Section Officer</div></div>${minutes}</div></div>
    <div class="note-actions"><button class="btn btn-primary" id="stampBtn" data-id="${mine.id}" type="button">${posts.next}</button></div></article>`;
}

function aiTag(time) {
  return `<span class="ai-tag">Prepared ${time}</span>`;
}

function viewHome() {
  return `<div class="brief-card">
      <div class="brief-who"><div class="brief-mark">Office brief</div><div>For Sardar Ayaz Sadiq · Friday 25 September 2026 · 07:05</div></div>
      <p class="brief-say">Speaker, this is your morning. Four papers need your hand. Saima Malik in the Questions Branch has already examined the health question and the Peshawar motion. Protocol has written the brief for the Ambassador at 11:00. The secretariat turned yesterday’s committee recording into three decisions. A call from the Finance Minister is already text. Six mentions of the House came in overnight. Nothing has been released, and nothing has been signed, until you say so.</p>
    </div>
    <div class="page-head"><h1>Good morning, Speaker</h1><div class="sub">Your office prepared this before you sat down. Every row opens. Sample day.</div></div>
    <div class="stat-row">
      <button class="stat" data-go="inbox"><b>4</b><span>files for signature</span></button>
      <button class="stat" data-go="meetings"><b>2</b><span>meetings today</span></button>
      <button class="stat" data-go="calls"><b>1</b><span>call transcribed</span></button>
      <button class="stat" data-go="directions"><b>3</b><span>directions open</span></button>
      <button class="stat warn" data-go="directions"><b>1</b><span>due today</span></button>
      <button class="stat" data-go="press"><b>6</b><span>mentions overnight</span></button>
    </div>
    <div class="desk-split">
      <section class="desk-col">
        <h3>Needs you now ${aiTag("06:10")}</h3>
        <button class="work-row" data-open="Q-2026-0881"><div class="when">File</div><div><b>Q-2026-0881 · Vacant teaching posts, NA-54</b><p>Already through the Secretary. Saima Malik says Rule 78 is met. A 2012 ruling is on page 146. Your signature is the only step left.</p></div><span class="pill pill-warn">Sign</span></button>
        <button class="work-row" data-open="AM-2026-0441"><div class="when">File</div><div><b>AM-2026-0441 · Power cuts in Peshawar</b><p>Already through the Secretary. She recommends refusal. City supply is provincial. Ruling of 8 June 2004, page 15.</p></div><span class="pill pill-warn">Sign</span></button>
        <button class="work-row" data-open="LTR-2026-019"><div class="when">Letter</div><div><b>LTR-2026-019 · Maldives return visit</b><p>Protocol asks which of three November dates to offer. No rule test. You choose a date or refuse.</p></div><span class="pill pill-starred">Direct</span></button>
        <button class="work-row" data-go="meetings"><div class="when">11:00</div><div><b>H.E. Ambassador of China</b><p>Brief ready. No agreement today. One line suggested for you to open with.</p></div><span class="pill pill-ok">Brief</span></button>
        <button class="work-row" data-go="speech"><div class="when">Evening</div><div><b>Welcome, parliamentary delegation</b><p>142 words. Four minutes. On the prompter. Not approved yet.</p></div><span class="pill pill-starred">Read</span></button>
      </section>
      <section class="desk-col">
        <h3>Arrived overnight ${aiTag("05:40")}</h3>
        <button class="work-row" data-go="mail"><div class="when">Email</div><div><b>From a member’s office · 22:14</b><p>Notice Office logged it at 22:16. PDF attached. It is now file Q-2026-0917. Saima Malik wrote the note at 06:10.</p></div><span class="pill pill-warn">New</span></button>
        <button class="work-row" data-go="calls"><div class="when">09:40</div><div><b>Finance Minister · 4 min 12 sec</b><p>Transcript: posts can be filled from the current budget. He wants the constituency list. Linked to the health file.</p></div><span class="pill pill-ok">Text</span></button>
        <button class="work-row" data-go="meetings"><div class="when">Minutes</div><div><b>Gender committee · yesterday</b><p>Three decisions. One action for the secretariat, due Monday. Waiting for you to accept the record.</p></div><span class="pill pill-starred">Review</span></button>
        <button class="work-row" data-go="press"><div class="when">Press</div><div><b>6 mentions · 2 need a reply</b><p>Dawn, Radio Pakistan. Draft statement is two sentences. Not released.</p></div><span class="pill pill-warn">Approve</span></button>
        <button class="work-row" data-go="cards"><div class="when">Eid</div><div><b>12 Speakers · greeting not sent</b><p>Text is ready. You can drop a name before it goes.</p></div><span class="pill pill-ok">Hold</span></button>
      </section>
    </div>
    <article class="sign-sheet" id="signSheet">
      <div class="sign-top"><div><div class="k">Q-2026-0917 · for your hand</div><h2>Doctors at basic health units, NA-120</h2><p>The note recommends disallow. The notice asks for the Minister’s opinion, and it is 157 words. Ruling of the Chair, 8 June 2004, PDF page 15.</p></div><div class="seal">Office of<b>Speaker</b></div></div>
      <div class="sign-hands">
        <div><div class="role">Section officer</div><div class="hand officer">Saima Malik</div><div class="meta">Questions Branch · noted 06:10</div></div>
        <div><div class="role">Speaker</div><div class="hand speaker" id="speakerHand"> </div><div class="meta" id="speakerMeta">Not signed</div></div>
      </div>
      <button class="btn-sign" id="demoSign" type="button"><span>✒</span><span>Sign this file</span></button>
    </article>
    <div class="day-strip"><div><b>09:40</b> Call, already text</div><div><b>10:00</b> Four files</div><div><b>11:00</b> Ambassador</div><div><b>16:30</b> Speech, if you approve</div></div>`;
}

function viewDay(which) {
  const pages = {
    meetings: ["Meetings", "Two meetings today. Briefs were written at 05:50 from the invitation and the last visit.", `<div class="desk-split"><section class="desk-col"><article class="note-sheet"><div class="note-header"><div class="note-stamp">11:00 · Committee Room 2</div><div class="note-title">H.E. Ambassador of China</div><div class="note-subtitle">${aiTag("05:50")} · 20 minutes · no document to sign</div></div><div class="note-body"><p><b>Who.</b> Ambassador Jiang Yiliang. Third call this year.</p><p><b>Why.</b> Parliamentary friendship group, and a note on agricultural trade from March that was never answered.</p><p><b>Open with.</b> Welcome him, thank the friendship group, and ask for the written points after the meeting. Do not announce an agreement.</p><p><b>Avoid.</b> The boundary question raised in yesterday’s press. It is not on his agenda.</p></div><div class="note-actions"><button class="btn btn-primary" data-approve="11:00 brief accepted">Accept this brief</button></div></article></section><section class="desk-col"><article class="note-sheet"><div class="note-header"><div class="note-stamp">Yesterday · accepted if you tap</div><div class="note-title">Minutes · Special Committee on Gender</div><div class="note-subtitle">${aiTag("18:40")} · from a 46-minute recording</div></div><div class="note-body"><p>1. The secretariat will circulate the draft note by Monday.</p><p>2. The Ministry will send the vacancy figures for NA-120.</p><p>3. No resolution was moved.</p><p style="margin-top:8px;color:var(--text-muted);">Attendance 11 of 16. You were not in the chair. This record is for you to accept, not to rewrite the meeting.</p></div><div class="note-actions"><button class="btn btn-primary" data-approve="Minutes accepted">Accept the minutes</button></div></article><article class="note-sheet" style="margin-top:14px;"><div class="note-header"><div class="note-stamp">16:30 · your office</div><div class="note-title">Maldives friendship group</div><div class="note-subtitle">${aiTag("06:05")} · follow-up of the 22 September call</div></div><div class="note-body"><p>They asked for a return visit in November. Protocol has three dates. Nothing is confirmed until you pick one.</p></div></article></section></div>`],
    diary: ["Diary", "Protocol checked the invitations against your day at 06:00. Two clashes were refused before you saw them.", `<div class="file-table"><table><thead><tr><th>Time</th><th>Engagement</th><th>Who prepared it</th><th></th></tr></thead><tbody>
      <tr><td>09:40</td><td>Call, Finance Minister. Already text.</td><td>Secretariat, 09:46</td><td><span class="pill pill-ok">Done</span></td></tr>
      <tr><td>10:00</td><td>Four files for signature. Health question first.</td><td>Saima Malik, 06:10</td><td><span class="pill pill-warn">You</span></td></tr>
      <tr><td>11:00</td><td>Ambassador of China. Committee Room 2. Brief accepted only if you tap.</td><td>Protocol, 05:50</td><td><span class="pill pill-starred">Brief</span></td></tr>
      <tr><td>13:00</td><td>Lunch held clear. A chamber group asked for this hour. Protocol declined it.</td><td>Protocol, 06:00</td><td><span class="pill pill-ok">Refused</span></td></tr>
      <tr><td>16:30</td><td>Welcome remarks, delegation. 142 words. Not on the prompter until you approve.</td><td>Speech cell, 06:20</td><td><span class="pill pill-warn">You</span></td></tr>
    </tbody></table></div>`],
    speech: ["Speeches", "Speech cell drafted this from last year’s welcome and today’s guest list. 142 words. About four minutes.", `<div class="note-layout"><div class="note-sheet"><div class="note-header"><div class="note-stamp">Speech cell · 06:20</div><div class="note-title">Welcome, parliamentary delegation</div><div class="note-subtitle">${aiTag("06:20")} · not approved · prompter is locked</div></div><div class="note-body"><p>Honourable guests. You are welcome in this House. This friendship is old, and we mean to keep it practical. We will hear the points you have brought. What we agree, we will put in writing. What we cannot settle today, we will not pretend to settle.</p><p style="margin-top:10px;color:var(--text-muted);">Left out on purpose: the boundary question in this morning’s press. It is not theirs to answer.</p></div><div class="note-actions"><button class="btn btn-primary" data-approve="Speech approved. The prompter is unlocked.">Approve for the prompter</button></div></div><div class="prompter-box">Honourable guests. You are welcome in this House. This friendship is old, and we mean to keep it practical. We will hear the points you have brought.</div></div>`],
    calls: ["Calls", "The 09:40 call was recorded and turned into text at 09:46. Sample names.", `<article class="note-sheet"><div class="note-header"><div class="note-stamp">Incoming · 4 min 12 sec</div><div class="note-title">Finance Minister</div><div class="note-subtitle">${aiTag("09:46")} · linked to Q-2026-0917</div></div><div class="note-body"><p>“The medical-officer posts can be filled from the current budget. Send me the list for NA-120 only. I will not answer a question that asks for my view.”</p><p style="margin-top:10px;"><b>What was agreed.</b> He will take a factual question. He will not take the opinion sentence.</p><p><b>What you owe him.</b> The constituency list, from the Questions Branch, today.</p><p style="margin-top:10px;color:var(--text-muted);">Logged by the reception desk. You do not need the recording unless the line above is wrong.</p></div><div class="note-actions"><button class="btn btn-primary" data-approve="Call note placed on Q-2026-0917">Put this on the health file</button></div></article>`],
    press: ["Press", "Six mentions between midnight and 06:00. Two need a sentence from you. Nothing has been released.", `<article class="note-sheet"><div class="note-header"><div class="note-stamp">Press cell · 06:05</div><div class="note-title">This morning’s mentions</div><div class="note-subtitle">${aiTag("06:05")} · papers and radio · sample headlines</div></div><div class="note-body"><p>1. Dawn — Speaker receives a parliamentary delegation today. No reply needed.</p><p>2. Radio Pakistan — Health committee will ask for vacancy figures. No reply needed.</p><p>3. An evening channel — claims you refused a privilege notice last week. You did not. This one needs a line.</p><p>4. A regional paper — power cuts in Peshawar, and a member says he will move adjournment. Tied to AM-2026-441. No public line until you sign that file.</p><p style="margin-top:12px;"><b>Draft, held.</b> The Speaker’s office notes that no privilege notice was refused last week. The paper on the Peshawar cuts is still with the Speaker. There is no further comment today.</p></div><div class="note-actions"><button class="btn btn-primary" data-approve="Statement approved. Press cell may release it.">Approve the statement</button></div></article>`],
    cards: ["Cards", "Eid. Twelve Speakers of friendly parliaments. The words are ready. None have been sent.", `<article class="note-sheet"><div class="note-header"><div class="note-stamp">Protocol · not dispatched</div><div class="note-title">Eid greeting</div><div class="note-subtitle">${aiTag("yesterday")} · you approve the words, Protocol sends them</div></div><div class="note-body"><p>Eid Mubarak. With respect, from the National Assembly of Pakistan.</p><p style="margin-top:10px;">China, Türkiye, Saudi Arabia, Maldives, Azerbaijan, Qatar, Iran, Malaysia, Indonesia, Egypt, Jordan, the United Kingdom. Twelve. Maldives is also on today’s 16:30 meeting, so Protocol will not send that card until after the call.</p></div><div class="note-actions"><button class="btn btn-primary" data-approve="Greeting approved. Maldives held until after 16:30.">Approve, hold Maldives</button></div></article>`],
    q0917: ["Q-2026-0917", "Saima Malik examined this at 06:10. It is waiting for your hand.", `<article class="note-sheet"><div class="note-header"><div class="note-stamp">Questions Branch · Saima Malik</div><div class="note-title">Doctors at basic health units, NA-120</div><div class="note-subtitle">${aiTag("06:10")} · starred question · from a sample member · to the Health Minister</div></div><div class="note-body"><p>The member asks how many basic health units in NA-120 have no doctor, how long the posts have been empty, and what the Ministry is doing. The last sentence asks for the Minister’s view on whether the allocation is adequate.</p><p style="margin-top:10px;"><b>Rule 78.</b> That last sentence fails. A question may not ask for an opinion. The notice is also 157 words. The ordinary limit is 150.</p><p style="margin-top:10px;"><b>Ruling.</b> On 8 June 2004 the Chair refused an adjournment motion when the Minister denied the facts. PDF page 15, rulings 1999–2017. The officer’s line: disallow, and invite a shorter question that asks only for the numbers.</p><p style="margin-top:10px;">Her signature is already on the note. Yours is not.</p></div><div class="note-actions"><button class="btn btn-primary" data-approve="Marked for your signature. Open Files to sign a live file.">Hold for signature</button></div></article>`],
    am441: ["AM-2026-441", "Saima Malik examined this at 06:22. One definite issue. She marked it urgent.", `<article class="note-sheet"><div class="note-header"><div class="note-stamp">Questions Branch · Saima Malik</div><div class="note-title">Power cuts in Peshawar</div><div class="note-subtitle">${aiTag("06:22")} · adjournment motion · received this morning</div></div><div class="note-body"><p>The member wants the House to pause the day and discuss overnight power cuts in Peshawar. One city, one night, one issue.</p><p style="margin-top:10px;"><b>Rule 111.</b> It is urgent and it is one issue. Electricity supply of this kind has been treated as a provincial matter. The Chair has refused adjournment motions that are not primarily for the Federal Government.</p><p style="margin-top:10px;"><b>Officer’s line.</b> Refuse consent. Tell the member a question to the Power Division, on the federal plants only, would be in order.</p></div><div class="note-actions"><button class="btn btn-primary" data-approve="Held. Consent not given until you sign.">Hold for signature</button></div></article>`],
    mail: ["Email · 22:14", "This is how the health question entered the office. Sample message.", `<article class="note-sheet"><div class="note-header"><div class="note-stamp">Notice Office · 22:16</div><div class="note-title">Question on basic health units</div><div class="note-subtitle">From a member’s office · official email · PDF attached</div></div><div class="note-body"><p><b>To</b> the Secretary, National Assembly.</p><p style="margin-top:8px;">Sir, I attach a starred question for the Health Minister on basic health units in NA-120. Please place it before the Speaker.</p><p style="margin-top:8px;"><b>Attachment.</b> Question-NA-120.pdf · 1 page.</p><p style="margin-top:12px;">22:16 · Notice Office registered it as <b>Q-2026-0917</b> and sent it to the Questions Branch.</p><p>06:10 · Saima Malik read the PDF, checked Rule 78, found the 8 June 2004 ruling, and put the note on the file.</p></div><div class="note-actions"><button class="btn btn-primary" data-go="q0917">Open the file she wrote</button></div></article>`],
    directions: ["Directions", "What you have already signed, who has it, and when it is due.", `<div class="file-table"><table><thead><tr><th>Direction</th><th>Who</th><th>Due</th><th></th></tr></thead><tbody>
      <tr><td>Tell the member the health question was not allowed</td><td>Questions Branch</td><td>6 September</td><td><span class="pill pill-warn">Due</span></td></tr>
      <tr><td>Send the committee note</td><td>Secretariat</td><td>Monday</td><td><span class="pill pill-ok">On time</span></td></tr>
      <tr><td>Written reply to the Ambassador</td><td>Protocol</td><td>Next week</td><td><span class="pill pill-ok">On time</span></td></tr>
    </tbody></table></div>`],
  };
  const page = pages[which];
  return `<button class="back-link" data-go="home" type="button"><span>←</span><span>This morning</span></button><div class="page-head"><h1>${page[0]}</h1><div class="sub">${page[1]}</div></div>${page[2]}`;
}

function bind() {
  document.querySelectorAll("[data-open]").forEach((btn) => { btn.onclick = () => openFile(btn.dataset.open); });
  document.querySelectorAll("[data-go]").forEach((btn) => { btn.onclick = () => { screen = btn.dataset.go; render(); }; });
  const stamp = $("stampBtn");
  if (stamp) stamp.onclick = async () => {
    await api(`/api/files/${stamp.dataset.id}/forward`, { method: "POST", body: JSON.stringify({ minute: "Seen. The note is complete. Forwarded." }) });
    stamp.disabled = true;
    toast("Stamped. The file has left your desk.");
    await refreshFiles();
    render();
  };
  const demoSign = $("demoSign");
  if (demoSign) demoSign.onclick = () => {
    const hand = $("speakerHand");
    hand.textContent = "Ayaz Sadiq";
    hand.classList.add("inked");
    $("speakerMeta").textContent = "Signed · just now · sample";
    demoSign.disabled = true;
    toast("Your signature is on the file.");
  };
  document.querySelectorAll("[data-approve]").forEach((btn) => { btn.onclick = () => toast(btn.dataset.approve); });
  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.onclick = () => { filter = btn.dataset.filter; screen = "inbox"; render(); };
  });
  const add = $("newFile");
  if (add) add.onclick = async () => {
    const picked = $("newPdf").files[0];
    if (!picked) { toast("Attach a PDF."); return; }
    const form = new FormData();
    form.append("kind", $("newKind").value);
    form.append("subject", $("newSubject").value);
    form.append("pdf", picked);
    let created;
    if (import.meta.env.PROD) {
      try { created = demoUpload(form); }
      catch (err) { toast(err.message); return; }
    } else {
      const res = await fetch("/api/files", { method: "POST", body: form, credentials: "same-origin" });
      created = await res.json();
      if (!res.ok) { toast(created.error || "Could not register the file."); return; }
    }
    toast("PDF attached. Writing the note.");
    await refreshFiles();
    await openFile(created.file.id);
  };
  document.querySelectorAll("tr.clickable").forEach((row) => { row.onclick = () => openFile(row.dataset.id); });
  document.querySelectorAll("[data-nav]").forEach((btn) => {
    if (btn.disabled) return;
    btn.onclick = () => {
      const key = btn.dataset.nav;
      if (key === "chain") screen = "chain";
      if (key === "home") screen = "home";
      if (key === "inbox") { filter = "desk"; screen = "inbox"; }
      if (["directions", "meetings", "diary", "speech", "calls", "press", "cards"].includes(key)) screen = key;
      if (key === "note") {
        const item = files.find((f) => f.desk === "section_officer");
        if (item) return openFile(item.id);
        screen = "inbox";
      }
      if (key === "sent") { filter = "sent"; screen = "inbox"; }
      if (key === "done") {
        const item = files.find((f) => f.dispatched || f.desk === "section_officer_return" || f.desk === "done");
        if (item) return openFile(item.id);
        screen = "inbox";
      }
      render();
    };
  });
  const reset = $("resetDemo");
  if (reset) reset.onclick = async () => {
    await api("/api/reset", { method: "POST" });
    user = null;
    file = null;
    showApp(false);
    toast("Demo reset. Sign in again.");
  };
  const back = $("backInbox");
  if (back) back.onclick = () => { screen = "inbox"; render(); };
  const save = $("saveDraft");
  if (save) save.onclick = async () => {
    const data = await api(`/api/files/${file.id}/line`, { method: "POST", body: JSON.stringify({ officerLine: $("officerLine").value }) });
    file = data.file;
    toast("Draft saved.");
  };
  const send = $("sendUp");
  if (send) send.onclick = async () => {
    await api(`/api/files/${file.id}/line`, { method: "POST", body: JSON.stringify({ officerLine: $("officerLine").value }) });
    await api(`/api/files/${file.id}/send`, { method: "POST" });
    toast("Sent to the Joint Secretary. He must see it before the Speaker does.");
    await refreshFiles();
    screen = "inbox";
    filter = "sent";
    render();
  };
  const ask = $("askBtn");
  if (ask) ask.onclick = () => toast("Asking about the note is not connected in this cut.");
  document.querySelectorAll(".decision-choice").forEach((choice) => {
    choice.onclick = () => {
      pendingChoice = choice.dataset.choice;
      document.querySelectorAll(".decision-choice").forEach((el) => el.classList.remove("active"));
      choice.classList.add("active");
      $("amendBox").classList.toggle("show", pendingChoice === "amend");
      $("signBtn").disabled = false;
    };
  });
  const sign = $("signBtn");
  if (sign) sign.onclick = async () => {
    const wording = $("amendText")?.value || "";
    await api(`/api/files/${file.id}/decide`, { method: "POST", body: JSON.stringify({ decision: pendingChoice, wording }) });
    pendingChoice = null;
    toast("Signed. The file is back with the section officer.");
    await loginAs("officer");
    const item = files.find((f) => f.decision);
    if (item) await openFile(item.id);
    else render();
  };
  const carry = $("carryOut");
  if (carry) carry.onclick = async () => {
    const data = await api(`/api/files/${file.id}/carry-out`, { method: "POST" });
    file = data.file;
    toast(file.decision === "reject" ? "Letter sent to the Member." : "Question dispatched to the Health Minister.");
    await refreshFiles();
    render();
  };
}

document.querySelectorAll(".role-chip").forEach((chip) => {
  chip.onclick = () => {
    document.querySelectorAll(".role-chip").forEach((el) => el.classList.remove("active"));
    chip.classList.add("active");
    const creds = DEMO[chip.dataset.role];
    $("loginEmail").value = creds.email;
    $("loginPassword").value = creds.password;
  };
});

$("loginBtn").onclick = async () => {
  try {
    const data = await api("/api/login", { method: "POST", body: JSON.stringify({ email: $("loginEmail").value, password: $("loginPassword").value }) });
    user = data.user;
    await refreshFiles();
    filter = "desk";
    screen = data.user.role === "speaker" ? "home" : data.user.role === "officer" ? "inbox" : "chain";
    showApp(true);
    render();
  } catch (err) {
    toast(err.message);
  }
};

$("signOut").onclick = async () => {
  await api("/api/logout", { method: "POST" });
  user = null;
  file = null;
  showApp(false);
};

$("rolePill").onclick = (event) => {
  event.stopPropagation();
  $("roleMenu").classList.toggle("show");
};
document.querySelectorAll("#roleMenu button").forEach((btn) => {
  btn.onclick = async () => {
    $("roleMenu").classList.remove("show");
    await loginAs(btn.dataset.role);
    screen = btn.dataset.role === "speaker" ? "home" : btn.dataset.role === "officer" ? "inbox" : "chain";
    filter = "desk";
    render();
  };
});
document.addEventListener("click", (event) => {
  if (!event.target.closest("#rolePill") && !event.target.closest("#roleMenu")) $("roleMenu")?.classList.remove("show");
});
