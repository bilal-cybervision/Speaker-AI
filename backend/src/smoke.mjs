const base = "http://localhost:8787";
await fetch(base + "/api/reset", { method: "POST" });
let cookie = "";

async function call(path, opt = {}) {
  const res = await fetch(base + path, {
    ...opt,
    headers: { "content-type": "application/json", cookie, ...(opt.headers || {}) },
  });
  const set = res.headers.get("set-cookie");
  if (set) cookie = set.split(";")[0];
  const body = await res.json();
  if (!res.ok) throw new Error(`${path} ${res.status} ${body.error}`);
  return body;
}

await call("/api/login", {
  method: "POST",
  body: JSON.stringify({ email: "so.questions@na.gov.pk", password: "questions123" }),
});
const files = await call("/api/files");
const id = files.files[0].id;
const noted = await call(`/api/files/${id}/note`, { method: "POST" });
const failed = noted.file.note.clauses.filter((c) => !c.pass).map((c) => c.id);
console.log("words", noted.file.note.wordCount, "fails", failed.join(","), "rulings", noted.file.note.rulings.length);
if (!failed.includes("d") || !failed.includes("f")) throw new Error("expected clauses d and f to fail");
await call(`/api/files/${id}/send`, { method: "POST" });
cookie = "";
await call("/api/login", {
  method: "POST",
  body: JSON.stringify({ email: "speaker@na.gov.pk", password: "speaker123" }),
});
const speaker = await call("/api/files");
if (!speaker.files.length) throw new Error("speaker desk empty");
await call(`/api/files/${id}/decide`, { method: "POST", body: JSON.stringify({ decision: "reject" }) });
cookie = "";
await call("/api/login", {
  method: "POST",
  body: JSON.stringify({ email: "so.questions@na.gov.pk", password: "questions123" }),
});
const back = await call("/api/files");
if (back.files[0].desk !== "section_officer_return") throw new Error("file did not return");
const done = await call(`/api/files/${id}/carry-out`, { method: "POST" });
if (!done.file.dispatched) throw new Error("carry-out failed");
console.log("walk ok");
