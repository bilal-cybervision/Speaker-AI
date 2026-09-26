function provider() {
  return (process.env.LLM_PROVIDER || "none").toLowerCase();
}

export function modelConfigured() {
  if (provider() === "gemini") return Boolean(process.env.GEMINI_API_KEY);
  if (provider() === "cloudflare") {
    return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN);
  }
  if (provider() === "openrouter") return Boolean(process.env.OPENROUTER_API_KEY);
  return false;
}

export async function writeWithModel({ file, clauses, rulings }) {
  const failed = clauses.filter((clause) => !clause.pass).map((clause) => ({
    id: clause.id,
    verdict: clause.verdict,
  }));
  const prompt = [
    "Draft a short note for a National Assembly Questions Branch officer.",
    "Reply with JSON only, no markdown: {\"summary\": string, \"citedRulingIds\": string[], \"officerLine\": string}.",
    "citedRulingIds must be copied from the rulings list. Use [] if none apply. Do not invent an id. Do not allow or reject the question.",
    "",
    `Question:\n${file.body}`,
    "",
    `Failed clauses already decided in code:\n${JSON.stringify(failed)}`,
    "",
    `Rulings found by search:\n${JSON.stringify(rulings.map((r) => ({ id: r.id, subject: r.subject, page: r.pdfPage, holding: (r.decision || r.headnote || "").slice(0, 280) })))}`,
  ].join("\n");

  const which = provider();
  const text =
    which === "gemini" ? await gemini(prompt) : which === "cloudflare" ? await cloudflare(prompt) : await openrouter(prompt);
  const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  return JSON.parse(json);
}

async function gemini(prompt) {
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
}

async function openrouter(prompt) {
  const model = process.env.OPENROUTER_MODEL;
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    signal: AbortSignal.timeout(180000),
    headers: {
      authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "content-type": "application/json",
      "http-referer": "http://localhost:5173",
      "x-title": "Speaker Office Question Note",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 700,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) {
    const detail = (await res.text()).slice(0, 180);
    throw new Error(`OpenRouter ${res.status}: ${detail}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

async function cloudflare(prompt) {
  const model = process.env.CLOUDFLARE_AI_MODEL || "@cf/meta/llama-3.1-8b-instruct";
  const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ prompt, max_tokens: 1200, temperature: 0.2 }),
  });
  if (!res.ok) throw new Error(`Cloudflare ${res.status}`);
  const data = await res.json();
  return data.result?.response || data.result?.description || "";
}
