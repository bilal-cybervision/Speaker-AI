/**
 * Reads the 14 prototype HTML files and writes data modules plus templates.
 * Run from the frontend folder: node tools/extract-pages.mjs
 * The portal never fetches these files at runtime.
 */
import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const proto = path.join(root, "NA Project-Nine Modules Prototype");
const outData = path.join(root, "src", "portal", "data");
const outTpl = path.join(root, "src", "portal", "templates");
const outBeh = path.join(root, "src", "portal", "behaviors");
const outShell = path.join(root, "src", "portal", "shells");
const assetDir = path.join(root, "public", "assets");

for (const dir of [outData, outTpl, outBeh, outShell, assetDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const pages = [
  { file: "dashboard.html", id: "dashboard", theme: "a", home: "secretariat" },
  { file: "files-documents.html", id: "files", theme: "a" },
  { file: "directions-decisions.html", id: "directions", theme: "a" },
  { file: "official-meetings.html", id: "meetings", theme: "a" },
  { file: "daily-schedule.html", id: "schedule", theme: "a" },
  { file: "speeches-engagements.html", id: "speeches", theme: "a" },
  { file: "telephone-log.html", id: "calls", theme: "a" },
  { file: "remote-approvals.html", id: "approvals", theme: "a" },
  { file: "media-press.html", id: "press", theme: "a" },
  { file: "greeting-cards.html", id: "cards", theme: "a" },
  { file: "speaker-dashboard.html", id: "desk", theme: "b", home: "speaker" },
  { file: "speaker-follow-up-dashboard.html", id: "follow-up", theme: "b", speakerOnly: true },
  { file: "speaker-ai-assistant.html", id: "ai", theme: "b", speakerOnly: true },
];

const secretariatFiles = {
  "dashboard.html": "dashboard",
  "files-documents.html": "files",
  "directions-decisions.html": "directions",
  "official-meetings.html": "meetings",
  "daily-schedule.html": "schedule",
  "speeches-engagements.html": "speeches",
  "telephone-log.html": "calls",
  "remote-approvals.html": "approvals",
  "media-press.html": "press",
  "greeting-cards.html": "cards",
};

function readProto(name) {
  return fs.readFileSync(path.join(proto, name), "utf8");
}

function mainParts(html) {
  const start = html.indexOf("<main");
  if (start < 0) throw new Error("no main");
  const openEnd = html.indexOf(">", start);
  const close = html.lastIndexOf("</main>");
  const open = html.slice(start, openEnd + 1);
  let inner = html.slice(openEnd + 1, close);
  const scripts = [...inner.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  inner = inner.replace(/<script>[\s\S]*?<\/script>/g, "");
  return { open, inner, scripts };
}

function collectImages(html, bucket) {
  for (const m of html.matchAll(/https:\/\/lh3\.googleusercontent\.com\/[^"'\s)]+/g)) {
    bucket.add(m[0]);
  }
}

const imageUrls = new Set();
for (const page of pages) collectImages(readProto(page.file), imageUrls);
collectImages(readProto("index.html"), imageUrls);

const imageMap = new Map();
let imageIndex = 0;
for (const url of imageUrls) {
  imageIndex += 1;
  const name = `proto-${String(imageIndex).padStart(2, "0")}`;
  imageMap.set(url, name);
}

async function downloadImages() {
  for (const [url, name] of imageMap) {
    const existing = fs.readdirSync(assetDir).find((f) => f.startsWith(name + "."));
    if (existing) {
      imageMap.set(url, `/assets/${existing}`);
      continue;
    }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const type = res.headers.get("content-type") || "";
      const ext = type.includes("png") ? "png" : type.includes("webp") ? "webp" : type.includes("svg") ? "svg" : "jpg";
      const buf = Buffer.from(await res.arrayBuffer());
      const file = `${name}.${ext}`;
      fs.writeFileSync(path.join(assetDir, file), buf);
      imageMap.set(url, `/assets/${file}`);
      console.log("saved", file, buf.length);
    } catch (err) {
      console.warn("image kept remote", name, err.message);
      imageMap.set(url, url);
    }
  }
}

function applyImages(html) {
  let out = html;
  for (const [url, local] of imageMap) {
    if (local === url) continue;
    out = out.split(url).join(local);
  }
  return out;
}

const ATTRS = ["placeholder", "alt", "title", "aria-label", "value"];

function slotify(html) {
  const slots = {};
  const sections = [];
  let ti = 0;
  let ai = 0;
  let section = "Page";
  const parts = html.split(/(<!--[\s\S]*?-->|<\/?[^>]+>)/g);
  const out = parts.map((part) => {
    if (!part) return "";
    if (part.startsWith("<!--")) {
      const label = part.replace(/<!--|-->/g, "").replace(/\s+/g, " ").trim();
      if (label && !label.startsWith("=") && label.length < 180) {
        section = label;
        if (!sections.includes(label)) sections.push(label);
      }
      return part;
    }
    if (part.startsWith("<")) {
      return part.replace(
        /\s(placeholder|alt|title|aria-label|value)="([^"]*)"/g,
        (full, attr, value) => {
          if (!value) return full;
          ai += 1;
          const key = "a" + ai;
          slots[key] = value;
          return ` ${attr}="{{${key}}}"`;
        }
      );
    }
    if (!part.trim()) return part;
    ti += 1;
    const key = "t" + ti;
    slots[key] = part;
    return `{{${key}}}`;
  });
  return { html: out.join(""), slots, sections };
}

function patchScript(id, script) {
  let src = script;
  src = src.replaceAll(
    "document.addEventListener('DOMContentLoaded', () => {",
    "queueMicrotask(() => {"
  );
  src = src.replaceAll(
    'document.addEventListener("DOMContentLoaded", () => {',
    "queueMicrotask(() => {"
  );
  if (id === "approvals") {
    src = src.replace("setInterval(() => {", "window.__naTimer = setInterval(() => {");
  }
  if (id === "speeches") {
    src = src.replace(
      "window.addEventListener('keydown', (e) => {",
      "if (window.__naKey) window.removeEventListener('keydown', window.__naKey);\n        window.__naKey = (e) => {"
    );
    src = src.replace(
      `if (e.key === 'Escape' && !prompterModal.classList.contains('hidden')) {
            prompterModal.classList.add('hidden');
            prompterModal.classList.remove('flex');
          }
        });`,
      `if (e.key === 'Escape' && !prompterModal.classList.contains('hidden')) {
            prompterModal.classList.add('hidden');
            prompterModal.classList.remove('flex');
          }
        };
        window.addEventListener('keydown', window.__naKey);`
    );
  }
  if (id === "dashboard") {
    src = `(function() {
    const drawerContext = document.querySelector('#ai-drawer p.font-body-sm');
    if (drawerContext) {
      drawerContext.textContent = 'Overview Context: 7 pending files require your constitutional endorsement before 04:00 PM session adjournment.';
    }
  })();`;
  }
  return src;
}

function writeData(id, meta, slots, sections) {
  const lines = [
    "/* Mock copy extracted from the prototype. The page renders these strings. */",
    `export const meta = ${JSON.stringify(meta, null, 2)};`,
    `export const sections = ${JSON.stringify(sections, null, 2)};`,
    "export const slots = {",
  ];
  for (const [key, value] of Object.entries(slots)) {
    lines.push(`  ${key}: ${JSON.stringify(value)},`);
  }
  lines.push("};", "");
  fs.writeFileSync(path.join(outData, `${id}.js`), lines.join("\n"), "utf8");
}

function writeTemplate(id, template) {
  const escaped = template.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  fs.writeFileSync(
    path.join(outTpl, `${id}.js`),
    `/* Layout taken from the prototype. Copy lives in the data module. */\nexport const template = \`${escaped}\`;\n`,
    "utf8"
  );
}

function writeBehavior(id, script) {
  if (!script.trim()) {
    fs.writeFileSync(
      path.join(outBeh, `${id}.js`),
      "export function mount() {}\n",
      "utf8"
    );
    return;
  }
  const patched = patchScript(id, script);
  fs.writeFileSync(
    path.join(outBeh, `${id}.js`),
    `export function mount() {\n  const el = document.createElement("script");\n  el.dataset.pageBehavior = ${JSON.stringify(id)};\n  el.textContent = ${JSON.stringify(patched)};\n  document.body.appendChild(el);\n}\n`,
    "utf8"
  );
}

function fillSlots(template, slots) {
  return template.replace(/\{\{([ta]\d+)\}\}/g, (full, key) => (key in slots ? slots[key] : full));
}

function extractChrome(html, kind) {
  const asideStart = html.indexOf("<aside");
  const asideEnd = html.indexOf("</aside>", asideStart);
  let aside = html.slice(asideStart, asideEnd + "</aside>".length);
  const headerStart = html.indexOf("<header");
  const headerEnd = html.indexOf("</header>", headerStart);
  let header = html.slice(headerStart, headerEnd + "</header>".length);
  aside = aside.replace("<aside", '<aside id="shell-aside"');
  header = header.replace("<header", '<header id="shell-header"');
  aside = aside.replace("<nav", '<nav id="shell-nav"');
  if (kind === "secretariat") {
    aside = aside.replace(/data-file="([^"]+)"/g, (full, file) => {
      const id = secretariatFiles[file];
      if (!id) return full;
      return `data-page="${id}" href="#/secretariat/${id}"`;
    });
  }
  return { aside: applyImages(aside), header: applyImages(header) };
}

function writeMarkup(name, aside, header, fab = "") {
  const pack = (value) => "`" + value.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";
  fs.writeFileSync(
    path.join(outShell, `${name}-markup.js`),
    `/* Chrome copied from the prototype shell. */\nexport const asideMarkup = ${pack(aside)};\nexport const headerMarkup = ${pack(header)};\nexport const fabMarkup = ${pack(fab)};\n`,
    "utf8"
  );
}

function themeExtend(html) {
  const marker = "tailwind.config=";
  const start = html.indexOf(marker);
  const end = html.indexOf("</script>", start);
  const expr = html.slice(start + marker.length, end).trim().replace(/;\s*$/, "");
  const config = Function(`"use strict"; return (${expr});`)();
  return config.theme.extend;
}

await downloadImages();

const registry = [];

for (const page of pages) {
  const raw = readProto(page.file);
  const { open, inner, scripts } = mainParts(raw);
  let mainOpen = open;
  if (page.theme === "a") mainOpen = mainOpen.replace("pt-16", "pt-2");
  const imaged = applyImages(mainOpen + inner + "</main>");
  const originalComparable = applyImages(
    (page.theme === "a" ? open.replace("pt-16", "pt-2") : open) + inner.replace(/<script>[\s\S]*?<\/script>/g, "") + "</main>"
  );
  const { html, slots, sections } = slotify(imaged);
  const filled = fillSlots(html, slots);
  if (filled !== imaged) {
    const max = Math.min(filled.length, imaged.length);
    let i = 0;
    while (i < max && filled[i] === imaged[i]) i += 1;
    console.error(page.id, "roundtrip mismatch at", i, JSON.stringify(filled.slice(i, i + 80)), "VS", JSON.stringify(imaged.slice(i, i + 80)));
    process.exit(1);
  }
  if (originalComparable !== imaged) {
    console.error(page.id, "image/open normalize mismatch");
    process.exit(1);
  }
  const meta = {
    id: page.id,
    source: page.file,
    theme: page.theme,
    speakerOnly: Boolean(page.speakerOnly),
    home: page.home || null,
    sections,
  };
  writeData(page.id, meta, slots, sections);
  writeTemplate(page.id, html);
  writeBehavior(page.id, scripts.join("\n\n"));
  registry.push(meta);
  console.log(page.id, "slots", Object.keys(slots).length, "sections", sections.length);
}

const dash = readProto("dashboard.html");
const drawerStart = dash.indexOf('<aside class="fixed top-16');
const drawerEnd = dash.indexOf("</aside>", drawerStart);
let drawer = applyImages(dash.slice(drawerStart, drawerEnd + "</aside>".length));
const drawerSlots = slotify(drawer);
if (fillSlots(drawerSlots.html, drawerSlots.slots) !== drawer) {
  console.error("drawer roundtrip failed");
  process.exit(1);
}
writeData("ai-drawer", { id: "ai-drawer", source: "shared secretariat drawer", theme: "a", speakerOnly: false, home: null, sections: drawerSlots.sections }, drawerSlots.slots, drawerSlots.sections);
writeTemplate("ai-drawer", drawerSlots.html);
console.log("ai-drawer", "slots", Object.keys(drawerSlots.slots).length);

const indexHtml = readProto("index.html");
const sec = extractChrome(indexHtml, "secretariat");
const fabStart = indexHtml.indexOf("<!-- AI FAB Button -->");
const fab = applyImages(indexHtml.slice(fabStart, indexHtml.indexOf("<script>", fabStart)).trim());
writeMarkup("secretariat", sec.aside, sec.header, fab);

const speakerHtml = readProto("speaker-dashboard.html");
const sp = extractChrome(speakerHtml, "speaker");
writeMarkup("speaker", sp.aside, sp.header, "");

fs.writeFileSync(path.join(root, "src", "portal", "theme-a.json"), JSON.stringify(themeExtend(indexHtml), null, 2));
fs.writeFileSync(path.join(root, "src", "portal", "theme-b.json"), JSON.stringify(themeExtend(speakerHtml), null, 2));

fs.writeFileSync(
  path.join(root, "src", "portal", "registry.js"),
  `/* Page list for the static router. */\nexport const registry = ${JSON.stringify(registry, null, 2)};\n`,
  "utf8"
);

console.log("done", registry.length, "pages");
