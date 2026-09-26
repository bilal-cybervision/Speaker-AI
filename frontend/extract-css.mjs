import fs from "node:fs";

const html = fs.readFileSync(
  new URL("../project/Speaker Office - Question Flow.html", import.meta.url),
  "utf8"
);
const start = html.indexOf("<style>") + "<style>".length;
const end = html.indexOf("</style>");
fs.mkdirSync(new URL("./src", import.meta.url), { recursive: true });
fs.writeFileSync(new URL("./src/styles.css", import.meta.url), html.slice(start, end).trim() + "\n");
console.log("css bytes", end - start);
