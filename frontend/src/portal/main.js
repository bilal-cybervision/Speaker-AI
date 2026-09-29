import { fill } from "./fill.js";
import { pages } from "./pages.js";
import { asideMarkup as spkAside, headerMarkup as spkHeader } from "./shells/speaker-markup.js";
import { titles } from "./data/navigation.js";
import { mountLogin, currentUser, homePage, logout, loginAs } from "./login.js";
import { loadFiles, stripHtml, isFlowPage } from "./flow-ui.js";
import { bindPageClicks } from "./clicks.js";

const SHELL_KEY = "na-portal-shell";

const spkIdle = ["text-on-primary/90", "hover:bg-primary", "hover:text-on-primary"];

window.toggleAI = () => {
  const panel = document.getElementById("ai-drawer");
  if (panel) panel.classList.toggle("hidden");
};

function parseRoute() {
  const parts = location.hash.replace(/^#/, "").split("/").filter(Boolean);
  const page = parts[1] || (parts[0] && parts[0] !== "speaker" && parts[0] !== "secretariat" ? parts[0] : "");
  return { shell: "speaker", page: page || homePage() };
}

function go(shell, page) {
  localStorage.setItem(SHELL_KEY, shell);
  const next = `#/${shell}/${page}`;
  if (location.hash === next) render();
  else location.hash = next;
}

function resolve(page) {
  const role = currentUser()?.role;
  if (!pages[page]) return homePage(role);
  if (role !== "speaker" && (page === "desk" || page === "follow-up" || page === "ai")) return "files";
  if (page === "dashboard") return homePage(role);
  return page;
}

const NAV_GROUPS = [
  {
    label: "Core Workflows",
    urdu: "بنیادی کارروائی",
    items: [
      { id: "files", icon: "description", label: "Files & Documents", urdu: "مقدمات و دستاویزات" },
      { id: "directions", icon: "fact_check", label: "Follow-up of Directions", urdu: "احکامات کی پیش رفت" },
      { id: "meetings", icon: "groups", label: "Official Meetings", urdu: "سرکاری اجلاس اور ریکارڈ" },
    ],
  },
  {
    label: "Engagements & Comms",
    urdu: "مراسلات",
    items: [
      { id: "schedule", icon: "calendar_month", label: "Schedule Management", urdu: "روزنامچہ و نظام الاوقات" },
      { id: "speeches", icon: "record_voice_over", label: "Speeches & Tours", urdu: "تقاریر و دورہ جات" },
      { id: "calls", icon: "call", label: "Telephone Calls", urdu: "ٹیلی فون کالز" },
    ],
  },
  {
    label: "Remote, Media & Dignitaries",
    urdu: "ریموٹ و میڈیا",
    items: [
      { id: "approvals", icon: "verified_user", label: "Remote Approval", urdu: "دور دراز سے منظوری" },
      { id: "press", icon: "newspaper", label: "Press & Media", urdu: "پریس ریلیز و میڈیا" },
      { id: "cards", icon: "drafts", label: "Greeting Cards", urdu: "تہنیتی پیغامات" },
    ],
  },
];

function unmountPage() {
  document.querySelectorAll("script[data-page-behavior]").forEach((node) => node.remove());
  if (window.__naTimer) {
    clearInterval(window.__naTimer);
    window.__naTimer = 0;
  }
  if (window.__naKey) {
    window.removeEventListener("keydown", window.__naKey);
    window.__naKey = null;
  }
}

function speakerShell(theme) {
  const scroller =
    theme === "a"
      ? `<div class="pl-72 h-screen overflow-y-auto"><div class="theme-a theme-scope"><div id="page" class="pt-16 min-h-full bg-surface font-body-md text-on-surface antialiased"></div></div></div>`
      : `<div class="pl-72 h-screen overflow-y-auto" id="page"></div>`;
  return `<div class="theme-b"><div class="min-h-screen bg-surface font-body-md text-on-surface antialiased">${spkAside}${spkHeader}${scroller}</div></div>`;
}

function speakerLink(sample, item) {
  const link = sample.cloneNode(true);
  link.dataset.path = `extra-${item.id}`;
  link.dataset.page = item.id;
  link.href = `#/speaker/${item.id}`;
  const icon = link.querySelector(".material-symbols-outlined");
  if (icon) icon.textContent = item.icon;
  const labels = link.querySelectorAll("div span");
  if (labels[0]) labels[0].textContent = item.label;
  if (labels[1]) labels[1].textContent = item.urdu;
  return link;
}

function paintSpeaker(page) {
  const nav = document.getElementById("shell-nav");
  if (!nav) return;
  const sample = nav.querySelector("a[data-path]");
  if (!sample) return;
  const user = currentUser();
  const home = {
    id: user?.role === "speaker" ? "desk" : "files",
    icon: "account_balance",
    label: user?.role === "speaker" ? "Speaker's Desk" : "My desk",
    urdu: user?.role === "speaker" ? "اسپیکر ڈیسک" : "میرا ڈیسک",
  };
  const extras = user?.role === "speaker"
    ? [{ id: "follow-up", icon: "assignment_turned_in", label: "Follow-up Review", urdu: "جائزہ تعمیل" }, { id: "ai", icon: "auto_awesome", label: "AI Assistant", urdu: "معاونِ اسپیکر" }]
    : [];
  nav.innerHTML = "";
  const add = (item) => {
    const link = speakerLink(sample, item);
    link.dataset.page = item.id;
    link.href = `#/speaker/${item.id}`;
    nav.appendChild(link);
  };
  add(home);
  for (const group of NAV_GROUPS) {
    const heading = document.createElement("div");
    heading.className = "px-space-md py-space-xs mt-2 flex items-center justify-between text-on-primary-container text-label-sm uppercase tracking-wider font-label-sm border-b border-primary/40";
    heading.innerHTML = `<span>${group.label}</span><span>${group.urdu}</span>`;
    nav.appendChild(heading);
    group.items.forEach(add);
  }
  if (extras.length) {
    const heading = document.createElement("div");
    heading.className = "px-space-md py-space-xs mt-2 flex items-center justify-between text-on-primary-container text-label-sm uppercase tracking-wider font-label-sm border-b border-primary/40";
    heading.innerHTML = `<span>Chamber</span><span>چیمبر</span>`;
    nav.appendChild(heading);
    extras.forEach(add);
  }
  const activeTokens = (nav.getAttribute("data-active-classes") || "bg-primary text-tertiary-fixed border-l-4 border-tertiary-fixed font-semibold pl-3").split(/\s+/).filter(Boolean);
  nav.querySelectorAll("a[data-page]").forEach((link) => {
    const on = link.dataset.page === page;
    activeTokens.forEach((token) => link.classList.toggle(token, on));
    spkIdle.forEach((token) => link.classList.toggle(token, !on));
    link.addEventListener("click", (event) => {
      event.preventDefault();
      go("speaker", link.dataset.page);
    });
  });
}

function bindSwitch() {
  const header = document.getElementById("shell-header");
  if (!header) return;
  const user = currentUser();
  const name = header.querySelector(".font-label-md");
  const role = header.querySelector(".font-label-sm");
  if (name && user) name.textContent = user.name;
  if (role && user) role.textContent = user.title;
  const avatar = header.querySelector("#header-avatar");
  if (avatar && user && user.role !== "speaker") {
    const initials = { officer: "SM", js: "TM", special: "FJ", secgen: "SG" }[user.role] || "NA";
    const badge = document.createElement("div");
    badge.id = "header-avatar";
    badge.className = "w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-[11px] font-bold shrink-0";
    badge.textContent = initials;
    badge.setAttribute("aria-label", user.name);
    avatar.replaceWith(badge);
  }
  [...header.querySelectorAll("button")].forEach((btn) => {
    const label = btn.textContent.trim();
    if (label === "Speaker View") btn.dataset.shellChoice = "speaker";
    if (label === "Staff View") btn.dataset.shellChoice = "officer";
  });
  if (!header.querySelector("#signOutBtn")) {
    const out = document.createElement("button");
    out.id = "signOutBtn";
    out.type = "button";
    out.className = "px-2 py-1 text-label-sm font-label-sm text-on-surface-variant border border-outline-variant rounded";
    out.textContent = "Sign out";
    header.appendChild(out);
    out.addEventListener("click", () => logout());
  }
  header.querySelectorAll("[data-shell-choice]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const next = await loginAs(btn.dataset.shellChoice);
      go("speaker", homePage(next.role));
    });
  });
}

function bindContent(shell) {
  document.querySelectorAll("#page a[href='#']").forEach((link) => {
    const text = link.textContent || "";
    if (text.includes("Module 4") || text.includes("Parliamentary Calendar")) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        go(shell, "schedule");
      });
    }
  });
  const search = document.querySelector("#shell-header input");
  if (search) {
    search.id = "shell-search";
    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      document.querySelectorAll("#page article, #page tr, #flow-strip button").forEach((node) => {
        const text = node.innerText.toLowerCase();
        node.style.display = !query || text.includes(query) ? "" : "none";
      });
    });
  }
  const lang = [...document.querySelectorAll("#shell-header button")].find((btn) => btn.textContent.includes("اردو"));
  if (lang) {
    lang.addEventListener("click", () => {
      const page = document.getElementById("page");
      const rtl = page.getAttribute("dir") !== "rtl";
      page.setAttribute("dir", rtl ? "rtl" : "ltr");
    });
  }
  const bell = [...document.querySelectorAll("#shell-header button")].find((btn) => btn.textContent.includes("notifications"));
  if (bell) {
    bell.addEventListener("click", () => {
      let box = document.getElementById("action-note");
      if (!box) {
        box = document.createElement("div");
        box.id = "action-note";
        document.body.appendChild(box);
      }
      box.classList.remove("hidden");
      box.textContent = "File Q-2026-0917 is with the Joint Secretary. One direction is due. A meeting request is waiting.";
    });
  }
}

async function render() {
  if (!currentUser()) return;
  unmountPage();
  const route = parseRoute();
  const page = resolve(route.page);
  const wanted = `#/speaker/${page}`;
  if (location.hash !== wanted) {
    go("speaker", page);
    return;
  }
  document.body.dataset.shell = "speaker";
  document.body.dataset.role = currentUser().role;
  const spec = pages[page];
  document.getElementById("app").innerHTML = speakerShell("b");
  const host = document.getElementById("page");
  let live = "";
  if (isFlowPage(page)) {
    try {
      live = stripHtml(await loadFiles(), page);
    } catch {
      live = "";
    }
  }
  host.innerHTML = live + fill(spec.template, spec.slots);
  paintSpeaker(page);
  bindSwitch();
  bindContent("speaker");
  spec.mount();
  bindPageClicks(page);
  document.title = `${titles[page] || "Speaker's Office"} — ${currentUser().name}`;
}

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.getElementById("shell-search")?.focus();
  }
});

window.addEventListener("hashchange", () => {
  if (currentUser()) render();
});
document.addEventListener("files-changed", () => {
  if (currentUser()) render();
});

mountLogin((user) => {
  location.hash = `#/speaker/${homePage(user.role)}`;
  render();
});
