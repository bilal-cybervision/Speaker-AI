import { icon } from "./icons.js";
import { morningCard } from "./ai-ui.js";
import { MODULES, weekView, APPROVAL_KIND, approvalView, approvalDock } from "./modules.js";
import {
  esc,
  rulingHref,
  shown,
  ROLES,
  STAFF_ORDER,
  DESK,
  NEXT_DESK,
  KIND,
  RULE_FOR,
  choicesFor,
  verdictFor,
  failedClauses,
  daysChip,
  shortDate,
  stamp,
  today,
  sentenceCase,
  titleCase,
  clip,
} from "./ui.js";


/* ---------- Prototype gate ---------- */

export function gateView(error = "") {
  return `<div class="login">
    <section class="login-art">
      <div class="brand"><img src="/crest.svg" alt=""><div><b>National Assembly of Pakistan</b><span>Office of the Speaker</span></div></div>
      <div class="login-hero">
        <h1>Every paper, one decision away.</h1>
        <p>The Secretariat examines. The note is drafted from the Rules and the rulings of the Chair. The Speaker decides and signs.</p>
      </div>
      <div class="login-foot">Proof of concept · private preview</div>
    </section>
    <section class="login-panel">
      <div class="login-box">
        <h2>This preview is private</h2>
        <p>Enter the prototype password to continue.</p>
        <form id="gate-form" class="gate-form">
          <div class="field"><label for="gate-password">Password</label><input class="text" id="gate-password" type="password" autocomplete="current-password" required></div>
          <button class="btn primary" type="submit">Continue</button>
        </form>
        <div class="login-error">${esc(error)}</div>
      </div>
    </section>
  </div>`;
}

/* ---------- Sign in ---------- */

export function loginView(error = "") {
  const row = (role, primary = false) => {
    const person = ROLES[role];
    return `<button class="role-row${primary ? " primary" : ""}" data-action="login" data-role="${role}" type="button">
      <span class="avatar${role === "speaker" ? " gold" : ""}">${person.initials}</span>
      <span><b>${esc(person.name)}</b><span>${esc(person.title)}</span></span>
      ${icon("arrow", "go")}
    </button>`;
  };
  return `<div class="login">
    <section class="login-art">
      <div class="brand"><img src="/crest.svg" alt=""><div><b>National Assembly of Pakistan</b><span>Office of the Speaker</span></div></div>
      <div class="login-hero">
        <h1>Every paper, one decision away.</h1>
        <p>The Secretariat examines. The note is drafted from the Rules and the rulings of the Chair. The Speaker decides and signs.</p>
        <div class="login-points">
          <div>${icon("check")}Rule 78 checked clause by clause, failing words quoted</div>
          <div>${icon("book")}Closest rulings of the Chair, each opening at its PDF page</div>
          <div>${icon("shield")}The model drafts. It never decides and never signs.</div>
        </div>
      </div>
      <div class="login-foot">Proof of concept · synthetic papers only · runs entirely in this browser</div>
    </section>
    <section class="login-panel">
      <div class="login-box">
        <h2>Sign in</h2>
        <p>Choose who you are. One click signs you in.</p>
        <div class="role-list">
          ${row("speaker", true)}
          <div class="role-sep">Secretariat</div>
          ${STAFF_ORDER.map((role) => row(role)).join("")}
        </div>
        <div class="login-error">${esc(error)}</div>
        <div class="login-note">${icon("info")}<span>Demo sign-in only. Papers are made up. The model writes the note in this browser. Daniel can read a short reply aloud. Neither one signs.</span></div>
      </div>
    </section>
  </div>`;
}

/* ---------- Shell ---------- */

export function shellView(state, body, topbar) {
  const role = state.user.role;
  const link = (item) => `<a href="#/${item.id}" class="${state.view === item.id ? "on" : ""}" title="${item.n ? `Module ${item.n} · ` : ""}${item.label}">${icon(item.icon)}<span>${item.label}</span>${state.navCounts[item.id] ? `<em class="count${state.navHot[item.id] ? " hot" : ""}">${state.navCounts[item.id]}</em>` : item.n ? `<i class="mod-n">M${item.n}</i>` : ""}</a>`;
  const desk = { id: "desk", icon: "inbox", label: role === "speaker" ? "My desk" : "Desk" };
  const extras = [
    { id: "ai", icon: "sparkle", label: "Speaker AI" },
    { id: "search", icon: "search", label: "Knowledge search" },
    { id: "intake", icon: "file", label: "Document intelligence" },
  ];
  const people = ["speaker", ...STAFF_ORDER];
  return `<div class="shell">
    <aside class="rail">
      <div class="brand"><img src="/crest.svg" alt="National Assembly of Pakistan"><div><b>Speaker's Office</b><span class="urdu">دفترِ اسپیکر</span></div></div>
      <nav class="nav">
        ${link(desk)}
        ${extras.map(link).join("")}
        <div class="nav-label">Modules</div>
        ${MODULES.map(link).join("")}
        <div class="nav-label">Oversight</div>
        ${link({ id: "notices", icon: "bell", label: "Notifications" })}
      </nav>
      <div class="rail-foot">
        <details class="demo" ${state.demoOpen ? "open" : ""}>
        <summary class="rail-label">${icon("users")}<span>Demo · switch desk</span></summary>
        <div class="switcher">
          ${people.map((key) => `<button type="button" data-action="switch" data-role="${key}" class="${key === role ? "on" : ""}" title="${esc(ROLES[key].title)}">
            <span class="avatar sm${key === "speaker" ? " gold" : ""}">${ROLES[key].initials}</span>
            <span class="who">${esc(key === "speaker" ? "Speaker" : ROLES[key].title.split(" · ")[0])}</span>
            ${state.counts[key] ? `<span class="n">${state.counts[key]}</span>` : ""}
          </button>`).join("")}
        </div>
        </details>
        <div class="rail-actions">
          <button type="button" data-action="reset" title="Reset the sample papers">${icon("reset")}<span>Reset</span></button>
          <button type="button" data-action="logout" title="Sign out">${icon("logout")}<span>Sign out</span></button>
        </div>
      </div>
    </aside>
    <main class="main">
      <div class="banner">Confidential · NA internal network · AI output is advisory</div>
      <header class="topbar">${topbar}</header>
      ${body}
    </main>
  </div>`;
}

export function topbarView(state, title, middle = "") {
  const person = ROLES[state.user.role];
  const avatar = state.user.role === "speaker"
    ? `<span class="avatar gold">${person.initials}</span>`
    : `<span class="avatar">${person.initials}</span>`;
  const unread = state.navCounts.notices || 0;
  return `<h1>${esc(title)}</h1>
    <div class="askbar">${icon("search")}<input id="ask-box" placeholder="${state.rtl ? "اسپیکر AI سے پوچھیں یا ریکارڈ تلاش کریں…" : "Ask Speaker AI or search authorised records…"}" value="${esc(state.askDraft || "")}" autocomplete="off"${state.rtl ? ' class="urdu" dir="rtl"' : ""}><button type="button" data-action="open-voice" title="Speak">${icon("mic")} MIC</button></div>
    <div class="spacer"></div>${middle}
    <button class="chip" type="button" data-action="toggle-lang">${state.rtl ? "English" : "English | اردو"}</button>
    <button class="chip ${unread ? "red" : ""}" type="button" data-action="toggle-notices" title="Notifications">${icon("bell")}${unread || ""}</button>
    <span class="chip gold" title="All papers in this demo are made up">Sample data</span>
    <div class="me">${avatar}<div><b>${esc(person.name)}</b><span>${esc(person.title)}</span></div></div>`;
}

/* ---------- Desk ---------- */

export function deskView(state) {
  const file = state.selected;
  return `<div class="desk">
    ${queueView(state)}
    <section class="file">${file ? (file.ref ? approvalView(state, file) + approvalDock(state, file) : fileView(state, file) + dockView(state, file)) : clearView(state)}</section>
  </div>`;
}

function queueView(state) {
  const role = state.user.role;
  const heading = role === "speaker" ? "Awaiting your decision" : "On your desk";
  const query = state.query.trim().toLowerCase();
  const match = (file) => !query || `${file.id} ${file.subject} ${file.memberName} ${KIND[file.kind]}`.toLowerCase().includes(query);
  const groups = state.groups
    .map((group) => ({ ...group, items: group.items.filter(match) }))
    .filter((group) => group.items.length);
  return `<aside class="queue">
    <div class="queue-head">
      <div class="row"><h2>${heading}<small>${state.actionable.length}</small></h2>
        ${role === "officer" ? `<button class="btn sm primary" type="button" data-action="open-register">${icon("plus")}Register</button>` : ""}
      </div>
      <label class="search">${icon("search")}<input id="q" placeholder="Filter papers" value="${esc(state.query)}" autocomplete="off"><kbd>/</kbd></label>
    </div>
    <div class="queue-list">
      ${groups.map((group) => `<div class="group-label"><span>${group.label}</span><span>${group.items.length}</span></div>${group.items.map((file) => itemView(state, file, group.muted)).join("")}`).join("") || `<div class="empty"><b>Nothing here</b>${query ? "No paper matches that filter." : "Nothing is waiting on this desk."}</div>`}
    </div>
  </aside>`;
}

function itemView(state, file, muted) {
  const flags = failedClauses(file).length;
  const where = muted && !file.decision && file.desk !== "done" ? `<span>With ${esc(DESK[file.desk])}</span>` : "";
  return `<button type="button" class="item${state.selectedId === file.id ? " on" : ""}${muted ? " muted" : ""}" data-action="select" data-id="${esc(file.id)}">
    <span class="top"><span class="kind ${file.kind}">${esc(KIND[file.kind] || APPROVAL_KIND[file.kind] || "Paper")}</span><span class="mono">${esc(file.id)}</span>${daysChip(file)}</span>
    <span class="subject">${esc(file.subject)}</span>
    <span class="meta">${flags && !file.decision ? `<span class="flag">${icon("flag")}${flags} flagged</span>` : ""}${where}<span>${esc(clip(file.memberName, 34))}</span></span>
  </button>`;
}

function clearView(state) {
  const role = state.user.role;
  const decided = state.files.filter((file) => file.decision).length;
  return `<div class="file-scroll"><div class="empty" style="margin-top:12vh">
    <div class="ring">${icon("check")}</div>
    <b>Your desk is clear</b>
    <p>${role === "speaker" ? `${decided} paper${decided === 1 ? "" : "s"} decided. Nothing else is waiting for your signature.` : "No file is waiting on this desk. Switch desk on the left to follow a file."}</p>
    <div style="margin-top:18px;display:flex;gap:8px;justify-content:center">
      ${role === "speaker" ? `<a class="btn" href="#/schedule">${icon("sun")}See today</a>` : ""}
      <a class="btn" href="#/directions">${icon("list")}Directions</a>
    </div>
  </div></div>`;
}

/* ---------- File ---------- */

function fileView(state, file) {
  const role = state.user.role;
  const speaker = role === "speaker";
  const deciding = speaker && file.desk === "speaker" && !file.decision;
  const brief = deciding
    ? `<div class="file-split"><div>${putUpView(file)}${noteView(state, file)}</div>${signAside(state, file)}</div>${noticeView(file)}${minutesView(file)}`
    : [speaker ? putUpView(file) : "", file.decision ? recordView(file) : "", noteView(state, file), noticeView(file), minutesView(file)].join("");
  return `<div class="file-scroll" id="file-scroll"><div class="file-inner">
    ${headView(file)}
    ${routeView(file)}
    ${brief}
  </div></div>`;
}

function headView(file) {
  const left = file.daysLeft ?? 0;
  const total = file.daysTotal || 5;
  const pct = Math.max(6, Math.min(100, ((total - left) / total) * 100));
  const tone = left <= 1 ? "hot" : left <= 2 ? "warn" : "";
  return `<div class="file-head">
    <div class="line"><span class="kind ${file.kind}">${esc(KIND[file.kind])}</span><span class="mono">${esc(file.id)}</span>
      ${file.kind === "question" ? `<span class="chip">${file.starred ? "Starred · oral answer" : "Unstarred · written answer"}</span>` : ""}
      ${daysChip(file)}</div>
    <h2>${esc(file.subject)}</h2>
  </div>
  <div class="facts">
    <div><div class="k">From</div><div class="v" title="${esc(file.memberName)}">${esc(file.memberName)}</div></div>
    <div><div class="k">To</div><div class="v" title="${esc(file.minister)}">${esc(file.minister)}</div></div>
    <div><div class="k">Received</div><div class="v">${esc(file.received)}</div></div>
    <div><div class="k">Decision due</div><div class="v">${esc(file.deadline)}</div>
      ${file.decision ? "" : `<div class="clock ${tone}" title="${file.kind === "question" ? "Rule 81: decision within five clear days of receipt" : "Time left on this paper"}"><div class="bar"><i style="width:${pct}%"></i></div><small>${left} of ${total}</small></div>`}</div>
  </div>`;
}

function routeView(file) {
  const steps = (file.timeline || []).slice(1);
  return `<div class="route" aria-label="Where this file has been">
    ${steps.map((step, i) => `${i ? `<span class="link ${step.status !== "pending" ? "done" : ""}"></span>` : ""}<span class="step ${step.status}" title="${esc(step.who)} · ${esc(step.ts)}"><span class="dot">${step.status === "done" ? icon("check") : ""}</span>${esc(step.desk === "Hon. Speaker" ? "Speaker" : i === steps.length - 1 ? "Carried out" : step.desk.replace("Section Officer", "Officer").replace("Joint Secretary", "Joint Sec.").replace("Special Secretary", "Special Sec."))}</span>`).join("")}
  </div>`;
}

function signAside(state, file) {
  const labels = choicesFor(file);
  const choice = state.choice;
  const ready = Boolean(choice);
  return `<aside class="sign-aside">
    <section class="card put-up">
      <div class="card-head">${icon("sparkle")}<h3>AI brief</h3><div class="spacer"></div><span class="ai-tag">${icon("sparkle")}Advisory · does not sign</span></div>
      <div class="card-body">
        <p class="sub">The officer's note and the rulings sit on the left. Rule 28: your decision on the file is final unless the House rescinds it.</p>
      </div>
    </section>
    <section class="card sign-card${ready ? " ready" : ""}">
      <div class="card-head"><h3>Signature</h3><div class="spacer"></div><span class="chip gold">Speaker</span></div>
      <div class="card-body">
        <div class="sign-block">
          <div>
            <div class="caption">Sardar Ayaz Sadiq</div>
            <div class="signature-preview">Ayaz Sadiq</div>
            <p class="sub">Office of the Speaker · National Assembly of Pakistan</p>
          </div>
          <div class="seal">OFFICE<br>OF THE<br>SPEAKER</div>
        </div>
        <p class="sub" style="margin-top:12px">${ready ? `Ready to record: <b>${esc(labels[choice][0])}</b>. Sign on the bar below.` : "Choose Allow, Reject, or Fix the wording on the bar, then sign. The model never signs."}</p>
      </div>
    </section>
  </aside>`;
}

function putUpView(file) {
  const line = file.officerLine || file.note?.officerLine;
  if (!line) return "";
  const seen = (file.minutes || []).map((minute) => minute.name).filter(Boolean);
  const rec = file.recommend && !file.decision ? choicesFor(file)[file.recommend][0] : "";
  return `<section class="card put-up"><div class="card-body">
    <div class="dock-row"><span class="label">Put up for your decision</span><div class="spacer"></div>${rec ? `<span class="chip gold">Office recommends: ${esc(rec)}</span>` : ""}</div>
    <blockquote>${esc(line)}</blockquote>
    <span class="by">${seen.length ? `Seen by ${esc(seen.join(", "))}` : "Section Officer"}</span>
  </div></section>`;
}

function noticeView(file) {
  const words = String(file.body || "").trim().split(/\s+/).filter(Boolean).length;
  const phrase = file.opinionPhrase || "";
  const at = phrase ? (file.body || "").indexOf(phrase) : -1;
  const body = at < 0
    ? esc(file.body)
    : `${esc(file.body.slice(0, at))}<mark>${esc(phrase)}</mark>${esc(file.body.slice(at + phrase.length))}`;
  const long = file.kind === "question" && words > 150;
  return `<section class="card">
    <div class="card-head">${icon("file")}<h3>${file.kind === "letter" ? "The letter" : "The notice, as received"}</h3><div class="spacer"></div>
      <span class="chip ${long ? "red" : ""}">${words} words${long ? " · over 150" : ""}</span>
      ${file.language ? `<span class="chip">${esc(file.language)}</span>` : ""}</div>
    <div class="card-body"><p class="notice-text">${body || "<em>No readable text on the attached paper.</em>"}</p></div>
  </section>`;
}

function noteView(state, file) {
  const note = file.note;
  const role = state.user.role;
  if (!note) {
    return `<section class="card"><div class="card-body"><div class="none">${icon("sparkle")}<span>The note is drafted when the Section Officer opens this file.</span></div></div></section>`;
  }
  const failed = failedClauses(file);
  const passed = (note.clauses || []).filter((clause) => clause.pass);
  const rule = RULE_FOR[file.kind] || "The rule";
  const editing = role === "officer" && file.desk === "section_officer";
  const checkRow = (clause) => `<div class="check ${clause.pass ? "pass" : "fail"}">
    <span class="mk">${icon(clause.pass ? "check" : "x")}</span>
    <div><div class="t">${esc(clause.text)}</div>${clause.pass ? "" : `<div class="v">${esc(clause.verdict)}</div>${clause.quoted ? `<q>${esc(clause.quoted)}</q>` : ""}`}</div>
    <span class="cl">${esc(clause.id.length <= 5 && file.kind === "question" ? `78(${clause.id})` : clause.id)}</span>
  </div>`;
  return `<section class="card">
    <div class="card-head">${icon("sparkle")}<h3>${editing ? "Draft note for you to check" : "Officer's note"}</h3><div class="spacer"></div>
      <span class="ai-tag" title="Drafted by the model from the rule and a search of the rulings. The officer adopts or edits it.">${icon("sparkle")}AI draft · ${editing ? "not yet adopted" : "adopted by the officer"}</span></div>
    <div class="card-body">
      <div class="note-sec"><h4>What is being asked</h4><p>${esc(note.summary)}</p></div>
      <div class="note-sec"><h4>${esc(rule)} ${file.kind === "letter" ? "" : `· ${failed.length ? `<span class="chip red">${failed.length} of ${(note.clauses || []).length} flagged</span>` : `<span class="chip green">All clauses met</span>`}`}</h4>
        <div class="checks">${(failed.length ? failed : passed.slice(0, 3)).map(checkRow).join("")}</div>
        ${failed.length && passed.length ? `<details class="more"><summary>${icon("chevron")}${passed.length} other clause${passed.length === 1 ? "" : "s"} met</summary><div class="checks" style="margin-top:6px">${passed.map(checkRow).join("")}</div></details>` : ""}
        ${!failed.length && passed.length > 3 ? `<details class="more"><summary>${icon("chevron")}${passed.length - 3} more</summary><div class="checks" style="margin-top:6px">${passed.slice(3).map(checkRow).join("")}</div></details>` : ""}
      </div>
      <div class="note-sec"><h4>${icon("book")}Closest rulings of the Chair</h4>${rulingsView(state.rulingsFor(file), file)}</div>
      ${editing ? `<div class="note-sec"><div class="field"><label for="officerLine">Your line to the Speaker <span class="hint">· goes up with the file</span></label><textarea id="officerLine" rows="3">${esc(file.officerLine || note.officerLine || "")}</textarea></div>
        <div class="field" style="margin-top:12px"><label>Your recommendation <span class="hint">· a human recommendation. The Speaker still decides.</span></label>
          <div class="tabs">${Object.entries(choicesFor(file)).map(([id, label]) => `<button type="button" class="${file.recommend === id ? "on" : ""}" data-action="recommend" data-choice="${id}">${esc(label[0])}</button>`).join("")}</div></div></div>` : ""}
    </div>
  </section>`;
}

function rulingsView(rulings, file) {
  if (rulings === null) {
    return `<div class="none">${icon("info")}<span>A letter is put up for a direction. No rule of admissibility applies, so the rulings book was not searched.</span></div>`;
  }
  if (!rulings.length) {
    return `<div class="none">${icon("search")}<span><b>No past ruling found.</b> Both rulings books were searched: 873 records in the 1947–1997 scan and 234 in the 1999–2017 book. None is close enough to cite. No ruling number has been made up.</span></div>`;
  }
  return `<div class="rulings">${rulings.map((ruling) => `<a class="ruling" href="${rulingHref(ruling)}" target="_blank" rel="noopener" title="Open ${ruling.volume} at PDF page ${ruling.pdfPage}">
    <span class="pg">p.${esc(ruling.pdfPage)}</span>
    <span><span class="rt"><span class="mono">${esc(ruling.id)}</span><span>${esc(titleCase(ruling.subject))}</span>${ruling.debateDate ? `<span>· ${esc(ruling.debateDate)}</span>` : ""}<span class="open">PDF page ${esc(ruling.pdfPage)}${icon("external")}</span></span>
    <span class="hn" style="display:block">${esc(clip(sentenceCase(ruling.headnote), 260))}</span></span>
  </a>`).join("")}</div>
  <p style="margin-top:8px;font-size:12px;color:var(--muted)">Retrieved from the rulings books (1947–1997 and 1999–2017) for ${esc(KIND[file.kind].toLowerCase())}s. A 1947–1997 hit is a scan: confirm that PDF page. The note cites them. It does not decide.</p>`;
}

function minutesView(file) {
  const minutes = file.minutes || [];
  if (!minutes.length) return "";
  const initials = (name) => String(name).split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return `<section class="card">
    <div class="card-head">${icon("stamp")}<h3>Minutes on the file</h3><div class="spacer"></div><span class="chip">${minutes.length}</span></div>
    <div class="card-body"><div class="minutes">${minutes.map((minute) => `<div class="minute"><span class="avatar sm">${esc(initials(minute.name))}</span><div><b>${esc(minute.name)}</b><p>${esc(minute.text)}</p></div><time>${esc(stamp(minute.at))}</time></div>`).join("")}</div></div>
  </section>`;
}

function recordView(file) {
  const words = file.decision === "amend" ? file.amendedText : file.speakerRemark || `${verdictFor(file)}.`;
  const tone = file.decision;
  return `<section class="record ${tone}">
    <div class="band">${icon(tone === "allow" ? "check" : tone === "reject" ? "x" : "pen")}${esc(verdictFor(file))}</div>
    <div class="body">
      ${file.decision === "amend" ? `<span class="suggest">${file.kind === "letter" ? "The Speaker's direction" : "Wording as the Speaker fixed it"}</span>` : ""}
      <p class="words">${esc(words)}</p>
      ${file.followUp ? `<div class="next">${icon(file.dispatched ? "check" : "arrow")}<div><b>${esc(file.followUp.action)}</b><span>${file.dispatched ? "Done by the Section Officer" : `${esc(file.followUp.who)} · due ${esc(file.followUp.due)}`}</span></div></div>` : ""}
      <div class="sig"><div><div class="signature">Ayaz Sadiq</div><small>Sardar Ayaz Sadiq, Speaker · signed ${esc(stamp(file.decidedAt))} · final under Rule 28 unless the House rescinds it</small></div>
        <div class="seal">OFFICE<br>OF THE<br>SPEAKER</div></div>
    </div>
  </section>`;
}

/* ---------- Dock ---------- */

function dockView(state, file) {
  const role = state.user.role;
  if (role === "speaker" && file.desk === "speaker") return speakerDock(state, file);
  if (role === "officer" && file.desk === "section_officer") {
    return dock(`<div class="dock-row"><span class="prompt">Check the draft, adjust your line, then send it up. <b>The Speaker decides.</b></span><div class="spacer"></div>
      <button class="btn primary" type="button" data-action="send-up">${icon("send")}Send to the Joint Secretary<kbd>Ctrl ⏎</kbd></button></div>`);
  }
  if (["js", "special", "secgen"].includes(role) && file.desk === role) {
    const next = NEXT_DESK[role];
    return dock(`<div class="dock-row">
      <input class="text" id="minute" value="Seen. The note is complete. Forwarded." aria-label="Your minute" style="flex:1">
      <button class="btn primary" type="button" data-action="forward">${icon("stamp")}Stamp and send to the ${esc(next === "speaker" ? "Speaker" : DESK[next])}<kbd>⏎</kbd></button></div>`);
  }
  if (role === "officer" && file.desk === "section_officer_return") {
    const label = file.kind === "letter"
      ? file.decision === "reject" ? "Return to the branch" : "Mark as carried out"
      : file.decision === "reject" ? "Tell the member" : "Send to the Minister";
    return dock(`<div class="dock-row"><span class="prompt">Speaker's order: <b>${esc(verdictFor(file))}</b>. Next: ${esc(file.followUp?.action || "carry out the decision")}.</span><div class="spacer"></div>
      <button class="btn primary" type="button" data-action="carry-out">${icon("send")}${label}<kbd>⏎</kbd></button></div>`);
  }
  return "";
}

function dock(inner) {
  return `<footer class="dock"><div class="dock-inner">${inner}</div></footer>`;
}

function speakerDock(state, file) {
  const labels = choicesFor(file);
  const choice = state.choice;
  const key = { allow: "A", reject: "R", amend: "F" };
  const buttons = ["allow", "reject", "amend"].map((id) => `<button type="button" class="choice ${id}${choice === id ? " on" : ""}${choice && choice !== id ? " dim" : ""}" data-action="choose" data-choice="${id}">
    <span class="ic">${icon(id === "allow" ? "check" : id === "reject" ? "x" : "pen")}</span>
    <span><b>${labels[id][0]}</b><span>${file.recommend === id ? `<em class="rec">Office recommends</em>` : labels[id][1]}</span></span><kbd>${key[id]}</kbd></button>`).join("");
  const sign = choice
    ? `<button class="sign-btn" type="button" data-action="sign"><span><span class="signature">Ayaz Sadiq</span><small>Sign · Enter</small></span>${icon("arrow")}</button>`
    : "";
  const letter = file.kind === "letter";
  let below = "";
  if (choice === "amend") {
    below = `<div class="field"><label for="wording">${letter ? "Your direction" : "Wording as it should stand"} <span class="hint">· ${letter ? "becomes a tracked direction" : "start from the member's text and cut what fails"}</span></label>
      <textarea id="wording" rows="4">${esc(letter ? state.draftWording ?? "" : state.draftWording ?? file.body)}</textarea></div>`;
  } else if (choice && state.extras) {
    below = `<div class="fields two">
      <div class="field"><label for="remark">${choice === "reject" ? "Reason for the member" : "Remark on the file"}</label><input class="text" id="remark" placeholder="${choice === "reject" ? "e.g. Not primarily a federal matter." : "e.g. Admitted."}"></div>
      <div class="field"><label for="instruction">Direction to the office <span class="hint">· tracked with a date</span></label><input class="text" id="instruction" placeholder="e.g. Put up again with the Ministry's reply"></div>
    </div>`;
  } else if (choice) {
    below = `<button type="button" class="link-btn" data-action="extras">${icon("plus")}Add a remark or a direction</button>`;
  }
  return dock(`<div class="dock-row"><div class="decide${choice ? " picked" : ""}">${buttons}</div>${sign}</div>${below ? `<div class="confirm-below">${below}</div>` : ""}`);
}

/* ---------- Directions ---------- */

export function directionsView(state) {
  const role = state.user.role;
  const now = Date.now();
  const open = state.directions.filter((item) => item.status !== "done");
  const overdue = state.overdue;
  const dueWeek = open.filter((item) => !overdue.includes(item) && new Date(item.due).getTime() - now < 7 * 864e5 && new Date(item.due).getTime() >= now);
  const rest = open.filter((item) => !overdue.includes(item) && !dueWeek.includes(item));
  const done = state.directions.filter((item) => item.status === "done");
  const check = state.evidenceCheck || {};
  const card = (item) => {
    const late = item.status !== "done" && new Date(item.due).getTime() < now;
    const days = Math.round((new Date(item.due).getTime() - now) / 864e5);
    const due = item.status === "done" ? `Closed ${shortDate(item.closedAt || item.due)}` : late ? `${Math.abs(days)}d overdue` : days <= 0 ? "Due today" : `${days}d left`;
    const closing = state.closingId === item.id;
    const verdict = check.id === item.id ? check : item.aiCheck;
    return `<article class="kcard${late ? " late" : ""}">
      <div class="t">${esc(item.text)}</div>
      <div class="m"><span class="chip ${late ? "red" : item.status === "done" ? "green" : ""}">${due}</span><span>${esc(item.owner)}</span></div>
      <div class="sub">${esc(item.id)} · ${esc(item.source)}</div>
      ${item.evidence ? `<div class="ev">${icon("check")} ${esc(item.evidence)}</div>` : ""}
      ${verdict ? `<div class="ev ${verdict.adequate ? "ok" : "bad"}">${icon(verdict.adequate ? "check" : "alert")} AI evidence ${verdict.adequate ? "adequate" : "not enough"} · ${esc(shown(verdict.reason))}</div>` : ""}
      ${closing ? `<div class="kclose"><input class="text" id="evidence" placeholder="Letter no. and date, or file reference" value="${esc(state.evidenceDraft || "")}">
        <div class="acts"><button class="btn sm" type="button" data-action="dir-check" data-id="${item.id}">${icon("sparkle")}Check evidence</button>
        <button class="btn sm primary" type="button" data-action="dir-done" data-id="${item.id}" ${verdict && !verdict.adequate && !state.forceClose ? "disabled" : ""}>${verdict?.adequate ? "Close" : "Close anyway"}</button>
        <button class="btn sm ghost" type="button" data-action="dir-cancel">Cancel</button></div></div>` : ""}
      <div class="acts">${item.status === "done"
        ? (role === "speaker" ? `<button class="btn sm" type="button" data-action="dir-reopen" data-id="${item.id}">${icon("undo")}Reopen</button>` : "")
        : `<button class="btn sm" type="button" data-action="dir-remind" data-id="${item.id}">${icon("bell")}Remind</button>
           ${role !== "speaker" && !closing ? `<button class="btn sm" type="button" data-action="dir-close" data-id="${item.id}">${icon("check")}Close</button>` : ""}`}</div>
    </article>`;
  };
  const col = (title, items, tone = "") => `<section class="kcol"><div class="khead">${esc(title)}<em>${items.length}</em></div><div class="klist">${items.map(card).join("") || `<div class="empty">None</div>`}</div></section>`;
  return `<div class="page"><div class="page-inner">
    <div class="page-title"><div><h2>Directions</h2><p>Kanban of the Speaker's instructions. An AI evidence check runs before close. The model does not close the item.</p></div></div>
    <div class="kanban">
      ${col("Open", rest)}
      ${col("Due this week", dueWeek)}
      ${col("Overdue", overdue, "hot")}
      ${col("Closed", done)}
    </div>
  </div></div>`;
}

/* ---------- Today ---------- */

export function todayView(state) {
  const now = new Date();
  const speaker = state.user.role === "speaker";
  const waiting = state.actionable;
  return `<div class="page"><div class="page-inner">
    <div class="page-title"><div><h2>${speaker ? `Good ${now.getHours() < 12 ? "morning" : now.getHours() < 17 ? "afternoon" : "evening"}, Mr. Speaker` : "The Speaker's schedule"}</h2><p>${today()} · compiled from the papers and the schedule on this system</p></div>
      ${speaker && waiting.length ? `<a class="btn primary" href="#/desk">${icon("inbox")}Open my desk<kbd>D</kbd></a>` : ""}</div>
    <div class="cols">
      <section class="card">
        <div class="card-head">${icon("calendar")}<h3>Today's engagements</h3><div class="spacer"></div><span class="chip">${state.agenda.length}</span></div>
        <div class="agenda">${state.agenda.map((slot) => {
          const status = slot.end < now ? "past" : slot.start <= now ? "now" : "";
          return `<div class="slot ${status}"><time>${slot.time}</time><div><b>${esc(slot.title)}</b><p>${esc(slot.place)}${slot.buffer ? ` · ${slot.buffer} min travel after` : ""}</p></div>${status === "now" ? `<span class="chip green">Now</span>` : slot.tag ? `<span class="chip ${slot.tone || ""}">${esc(slot.tag)}</span>` : ""}</div>`;
        }).join("")}</div>
      </section>
      ${(state.conflicts || []).length ? `<section class="card"><div class="card-head">${icon("alert")}<h3>Conflict engine</h3><div class="spacer"></div><span class="chip amber">${state.conflicts.length}</span></div>
        <div class="card-body" style="display:grid;gap:10px">${state.conflicts.map((item) => `<div class="dir"><div><div class="t">${esc(item.title)}</div><div class="ev">${esc(item.detail)}</div></div><span class="chip ${item.tone}">${esc(item.type)}</span></div>`).join("")}</div></section>` : ""}
      <div style="display:grid;gap:16px">
        ${morningCard(state)}
        <section class="card">
          <div class="card-head">${icon("calendar")}<h3>Invitations waiting</h3><div class="spacer"></div><span class="chip">${state.invites.filter((item) => !item.answer).length}</span></div>
          ${state.invites.map((item) => `<div class="invite">
            <div><b style="font-size:13.5px">${esc(item.title)}</b><p style="font-size:12.5px;color:var(--muted);margin-top:2px">${esc(item.when)} · ${esc(item.where)}</p></div>
            ${item.conflict ? `<span class="chip amber" style="justify-self:start">${icon("alert")}${esc(item.conflict)}</span>` : ""}
            ${item.answer ? `<span class="chip ${item.answer === "Accepted" ? "green" : ""}" style="justify-self:start">${item.answer} · Protocol informed</span>` : !speaker ? `<span class="chip gold" style="justify-self:start">Awaiting the Speaker</span>` : `<div class="acts"><button class="btn sm primary" type="button" data-action="invite" data-id="${item.id}" data-answer="Accepted">${icon("check")}Accept</button><button class="btn sm" type="button" data-action="invite" data-id="${item.id}" data-answer="Declined">Decline with regrets</button></div>`}
          </div>`).join("")}
        </section>
      </div>
    </div>
    ${weekView(state)}
  </div></div>`;
}

/* ---------- Register ---------- */

export const SAMPLE_NOTICE = {
  kind: "question",
  memberName: "Sample MNA, NA-12",
  minister: "Minister for Water Resources",
  subject: "Delay in the Dasu hydropower project",
  body: "Will the Minister for Water Resources be pleased to state the present physical progress of the Dasu hydropower project, the revised completion date, and the reasons for the delay against the original schedule?",
};

export function registerView(state) {
  const form = state.register;
  const words = String(form.body || "").trim().split(/\s+/).filter(Boolean).length;
  return `<div class="scrim" data-action="close-sheet"><aside class="sheet" role="dialog" aria-label="Register a notice">
    <div class="sheet-head">${icon("plus")}<h3>Register a notice</h3><button class="btn sm ghost" type="button" data-action="fill-sample">Use a sample</button><button class="btn sm ghost" type="button" data-action="close-sheet" aria-label="Close">${icon("x")}</button></div>
    <div class="sheet-body">
      <div class="field"><label>Type of paper</label><div class="seg">${Object.entries(KIND).map(([key, label]) => `<button type="button" class="${form.kind === key ? "on" : ""}" data-action="reg-kind" data-kind="${key}">${label.replace(" notice", "").replace(" motion", "")}</button>`).join("")}</div></div>
      <div class="grid2">
        <div class="field"><label for="reg-member">From</label><input class="text" id="reg-member" data-reg="memberName" value="${esc(form.memberName)}" placeholder="Member or office"></div>
        <div class="field"><label for="reg-minister">To</label><input class="text" id="reg-minister" data-reg="minister" value="${esc(form.minister)}" placeholder="Minister addressed"></div>
      </div>
      <div class="field"><label for="reg-subject">Subject <span class="hint">· left blank, the first words are used</span></label><input class="text" id="reg-subject" data-reg="subject" value="${esc(form.subject)}"></div>
      <div class="field"><label for="reg-body">Text of the notice</label><textarea id="reg-body" data-reg="body" rows="9" placeholder="Paste the notice as received">${esc(form.body)}</textarea>
        <div class="live" id="reg-live"><span class="chip ${words > 150 ? "red" : ""}">${words} words</span></div></div>
      <div class="none">${icon("sparkle")}<span>When you open the file, the note is drafted from the rule and a search of the rulings book. You check it before it goes up.</span></div>
    </div>
    <div class="sheet-foot"><button class="btn ghost" type="button" data-action="close-sheet">Cancel</button><button class="btn primary" type="button" data-action="register">${icon("check")}Register and open<kbd>Ctrl ⏎</kbd></button></div>
  </aside></div>`;
}
