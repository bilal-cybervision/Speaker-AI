import fs from "fs";

const lines = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8").split(/\r?\n/);
const vars = lines.slice(0, 31).join("\n").replace(":root", ":host");
const body = lines.slice(279, 814).join("\n");
const extra = `
:host {
  position: fixed;
  inset: 0;
  z-index: 90;
  overflow: auto;
  background: var(--bg-main);
  color: var(--text-main);
  font-family: "Plus Jakarta Sans", system-ui, sans-serif;
  font-size: 13px;
  line-height: 1.5;
}
:host * { box-sizing: border-box; }
button { cursor: pointer; font-family: inherit; border: 0; background: none; }
.pad { padding: 28px 32px 48px; }
.move { display: flex; gap: 8px; flex-wrap: wrap; margin: 0 0 18px; }
.move span { padding: 6px 10px; border-radius: 999px; background: #fff; border: 1px solid var(--border); font-size: 11px; font-weight: 700; color: var(--text-soft); }
.move span.done { background: #ecfdf5; color: #047857; border-color: #a7f3d0; }
.move span.current { background: #0284c7; color: #fff; border-color: #0284c7; }
.ask-reply { margin: 8px 34px 0; font-size: 13px; color: var(--ink); font-family: Fraunces, serif; }
`;
fs.writeFileSync(new URL("./styles/file-sheet.css", import.meta.url), `${vars}\n${extra}\n${body}\n`);
console.log("wrote file-sheet.css");
