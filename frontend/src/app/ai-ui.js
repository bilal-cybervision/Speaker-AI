import { icon } from "./icons.js";
import { esc, sentenceCase, clip, shown, rulingHref } from "./ui.js";
import { RULING_BOOKS } from "../portal/rulings-search.js";
import { briefing, detectUrdu } from "./ai.js";


function engineLabel(engine) {
  if (engine === "gemini+archive") return "archive";
  if (engine === "gemini+desk") return "desk";
  if (engine === "gemini") return "model";
  return shown(engine) || "local";
}

export const AI_CHIPS = [
  { q: "What is pending for me before the sitting?", label: "What needs my attention?" },
  { q: "Show today's agenda", label: "Today's agenda" },
  { q: "Find rulings on adjournment motions", label: "Rulings on adjournment" },
  { q: "Which directions are overdue?", label: "Overdue directions" },
];

export const VOICE_TESTS = [
  { q: "What is pending for me before the sitting?", label: "Desk · pending papers" },
  { q: "Show today's agenda", label: "Desk · today's agenda" },
  { q: "Which directions are overdue?", label: "Desk · overdue directions" },
  { q: "Find rulings on adjournment motions", label: "Ruling · adjournment" },
  { q: "Find rulings on privilege", label: "Ruling · privilege" },
  { q: "What does the Chair say when the government disputes the facts of an adjournment motion?", label: "Ruling · disputed facts" },
  { q: "Find rulings on Question Hour", label: "Ruling · Question Hour" },
  { q: "آج کے اجلاس سے پہلے میرے لیے کون سے معاملات زیر التوا ہیں؟", label: "اردو · زیر التوا" },
];

export function noticesFor(state) {
  const items = [];
  for (const file of state.actionable || []) {
    if ((file.daysLeft ?? 9) <= 1) {
      items.push({ id: `n-${file.id}`, tone: "red", kind: "Critical", text: `${file.subject} is due today`, href: "#/desk", module: file.ref ? "M7" : "M1" });
    }
  }
  for (const dir of state.overdue || []) {
    items.push({ id: `n-${dir.id}`, tone: "red", kind: "Critical", text: `${dir.id} overdue · ${dir.owner}`, href: "#/directions", module: "M2" });
  }
  const next = state.agenda?.find((slot) => slot.start > new Date());
  if (next) items.push({ id: "n-next", tone: "amber", kind: "Reminder", text: `${next.time} ${next.title}`, href: "#/schedule", module: "M4" });
  const clash = state.agenda?.find((slot) => slot.tone === "amber");
  if (clash) items.push({ id: "n-clash", tone: "amber", kind: "Reminder", text: `Clash: ${clash.title}`, href: "#/schedule", module: "M4" });
  const waiting = (state.invites || []).filter((item) => !item.answer);
  if (waiting.length) items.push({ id: "n-inv", tone: "blue", kind: "Action", text: `${waiting.length} invitation${waiting.length === 1 ? "" : "s"} waiting`, href: "#/schedule", module: "M4" });
  items.push({ id: "n-ai", tone: "", kind: "Update", text: `Rulings of the Chair indexed for search (${RULING_BOOKS.total} records, 1947–2017)`, href: "#/search", module: "AI" });
  return items;
}

export function speakerAiView(state) {
  const chats = state.chats;
  const active = chats.find((chat) => chat.id === state.chatId) || chats[0];
  const last = [...(active?.messages || [])].reverse().find((msg) => msg.role === "assistant");
  return `<div class="ai-page">
    <aside class="ai-side">
      <div class="queue-head"><div class="row"><h2>Conversations</h2><button class="btn sm" type="button" data-action="chat-new">${icon("plus")}New</button></div></div>
      <div class="queue-list">${chats.map((chat) => `<button type="button" class="item${chat.id === active?.id ? " on" : ""}" data-action="chat-open" data-id="${chat.id}">
        <span class="subject">${esc(chat.title)}</span><span class="meta">${esc(chat.when)}</span></button>`).join("")}</div>
      <p class="ai-keep">History is kept per user, classified, and retained per NA policy. The assistant does not decide.</p>
    </aside>
    <section class="ai-thread">
      <div class="ai-msgs" id="ai-msgs">${(active?.messages || []).map(messageHtml).join("")}</div>
      <div class="ai-compose">
        <div class="ai-chips">${AI_CHIPS.map((chip) => `<button type="button" data-action="ask-chip" data-q="${esc(chip.q)}">${esc(chip.label)}</button>`).join("")}</div>
        <div class="ask-row">
          <input class="text" id="ai-ask" placeholder="Ask a follow-up… attach a file on the desk if you wish" value="${esc(state.askDraft || "")}">
          <button class="btn" type="button" data-action="open-voice" title="Speak">${icon("mic")} MIC</button>
          <button class="btn primary" type="button" data-action="ask-send">${icon("send")}Ask</button>
        </div>
      </div>
    </section>
    <aside class="ai-rail">${last ? sourcesPanel(last.answer) : `<div class="card"><div class="card-body"><div class="none">${icon("sparkle")}<span>Ask in English or Urdu. Answers cite the rulings book or your desk. They are advisory.</span></div></div></div>`}</aside>
  </div>`;
}

function messageHtml(msg) {
  if (msg.role === "user") {
    return `<div class="bubble you${detectUrdu(msg.text) ? " urdu" : ""}"${detectUrdu(msg.text) ? ' dir="rtl"' : ""}>${esc(msg.text)}</div>`;
  }
  const answer = msg.answer;
  return `<article class="bubble ai">
    <div class="ai-tag">${icon("sparkle")}${answer.engine === "gemini+archive" ? "Rulings" : answer.engine === "gemini+desk" ? "Desk" : "AI-generated answer"} · advisory · ${esc(answer.confidence)} · ${answer.sources?.length || 0} source${answer.sources?.length === 1 ? "" : "s"} · ${answer.ms || 1} ms</div>
    <h3>${esc(answer.title || "Reply")}</h3>
    ${answer.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
    ${answer.links?.length ? `<div class="live">${answer.links.map((link) => link.external
      ? `<a class="chip" href="${esc(link.href)}" target="_blank" rel="noopener">${esc(link.label)} ${icon("external")}</a>`
      : `<a class="chip" href="${esc(link.href)}">${esc(link.label)}</a>`).join("")}</div>` : ""}
    ${answer.followUps?.length ? `<div class="ai-chips" style="margin-top:10px">${answer.followUps.map((q) => `<button type="button" data-action="ask-chip" data-q="${esc(q)}">${esc(q)}</button>`).join("")}</div>` : ""}
    <div class="ai-tools">
      <button class="btn sm" type="button" data-action="ai-copy">${icon("file")}Copy with citations</button>
      <button class="btn sm" type="button" data-action="ai-speak">${icon("play")}Listen</button>
      <button class="btn sm" type="button" data-action="ai-to-note">${icon("pen")}Add to file note (draft)</button>
      <button class="btn sm ghost" type="button" data-action="ai-report">${icon("flag")}Report an issue</button>
    </div>
  </article>`;
}

function sourcesPanel(answer) {
  const sources = answer.sources || [];
  return `
    <section class="card"><div class="card-head">${icon("book")}<h3>Sources</h3><div class="spacer"></div><span class="chip gold">Official record</span></div>
      <div class="card-body">${sources.length ? sources.map((source, i) => `<a class="ruling" href="${rulingHref(source)}" target="_blank" rel="noopener">
        <span class="pg">p.${esc(source.pdfPage)}</span>
        <span><span class="rt"><b>[${i + 1}]</b> <span class="mono">${esc(source.id)}</span></span>
        <span class="hn" style="display:block">${esc(clip(sentenceCase(source.headnote), 180))}</span>
        <span class="sub">${esc(source.volume)}${source.debateDate ? ` · ${esc(source.debateDate)}` : ""}</span>
        <span class="bar"><i style="width:${Math.round((source.relevance || 0.5) * 100)}%"></i></span></span></a>`).join("") : `<div class="none">${icon("info")}<span>This reply used the papers and schedule on this desk, not the rulings book.</span></div>`}</div></section>
    <section class="card"><div class="card-head">${icon("info")}<h3>Why am I seeing this?</h3></div>
      <div class="card-body"><p class="sub">Answer produced only from the Rulings of the Chair collection and records on this prototype. Your role permits this collection. Model ${esc(engineLabel(answer.engine))} · prompt qa-v12. Logged as AIQ-${String(Date.now()).slice(-6)}.</p></div></section>`;
}

export function knowledgeView(state) {
  const q = state.searchQ || "";
  const results = state.searchHits || [];
  const picked = results.find((item) => item.id === state.searchPick) || results[0];
  return `<div class="page"><div class="page-inner">
    <div class="page-title"><div><h2>Parliamentary information search</h2><p>Search of the Rulings of the Chair. ${RULING_BOOKS.total} records: ${RULING_BOOKS.scan} from the 1947–1997 scan and ${RULING_BOOKS.clean} from the 1999–2017 book.</p></div></div>
    <div class="ask-row">
      <input class="text" id="know-q" placeholder="e.g. adjournment motion matter pending before committee" value="${esc(q)}">
      <button class="btn" type="button" data-action="open-voice">${icon("mic")} MIC</button>
      <button class="btn primary" type="button" data-action="know-go">${icon("search")}Search</button>
    </div>
    <div class="know">
      <aside class="card"><div class="card-head"><h3>Filters</h3></div><div class="card-body" style="display:grid;gap:10px">
        <b class="sub">Collection</b>
        <label class="check-line"><input type="checkbox" checked disabled> Rulings of the Chair</label>
        <label class="check-line"><input type="checkbox" disabled> Speaker's Office files</label>
        <label class="check-line"><input type="checkbox" disabled> Meeting minutes</label>
        <p class="sub">Classification: up to Confidential (your clearance). Period: 1947 to 2017. The 1947–1997 book is a scan: confirm the PDF page.</p>
      </div></aside>
      <section class="card">
        <div class="card-head"><h3>${q ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Type a query"}</h3><div class="spacer"></div>${q ? `<span class="sub">both rulings books</span>` : ""}</div>
        <div class="dir-list">${results.map((item) => `<div class="dir${picked?.id === item.id ? " on" : ""}" data-action="know-pick" data-id="${esc(item.id)}">
          <div><div class="t">${esc(titleish(item.subject))}</div>
            <div class="m"><span class="mono">${esc(item.id)}</span><span>${esc(item.volume || "")}</span><span>${esc(item.debateDate || "")}</span><span>p.${esc(item.pdfPage)}</span>${item.scan ? `<span>scan · confirm page</span>` : ""}</div>
            <div class="ev">${esc(clip(sentenceCase(item.headnote), 180))}</div>
            <div class="acts" style="margin-top:8px">
              <a class="btn sm" href="${rulingHref(item)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${icon("external")}Open page</a>
              <button class="btn sm" type="button" data-action="ask-chip" data-q="${esc(`Show the full text of ${item.id}`)}">Summarise</button>
              <button class="btn sm" type="button" data-action="know-cite" data-id="${esc(item.id)}">Cite</button>
            </div></div>
          <div class="rel"><b>${(item.relevance || 0).toFixed(2)}</b><span>relevance</span><span class="bar"><i style="width:${Math.round((item.relevance || 0) * 100)}%"></i></span></div>
        </div>`).join("") || (q ? `<div class="empty"><b>No past ruling found.</b>None of the ${RULING_BOOKS.total} records is close enough to cite.</div>` : `<div class="empty">Search a subject, a rule, or a phrase from a notice.</div>`)}</div>
      </section>
      <aside>
        <section class="card"><div class="card-head">${icon("sparkle")}<h3>Summary of results</h3><div class="spacer"></div><span class="ai-tag">AI-generated</span></div>
          <div class="card-body">${picked
            ? `<p>${esc(sentenceCase(picked.headnote))}</p><div class="live" style="margin-top:10px">${results.slice(0, 3).map((item) => `<a class="chip" href="${rulingHref(item)}" target="_blank" rel="noopener">${esc(item.volume || "")} p.${esc(item.pdfPage)}</a>`).join("")}</div>`
            : `<p class="sub">A short cited summary appears after you search.</p>`}</div></section>
        ${picked ? `<section class="card"><div class="card-head"><h3>Source preview</h3><div class="spacer"></div><span class="chip gold">Official record</span></div>
          <div class="card-body"><p class="quote">“${esc(clip(sentenceCase(picked.decision || picked.headnote), 280))}”</p>
            <p class="sub" style="margin-top:8px">${esc(picked.volume || "")}${picked.scan ? " · scan, confirm this page" : ""} · ${esc(picked.citation || `N. A. Debate, ${picked.debateDate || ""}`)}</p>
            <a class="btn sm" style="margin-top:12px" href="${rulingHref(picked)}" target="_blank" rel="noopener">${icon("external")}PDF page ${esc(picked.pdfPage)}</a></div></section>` : ""}
      </aside>
    </div>
  </div></div>`;
}

function titleish(text) {
  return sentenceCase(String(text || "").replace(/:/g, ": "));
}

export function voiceView(state) {
  const listening = state.voice.listening;
  const speaking = state.voice.speaking;
  const busy = listening || speaking;
  const reply = state.voice.reply;
  const transcript = state.voice.transcript;
  const urdu = detectUrdu(transcript);
  return `<div class="scrim voice-scrim" data-action="voice-close">
    <div class="voice-sheet" role="dialog" aria-label="Voice assistant">
      <div class="voice-stage">
        <span class="chip gold">${speaking ? "Speaking · Daniel" : listening ? "Listening · tap STOP" : "Daniel · tap MIC"}</span>
        <button type="button" class="orb${busy ? " listening" : ""}" data-action="voice-mic" aria-pressed="${busy ? "true" : "false"}" aria-label="${busy ? "Stop" : "Start listening"}">${busy ? "STOP" : "MIC"}</button>
        <div class="wave${busy ? " on" : ""}"></div>
        <p class="sub">${busy
          ? "Tap STOP to cut this reply. A new Send also stops it at once, then the new answer is spoken."
          : "Tap MIC to speak. Tap a test question if you do not want to use the microphone. Voice never executes a change on its own."}</p>
        <div class="dock-row" style="justify-content:center">
          ${busy ? `<button class="btn" type="button" data-action="voice-stop">${icon("stop")}Stop</button>` : ""}
          <button class="btn" type="button" data-action="voice-close">Cancel</button>
          <button class="btn primary" type="button" data-action="voice-send" ${transcript ? "" : "disabled"}>${icon("send")}Send transcript</button>
        </div>
        <div class="ai-chips">${VOICE_TESTS.map((chip) => `<button type="button" data-action="voice-sample" data-q="${esc(chip.q)}">${esc(chip.label)}</button>`).join("")}</div>
      </div>
      <div class="voice-side">
        <section class="card"><div class="card-head"><h3>Live transcript</h3><div class="spacer"></div><span class="sub">edit before sending</span></div>
          <div class="card-body">
            <textarea id="voice-text" class="text${urdu ? " urdu" : ""}" rows="4" dir="${urdu ? "rtl" : "ltr"}" placeholder="Tap MIC, or type, or tap a sample">${esc(transcript)}</textarea>
            <p class="sub" style="margin-top:8px">Detected: ${urdu ? "Urdu" : transcript ? "English" : "—"}${urdu ? ` · English gloss: “Which matters are pending for me before today's sitting?”` : ""}</p>
          </div></section>
        ${reply ? `<section class="card put-up"><div class="card-body">
          <div class="dock-row"><span class="label">${reply.kind === "ruling" ? "Cited reply" : "Spoken reply (summary)"}</span><div class="spacer"></div><span class="ai-tag">${icon("sparkle")}${reply.engine === "gemini+archive" ? "Rulings" : reply.sources?.length ? "Rulings archive" : "AI-generated"}</span></div>
          ${(reply.paragraphs || []).length
            ? reply.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")
            : `<blockquote>${esc(reply.speak)}</blockquote>`}
          ${reply.geminiError ? `<p class="sub" style="margin-top:8px">The model is busy. The text above is from the rulings books, not from Live.</p>` : ""}
          <div class="live" style="margin-top:10px">${(reply.links || []).map((link) => link.external
            ? `<a class="chip" href="${esc(link.href)}" target="_blank" rel="noopener">${esc(link.label)}</a>`
            : `<a class="chip" href="${esc(link.href)}">${esc(link.label)}</a>`).join("")}</div>
          <div class="dock-row" style="margin-top:12px">
            <button class="btn sm" type="button" data-action="ai-speak">${icon("play")}Replay</button>
            <span class="sub">Daniel · ${urdu ? "Urdu (v3)" : "English"} · 1.0x</span>
          </div></div></section>` : ""}
        <section class="card"><div class="card-head"><h3>Speech settings</h3></div>
          <div class="card-body"><table class="table"><tbody>
            <tr><td>Recognition language</td><td>Auto (Urdu / English)</td></tr>
            <tr><td>Parliamentary vocabulary</td><td>On (demo terms)</td></tr>
            <tr><td>Store audio</td><td>Off (transcript only)</td></tr>
            <tr><td>Spoken voice</td><td>Daniel · same voice every Send</td></tr>
            <tr><td>Processing</td><td>${state.voice.live ? "Live voice listens · Daniel speaks" : "This browser listens · Daniel speaks"}</td></tr>
          </tbody></table></div></section>
      </div>
    </div>
  </div>`;
}

export function noticesView(state) {
  const items = noticesFor(state);
  const tab = state.noticeTab || "all";
  const shown = tab === "all" ? items : items.filter((item) => item.kind.toLowerCase() === tab);
  return `<div class="page"><div class="page-inner">
    <div class="page-title"><div><h2>Notification centre</h2><p>Push messages carry no content: “1 new critical item”. Quiet hours hold reminders unless marked urgent.</p></div>
      <span class="chip">${items.length} open</span></div>
    <section class="card">
      <div class="card-head"><div class="tabs">${[["all", "All"], ["critical", "Critical"], ["reminder", "Reminders"], ["action", "Actions"], ["update", "Updates"]].map(([key, label]) => `<button type="button" class="${tab === key ? "on" : ""}" data-action="notice-tab" data-tab="${key}">${label}</button>`).join("")}</div></div>
      <div class="dir-list">${shown.map((item) => `<a class="dir" href="${esc(item.href)}">
        <div><div class="t">${esc(item.text)}</div><div class="m"><span class="chip ${item.tone}">${esc(item.kind)}</span><span>${esc(item.module)}</span></div></div>
        <span class="btn sm">Open</span></a>`).join("")}</div>
    </section>
    <div class="cols">
      <section class="card"><div class="card-head"><h3>Delivery rules</h3></div>
        <table class="table"><thead><tr><th>Type</th><th>In-app</th><th>Push</th><th>E-mail</th></tr></thead>
        <tbody><tr><td>Critical</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
        <tr><td>Reminder</td><td>Yes</td><td>Yes</td><td>No</td></tr>
        <tr><td>Action</td><td>Yes</td><td>Digest</td><td>No</td></tr></tbody></table></section>
      <section class="card"><div class="card-head"><h3>Escalation ladder · M2</h3></div>
        <div class="card-body brief"><ul><li>T-3 days: responsible officer</li><li>Due date: officer + branch head</li><li>+2 days: Joint Secretary</li><li>+7 days: Secretary NA and Hon. Speaker</li></ul></div></section>
    </div>
  </div></div>`;
}

export function noticeDrawer(state) {
  const items = noticesFor(state).slice(0, 5);
  return `<div class="notice-pop" id="notice-pop">
    <div class="card-head"><h3>Notifications</h3><div class="spacer"></div><a class="link-btn" href="#/notices">Open centre</a></div>
    ${items.map((item) => `<a class="dir" href="${esc(item.href)}"><div><div class="t">${esc(item.text)}</div><div class="m"><span class="chip ${item.tone}">${esc(item.kind)}</span></div></div></a>`).join("")}
  </div>`;
}

export function morningCard(state) {
  const pack = briefing(state);
  return `<section class="card put-up">
    <div class="card-head">${icon("sparkle")}<h3>Morning briefing</h3><div class="spacer"></div><span class="ai-tag">${icon("sparkle")}AI-generated · verify before use</span></div>
    <div class="card-body">
      <ol class="brief-ol">${pack.lines.map((line) => `<li>${line}</li>`).join("")}</ol>
      <p class="sub" style="margin-top:10px">Compiled from ${state.actionable.length} papers, ${state.directions.length} directions and today's calendar. Confidence: high. Advisory.</p>
      <div class="sign-strip">
        <div><div class="caption">Signature awaiting</div><div class="signature-preview">Ayaz Sadiq</div></div>
        <p class="sub">${pack.urgent?.length || 0} paper${(pack.urgent?.length || 0) === 1 ? "" : "s"} due today still need this signature. The brief does not sign.</p>
        <a class="btn sm primary" href="#/desk">${icon("inbox")}Sign on my desk</a>
      </div>
      <div class="dock-row" style="margin-top:12px;flex-wrap:wrap">
        <a class="btn sm primary" href="#/desk">${icon("inbox")}Open decision queue</a>
        <button class="btn sm" type="button" data-action="listen-brief">${icon("play")}Listen to briefing</button>
        <button class="btn sm" type="button" data-action="rate-brief">${icon("check")}Rate this briefing</button>
      </div>
      <div class="ai-chips" style="margin-top:12px">${pack.chips.map((chip) => `<button type="button" data-action="ask-chip" data-q="${esc(chip.q)}">${esc(chip.label)}</button>`).join("")}</div>
    </div>
  </section>`;
}
