import { icon } from "./icons.js";
import { esc, DESK, KIND, daysChip, shortDate, stamp, clip } from "./ui.js";
import { db, save, find, hoursLeft, daysLeft, SPEECH_DRAFT } from "./store.js";

export const MODULES = [
  { id: "files", n: 1, icon: "file", label: "Files & papers" },
  { id: "directions", n: 2, icon: "list", label: "Directions" },
  { id: "meetings", n: 3, icon: "users", label: "Meetings" },
  { id: "schedule", n: 4, icon: "calendar", label: "Schedule" },
  { id: "speeches", n: 5, icon: "mic", label: "Speeches & tours" },
  { id: "calls", n: 6, icon: "phone", label: "Telephone calls" },
  { id: "remote", n: 7, icon: "shield", label: "Remote approval" },
  { id: "media", n: 8, icon: "news", label: "Press & media" },
  { id: "cards", n: 9, icon: "mail", label: "Greeting cards" },
];

const words = (text) => String(text || "").trim().split(/\s+/).filter(Boolean).length;
const isStaff = (state) => state.user.role !== "speaker";
const when = (iso) => new Date(iso).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

function statusChip(status) {
  const map = {
    requested: ["", "Requested"],
    submitted: ["gold", "With the Speaker"],
    approved: ["green", "Approved"],
    declined: ["red", "Declined"],
    returned: ["red", "Returned"],
    held: ["blue", "Held"],
    draft: ["", "Draft"],
    released: ["green", "Released"],
    dispatched: ["green", "Dispatched"],
    pending: ["amber", "Pending"],
    cleared: ["green", "Cleared"],
    failed: ["red", "Failed"],
    none: ["", "Not started"],
  };
  const [tone, label] = map[status] || ["", status];
  return `<span class="chip ${tone}">${esc(label)}</span>`;
}

function pageHead(title, sub, right = "") {
  return `<div class="page-title"><div><h2>${esc(title)}</h2><p>${sub}</p></div>${right}</div>`;
}

function listDetail(state, { list, head, detail, dock = "" }) {
  return `<div class="desk">
    <aside class="queue"><div class="queue-head">${head}</div><div class="queue-list">${list}</div></aside>
    <section class="file">${detail ? `<div class="file-scroll"><div class="file-inner">${detail}</div></div>${dock}` : `<div class="file-scroll"><div class="empty" style="margin-top:12vh"><b>Choose an item</b>Select one on the left.</div></div>`}</section>
  </div>`;
}

function row(state, view, item, top, subject, meta) {
  return `<button type="button" class="item${state.sel[view] === item.id ? " on" : ""}" data-action="mod-select" data-view="${view}" data-id="${esc(item.id)}">
    <span class="top">${top}</span><span class="subject">${esc(subject)}</span><span class="meta">${meta}</span></button>`;
}

function dockBar(inner) {
  return `<footer class="dock"><div class="dock-inner"><div class="dock-row">${inner}</div></div></footer>`;
}

function pick(state, view, items) {
  if (!items.some((item) => item.id === state.sel[view])) state.sel[view] = items[0]?.id || null;
  return items.find((item) => item.id === state.sel[view]) || null;
}

/* ---------- M1 Files register ---------- */

export function filesView(state) {
  const query = (state.query || "").toLowerCase();
  const next = (file) => {
    if (file.desk === "done") return "Closed and archived";
    if (file.desk === "section_officer_return") return file.followUp?.action || "Carry out the decision";
    if (file.desk === "speaker") return "Speaker's decision";
    if (file.desk === "section_officer") return file.note ? "Officer's note ready" : "Draft the note";
    return "Stamp and forward";
  };
  const rows = state.files.filter((file) => !query || `${file.id} ${file.subject} ${file.memberName}`.toLowerCase().includes(query));
  return `<div class="page"><div class="page-inner">
    ${pageHead("Files & papers", "Every registered paper, where it is now and what it is waiting for. Scan an incoming letter first if it arrived on paper.", `<div class="acts"><a class="btn" href="#/intake">${icon("file")}Scan incoming</a><label class="search" style="width:280px">${icon("search")}<input id="files-q" placeholder="Search file no., subject, member" value="${esc(state.query || "")}"></label></div>`)}
    <section class="card"><table class="table">
      <thead><tr><th>File</th><th>Subject</th><th>With</th><th>Next action</th><th>Time</th></tr></thead>
      <tbody>${rows.map((file) => `<tr data-action="open-file" data-id="${esc(file.id)}">
        <td><span class="kind ${file.kind}">${esc(KIND[file.kind])}</span><div class="mono">${esc(file.id)}</div></td>
        <td><b>${esc(file.subject)}</b><div class="sub">${esc(file.memberName)}</div></td>
        <td>${esc(DESK[file.desk] || file.desk)}</td>
        <td>${esc(next(file))}</td>
        <td>${daysChip(file)}</td></tr>`).join("") || `<tr><td colspan="5"><div class="empty">No file matches.</div></td></tr>`}</tbody>
    </table></section>
  </div></div>`;
}

/* ---------- M3 Meetings ---------- */

export function meetingsView(state) {
  const items = db().meetings;
  const item = pick(state, "meetings", items);
  const staff = isStaff(state);
  const head = `<div class="row"><h2>Meeting requests<small>${items.filter((m) => ["requested", "submitted"].includes(m.status)).length}</small></h2>${staff ? `<button class="btn sm primary" type="button" data-action="mtg-new">${icon("plus")}New</button>` : ""}</div>`;
  const list = items.map((m) => row(state, "meetings", m, `<span class="kind meeting">${esc(m.category)}</span><span class="mono">${esc(m.id)}</span>${statusChip(m.status)}`, m.visitor, `<span>${esc(when(m.preferred))}</span>${m.conflict ? `<span class="flag">${icon("alert")}Clash</span>` : ""}`)).join("");
  if (state.mtgForm) {
    const detail = `<section class="card"><div class="card-head">${icon("plus")}<h3>Register a meeting request</h3></div><div class="card-body" style="display:grid;gap:12px">
      <div class="grid2"><div class="field"><label>Visitor</label><input class="text" id="mtg-visitor" placeholder="Name and title"></div>
      <div class="field"><label>Category</label><div class="tabs" id="mtg-cat">${["Diplomat", "Member", "Public delegation", "Official"].map((c, i) => `<button type="button" class="${i === 0 ? "on" : ""}" data-action="mtg-cat" data-cat="${c}">${c}</button>`).join("")}</div></div></div>
      <div class="field"><label>Purpose</label><textarea id="mtg-purpose" rows="3"></textarea></div>
      <div class="field"><label>Preferred day</label><div class="tabs">${[1, 2, 3, 5].map((d, i) => `<button type="button" class="${i === 1 ? "on" : ""}" data-action="mtg-day" data-day="${d}">${shortDate(new Date(Date.now() + d * 864e5).toISOString())}</button>`).join("")}</div></div>
      </div></section>`;
    return listDetail(state, { list, head, detail, dock: dockBar(`<span class="prompt">Screening and a schedule check start as soon as it is registered.</span><div class="spacer"></div><button class="btn ghost" type="button" data-action="mtg-cancel">Cancel</button><button class="btn primary" type="button" data-action="mtg-save">${icon("check")}Register</button>`) });
  }
  if (!item) return listDetail(state, { list, head, detail: "" });
  const brief = item.brief;
  const detail = `
    <div class="file-head"><div class="line"><span class="kind meeting">${esc(item.category)}</span><span class="mono">${esc(item.id)}</span>${statusChip(item.status)}</div><h2>${esc(item.visitor)}</h2></div>
    <div class="facts"><div><div class="k">Preferred</div><div class="v">${esc(when(item.preferred))}</div></div><div><div class="k">Venue</div><div class="v">${esc(item.venue)}</div></div>
      <div><div class="k">Screening</div><div class="v">${statusChip(item.screening)}</div></div><div><div class="k">Schedule</div><div class="v">${item.conflict ? `<span class="chip amber">${esc(item.conflict)}</span>` : `<span class="chip green">Free</span>`}</div></div></div>
    <section class="card"><div class="card-body"><div class="note-sec"><h4>Purpose</h4><p>${esc(item.purpose)}</p></div></div></section>
    <section class="card"><div class="card-head">${icon("sparkle")}<h3>Meeting brief</h3><div class="spacer"></div>${brief.status !== "none" ? `<span class="ai-tag">${icon("sparkle")}AI draft · ${brief.status === "approved" ? "approved by the desk" : "for the desk officer"}</span>` : ""}</div>
      <div class="card-body">${brief.status === "none"
        ? `<div class="none">${icon("info")}<span>No brief yet. ${staff ? "Draft one from past meetings and correspondence with this visitor." : "The desk has not prepared one."}</span>${staff ? `<div class="spacer"></div><button class="btn sm" type="button" data-action="mtg-brief">${icon("sparkle")}Draft brief</button>` : ""}</div>`
        : `<ul class="bullets">${brief.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul><div class="live" style="margin-top:10px">${brief.sources.map((s) => `<span class="chip">${icon("book")}${esc(s)}</span>`).join("")}</div>
           ${staff && brief.status === "draft" ? `<button class="btn sm" style="margin-top:12px" type="button" data-action="mtg-brief-ok">${icon("check")}Approve brief for the Speaker</button>` : ""}`}</div></section>
    ${["approved", "held"].includes(item.status) ? `<section class="card"><div class="card-head">${icon("pen")}<h3>Minutes and actions</h3></div><div class="card-body" style="display:grid;gap:12px">
      ${item.status === "held" ? `<p class="notice-text" style="font-size:14px">${esc(item.minutes)}</p>` : `<textarea id="mtg-minutes" rows="4" placeholder="Dictate or type notes from the meeting">${esc(item.minutes)}</textarea>`}
      ${item.actions.length ? `<div class="dir-list">${item.actions.map((a, i) => `<div class="dir"><div><div class="t">${esc(a.text)}</div><div class="m"><span>${icon("users")} ${esc(a.owner)}</span></div></div><div class="acts">${a.sent ? `<span class="chip green">In Directions</span>` : `<button class="btn sm" type="button" data-action="mtg-action" data-i="${i}">${icon("arrow")}Send to Directions</button>`}</div></div>`).join("")}</div>` : ""}
    </div></section>` : ""}`;
  let dock = "";
  if (staff) {
    if (item.status === "requested" && item.screening !== "cleared") dock = dockBar(`<span class="prompt">Screening must clear before the Speaker sees this request.</span><div class="spacer"></div><button class="btn primary" type="button" data-action="mtg-screen">${icon("shield")}Record screening: cleared</button>`);
    else if (item.status === "requested") dock = dockBar(`<span class="prompt">Screened${item.conflict ? ", with a clash noted" : " and free in the schedule"}.</span><div class="spacer"></div><button class="btn primary" type="button" data-action="mtg-submit">${icon("send")}Put up to the Speaker</button>`);
    else if (item.status === "approved") dock = dockBar(`<span class="prompt">Protocol and Security were notified on approval.</span><div class="spacer"></div><button class="btn primary" type="button" data-action="mtg-held">${icon("sparkle")}Save minutes and draft actions</button>`);
  } else if (item.status === "submitted") {
    dock = dockBar(`<span class="prompt">This request is on your desk.</span><div class="spacer"></div><button class="btn primary" type="button" data-action="open-approval" data-id="${item.id}">${icon("inbox")}Decide on my desk</button>`);
  }
  return listDetail(state, { list, head, detail, dock });
}

/* ---------- M4 Schedule (week strip; day view and invitations come from the Today page) ---------- */

export function weekView(state = {}) {
  const week = db().week;
  const extra = state.weekNotes || [];
  return `<section class="card"><div class="card-head">${icon("calendar")}<h3>This week</h3><div class="spacer"></div><span class="chip">Sitting days block outside engagements · 12–20 min travel buffers</span></div>
    <div class="week">${week.map((d) => {
      const date = new Date(Date.now() + d.day * 864e5);
      return `<div class="wday${d.day === 0 ? " today" : ""}${d.sitting ? " sitting" : ""}"><div class="wd">${date.toLocaleDateString("en-GB", { weekday: "short" })}<b>${date.getDate()}</b></div>${d.sitting ? `<span class="chip green" style="justify-self:start">Sitting</span>` : `<span class="chip" style="justify-self:start">Free of the House</span>`}${d.items.map((t) => `<div class="ev${/requested|clash|pips|ambassador/i.test(t) ? " tentative" : ""}">${esc(t)}</div>`).join("") || `<div class="ev free">Free</div>`}</div>`;
    }).join("")}</div>
    ${extra.length ? `<div class="card-body"><b class="sub">Engine notes</b>${extra.map((n) => `<p class="sub" style="margin-top:6px">${icon("alert")} ${esc(n.text)}</p>`).join("")}</div>` : ""}
  </section>`;
}

/* ---------- M5 Speeches ---------- */

export function speechesView(state) {
  const items = db().speeches;
  const item = pick(state, "speeches", items);
  const staff = isStaff(state);
  const head = `<div class="row"><h2>Speeches<small>${items.length}</small></h2></div>`;
  const list = items.map((s) => row(state, "speeches", s, `<span class="kind speech">${esc(s.role)}</span>${statusChip(s.status)}`, s.event, `<span>${esc(when(s.date))}</span><span>${s.minutes} min</span>`)).join("");
  if (!item) return listDetail(state, { list, head, detail: "" });
  const count = words(item.text);
  const mins = count / 130;
  const over = mins > item.minutes;
  const editable = staff && item.status === "draft";
  const detail = `
    <div class="file-head"><div class="line"><span class="kind speech">${esc(item.role)}</span><span class="mono">${esc(item.id)}</span>${statusChip(item.status)}</div><h2>${esc(item.event)}</h2></div>
    <div class="facts"><div><div class="k">When</div><div class="v">${esc(when(item.date))}</div></div><div><div class="k">Audience</div><div class="v">${esc(item.audience)}</div></div>
      <div><div class="k">Length</div><div class="v"><span id="sp-count">${count} words · ${mins.toFixed(1)} min</span><small>Target ${item.minutes} min at 130 words a minute</small></div></div><div><div class="k">Language</div><div class="v"><div class="tabs"><button type="button" class="${item.lang === "en" ? "on" : ""}" data-action="sp-lang" data-lang="en">English</button><button type="button" class="${item.lang === "ur" ? "on" : ""}" data-action="sp-lang" data-lang="ur">اردو</button></div></div></div></div>
    <section class="card"><div class="card-head">${icon("pen")}<h3>Text</h3><div class="spacer"></div>${item.aiDraft ? `<span class="ai-tag">${icon("sparkle")}AI draft from the sources below · edit before submitting</span>` : ""}${over ? `<span class="chip red">Over time</span>` : ""}</div>
      <div class="card-body">${editable
        ? `<textarea id="sp-text" rows="12" dir="${item.lang === "ur" ? "rtl" : "ltr"}" class="${item.lang === "ur" ? "urdu" : ""}" placeholder="Write the speech, or draft it from the sources">${esc(item.text)}</textarea>
           ${!item.text ? `<button class="btn sm" style="margin-top:10px" type="button" data-action="sp-draft">${icon("sparkle")}Draft from the sources</button>` : ""}`
        : `<p class="notice-text${item.lang === "ur" ? " urdu" : ""}" dir="${item.lang === "ur" ? "rtl" : "ltr"}">${esc(item.text) || "<em>No text yet.</em>"}</p>`}</div></section>
    <section class="card"><div class="card-head">${icon("book")}<h3>Sources</h3></div><div class="card-body"><div class="live">${item.sources.map((s) => `<span class="chip">${icon("book")}${esc(s)}</span>`).join("")}</div>
      ${item.comments.length ? `<div class="minutes" style="margin-top:14px">${item.comments.map((c) => `<div class="minute"><span class="avatar sm">${esc(c.by.split(/\s+/).map((p) => p[0]).join("").slice(0, 2))}</span><div><b>${esc(c.by)}</b><p>${esc(c.text)}</p></div><time></time></div>`).join("")}</div>` : ""}</div></section>`;
  let right = item.text ? `<button class="btn" type="button" data-action="prompter" data-id="${item.id}">${icon("play")}Open prompter</button>` : "";
  let dock = "";
  if (editable) dock = dockBar(`<span class="prompt">No speech is approved without the Speaker.</span><div class="spacer"></div>${right}<button class="btn primary" type="button" data-action="sp-submit" ${item.text ? "" : "disabled"}>${icon("send")}Submit to the Speaker</button>`);
  else if (!staff && item.status === "submitted") dock = dockBar(`<span class="prompt">Waiting for your approval.</span><div class="spacer"></div>${right}<button class="btn primary" type="button" data-action="open-approval" data-id="${item.id}">${icon("inbox")}Decide on my desk</button>`);
  else if (right) dock = dockBar(`<span class="prompt">${item.status === "approved" ? "Approved. Ready for the prompter." : "Submitted."}</span><div class="spacer"></div>${right}`);
  return listDetail(state, { list, head, detail, dock });
}

export function prompterView(state) {
  const item = find("speeches", state.prompter);
  if (!item) return "";
  const ur = item.lang === "ur";
  return `<div class="prompter" id="prompter">
    <div class="p-bar"><b>${esc(item.event)}</b><span class="spacer"></span><span id="p-time" class="mono">0:00</span>
      <button type="button" data-action="p-slower" title="Slower">−</button><span id="p-speed" class="mono">${state.pSpeed}x</span><button type="button" data-action="p-faster" title="Faster">+</button>
      <button type="button" data-action="p-toggle" id="p-toggle">${icon("play")}<span>Start</span></button><button type="button" data-action="p-close" title="Close">${icon("x")}</button></div>
    <div class="p-scroll" id="p-scroll"><div class="p-text${ur ? " urdu" : ""}" dir="${ur ? "rtl" : "ltr"}">${esc(item.text)}</div></div>
    <div class="p-line"></div><div class="p-hint">Space to start or pause · arrows change speed · Esc to close</div>
  </div>`;
}

/* ---------- M6 Calls ---------- */

export function callsView(state) {
  const calls = db().calls;
  const filter = state.callFilter;
  const shown = calls.filter((c) => filter === "all" || (filter === "callback" ? c.callback === "pending" : c.dir === "out"));
  const f = state.callForm;
  return `<div class="page"><div class="page-inner">
    ${pageHead("Telephone calls", "Log a call in one line. Messages stay open until someone calls back.", `<button class="btn" type="button" data-action="call-export">${icon("external")}Export</button>`)}
    <section class="card"><div class="card-body quick">
      <div class="tabs"><button type="button" class="${f.dir === "in" ? "on" : ""}" data-action="call-dir" data-dir="in">Incoming</button><button type="button" class="${f.dir === "out" ? "on" : ""}" data-action="call-dir" data-dir="out">Outgoing</button></div>
      <input class="text" id="call-caller" placeholder="Caller" list="contacts" autocomplete="off">
      <datalist id="contacts">${[...new Set(calls.map((c) => c.caller))].map((c) => `<option value="${esc(c)}">`).join("")}</datalist>
      <input class="text" id="call-org" placeholder="Organisation">
      <input class="text" id="call-subject" placeholder="Subject" style="flex:2">
      <div class="tabs"><button type="button" class="${f.outcome === "connected" ? "on" : ""}" data-action="call-out" data-out="connected">Connected</button><button type="button" class="${f.outcome === "message" ? "on" : ""}" data-action="call-out" data-out="message">Message</button></div>
      <button class="btn primary" type="button" data-action="call-log">${icon("plus")}Log<kbd>⏎</kbd></button>
    </div></section>
    <section class="card"><div class="card-head"><div class="tabs">${[["all", "All"], ["callback", `Callbacks due · ${calls.filter((c) => c.callback === "pending").length}`], ["out", "Outgoing"]].map(([k, l]) => `<button type="button" class="${filter === k ? "on" : ""}" data-action="call-filter" data-filter="${k}">${l}</button>`).join("")}</div></div>
      <table class="table"><thead><tr><th></th><th>Caller</th><th>Subject</th><th>Time</th><th>Linked to</th><th></th></tr></thead>
      <tbody>${shown.map((c) => `<tr>
        <td><span class="chip ${c.dir === "in" ? "blue" : ""}">${c.dir === "in" ? "In" : "Out"}</span></td>
        <td><b>${esc(c.caller)}</b><div class="sub">${esc(c.org)} · <span class="mono">${esc(c.number)}</span></div></td>
        <td>${esc(c.subject)}</td><td>${esc(stamp(c.at))}</td>
        <td>${c.link ? `<span class="chip">${esc(c.link)}</span>` : `<span class="sub">—</span>`}</td>
        <td style="text-align:right">${c.callback === "pending" ? `<button class="btn sm" type="button" data-action="call-back" data-id="${c.id}">${icon("check")}Called back</button>` : c.callback === "done" ? `<span class="chip green">Called back</span>` : `<span class="chip">${c.outcome === "connected" ? "Connected" : "Message"}</span>`}</td></tr>`).join("") || `<tr><td colspan="6"><div class="empty">No calls in this list.</div></td></tr>`}</tbody></table>
    </section>
  </div></div>`;
}

/* ---------- M7 Remote approval ---------- */

export function remoteView(state) {
  const remote = db().remote;
  const device = remote.device;
  const staff = isStaff(state);
  const pending = remote.items.filter((i) => i.status === "pending");
  const done = remote.items.filter((i) => i.status !== "pending");
  const posture = (ok, label) => `<div class="posture ${ok ? "ok" : "bad"}">${icon(ok ? "check" : "x")}<span>${label}</span></div>`;
  return `<div class="page"><div class="page-inner">
    ${pageHead("Remote approval", "Urgent matters the Speaker can decide away from Parliament House, on a managed device, with the same audit as the office.", "")}
    <div class="cols">
      <div style="display:grid;gap:16px">
        <section class="card"><div class="card-head">${icon("alert")}<h3>Waiting for a remote decision</h3><div class="spacer"></div><span class="chip">${pending.length}</span></div>
          ${pending.map((i) => `<div class="invite"><div><b style="font-size:14px">${esc(i.title)}</b><p class="sub">${esc(i.from)} · decide within ${Math.max(0, hoursLeft(i.deadline))} hours</p></div><p style="font-size:13.5px;color:var(--ink-2)">${esc(i.summary)}</p>
            ${staff ? `<span class="chip gold" style="justify-self:start">On the Speaker's desk and device</span>` : `<button class="btn sm primary" style="justify-self:start" type="button" data-action="open-approval" data-id="${i.id}">${icon("inbox")}Decide on my desk</button>`}</div>`).join("") || `<div class="empty">Nothing is waiting.</div>`}
        </section>
        ${staff ? `<section class="card"><div class="card-head">${icon("flag")}<h3>Flag a matter for urgent remote approval</h3></div><div class="card-body" style="display:grid;gap:10px">
          <input class="text" id="rm-title" placeholder="What needs deciding">
          <div class="grid2"><input class="text" id="rm-from" placeholder="From which wing or branch"><div class="tabs">${[6, 12, 24].map((h, i) => `<button type="button" class="${state.rmHours === h ? "on" : ""}" data-action="rm-hours" data-h="${h}">Within ${h} h</button>`).join("")}</div></div>
          <textarea id="rm-summary" rows="2" placeholder="Two lines the Speaker can read on a small screen"></textarea>
          <div><button class="btn primary" type="button" data-action="rm-flag">${icon("send")}Send to the Speaker's device</button></div></div></section>` : ""}
        <section class="card"><div class="card-head">${icon("list")}<h3>Decided remotely</h3></div>
          <table class="table"><tbody>${done.map((i) => `<tr><td><b>${esc(i.title)}</b><div class="sub">${esc(i.from)}</div></td><td>${statusChip(i.status)}</td><td class="sub">Channel: remote · ${esc(stamp(i.decidedAt))}</td><td>${i.synced ? `<span class="chip green">Synced · officer notified</span>` : `<span class="chip amber">Queued offline</span>`}</td></tr>`).join("") || `<tr><td><div class="empty">No remote decision yet.</div></td></tr>`}</tbody></table></section>
      </div>
      <section class="card"><div class="card-head">${icon("shield")}<h3>Speaker's device</h3></div><div class="card-body" style="display:grid;gap:10px">
        <b>${esc(device.name)}</b>
        ${posture(device.enrolled && !device.revoked, "Enrolled and managed")}
        ${posture(device.vpn && !device.revoked, "Per-app VPN connected")}
        ${posture(device.mfa && !device.revoked, "Two-factor sign-in")}
        ${posture(!device.revoked, "Secure view: no download, print or screenshot")}
        ${device.revoked
          ? `<div class="none">${icon("alert")}<span>Access revoked and cached papers wiped. Remote items are held until the device is re-enrolled.</span></div><button class="btn" type="button" data-action="rm-restore">${icon("reset")}Re-enrol device</button>`
          : `<button class="btn" type="button" data-action="rm-revoke" style="color:var(--red)">${icon("x")}Revoke access and wipe</button>`}
      </div></section>
    </div>
  </div></div>`;
}

/* ---------- M8 Press & media ---------- */

export function mediaView(state) {
  const tab = state.mediaTab;
  const media = db().media;
  const releases = db().releases;
  const staff = isStaff(state);
  const flagged = media.filter((m) => m.state === "flagged");
  const fresh = media.filter((m) => m.state === "new");
  const tabs = `<div class="tabs">${[["monitor", `Monitoring · ${fresh.length}`], ["digest", `Today's digest · ${flagged.length}`], ["releases", "Press releases"]].map(([k, l]) => `<button type="button" class="${tab === k ? "on" : ""}" data-action="media-tab" data-tab="${k}">${l}</button>`).join("")}</div>`;
  let body = "";
  if (tab === "monitor") {
    body = `<section class="card"><div class="card-head">${tabs}<div class="spacer"></div>${staff && fresh.some((m) => m.relevance === "high") ? `<button class="btn sm" type="button" data-action="media-flag-high">${icon("flag")}Flag all high relevance</button>` : ""}</div>
      <div class="dir-list">${media.filter((m) => m.state !== "dismissed").map((m) => `<div class="dir"><div><div class="t">${esc(m.headline)}</div><div class="m"><span class="chip ${m.relevance === "high" ? "red" : m.relevance === "medium" ? "amber" : ""}">${esc(m.relevance)} relevance</span><span>${esc(m.source)} · ${esc(m.type)}</span><span>· ${esc(stamp(m.at))}</span></div><div class="ev">${esc(m.snippet)}</div></div>
        <div class="acts">${m.state === "flagged" ? `<span class="chip green">${icon("flag")}In digest</span>` : staff ? `<button class="btn sm" type="button" data-action="media-flag" data-id="${m.id}">${icon("flag")}Flag</button><button class="btn sm ghost" type="button" data-action="media-dismiss" data-id="${m.id}">Dismiss</button>` : ""}</div></div>`).join("")}</div></section>`;
  } else if (tab === "digest") {
    body = `<section class="card"><div class="card-head">${tabs}<div class="spacer"></div>${staff && flagged.length ? `<button class="btn sm primary" type="button" data-action="media-send">${icon("send")}Send digest to the Speaker</button>` : ""}</div>
      <div class="card-body">${flagged.length ? `<div class="none" style="margin-bottom:12px">${icon("sparkle")}<span><b>Summary, AI draft.</b> ${flagged.length} item${flagged.length === 1 ? "" : "s"} concern the Speaker's Office today. ${flagged.filter((m) => m.relevance === "high").length} are high relevance, led by coverage of the Chair's directions in the House.</span></div>
        <ol class="bullets">${flagged.map((m) => `<li><b>${esc(m.headline)}</b> <span class="sub">${esc(m.source)}, ${esc(stamp(m.at))}</span></li>`).join("")}</ol>` : `<div class="empty">Nothing flagged yet. Flag items in Monitoring.</div>`}</div></section>`;
  } else {
    const item = pick(state, "releases", releases);
    body = `<section class="card"><div class="card-head">${tabs}<div class="spacer"></div>${staff ? `<button class="btn sm primary" type="button" data-action="pr-new">${icon("plus")}New release</button>` : ""}</div>
      <div class="split"><div class="split-list">${releases.map((r) => `<button type="button" class="item${item?.id === r.id ? " on" : ""}" data-action="mod-select" data-view="releases" data-id="${r.id}"><span class="top"><span class="mono">${esc(r.id)}</span>${statusChip(r.status)}</span><span class="subject">${esc(r.title)}</span></button>`).join("")}</div>
      <div class="split-body">${item ? `${staff && item.status === "draft"
        ? `<input class="text" id="pr-title" value="${esc(item.title)}" style="font-weight:700;font-size:16px"><textarea id="pr-text" rows="7" style="margin-top:10px">${esc(item.text)}</textarea>`
        : `<h3 style="font-size:17px">${esc(item.title)}</h3><p class="notice-text" style="margin-top:8px">${esc(item.text)}</p>`}
        <div class="live" style="margin-top:10px"><span class="ai-tag">${icon("sparkle")}First draft by AI from the records</span>${item.sources.map((s) => `<span class="chip">${icon("book")}${esc(s)}</span>`).join("")}</div>
        <div class="dock-row" style="margin-top:14px">${item.status === "released" ? `<span class="chip green">Released ${esc(stamp(item.releasedAt))} · archived with coverage</span>` : ""}
          ${staff && item.status === "draft" ? `<button class="btn primary" type="button" data-action="pr-submit">${icon("send")}Submit for the Speaker's approval</button>` : ""}
          ${staff && item.status === "approved" ? `<button class="btn primary" type="button" data-action="pr-release">${icon("send")}Release through official channel</button>` : ""}
          ${!staff && item.status === "submitted" ? `<button class="btn primary" type="button" data-action="open-approval" data-id="${item.id}">${icon("inbox")}Decide on my desk</button>` : ""}
          ${item.status === "submitted" && staff ? `<span class="chip gold">With the Speaker. Release is blocked until he approves.</span>` : ""}</div>` : ""}</div></div></section>`;
  }
  return `<div class="page"><div class="page-inner">${pageHead("Press & media", "Collected from approved sources only. Nothing is released without the Speaker.", "")}${body}</div></div>`;
}

/* ---------- M9 Greeting cards ---------- */

export function cardsView(state) {
  const items = db().cards;
  const item = pick(state, "cards", items);
  const staff = isStaff(state);
  const head = `<div class="row"><h2>Occasions<small>${items.length}</small></h2></div>`;
  const list = items.map((c) => row(state, "cards", c, `<span class="kind cards">${esc(shortDate(c.date))}</span>${statusChip(c.status)}`, c.occasion, `<span>${c.recipients.reduce((s, r) => s + r.count, 0)} recipients</span><span>${esc(c.channel)}</span>`)).join("");
  if (!item) return listDetail(state, { list, head, detail: "" });
  const total = item.recipients.reduce((s, r) => s + r.count, 0);
  const edit = staff && item.status === "draft";
  const detail = `
    <div class="file-head"><div class="line"><span class="kind cards">Greeting cards</span><span class="mono">${esc(item.id)}</span>${statusChip(item.status)}</div><h2>${esc(item.occasion)}</h2></div>
    <div class="facts"><div><div class="k">Occasion</div><div class="v">${esc(new Date(item.date).toLocaleDateString("en-GB", { day: "numeric", month: "long" }))}</div></div><div><div class="k">Reminder</div><div class="v">${daysLeft(item.date) - 14 > 0 ? `In ${daysLeft(item.date) - 14} days` : "Due now"}<small>14 days before</small></div></div>
      <div><div class="k">Recipients</div><div class="v">${total}</div></div><div><div class="k">Channel</div><div class="v">${esc(item.channel)}</div></div></div>
    <div class="cols" style="grid-template-columns:1fr 1fr">
      <section class="card"><div class="card-head"><h3>English</h3><div class="spacer"></div><span class="ai-tag">${icon("sparkle")}AI draft</span></div><div class="card-body">${edit ? `<textarea id="gc-en" rows="5">${esc(item.en)}</textarea>` : `<p class="card-text">${esc(item.en)}</p>`}</div></section>
      <section class="card"><div class="card-head"><h3>اردو</h3></div><div class="card-body">${edit ? `<textarea id="gc-ur" rows="5" dir="rtl" class="urdu">${esc(item.ur)}</textarea>` : `<p class="card-text urdu" dir="rtl">${esc(item.ur)}</p>`}</div></section>
    </div>
    <section class="card"><div class="card-head">${icon("users")}<h3>Recipient lists</h3></div><table class="table"><tbody>${item.recipients.map((r) => `<tr><td>${esc(r.group)}</td><td style="text-align:right"><b>${r.count}</b></td></tr>`).join("")}</tbody></table></section>
    ${item.log.length ? `<section class="card"><div class="card-head">${icon("list")}<h3>Dispatch log</h3><div class="spacer"></div><span class="chip green">${item.log.length} sent</span></div><table class="table"><tbody>${item.log.slice(0, 6).map((l) => `<tr><td>${esc(l.to)}</td><td>${esc(l.via)}</td><td class="sub">${esc(stamp(l.at))}</td></tr>`).join("")}${item.log.length > 6 ? `<tr><td colspan="3" class="sub">and ${item.log.length - 6} more</td></tr>` : ""}</tbody></table></section>` : ""}`;
  let dock = "";
  if (staff && item.status === "draft") dock = dockBar(`<span class="prompt">The whole batch goes up for one approval.</span><div class="spacer"></div><button class="btn primary" type="button" data-action="gc-submit">${icon("send")}Submit ${total} cards for approval</button>`);
  else if (staff && item.status === "approved") dock = dockBar(`<span class="prompt">Approved by the Speaker.</span><div class="spacer"></div><button class="btn primary" type="button" data-action="gc-dispatch">${icon("send")}Dispatch ${total} cards</button>`);
  else if (!staff && item.status === "submitted") dock = dockBar(`<span class="prompt">Waiting for your approval.</span><div class="spacer"></div><button class="btn primary" type="button" data-action="open-approval" data-id="${item.id}">${icon("inbox")}Decide on my desk</button>`);
  return listDetail(state, { list, head, detail, dock });
}

/* ---------- Speaker's desk: approvals from the other modules ---------- */

export const APPROVAL_KIND = {
  remote: "Urgent · remote",
  meeting: "Meeting request",
  speech: "Speech",
  release: "Press release",
  cards: "Greeting cards",
};

export function approvalView(state, item) {
  const ref = item.ref;
  let body = "";
  if (item.kind === "remote") {
    body = `<div class="secure">${icon("shield")}<span><b>Secure view.</b> No download, print or screenshot. Watermarked for Sardar Ayaz Sadiq. Device compliant.</span></div>
      <section class="card put-up"><div class="card-body"><span class="label">From ${esc(ref.from)}</span><blockquote>${esc(ref.summary)}</blockquote><span class="by">Decide within ${Math.max(0, hoursLeft(ref.deadline))} hours · your decision is recorded with channel "remote" and synced to the office</span></div></section>`;
  } else if (item.kind === "meeting") {
    body = `<div class="facts"><div><div class="k">Preferred</div><div class="v">${esc(when(ref.preferred))}</div></div><div><div class="k">Venue</div><div class="v">${esc(ref.venue)}</div></div><div><div class="k">Screening</div><div class="v">${statusChip(ref.screening)}</div></div><div><div class="k">Schedule</div><div class="v">${ref.conflict ? `<span class="chip amber">${esc(ref.conflict)}</span>` : `<span class="chip green">Free</span>`}</div></div></div>
      <section class="card put-up"><div class="card-body"><span class="label">Purpose</span><blockquote>${esc(ref.purpose)}</blockquote></div></section>
      ${ref.brief.points.length ? `<section class="card"><div class="card-head">${icon("sparkle")}<h3>Brief</h3><div class="spacer"></div><span class="ai-tag">${icon("sparkle")}AI draft · ${ref.brief.status === "approved" ? "approved by the desk" : "not yet approved"}</span></div><div class="card-body"><ul class="bullets">${ref.brief.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul><div class="live" style="margin-top:10px">${ref.brief.sources.map((s) => `<span class="chip">${icon("book")}${esc(s)}</span>`).join("")}</div></div></section>` : ""}`;
  } else if (item.kind === "speech") {
    const count = words(ref.text);
    body = `<div class="facts"><div><div class="k">When</div><div class="v">${esc(when(ref.date))}</div></div><div><div class="k">Audience</div><div class="v">${esc(ref.audience)}</div></div><div><div class="k">Length</div><div class="v">${count} words · ${(count / 130).toFixed(1)} min<small>Target ${ref.minutes} min</small></div></div><div><div class="k">Role</div><div class="v">${esc(ref.role)}</div></div></div>
      <section class="card"><div class="card-head">${icon("mic")}<h3>Text</h3><div class="spacer"></div><button class="btn sm" type="button" data-action="prompter" data-id="${ref.id}">${icon("play")}Prompter</button></div><div class="card-body"><p class="notice-text" style="font-size:17px;line-height:1.8">${esc(ref.text)}</p><div class="live" style="margin-top:12px">${ref.sources.map((s) => `<span class="chip">${icon("book")}${esc(s)}</span>`).join("")}</div></div></section>`;
  } else if (item.kind === "release") {
    body = `<section class="card"><div class="card-head">${icon("news")}<h3>Release text</h3><div class="spacer"></div><span class="ai-tag">${icon("sparkle")}First draft by AI · edited by the Media Wing</span></div><div class="card-body"><p class="notice-text" style="font-size:16px">${esc(ref.text)}</p><div class="live" style="margin-top:12px">${ref.sources.map((s) => `<span class="chip">${icon("book")}${esc(s)}</span>`).join("")}</div></div></section>`;
  } else if (item.kind === "cards") {
    body = `<div class="facts"><div><div class="k">Occasion</div><div class="v">${esc(new Date(ref.date).toLocaleDateString("en-GB", { day: "numeric", month: "long" }))}</div></div><div><div class="k">Recipients</div><div class="v">${ref.recipients.reduce((s, r) => s + r.count, 0)}</div></div><div><div class="k">Lists</div><div class="v">${ref.recipients.map((r) => esc(r.group)).join(", ")}</div></div><div><div class="k">Channel</div><div class="v">${esc(ref.channel)}</div></div></div>
      <div class="cols" style="grid-template-columns:1fr 1fr"><section class="card"><div class="card-body"><p class="card-text">${esc(ref.en)}</p></div></section><section class="card"><div class="card-body"><p class="card-text urdu" dir="rtl">${esc(ref.ur)}</p></div></section></div>`;
  }
  return `<div class="file-scroll" id="file-scroll"><div class="file-inner">
    <div class="file-head"><div class="line"><span class="kind ${item.kind}">${esc(APPROVAL_KIND[item.kind])}</span><span class="mono">${esc(item.id)}</span>${item.kind === "remote" ? `<span class="chip red">Within ${Math.max(0, hoursLeft(ref.deadline))} h</span>` : daysChip(item)}</div><h2>${esc(item.subject)}</h2></div>
    ${body}
  </div></div>`;
}

export function approvalDock(state, item) {
  const choice = state.choice;
  const labels = {
    remote: [["Approve", "Sanction as put up"], ["Return", "Not tonight"]],
    meeting: [["Approve", "Confirm and notify protocol"], ["Decline", "With regrets"]],
    speech: [["Approve", "Ready for the prompter"], ["Send back", "With comments"]],
    release: [["Approve release", "Media Wing may release"], ["Hold", "Do not release"]],
    cards: [["Approve batch", "All cards may go"], ["Send back", "With comments"]],
  }[item.kind];
  const btn = (id, i) => `<button type="button" class="choice ${id}${choice === id ? " on" : ""}${choice && choice !== id ? " dim" : ""}" data-action="choose" data-choice="${id}">
    <span class="ic">${icon(id === "allow" ? "check" : "x")}</span><span><b>${labels[i][0]}</b><span>${labels[i][1]}</span></span><kbd>${id === "allow" ? "A" : "R"}</kbd></button>`;
  const sign = choice ? `<button class="sign-btn" type="button" data-action="sign"><span><span class="signature">Ayaz Sadiq</span><small>${item.kind === "remote" ? "Re-authenticate and sign" : "Sign · Enter"}</small></span>${icon("arrow")}</button>` : "";
  let below = "";
  if (choice && item.kind === "remote") {
    below = `<div class="fields two"><div class="field"><label for="pin">Your PIN <span class="hint">· demo PIN 2468</span></label><input class="text" id="pin" type="password" inputmode="numeric" maxlength="4" autocomplete="off"></div>
      <div class="field"><label for="remark">Remark <span class="hint">· optional</span></label><input class="text" id="remark"></div></div>`;
  } else if (choice === "reject") {
    below = `<div class="field"><label for="remark">${item.kind === "meeting" ? "Note for Protocol" : "Comment for the desk"} <span class="hint">· optional</span></label><input class="text" id="remark" placeholder="e.g. Shorten the second paragraph."></div>`;
  }
  return `<footer class="dock"><div class="dock-inner"><div class="dock-row"><div class="decide${choice ? " picked" : ""}" style="grid-template-columns:repeat(2,1fr)">${btn("allow", 0)}${btn("reject", 1)}</div>${sign}</div>${below ? `<div class="confirm-below">${below}</div>` : ""}</div></footer>`;
}

/* ---------- Actions ---------- */

export async function moduleAction(action, el, ctx) {
  const { state, render, toast, demoRequest, load } = ctx;
  const data = db();
  const val = (id) => document.getElementById(id)?.value.trim() || "";
  const done = (msg) => {
    save();
    render();
    if (msg) toast(msg);
  };
  switch (action) {
    case "mod-select":
      state.sel[el.dataset.view] = el.dataset.id;
      state.mtgForm = false;
      render();
      return true;
    case "open-file":
      state.selectedId = el.dataset.id;
      location.hash = "#/desk";
      return true;
    case "open-approval":
      state.selectedId = el.dataset.id;
      state.choice = null;
      location.hash = "#/desk";
      return true;

    case "mtg-new":
      state.mtgForm = true;
      state.mtgDraft = { cat: "Diplomat", day: 2 };
      render();
      document.getElementById("mtg-visitor")?.focus();
      return true;
    case "mtg-cat":
      state.mtgDraft.cat = el.dataset.cat;
      el.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === el));
      return true;
    case "mtg-day":
      state.mtgDraft.day = Number(el.dataset.day);
      el.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === el));
      return true;
    case "mtg-cancel":
      state.mtgForm = false;
      render();
      return true;
    case "mtg-save": {
      const visitor = val("mtg-visitor");
      if (!visitor) {
        document.getElementById("mtg-visitor").focus();
        return true;
      }
      const busy = data.week.find((d) => d.day === state.mtgDraft.day);
      const id = `MTG-2026-${130 + data.meetings.length}`;
      const date = new Date();
      date.setDate(date.getDate() + state.mtgDraft.day);
      date.setHours(11, 0, 0, 0);
      data.meetings.unshift({ id, visitor, category: state.mtgDraft.cat, purpose: val("mtg-purpose") || "Courtesy call.", preferred: date.toISOString(), venue: "Speaker's Lounge", screening: "pending", conflict: busy?.sitting ? "Sitting day" : null, status: "requested", brief: { status: "none", points: [], sources: [] }, minutes: "", actions: [] });
      busy?.items.push(`${visitor.split(",")[0]} (requested)`);
      state.sel.meetings = id;
      state.mtgForm = false;
      done(`${id} registered. Screening requested from Security.`);
      return true;
    }
    case "mtg-screen":
      find("meetings", state.sel.meetings).screening = "cleared";
      done("Screening recorded as cleared.");
      return true;
    case "mtg-brief": {
      const m = find("meetings", state.sel.meetings);
      m.brief = { status: "draft", points: [`${m.visitor} has not met the Speaker in the last two years.`, `Purpose on the request: ${clip(m.purpose, 120)}`, "No open direction or file is linked to this visitor."], sources: ["Meeting archive search", "Correspondence register"] };
      done("Brief drafted from the records. Check it before approving.");
      return true;
    }
    case "mtg-brief-ok":
      find("meetings", state.sel.meetings).brief.status = "approved";
      done("Brief approved for the Speaker.");
      return true;
    case "mtg-submit":
      find("meetings", state.sel.meetings).status = "submitted";
      done("Put up to the Speaker. It is on his desk.");
      return true;
    case "mtg-held": {
      const m = find("meetings", state.sel.meetings);
      m.minutes = val("mtg-minutes") || "Courtesy call held. Both sides agreed to exchange parliamentary delegations next year.";
      m.status = "held";
      m.actions = [{ text: `Write to ${m.visitor.replace(/^H\.E\.\s*/, "")} confirming the points agreed.`, owner: "International Relations Wing", sent: false }, { text: "Propose dates for a return delegation.", owner: "Protocol Branch", sent: false }];
      done("Minutes saved. Two action items drafted for you to confirm.");
      return true;
    }
    case "mtg-action": {
      const m = find("meetings", state.sel.meetings);
      const a = m.actions[Number(el.dataset.i)];
      await demoRequest("/api/directions", { method: "POST", body: JSON.stringify({ text: a.text, owner: a.owner, source: `Meeting ${m.id}` }) });
      a.sent = true;
      await load();
      done(`Direction created for ${a.owner}.`);
      return true;
    }

    case "sp-lang": {
      const s = find("speeches", state.sel.speeches);
      const box = document.getElementById("sp-text");
      if (box) s.text = box.value;
      s.lang = el.dataset.lang;
      done();
      return true;
    }
    case "sp-draft": {
      const s = find("speeches", state.sel.speeches);
      s.text = SPEECH_DRAFT[s.id] || `Honourable guests, it is a privilege to be with you at the ${s.event}. `;
      s.aiDraft = true;
      done("Draft written from the listed sources. It is marked as an AI draft.");
      return true;
    }
    case "sp-submit": {
      const s = find("speeches", state.sel.speeches);
      s.text = val("sp-text") || s.text;
      s.status = "submitted";
      done("Submitted to the Speaker.");
      return true;
    }
    case "prompter": {
      const s = find("speeches", el.dataset.id);
      const box = document.getElementById("sp-text");
      if (box && s.id === state.sel.speeches) s.text = box.value;
      state.prompter = el.dataset.id;
      state.pSpeed = 1;
      save();
      render();
      return true;
    }

    case "call-dir":
      state.callForm.dir = el.dataset.dir;
      el.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === el));
      return true;
    case "call-out":
      state.callForm.outcome = el.dataset.out;
      el.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === el));
      return true;
    case "call-log": {
      const caller = val("call-caller");
      if (!caller) {
        document.getElementById("call-caller").focus();
        return true;
      }
      const known = data.calls.find((c) => c.caller === caller);
      data.calls.unshift({ id: `C-${3400 + data.calls.length}`, dir: state.callForm.dir, caller, org: val("call-org") || known?.org || "", number: known?.number || "—", at: new Date().toISOString(), subject: val("call-subject") || "—", outcome: state.callForm.outcome, callback: state.callForm.outcome === "message" ? "pending" : null, link: "" });
      done(`Call from ${caller} logged.`);
      document.getElementById("call-caller")?.focus();
      return true;
    }
    case "call-back":
      data.calls.find((c) => c.id === el.dataset.id).callback = "done";
      done("Marked as called back.");
      return true;
    case "call-filter":
      state.callFilter = el.dataset.filter;
      render();
      return true;
    case "call-export": {
      const rows = [["Direction", "Caller", "Organisation", "Subject", "Time", "Outcome", "Callback", "Linked"], ...data.calls.map((c) => [c.dir, c.caller, c.org, c.subject, c.at, c.outcome, c.callback || "", c.link])];
      const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
      a.download = "call-register.csv";
      a.click();
      toast("Call register exported.");
      return true;
    }

    case "rm-hours":
      state.rmHours = Number(el.dataset.h);
      el.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === el));
      return true;
    case "rm-flag": {
      const title = val("rm-title");
      if (!title) {
        document.getElementById("rm-title").focus();
        return true;
      }
      const deadline = new Date(Date.now() + state.rmHours * 36e5).toISOString();
      data.remote.items.unshift({ id: `RM-2026-0${10 + data.remote.items.length}`, title, from: val("rm-from") || "Speaker's Office", deadline, summary: val("rm-summary") || title, status: "pending", channel: null, decidedAt: null, synced: false });
      done("Sent to the Speaker's device and desk.");
      return true;
    }
    case "rm-revoke":
      data.remote.device.revoked = true;
      done("Device access revoked. Cached papers wiped.");
      return true;
    case "rm-restore":
      data.remote.device.revoked = false;
      done("Device re-enrolled.");
      return true;

    case "media-tab":
      state.mediaTab = el.dataset.tab;
      render();
      return true;
    case "media-flag":
      data.media.find((m) => m.id === el.dataset.id).state = "flagged";
      done();
      return true;
    case "media-dismiss":
      data.media.find((m) => m.id === el.dataset.id).state = "dismissed";
      done();
      return true;
    case "media-flag-high":
      data.media.filter((m) => m.state === "new" && m.relevance === "high").forEach((m) => (m.state = "flagged"));
      done("High-relevance items flagged.");
      return true;
    case "media-send":
      toast("Digest sent to the Speaker's Office with links to each item.");
      return true;
    case "pr-new": {
      const id = `PR-2026-0${45 + data.releases.length}`;
      data.releases.unshift({ id, title: "New press release", text: "", status: "draft", sources: [], releasedAt: null });
      state.sel.releases = id;
      done();
      document.getElementById("pr-title")?.select();
      return true;
    }
    case "pr-submit": {
      const r = find("releases", state.sel.releases);
      r.title = val("pr-title") || r.title;
      r.text = val("pr-text") || r.text;
      r.status = "submitted";
      done("Submitted. Release is blocked until the Speaker approves.");
      return true;
    }
    case "pr-release": {
      const r = find("releases", state.sel.releases);
      r.status = "released";
      r.releasedAt = new Date().toISOString();
      done("Released and logged.");
      return true;
    }

    case "gc-submit": {
      const c = find("cards", state.sel.cards);
      c.en = val("gc-en") || c.en;
      c.ur = val("gc-ur") || c.ur;
      c.status = "submitted";
      done("Batch submitted to the Speaker.");
      return true;
    }
    case "gc-dispatch": {
      const c = find("cards", state.sel.cards);
      const at = new Date().toISOString();
      c.log = c.recipients.flatMap((r) => Array.from({ length: r.count }, (_, i) => ({ to: `${r.group} · ${i + 1}`, via: c.channel, at })));
      c.status = "dispatched";
      done(`${c.log.length} cards dispatched and logged.`);
      return true;
    }
    default:
      return false;
  }
}
