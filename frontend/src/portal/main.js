import { fill } from "./fill.js";
import { pages, drawer } from "./pages.js";
import { asideMarkup as secAside, headerMarkup as secHeader, fabMarkup } from "./shells/secretariat-markup.js";
import { asideMarkup as spkAside, headerMarkup as spkHeader } from "./shells/speaker-markup.js";
import { speakerExtras, speakerRoutes, titles } from "./data/navigation.js";

const SHELL_KEY = "na-portal-shell";

const secActive = ["bg-tertiary-container", "text-on-primary", "font-label-lg"];
const secIdle = ["text-primary-fixed-dim", "hover:bg-tertiary-container", "hover:text-on-primary"];
const spkIdle = ["text-on-primary/90", "hover:bg-primary", "hover:text-on-primary"];

window.toggleAI = () => {
  const panel = document.getElementById("ai-drawer");
  if (panel) panel.classList.toggle("hidden");
};

function readShell() {
  return localStorage.getItem(SHELL_KEY) === "speaker" ? "speaker" : "secretariat";
}

function parseRoute() {
  const parts = location.hash.replace(/^#/, "").split("/").filter(Boolean);
  if ((parts[0] === "secretariat" || parts[0] === "speaker") && parts[1]) {
    return { shell: parts[0], page: parts[1] };
  }
  const shell = readShell();
  return { shell, page: shell === "speaker" ? "desk" : "dashboard" };
}

function go(shell, page) {
  localStorage.setItem(SHELL_KEY, shell);
  const next = `#/${shell}/${page}`;
  if (location.hash === next) render();
  else location.hash = next;
}

function resolve(shell, page) {
  const spec = pages[page];
  if (!spec) return shell === "speaker" ? "desk" : "dashboard";
  if (spec.speakerOnly && shell !== "speaker") return "dashboard";
  if (page === "dashboard" && shell === "speaker") return "desk";
  return page;
}

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

function secretariatShell() {
  return `<div class="theme-a theme-scope"><div class="h-screen overflow-hidden bg-surface font-body-md text-on-surface antialiased">${secAside}<div class="pl-64 h-screen flex flex-col">${secHeader}<div class="flex-1 overflow-y-auto" id="page"></div></div>${fabMarkup}</div></div>`;
}

function speakerShell(theme) {
  const scroller =
    theme === "a"
      ? `<div class="pl-72 h-screen overflow-y-auto"><div class="theme-a theme-scope"><div id="page" class="pt-16 min-h-full bg-surface font-body-md text-on-surface antialiased"></div></div></div>`
      : `<div class="pl-72 h-screen overflow-y-auto" id="page"></div>`;
  return `<div class="theme-b"><div class="min-h-screen bg-surface font-body-md text-on-surface antialiased">${spkAside}${spkHeader}${scroller}</div></div>`;
}

function paintSecretariat(page) {
  document.querySelectorAll("#shell-nav a[data-page]").forEach((link) => {
    const on = link.dataset.page === page;
    secActive.forEach((token) => link.classList.toggle(token, on));
    secIdle.forEach((token) => link.classList.toggle(token, !on));
  });
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
  if (sample) {
    for (const item of speakerExtras) {
      if (item.place === "start") nav.insertBefore(speakerLink(sample, item), nav.firstChild);
      else if (item.place === "end") nav.appendChild(speakerLink(sample, item));
      else if (item.place.startsWith("after:")) {
        const anchor = nav.querySelector(`a[data-path="${item.place.slice(6)}"]`);
        const node = speakerLink(sample, item);
        if (anchor) anchor.insertAdjacentElement("afterend", node);
        else nav.appendChild(node);
      }
    }
  }
  const activeTokens = (nav.getAttribute("data-active-classes") || "bg-primary text-tertiary-fixed border-l-4 border-tertiary-fixed font-semibold pl-3")
    .split(/\s+/)
    .filter(Boolean);
  nav.querySelectorAll("a[data-path]").forEach((link) => {
    const pageId = link.dataset.page || speakerRoutes[link.dataset.path];
    if (!pageId) return;
    link.dataset.page = pageId;
    link.href = `#/speaker/${pageId}`;
    const on = pageId === page;
    activeTokens.forEach((token) => link.classList.toggle(token, on));
    spkIdle.forEach((token) => link.classList.toggle(token, !on));
  });
  const brand = document.querySelector("#shell-aside .border-b");
  if (brand) {
    brand.style.cursor = "pointer";
    brand.addEventListener("click", () => go("speaker", "desk"));
  }
}

function bindSwitch(shell) {
  const header = document.getElementById("shell-header");
  if (!header) return;
  if (shell === "secretariat" && !header.querySelector("#shell-switch")) {
    const urdu = [...header.querySelectorAll("button")].find((btn) => btn.textContent.includes("اردو"));
    const wrap = document.createElement("div");
    wrap.id = "shell-switch";
    wrap.className = "flex items-center bg-surface-container-low p-0.5 rounded-lg shrink-0";
    wrap.innerHTML = `<button type="button" data-shell-choice="speaker" class="px-2 py-1 rounded font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface">Speaker View</button><button type="button" data-shell-choice="secretariat" class="px-2 py-1 rounded font-label-sm text-label-sm bg-primary-container text-on-primary">Staff View</button>`;
    if (urdu) urdu.parentElement.insertBefore(wrap, urdu);
    else header.appendChild(wrap);
  }
  if (shell === "speaker") {
    [...header.querySelectorAll("button")].forEach((btn) => {
      const label = btn.textContent.trim();
      if (label === "Speaker View") btn.dataset.shellChoice = "speaker";
      if (label === "Staff View") btn.dataset.shellChoice = "secretariat";
    });
  }
  header.querySelectorAll("[data-shell-choice]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.shellChoice;
      const { page } = parseRoute();
      let target = page;
      if (next === "speaker" && page === "dashboard") target = "desk";
      if (next === "secretariat" && pages[page]?.theme === "b") target = "dashboard";
      go(next, target);
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
  if (search) search.id = "shell-search";
}

function render() {
  unmountPage();
  const route = parseRoute();
  const page = resolve(route.shell, route.page);
  const wanted = `#/${route.shell}/${page}`;
  if (location.hash !== wanted) {
    go(route.shell, page);
    return;
  }
  const shell = route.shell;
  localStorage.setItem(SHELL_KEY, shell);
  document.body.dataset.shell = shell;
  const spec = pages[page];
  document.getElementById("app").innerHTML = shell === "speaker" ? speakerShell(spec.theme) : secretariatShell();
  const host = document.getElementById("page");
  host.innerHTML = fill(spec.template, spec.slots) + (spec.theme === "a" ? fill(drawer.template, drawer.slots) : "");
  if (shell === "secretariat") paintSecretariat(page);
  else paintSpeaker(page);
  bindSwitch(shell);
  bindContent(shell);
  spec.mount();
  document.title = `${titles[page] || "Speaker's Office"} — National Assembly of Pakistan`;
}

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.getElementById("shell-search")?.focus();
  }
});

window.addEventListener("hashchange", render);

if (!location.hash || location.hash === "#") {
  const shell = readShell();
  location.hash = shell === "speaker" ? "#/speaker/desk" : "#/secretariat/dashboard";
} else {
  render();
}
