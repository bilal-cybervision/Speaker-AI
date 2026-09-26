import fs from "fs";
import path from "path";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "src", "portal", "styles", "generated");

function extractClasses(content) {
  const out = new Set();
  const add = (value) => {
    String(value || "")
      .split(/\s+/)
      .forEach((token) => {
        if (token) out.add(token);
      });
  };
  for (const match of content.matchAll(/class="([^"]*)"/g)) add(match[1]);
  for (const match of content.matchAll(/class=\\"([^\\"]*)\\"/g)) add(match[1]);
  for (const match of content.matchAll(/className\s*=\s*"([^"]*)"/g)) add(match[1]);
  for (const match of content.matchAll(/className\s*=\s*'([^']*)'/g)) add(match[1]);
  for (const match of content.matchAll(/classList\.(?:add|remove|toggle)\(([^)]*)\)/g)) {
    for (const bit of match[1].matchAll(/'([^']+)'|"([^"]+)"/g)) add(bit[1] || bit[2]);
  }
  return [...out];
}

const content = {
  files: [
    path.join(root, "index.html"),
    path.join(root, "src/portal/main.js"),
    path.join(root, "src/portal/pages.js"),
    path.join(root, "src/portal/templates/**/*.js"),
    path.join(root, "src/portal/shells/**/*.js"),
    path.join(root, "src/portal/behaviors/**/*.js"),
  ],
  extract: {
    js: extractClasses,
    html: extractClasses,
  },
};

const safelist = [
  "animate-spin",
  "animate-pulse",
  "animate-ping",
  "opacity-50",
  "hidden",
  "flex",
  "ring-2",
  "ring-primary-container",
  "bg-error",
  "text-on-error",
  "bg-primary",
  "xl:col-span-8",
  "xl:col-span-12",
];

async function compile(config, input, file) {
  const result = await postcss([tailwindcss(config), autoprefixer]).process(input, { from: undefined });
  fs.writeFileSync(path.join(outDir, file), result.css);
  return result.css.length;
}

export async function compileThemes() {
  fs.mkdirSync(outDir, { recursive: true });
  const themeA = JSON.parse(fs.readFileSync(path.join(root, "src/portal/theme-a.json"), "utf8"));
  const themeB = JSON.parse(fs.readFileSync(path.join(root, "src/portal/theme-b.json"), "utf8"));
  const shared = { content, safelist, extract: extractClasses };
  const preflight = await compile(
    { content: [{ raw: "", extension: "html" }], corePlugins: { preflight: true } },
    "@tailwind base;",
    "preflight.css"
  );
  const a = await compile(
    { ...shared, important: ".theme-a.theme-scope", corePlugins: { preflight: false }, theme: { extend: themeA } },
    "@tailwind utilities;",
    "theme-a.css"
  );
  const b = await compile(
    { ...shared, important: ".theme-b", corePlugins: { preflight: false }, theme: { extend: themeB } },
    "@tailwind utilities;",
    "theme-b.css"
  );
  return { preflight, a, b };
}
