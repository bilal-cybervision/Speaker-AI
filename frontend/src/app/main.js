import "./styles.css";
import { demoRequest, deskCounts } from "../demo.js";
import { retrieveRulings, searchRulings } from "../portal/rulings-search.js";
import { icon } from "./icons.js";
import { ROLES, DESK, NEXT_DESK, sortUrgent, verdictFor, esc, clip, shown, PROTOTYPE_PASSWORD } from "./ui.js";
import { loginView, gateView, shellView, topbarView, deskView, directionsView, todayView, registerView, SAMPLE_NOTICE } from "./views.js";
import { MODULES, APPROVAL_KIND, moduleAction, filesView, meetingsView, speechesView, callsView, remoteView, mediaView, cardsView, prompterView } from "./modules.js";
import { db, speakerApprovals, decideApproval, resetModules } from "./store.js";
import { askSpeakerAI, askSpeakerAILocal, citationText, briefing, detectUrdu, liveContext, checkEvidenceAI } from "./ai.js";
import { speakerAiView, knowledgeView, voiceView, noticesView, noticeDrawer, noticesFor } from "./ai-ui.js";
import { intakeView, extractScan, sampleScanDataUrl, extractToRegister } from "./intake.js";
import { analyseAgenda, weekConflicts } from "./conflict.js";
import { GeminiLive } from "./live-voice.js";
import { hasGemini } from "./env.js";

const UNDO_MS = 5000;
const root = document.getElementById("root");

const GATE_KEY = "speaker-office-gate-v1";

const state = {
  user: null,
  gate: sessionStorage.getItem(GATE_KEY) === "ok",
  gateError: "",
  view: "desk",
  files: [],
  directions: [],
  groups: [],
  actionable: [],
  overdue: [],
  counts: {},
  selectedId: null,
  selected: null,
  choice: null,
  extras: false,
  demoOpen: false,
  draftWording: null,
  query: "",
  hidden: new Set(),
  pending: null,
  dirTab: "all",
  closingId: null,
  register: null,
  agenda: [],
  conflicts: [],
  weekNotes: [],
  invites: loadInvites(),
  rulingsFor,
  sel: {},
  navCounts: {},
  navHot: {},
  mtgForm: false,
  mtgDraft: null,
  callForm: { dir: "in", outcome: "message" },
  callFilter: "all",
  rmHours: 6,
  mediaTab: "monitor",
  prompter: null,
  pSpeed: 1,
  chats: [],
  chatId: null,
  askDraft: "",
  voice: { open: false, listening: false, speaking: false, transcript: "", reply: null },
  rtl: false,
  searchQ: "",
  searchHits: [],
  searchPick: null,
  noticeTab: "all",
  noticesOpen: false,
  intake: null,
  evidenceCheck: null,
  evidenceDraft: "",
  forceClose: false,
  gcMode: "",
  gcTier: "all",
  gcQuery: "",
  gcCreate: false,
};

const VIEWS = ["desk", "ai", "search", "notices", "intake", ...MODULES.map((item) => item.id)];

const rulingCache = new Map();

function rulingsFor(file) {
  if (file.kind === "letter") return null;
  if (!rulingCache.has(file.id)) rulingCache.set(file.id, retrieveRulings(file));
  return rulingCache.get(file.id);
}

/* ---------- Synthetic schedule ---------- */

function buildAgenda() {
  const at = (hourOffset, minutes = 0) => {
    const date = new Date();
    date.setMinutes(0, 0, 0);
    date.setHours(date.getHours() + hourOffset, minutes);
    return date;
  };
  const time = (date) => date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const raw = [
    { start: at(-4), end: at(-3), title: "Briefing with the Secretary on the session agenda", place: "Speaker's Chamber" },
    { start: at(-2), end: at(-1, 30), title: "Courtesy call: High Commissioner of the United Kingdom", place: "Diplomatic Lounge", tag: "Brief ready", tone: "green" },
    { start: at(0), end: at(1), title: "Sitting of the House: Question Hour", place: "Chamber", tag: "In the Chair" },
    { start: at(1, 30), end: at(2, 15), title: "Delegation of the Parliamentary Reporters Association", place: "Speaker's Lounge" },
    { start: at(3), end: at(3, 45), title: "Standing Committee on Rules of Procedure and Privileges", place: "Committee Room 2" },
  ].map((slot) => ({ ...slot, time: time(slot.start) }));
  return analyseAgenda(raw, true);
}

{
  const pack = buildAgenda();
  state.agenda = pack.slots;
  state.conflicts = pack.conflicts;
}

function loadInvites() {
  try {
    const saved = sessionStorage.getItem("speaker-office-invites-v1");
    if (saved) return JSON.parse(saved);
  } catch {
    /* fresh sample set */
  }
  return [
    { id: "INV-31", title: "Chief guest, convocation of the Pakistan Institute for Parliamentary Services", when: "Saturday 3 October, 11:00", where: "PIPS, Islamabad", conflict: null, answer: null },
    { id: "INV-32", title: "Keynote, Commonwealth Women Parliamentarians regional meeting", when: "Tuesday 6 October, 10:00", where: "Serena Hotel, Islamabad", conflict: "Overlaps the sitting of the House", answer: null },
  ];
}

function saveInvites() {
  try {
    sessionStorage.setItem("speaker-office-invites-v1", JSON.stringify(state.invites));
  } catch {
    /* still held in this tab */
  }
}

/* ---------- Data ---------- */

async function load() {
  state.files = (await demoRequest("/api/files")).files;
  state.directions = (await demoRequest("/api/directions")).directions;
  state.counts = deskCounts();
  derive();
  const file = state.selected;
  if (state.user.role === "officer" && file?.desk === "section_officer" && !file.note) {
    await demoRequest(`/api/files/${file.id}/note`, { method: "POST" });
    state.files = (await demoRequest("/api/files")).files;
    derive();
  }
}

function derive() {
  const role = state.user.role;
  const files = state.files.filter((file) => !state.hidden.has(file.id));
  if (role === "speaker") {
    const approvals = speakerApprovals();
    state.groups = [
      { label: "Urgent · remote", items: approvals.filter((item) => item.kind === "remote") },
      { label: "Files for decision", items: sortUrgent(files.filter((file) => file.desk === "speaker")) },
      { label: "Other approvals", items: sortUrgent(approvals.filter((item) => item.kind !== "remote")) },
      { label: "Decided", items: files.filter((file) => file.decision).sort((a, b) => String(b.decidedAt).localeCompare(String(a.decidedAt))), muted: true },
    ];
  } else if (role === "officer") {
    state.groups = [
      { label: "Back from the Speaker", items: sortUrgent(files.filter((file) => file.desk === "section_officer_return")) },
      { label: "To examine", items: sortUrgent(files.filter((file) => file.desk === "section_officer")) },
      { label: "With other desks", items: files.filter((file) => !["section_officer", "section_officer_return", "done"].includes(file.desk)), muted: true },
      { label: "Closed", items: files.filter((file) => file.desk === "done"), muted: true },
    ];
  } else {
    state.groups = [{ label: "On your desk", items: sortUrgent(files.filter((file) => file.desk === role)) }];
  }
  state.actionable = state.groups.filter((group) => !group.muted).flatMap((group) => group.items);
  const now = Date.now();
  state.overdue = state.directions.filter((item) => item.status !== "done" && new Date(item.due).getTime() < now);
  const all = state.groups.flatMap((group) => group.items);
  state.selected = all.find((file) => file.id === state.selectedId) || null;
  if (!state.selected) {
    state.selected = state.actionable[0] || null;
    state.selectedId = state.selected?.id || null;
  }
  const data = db();
  const counts = {
    desk: state.actionable.length,
    directions: state.overdue.length,
    meetings: data.meetings.filter((item) => (role === "speaker" ? item.status === "submitted" : item.status === "requested")).length,
    schedule: role === "speaker" ? state.invites.filter((item) => !item.answer).length : 0,
    speeches: data.speeches.filter((item) => (role === "speaker" ? item.status === "submitted" : item.status === "draft")).length,
    calls: data.calls.filter((item) => item.callback === "pending").length,
    remote: data.remote.items.filter((item) => item.status === "pending").length,
    media: role === "speaker" ? data.releases.filter((item) => item.status === "submitted").length : data.media.filter((item) => item.state === "new").length,
    cards: data.cards.filter((item) => item.status === (role === "speaker" ? "submitted" : "draft")).length,
  };
  state.navCounts = counts;
  state.navCounts.notices = noticesFor(state).length;
  state.navHot = {
    desk: state.actionable.some((file) => (file.daysLeft ?? 9) <= 1),
    directions: state.overdue.length > 0,
    remote: counts.remote > 0,
    notices: (state.overdue.length > 0) || state.actionable.some((file) => (file.daysLeft ?? 9) <= 1),
  };
  seedWelcome();
  state.weekNotes = weekConflicts(db().week, state.invites);
}

/* ---------- Render ---------- */

function render() {
  if (!state.gate) {
    root.innerHTML = gateView(state.gateError);
    document.getElementById("gate-password")?.focus();
    return;
  }
  if (!state.user) {
    root.innerHTML = loginView(state.loginError);
    return;
  }
  const scroll = document.getElementById("file-scroll");
  const keep = scroll && scroll.dataset.id === state.selectedId ? scroll.scrollTop : 0;
  const titles = {
    desk: state.user.role === "speaker" ? "My desk" : `${DESK[ROLES[state.user.role].desk]}'s desk`,
    ai: "Speaker AI",
    search: "Knowledge search",
    notices: "Notifications",
    intake: "Document intelligence",
  };
  for (const item of MODULES) titles[item.id] = `M${item.n} · ${item.label}`;
  derive();
  let body = "";
  let middle = "";
  if (state.view === "desk") {
    body = deskView(state);
    if (state.user.role === "speaker") {
      const due = state.actionable.filter((file) => (file.daysLeft ?? 9) <= 1).length;
      const next = state.agenda.find((slot) => slot.start > new Date());
      middle = [
        due ? `<span class="chip red">${icon("clock")}${due} due today</span>` : "",
        state.overdue.length ? `<a class="chip amber" href="#/directions">${icon("list")}${state.overdue.length} direction${state.overdue.length === 1 ? "" : "s"} overdue</a>` : "",
        next ? `<a class="chip" href="#/schedule">${icon("calendar")}${next.time} ${esc(next.title.split(":")[0])}</a>` : "",
      ].join("");
    }
  } else {
    const pages = {
      ai: speakerAiView,
      search: knowledgeView,
      notices: noticesView,
      intake: intakeView,
      files: filesView,
      directions: directionsView,
      meetings: meetingsView,
      schedule: todayView,
      speeches: speechesView,
      calls: callsView,
      remote: remoteView,
      media: mediaView,
      cards: cardsView,
    };
    body = (pages[state.view] || deskView)(state);
  }
  root.innerHTML = shellView(state, body, topbarView(state, titles[state.view], middle))
    + (state.register ? registerView(state) : "")
    + (state.prompter ? prompterView(state) : "")
    + (state.voice.open ? voiceView(state) : "")
    + (state.noticesOpen ? noticeDrawer(state) : "");
  const next = document.getElementById("file-scroll");
  if (next) {
    next.dataset.id = state.selectedId || "";
    next.scrollTop = keep;
  }
  const msgs = document.getElementById("ai-msgs");
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
  document.title = `${titles[state.view]} · Speaker's Office`;
}

/* ---------- Toasts ---------- */

function toast(text, action, ms = 3800) {
  let host = document.querySelector(".toasts");
  if (!host) {
    host = document.createElement("div");
    host.className = "toasts";
    document.body.appendChild(host);
  }
  const node = document.createElement("div");
  node.className = "toast";
  node.innerHTML = `${icon("check")}<span>${text}</span>${action ? `<button type="button">${esc(action.label)}</button>` : ""}<i class="timer" style="animation-duration:${ms}ms"></i>`;
  host.appendChild(node);
  const close = () => node.remove();
  if (action) {
    node.querySelector("button").onclick = () => {
      close();
      action.run();
    };
  }
  setTimeout(close, ms);
  return close;
}

function seedWelcome() {
  if (state.chats.length) return;
  const answer = askSpeakerAILocal("What is pending for me before the sitting?", state);
  state.chats = [{
    id: "c1",
    title: "Morning briefing",
    when: "Today",
    messages: [
      { role: "user", text: "What is pending for me before the sitting?" },
      { role: "assistant", answer },
    ],
  }];
  state.chatId = "c1";
}

function activeChat() {
  return state.chats.find((chat) => chat.id === state.chatId) || state.chats[0];
}

function goView(view) {
  state.view = view;
  const hash = `#/${view}`;
  if (location.hash !== hash) history.replaceState(null, "", hash);
}

function lastAnswer() {
  const chat = activeChat();
  const msg = [...(chat?.messages || [])].reverse().find((item) => item.role === "assistant");
  return msg?.answer || state.voice.reply || null;
}

async function sendAsk(text) {
  const q = String(text || "").trim();
  if (!q) return;
  state.askDraft = "";
  state.noticesOpen = false;
  if (!state.chats.length) seedWelcome();
  const chat = activeChat();
  chat.messages.push({ role: "user", text: q });
  if (chat.title === "New conversation") chat.title = clip(q, 42);
  chat.when = "Just now";
  const wait = {
    kind: "office",
    confidence: "High",
    title: "Searching authorised records",
    paragraphs: ["Looking in the papers on your desk and both rulings books (1947–1997 and 1999–2017)."],
    speak: "One moment.",
    links: [],
    sources: [],
    followUps: [],
  };
  chat.messages.push({ role: "assistant", answer: wait });
  goView("ai");
  render();
  const answer = await askSpeakerAI(q, state);
  if (answer.geminiError) toast(esc(shown(answer.geminiError)));
  const last = chat.messages[chat.messages.length - 1];
  if (last?.role === "assistant") last.answer = answer;
  render();
}

function newChat() {
  const chat = { id: `c${Date.now()}`, title: "New conversation", when: "Just now", messages: [] };
  state.chats.unshift(chat);
  state.chatId = chat.id;
  state.askDraft = "";
  render();
  document.getElementById("ai-ask")?.focus();
}

let speakCtx = null;
let speakNode = null;
let speakToken = 0;
let voiceAsk = 0;

function finishSpeak(token) {
  if (token !== speakToken) return;
  state.voice.speaking = false;
  if (state.voice.open) render();
}

function speakBrowser(text, urdu, token) {
  if (!window.speechSynthesis) {
    toast("This browser cannot speak the reply. The text is on screen.");
    finishSpeak(token);
    return;
  }
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.lang = urdu ? "ur-PK" : "en-GB";
  const voice = speechSynthesis.getVoices().find((item) => (urdu ? /ur|hi/i : /en-GB|en-US|en/i).test(item.lang));
  if (voice) utter.voice = voice;
  utter.onend = () => finishSpeak(token);
  utter.onerror = () => finishSpeak(token);
  speechSynthesis.speak(utter);
}

async function speakText(text, urdu = false) {
  const line = String(text || "").trim();
  if (!line) return;
  stopSpeak();
  const token = ++speakToken;
  speakCtx = speakCtx || new AudioContext();
  const unlock = speakCtx.resume();
  state.voice.speaking = true;
  if (state.voice.open) render();
  try {
    await unlock;
    const res = await fetch("/api/elevenlabs/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: line, urdu: Boolean(urdu) }),
    });
    if (token !== speakToken) return;
    if (!res.ok) {
      if (res.status === 401) toast("Daniel's voice was refused. This browser will speak the line once.");
      speakBrowser(line, urdu, token);
      return;
    }
    const bytes = await res.arrayBuffer();
    if (token !== speakToken) return;
    const buffer = await speakCtx.decodeAudioData(bytes.slice(0));
    if (token !== speakToken) return;
    const src = speakCtx.createBufferSource();
    src.buffer = buffer;
    src.connect(speakCtx.destination);
    src.onended = () => {
      if (speakNode === src) speakNode = null;
      finishSpeak(token);
    };
    speakNode = src;
    src.start();
  } catch {
    if (token === speakToken) speakBrowser(line, urdu, token);
  }
}

function stopSpeak() {
  speakToken += 1;
  try { speechSynthesis.cancel(); } catch { /* ignore */ }
  try { speakNode?.stop(); } catch { /* ignore */ }
  speakNode = null;
  liveSession?.stopPlayback?.();
  state.voice.speaking = false;
}

function stopAllVoice() {
  stopListen();
  stopSpeak();
  if (state.voice.open) render();
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => toast("Copied with citations."), () => toast("Could not copy."));
  } else {
    toast("Could not copy.");
  }
}

function runSearch(query) {
  state.searchQ = String(query || "").trim();
  state.searchHits = state.searchQ ? searchRulings(state.searchQ, 8) : [];
  state.searchPick = state.searchHits[0]?.id || null;
  goView("search");
  render();
}

function openVoice(prefill = "") {
  state.voice = {
    open: true,
    listening: false,
    speaking: false,
    transcript: prefill || state.askDraft || state.voice.transcript || "",
    reply: null,
    live: false,
    fromSend: false,
  };
  state.noticesOpen = false;
  render();
  void connectLive().finally(() => {
    if (state.voice.open && !state.voice.listening) startListen();
  });
}

async function connectLive() {
  if (liveSession?.ready || !hasGemini()) return;
  try {
    liveSession = new GeminiLive({
      onReady: (model) => {
        state.voice.live = true;
        state.voice.model = model;
        const chip = document.querySelector(".voice-stage .chip");
        if (chip) chip.textContent = "Daniel · tap MIC";
      },
      onInput: (text) => {
        state.voice.answered = "";
        state.voice.transcript = `${state.voice.transcript || ""} ${text}`.trim();
        const box = document.getElementById("voice-text");
        if (box) {
          box.value = state.voice.transcript;
          box.classList.toggle("urdu", detectUrdu(state.voice.transcript));
          box.dir = detectUrdu(state.voice.transcript) ? "rtl" : "ltr";
        }
      },
      onOutput: (text) => {
        state.voice.spoken = `${state.voice.spoken || ""} ${text}`.trim();
        if (!state.voice.speaking) {
          state.voice.speaking = true;
          const orb = document.querySelector(".orb");
          if (orb) {
            orb.textContent = "STOP";
            orb.classList.add("listening");
            orb.setAttribute("aria-label", "Stop");
          }
        }
      },
      onTurn: async () => {
        if (state.voice.fromSend) return;
        const q = (document.getElementById("voice-text")?.value || state.voice.transcript || "").trim();
        if (!q || q === state.voice.answered) return;
        state.voice.answered = q;
        const ask = ++voiceAsk;
        stopListen();
        const answer = askSpeakerAILocal(q, state);
        if (ask !== voiceAsk || !state.voice.open) return;
        state.voice.reply = answer;
        if (!String(answer.speak || "").trim()) render();
        speakText(answer.speak, detectUrdu(q));
      },
      onError: (err) => {
        state.voice.live = false;
        toast(esc(shown(err.message || "Live voice paused. Transcript still works.")));
      },
    });
    await liveSession.connect(liveContext(state));
    state.voice.live = true;
    if (state.voice.listening) {
      try {
        rec?.abort();
        rec = null;
        await liveSession.startMic();
      } catch {
        /* keep browser listening */
      }
    }
    render();
  } catch (err) {
    liveSession = null;
    state.voice.live = false;
    toast(esc(shown(err.message || "Live voice is on fallback. Tap MIC to speak; the model still answers the transcript.")));
  }
}

function closeVoice() {
  stopAllVoice();
  liveSession?.close();
  liveSession = null;
  state.voice.open = false;
  state.voice.listening = false;
  state.voice.speaking = false;
  state.voice.live = false;
  render();
}

async function sendVoice() {
  const box = document.getElementById("voice-text");
  const text = (box?.value || state.voice.transcript || "").trim();
  if (!text) return;
  stopListen();
  stopSpeak();
  const ask = ++voiceAsk;
  state.voice.transcript = text;
  state.voice.fromSend = true;
  state.voice.reply = null;
  render();
  const answer = await askSpeakerAI(text, state, { skipGemini: Boolean(liveSession?.ready) });
  if (ask !== voiceAsk) return;
  if (answer.geminiError) toast(esc(shown(answer.geminiError)));
  state.voice.reply = answer;
  if (!state.chats.length) seedWelcome();
  const chat = activeChat();
  chat.messages.push({ role: "user", text });
  chat.messages.push({ role: "assistant", answer });
  if (chat.title === "New conversation") chat.title = clip(text, 42);
  chat.when = "Just now";
  render();
  if (ask !== voiceAsk) return;
  speakText(answer.speak, detectUrdu(text));
}

let rec = null;
let liveSession = null;

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(label || "Timed out.")), ms);
    }),
  ]);
}

async function startListen() {
  if (state.voice.listening) return;
  stopSpeak();
  state.voice.listening = true;
  state.voice.reply = null;
  state.voice.spoken = "";
  render();
  if (liveSession?.ready) {
    try {
      await withTimeout(liveSession.startMic(), 8000, "Microphone permission was refused.");
      return;
    } catch {
      toast("Microphone permission was refused. Type, or tap a sample.");
    }
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  try {
    rec?.abort();
    rec = new SR();
    rec.lang = state.rtl ? "ur-PK" : "en-PK";
    rec.interimResults = true;
    rec.continuous = true;
    rec.onresult = (event) => {
      let spoken = "";
      for (let i = 0; i < event.results.length; i += 1) spoken += event.results[i][0].transcript;
      state.voice.transcript = spoken;
      const box = document.getElementById("voice-text");
      if (box) {
        box.value = spoken;
        box.classList.toggle("urdu", detectUrdu(spoken));
        box.dir = detectUrdu(spoken) ? "rtl" : "ltr";
      }
    };
    rec.onerror = (event) => {
      if (event.error === "aborted" || event.error === "no-speech") return;
      stopListen();
      toast(event.error === "not-allowed"
        ? "Allow the microphone, then tap MIC."
        : "Could not hear. Type, or tap a sample.");
    };
    rec.onend = () => {
      state.voice.listening = false;
      rec = null;
      document.querySelector(".orb")?.classList.remove("listening");
      document.querySelector(".wave")?.classList.remove("on");
    };
    rec.start();
  } catch {
    state.voice.listening = false;
    toast("Microphone is not available. Type, or tap a sample.");
  }
}

function stopListen() {
  const noEngine = !(window.SpeechRecognition || window.webkitSpeechRecognition) && !liveSession?.ready;
  const was = state.voice.listening;
  try { rec?.stop(); } catch { /* already stopped */ }
  rec = null;
  liveSession?.stopMic();
  state.voice.listening = false;
  document.querySelector(".orb")?.classList.remove("listening");
  document.querySelector(".wave")?.classList.remove("on");
  if (noEngine && was && !String(state.voice.transcript || "").trim()) {
    state.voice.transcript = "آج کے اجلاس سے پہلے میرے لیے کون سے معاملات زیر التوا ہیں؟";
    render();
    toast("Demo transcript loaded. Send it, or edit it.");
  }
}

/* ---------- Actions ---------- */

async function signIn(role) {
  await flushPending();
  const person = ROLES[role];
  try {
    const data = await demoRequest("/api/login", { method: "POST", body: JSON.stringify({ email: person.email, password: person.password }) });
    state.user = data.user;
    state.loginError = "";
  } catch (err) {
    state.loginError = err.message;
    render();
    return false;
  }
  state.choice = null;
  state.query = "";
  state.closingId = null;
  await load();
  render();
  return true;
}

async function follow(role, id) {
  state.selectedId = id;
  state.view = "desk";
  if (location.hash !== "#/desk") history.replaceState(null, "", "#/desk");
  await signIn(role);
}

async function select(id) {
  if (state.selectedId !== id) {
    state.choice = null;
    state.draftWording = null;
  }
  state.selectedId = id;
  await load();
  render();
}

function move(step) {
  const all = state.groups.flatMap((group) => group.items);
  if (!all.length) return;
  const at = all.findIndex((file) => file.id === state.selectedId);
  const next = all[Math.max(0, Math.min(all.length - 1, at + step))];
  if (next) select(next.id);
}

function choose(choice) {
  const file = state.selected;
  if (!file || state.user.role !== "speaker" || (file.desk !== "speaker" && !file.ref)) return;
  if (file.ref && choice === "amend") return;
  keepWording();
  state.choice = state.choice === choice ? null : choice;
  state.extras = false;
  render();
  const focus = state.choice === "amend" ? document.getElementById("wording") : state.choice ? document.getElementById("pin") : null;
  if (focus) {
    focus.focus();
    focus.setSelectionRange(focus.value.length, focus.value.length);
  }
}

function keepWording() {
  const box = document.getElementById("wording");
  if (box && state.selected?.kind !== "letter") state.draftWording = box.value;
}

function signApproval(item) {
  const remark = document.getElementById("remark")?.value.trim() || "";
  if (item.kind === "remote") {
    const pin = document.getElementById("pin");
    if (pin.value !== "2468") {
      pin.value = "";
      pin.focus();
      pin.placeholder = "Wrong PIN";
      return;
    }
  }
  const choice = state.choice;
  const revert = decideApproval(item, choice, remark);
  state.choice = null;
  state.selectedId = null;
  render();
  const label = choice === "allow" ? "Approved" : item.kind === "meeting" ? "Declined" : "Sent back";
  const after = { remote: "Synced to the office. The officer is notified.", meeting: choice === "allow" ? "Protocol and Security notified." : "Protocol will send regrets.", speech: choice === "allow" ? "Ready for the prompter." : "Back with the speech writer.", release: choice === "allow" ? "The Media Wing may release it." : "Release stays blocked.", cards: choice === "allow" ? "The batch may be dispatched." : "Back with the desk." }[item.kind];
  toast(`<b>${label}</b> · ${esc(APPROVAL_KIND[item.kind])}. ${after}`, {
    label: "Undo",
    run: () => {
      revert();
      state.selectedId = item.id;
      state.choice = choice;
      render();
    },
  }, UNDO_MS);
}

function sign() {
  const file = state.selected;
  if (!file || !state.choice || state.user.role !== "speaker") return;
  if (file.ref) {
    signApproval(file);
    return;
  }
  const wording = document.getElementById("wording")?.value.trim() || "";
  const remark = document.getElementById("remark")?.value.trim() || "";
  let instruction = document.getElementById("instruction")?.value.trim() || "";
  if (state.choice === "amend" && !wording) {
    const box = document.getElementById("wording");
    box.focus();
    box.placeholder = file.kind === "letter" ? "Write the direction before signing." : "Write the wording before signing.";
    return;
  }
  if (state.choice === "amend" && file.kind === "letter") instruction = wording;
  flushPending();
  const payload = { decision: state.choice, wording, remark, instruction };
  const choice = state.choice;
  const label = verdictFor({ ...file, decision: choice });
  state.hidden.add(file.id);
  state.choice = null;
  state.extras = false;
  state.draftWording = null;
  state.selectedId = null;
  derive();
  render();
  const pending = { id: file.id, payload, choice, timer: 0, dismiss: null };
  pending.timer = setTimeout(() => commit(pending), UNDO_MS);
  pending.dismiss = toast(`<b>${esc(label)}</b> · ${esc(file.id)} signed`, { label: "Undo", run: () => undo(pending) }, UNDO_MS);
  state.pending = pending;
}

async function commit(pending) {
  if (state.pending !== pending) return;
  clearTimeout(pending.timer);
  state.pending = null;
  try {
    await demoRequest(`/api/files/${pending.id}/decide`, { method: "POST", body: JSON.stringify(pending.payload) });
  } catch (err) {
    toast(esc(err.message));
  }
  state.hidden.delete(pending.id);
  if (state.user?.role === "speaker") {
    await load();
    render();
    toast(`Recorded on ${esc(pending.id)}. The file is back with the Section Officer.`, { label: "Follow the file", run: () => follow("officer", pending.id) }, 6000);
  }
}

function undo(pending) {
  if (state.pending !== pending) return;
  clearTimeout(pending.timer);
  state.pending = null;
  state.hidden.delete(pending.id);
  state.selectedId = pending.id;
  state.choice = pending.choice;
  if (pending.choice === "amend") state.draftWording = pending.payload.wording;
  derive();
  render();
}

async function flushPending() {
  const pending = state.pending;
  if (!pending) return;
  pending.dismiss?.();
  clearTimeout(pending.timer);
  state.pending = null;
  try {
    await demoRequest(`/api/files/${pending.id}/decide`, { method: "POST", body: JSON.stringify(pending.payload) });
  } catch {
    /* the file stays where it was */
  }
  state.hidden.delete(pending.id);
}

async function staffStep(kind) {
  const file = state.selected;
  if (!file) return;
  const role = state.user.role;
  try {
    if (kind === "send-up") {
      const line = document.getElementById("officerLine")?.value ?? file.officerLine;
      await demoRequest(`/api/files/${file.id}/line`, { method: "POST", body: JSON.stringify({ officerLine: line }) });
      await demoRequest(`/api/files/${file.id}/send`, { method: "POST" });
    } else if (kind === "forward") {
      const minute = document.getElementById("minute")?.value || "Seen. Forwarded.";
      await demoRequest(`/api/files/${file.id}/forward`, { method: "POST", body: JSON.stringify({ minute }) });
    } else if (kind === "carry-out") {
      await demoRequest(`/api/files/${file.id}/carry-out`, { method: "POST" });
    }
  } catch (err) {
    toast(esc(err.message));
    return;
  }
  state.selectedId = null;
  await load();
  render();
  if (kind === "carry-out") {
    toast(`${esc(file.id)} carried out and closed.`);
    return;
  }
  const nextRole = kind === "send-up" ? "js" : NEXT_DESK[role];
  const nextName = nextRole === "speaker" ? "the Speaker" : `the ${DESK[nextRole]}`;
  toast(`${esc(file.id)} sent to ${nextName}.`, { label: `Open as ${nextRole === "speaker" ? "Speaker" : DESK[nextRole]}`, run: () => follow(nextRole, file.id) }, 6000);
}

async function registerNotice() {
  const form = state.register;
  try {
    const data = await demoRequest("/api/files", { method: "POST", body: JSON.stringify(form) });
    state.register = null;
    await demoRequest(`/api/files/${data.file.id}/note`, { method: "POST" });
    state.selectedId = data.file.id;
    await load();
    render();
    toast(`${esc(data.file.id)} registered. The note is drafted.`);
  } catch (err) {
    toast(esc(err.message));
  }
}

async function directionAction(kind, id) {
  try {
    if (kind === "dir-remind") {
      const data = await demoRequest(`/api/directions/${id}/remind`, { method: "POST" });
      toast(`Reminder sent to ${esc(data.direction.owner)}.`);
    } else if (kind === "dir-done") {
      const evidence = document.getElementById("evidence")?.value.trim();
      if (!evidence) {
        document.getElementById("evidence")?.focus();
        return;
      }
      await demoRequest(`/api/directions/${id}/done`, { method: "POST", body: JSON.stringify({ evidence }) });
      state.closingId = null;
      state.evidenceCheck = null;
      state.evidenceDraft = "";
      toast("Direction closed with evidence.");
    } else if (kind === "dir-reopen") {
      await demoRequest(`/api/directions/${id}/reopen`, { method: "POST" });
      toast("Direction reopened. Due in three days.");
    }
  } catch (err) {
    toast(esc(err.message));
  }
  await load();
  render();
}

function unlockGate() {
  const value = document.getElementById("gate-password")?.value || "";
  if (value !== PROTOTYPE_PASSWORD) {
    state.gateError = "That password is not right.";
    render();
    return;
  }
  sessionStorage.setItem(GATE_KEY, "ok");
  state.gate = true;
  state.gateError = "";
  render();
}

/* ---------- Events ---------- */

root.addEventListener("submit", (event) => {
  if (event.target?.id !== "gate-form") return;
  event.preventDefault();
  unlockGate();
});

root.addEventListener("click", async (event) => {
  if (state.noticesOpen && !event.target.closest("#notice-pop") && !event.target.closest("[data-action='toggle-notices']")) {
    state.noticesOpen = false;
    document.getElementById("notice-pop")?.remove();
  }
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const { action } = target.dataset;
  if ((action === "close-sheet" || action === "voice-close") && target.classList.contains("scrim") && event.target !== target) return;
  switch (action) {
    case "login":
      await signIn(target.dataset.role);
      break;
    case "switch":
      if (target.dataset.role !== state.user.role) await signIn(target.dataset.role);
      break;
    case "logout":
      await flushPending();
      await demoRequest("/api/logout", { method: "POST" });
      state.user = null;
      render();
      break;
    case "reset": {
      if (state.pending) {
        clearTimeout(state.pending.timer);
        state.pending.dismiss?.();
        state.pending = null;
      }
      const role = state.user.role;
      await demoRequest("/api/reset", { method: "POST" });
      resetModules();
      state.sel = {};
      state.hidden.clear();
      state.selectedId = null;
      state.chats = [];
      state.chatId = null;
      state.askDraft = "";
      state.voice = { open: false, listening: false, speaking: false, transcript: "", reply: null };
      state.searchQ = "";
      state.searchHits = [];
      state.searchPick = null;
      state.noticesOpen = false;
      state.intake = null;
      state.evidenceCheck = null;
      state.gcMode = "";
      state.gcTier = "all";
      state.gcQuery = "";
      state.gcCreate = false;
      liveSession?.close();
      liveSession = null;
      rulingCache.clear();
      sessionStorage.removeItem("speaker-office-invites-v1");
      state.invites = loadInvites();
      await signIn(role);
      toast("Sample papers reset.");
      break;
    }
    case "select":
      await select(target.dataset.id);
      break;
    case "choose":
      choose(target.dataset.choice);
      break;
    case "sign":
      sign();
      break;
    case "extras":
      state.extras = true;
      render();
      document.getElementById(state.choice === "reject" ? "remark" : "instruction")?.focus();
      break;
    case "recommend": {
      const file = state.selected;
      const line = document.getElementById("officerLine")?.value ?? file.officerLine;
      await demoRequest(`/api/files/${file.id}/line`, { method: "POST", body: JSON.stringify({ officerLine: line, recommend: target.dataset.choice }) });
      await load();
      render();
      break;
    }
    case "send-up":
    case "forward":
    case "carry-out":
      await staffStep(action);
      break;
    case "dir-tab":
      state.dirTab = target.dataset.tab;
      render();
      break;
    case "dir-close":
      state.closingId = target.dataset.id;
      render();
      document.getElementById("evidence")?.focus();
      break;
    case "dir-cancel":
      state.closingId = null;
      state.evidenceCheck = null;
      state.evidenceDraft = "";
      render();
      break;
    case "dir-check": {
      const evidence = document.getElementById("evidence")?.value.trim() || state.evidenceDraft;
      state.evidenceDraft = evidence;
      const direction = state.directions.find((item) => item.id === target.dataset.id);
      if (!direction) break;
      toast("Checking evidence against the direction…");
      state.evidenceCheck = { id: direction.id, ...(await checkEvidenceAI(direction, evidence)) };
      render();
      break;
    }
    case "dir-remind":
    case "dir-done":
    case "dir-reopen":
      await directionAction(action, target.dataset.id);
      break;
    case "invite": {
      const item = state.invites.find((invite) => invite.id === target.dataset.id);
      if (item) item.answer = target.dataset.answer;
      saveInvites();
      render();
      toast(`${esc(target.dataset.answer)}. Protocol and the schedule are updated.`);
      break;
    }
    case "open-register":
      state.register = { kind: "question", memberName: "", minister: "", subject: "", body: "" };
      render();
      document.getElementById("reg-body")?.focus();
      break;
    case "fill-sample":
      state.register = { ...SAMPLE_NOTICE };
      render();
      break;
    case "reg-kind":
      state.register.kind = target.dataset.kind;
      render();
      break;
    case "close-sheet":
      state.register = null;
      render();
      break;
    case "register":
      await registerNotice();
      break;
    case "p-toggle":
      togglePrompter();
      break;
    case "p-faster":
    case "p-slower":
      setSpeed(action === "p-faster" ? 0.25 : -0.25);
      break;
    case "p-close":
      closePrompter();
      break;
    case "ask-send":
      await sendAsk(document.getElementById("ai-ask")?.value || document.getElementById("ask-box")?.value || state.askDraft);
      break;
    case "ask-chip":
      await sendAsk(target.dataset.q);
      break;
    case "open-voice":
      openVoice(document.getElementById("ask-box")?.value || document.getElementById("ai-ask")?.value || document.getElementById("know-q")?.value || "");
      break;
    case "voice-close":
      closeVoice();
      break;
    case "voice-send":
      await sendVoice();
      break;
    case "voice-sample":
      stopSpeak();
      voiceAsk += 1;
      state.voice.transcript = target.dataset.q || "";
      state.voice.reply = null;
      render();
      document.getElementById("voice-text")?.focus();
      break;
    case "voice-mic":
      if (state.voice.listening || state.voice.speaking) stopAllVoice();
      else startListen();
      break;
    case "voice-stop":
      stopAllVoice();
      break;
    case "chat-new":
      newChat();
      break;
    case "chat-open":
      state.chatId = target.dataset.id;
      render();
      break;
    case "ai-copy": {
      const answer = lastAnswer();
      if (answer) copyText(citationText(answer));
      break;
    }
    case "ai-speak": {
      const answer = lastAnswer();
      if (answer) speakText(answer.speak, detectUrdu(state.voice.transcript));
      break;
    }
    case "ai-to-note":
      toast("Draft line ready for the officer's note. The Speaker still decides; nothing is filed yet.");
      break;
    case "ai-report":
      toast("Issue logged against this answer. The reply stays on screen.");
      break;
    case "know-go":
      runSearch(document.getElementById("know-q")?.value || state.searchQ);
      break;
    case "know-pick":
      state.searchPick = target.dataset.id;
      render();
      break;
    case "know-cite": {
      const item = (state.searchHits || []).find((hit) => hit.id === target.dataset.id);
      if (item) copyText(`${item.id} · PDF page ${item.pdfPage} · ${item.citation || item.volume}\nAdvisory only. The Speaker decides.`);
      break;
    }
    case "listen-brief":
      speakText(briefing(state).speak);
      break;
    case "rate-brief":
      toast("Thank you. The rating is recorded for this demo.");
      break;
    case "toggle-lang":
      state.rtl = !state.rtl;
      render();
      toast(state.rtl ? "Urdu preferred for voice and replies." : "English preferred.");
      break;
    case "toggle-notices":
      state.noticesOpen = !state.noticesOpen;
      render();
      break;
    case "notice-tab":
      state.noticeTab = target.dataset.tab;
      render();
      break;
    case "intake-sample": {
      const dataUrl = sampleScanDataUrl();
      state.intake = { dataUrl, page: "page 1 of 2" };
      goView("intake");
      render();
      const pack = await extractScan(dataUrl);
      state.intake = { dataUrl, page: "page 1 of 2", ...pack };
      render();
      toast(pack.engine === "gemini" ? "Scan read. Confirm the fields before you register." : "Sample extraction loaded. Confirm the fields.");
      break;
    }
    case "intake-reject":
      state.intake = null;
      render();
      break;
    case "intake-register":
    case "intake-accept":
      if (!state.intake) break;
      state.register = extractToRegister(state.intake);
      render();
      break;
    case "intake-change":
      if (!state.intake) break;
      state.register = extractToRegister(state.intake);
      render();
      toast("Adjust the fields, then register.");
      break;
    default:
      await moduleAction(action, target, { state, render, toast, demoRequest, load });
      break;
  }
});

/* ---------- Prompter ---------- */

const prompter = { running: false, frame: 0, last: 0, elapsed: 0 };

function togglePrompter() {
  prompter.running = !prompter.running;
  const btn = document.getElementById("p-toggle");
  if (btn) btn.lastElementChild.textContent = prompter.running ? "Pause" : "Start";
  if (prompter.running) {
    prompter.last = performance.now();
    prompter.frame = requestAnimationFrame(stepPrompter);
  } else {
    cancelAnimationFrame(prompter.frame);
  }
}

function stepPrompter(now) {
  const box = document.getElementById("p-scroll");
  if (!box || !prompter.running) return;
  const dt = (now - prompter.last) / 1000;
  prompter.last = now;
  prompter.elapsed += dt;
  box.scrollTop += dt * 38 * state.pSpeed;
  const clock = document.getElementById("p-time");
  if (clock) clock.textContent = `${Math.floor(prompter.elapsed / 60)}:${String(Math.floor(prompter.elapsed % 60)).padStart(2, "0")}`;
  prompter.frame = requestAnimationFrame(stepPrompter);
}

function setSpeed(delta) {
  state.pSpeed = Math.min(3, Math.max(0.25, +(state.pSpeed + delta).toFixed(2)));
  const label = document.getElementById("p-speed");
  if (label) label.textContent = `${state.pSpeed}x`;
}

function closePrompter() {
  prompter.running = false;
  prompter.elapsed = 0;
  cancelAnimationFrame(prompter.frame);
  state.prompter = null;
  render();
}

root.addEventListener(
  "toggle",
  (event) => {
    if (event.target.matches("details.demo")) state.demoOpen = event.target.open;
  },
  true,
);

root.addEventListener("change", async (event) => {
  const target = event.target;
  if (target.id !== "intake-file") return;
  const file = target.files?.[0];
  if (!file) return;
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  state.intake = { dataUrl, page: "page 1 of 2" };
  goView("intake");
  render();
  const pack = await extractScan(dataUrl);
  state.intake = { dataUrl, page: "page 1 of 2", ...pack };
  render();
});

root.addEventListener("input", (event) => {
  const target = event.target;
  if (target.id === "evidence") {
    state.evidenceDraft = target.value;
    return;
  }
  if (target.id === "ask-box" || target.id === "ai-ask") {
    state.askDraft = target.value;
    return;
  }
  if (target.id === "know-q") {
    state.searchQ = target.value;
    return;
  }
  if (target.id === "voice-text") {
    state.voice.transcript = target.value;
    return;
  }
  if (target.id === "gc-q") {
    state.gcQuery = target.value;
    const at = target.selectionStart;
    render();
    const box = document.getElementById("gc-q");
    if (box) {
      box.focus();
      box.setSelectionRange(at, at);
    }
    return;
  }
  if (target.id === "q" || target.id === "files-q") {
    state.query = target.value;
    const at = target.selectionStart;
    derive();
    render();
    const box = document.getElementById(target.id);
    box.focus();
    box.setSelectionRange(at, at);
    return;
  }
  if (target.dataset.reg && state.register) {
    state.register[target.dataset.reg] = target.value;
    if (target.dataset.reg === "body") {
      const words = target.value.trim().split(/\s+/).filter(Boolean).length;
      const opinion = /in (the|your) (minister'?s )?view|whether .* adequate/i.test(target.value);
      document.getElementById("reg-live").innerHTML = `<span class="chip ${words > 150 ? "red" : ""}">${words} words${words > 150 ? " · over 150" : ""}</span>${opinion ? `<span class="chip red">Asks for an opinion</span>` : ""}`;
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (!state.user) return;
  const typing = event.target.matches("input, textarea");
  const key = event.key.toLowerCase();
  const ctrl = event.ctrlKey || event.metaKey;

  if (state.voice.open) {
    if (event.key === "Escape") {
      closeVoice();
      return;
    }
    if (event.key === "Enter" && !event.shiftKey && event.target.id === "voice-text") {
      event.preventDefault();
      sendVoice();
    }
    return;
  }

  if (state.register) {
    if (event.key === "Escape") {
      state.register = null;
      render();
    } else if (ctrl && event.key === "Enter") {
      event.preventDefault();
      registerNotice();
    }
    return;
  }

  if (state.prompter) {
    if (event.key === "Escape") closePrompter();
    else if (event.key === " ") {
      event.preventDefault();
      togglePrompter();
    } else if (event.key === "ArrowUp" || event.key === "ArrowRight") setSpeed(0.25);
    else if (event.key === "ArrowDown" || event.key === "ArrowLeft") setSpeed(-0.25);
    return;
  }

  if (event.key === "Escape") {
    if (state.noticesOpen) {
      state.noticesOpen = false;
      render();
    } else if (typing) event.target.blur();
    else if (state.choice) {
      state.choice = null;
      render();
    }
    return;
  }

  if (event.key === "Enter" && event.target.id === "ask-box") {
    event.preventDefault();
    sendAsk(event.target.value);
    return;
  }
  if (event.key === "Enter" && event.target.id === "ai-ask") {
    event.preventDefault();
    sendAsk(event.target.value);
    return;
  }
  if (event.key === "Enter" && event.target.id === "know-q") {
    event.preventDefault();
    runSearch(event.target.value);
    return;
  }

  if (state.view !== "desk") {
    if (state.view === "calls" && event.key === "Enter" && event.target.id?.startsWith("call-")) {
      event.preventDefault();
      moduleAction("call-log", event.target, { state, render, toast, demoRequest, load });
    } else if (!typing && key === "d") location.hash = "#/desk";
    return;
  }

  const file = state.selected;
  const role = state.user.role;
  if (event.key === "Enter" && (ctrl || !typing || ["minute", "remark", "instruction", "pin"].includes(event.target.id))) {
    if (!typing && event.target.matches("button, a")) return;
    if (role === "speaker" && state.choice) {
      event.preventDefault();
      sign();
    } else if (role === "officer" && file?.desk === "section_officer" && (ctrl || !typing)) {
      event.preventDefault();
      staffStep("send-up");
    } else if (["js", "special", "secgen"].includes(role) && file?.desk === role) {
      event.preventDefault();
      staffStep("forward");
    } else if (role === "officer" && file?.desk === "section_officer_return" && !typing) {
      event.preventDefault();
      staffStep("carry-out");
    }
    return;
  }
  if (typing || ctrl || event.altKey) return;
  if (key === "/") {
    event.preventDefault();
    document.getElementById("q")?.focus();
  } else if (key === "j" || event.key === "ArrowDown") {
    event.preventDefault();
    move(1);
  } else if (key === "k" || event.key === "ArrowUp") {
    event.preventDefault();
    move(-1);
  } else if (role === "speaker" && (file?.desk === "speaker" || file?.ref)) {
    const map = file.ref ? { a: "allow", r: "reject" } : { a: "allow", r: "reject", f: "amend" };
    if (map[key]) {
      event.preventDefault();
      choose(map[key]);
    }
  }
});

function readRoute() {
  const view = location.hash.replace(/^#\/?/, "").split("/")[0];
  state.view = view === "today" ? "schedule" : VIEWS.includes(view) ? view : "desk";
}

window.addEventListener("hashchange", () => {
  readRoute();
  state.closingId = null;
  state.noticesOpen = false;
  if (state.user) render();
});

window.addEventListener("beforeunload", () => {
  if (state.pending) flushPending();
});

readRoute();
render();
