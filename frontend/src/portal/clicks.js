import { writeStatus, openFlow, isFlowPage } from "./flow-ui.js";

let noteTimer = 0;

function note(text) {
  let box = document.getElementById("action-note");
  if (!box) {
    box = document.createElement("div");
    box.id = "action-note";
    document.body.appendChild(box);
  }
  box.classList.remove("hidden");
  box.textContent = text;
  clearTimeout(noteTimer);
  noteTimer = setTimeout(() => box.classList.add("hidden"), 2400);
}

function headingOf(node) {
  const card = node.closest("article, section, tr, li") || node.parentElement;
  const title = card?.querySelector("h1, h2, h3, h4, b");
  return (title?.textContent || node.textContent || "This item").replace(/\s+/g, " ").trim().slice(0, 140);
}

export function bindPageClicks(page) {
  const host = document.getElementById("page");
  if (!host || host.dataset.clicks === "1") return;
  host.dataset.clicks = "1";
  host.addEventListener("click", (event) => {
    const open = event.target.closest("[data-open-file]");
    if (open) {
      event.preventDefault();
      openFlow(open.dataset.openFile);
      return;
    }
    const link = event.target.closest("a");
    if (link && link.getAttribute("href") === "#") {
      event.preventDefault();
      const label = headingOf(link);
      writeStatus(`${page}:${label}`, "opened");
      note(`Opened: ${label}`);
      return;
    }
    const card = event.target.closest("article, tr");
    if (card && !event.target.closest("button, a, input, textarea, select")) {
      const label = headingOf(card);
      writeStatus(`${page}:${label}`, "opened");
      note(`Opened: ${label}`);
      return;
    }
    const button = event.target.closest("button");
    if (!button || button.closest("#flow-strip") || button.getAttribute("onclick")) return;
    const label = headingOf(button);
    const key = `${page}:${label}`;
    const next = readNext(key);
    writeStatus(key, next);
    button.dataset.status = next;
    note(`${label} — ${next}`);
    document.dispatchEvent(new CustomEvent("status-changed"));
  });
}

function readNext(key) {
  const order = ["noted", "accepted", "sent on"];
  const current = JSON.parse(sessionStorage.getItem("portal-simple-status") || "{}")[key];
  const at = order.indexOf(current);
  return order[(at + 1) % order.length];
}

export function pageUsesFlow(page) {
  return isFlowPage(page);
}
