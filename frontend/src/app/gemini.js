import { GEMINI_API_KEY, hasGemini } from "./env.js";

/* 2.5/2.0 Flash return 404 for new keys (Google: new projects must use 3.x). */
const TEXT_MODELS = [
  "gemini-3.6-flash",
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-flash-latest",
];
const LIVE_MODELS = ["gemini-3.8-live", "gemini-3.1-flash-live-preview", "gemini-2.5-flash-native-audio-preview-12-2025"];
const WS = "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";
const API = "https://generativelanguage.googleapis.com/v1beta";

const OFFICE_RULES = `You are Speaker AI for the Office of the Speaker, National Assembly of Pakistan. You advise. You do not decide and you do not sign.
Use only the authorised sources in the prompt (desk records and retrieved Rulings of the Chair). Quote a ruling only with its id and PDF page.
If no ruling is supplied, say that no past ruling was found. Never invent a ruling number.
English or Urdu as the Speaker used. Short, spoken, parliamentary register. Synthetic demo data only.`;

export { hasGemini };

function textOf(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return parts.map((part) => part.text || "").join("").trim();
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    "x-goog-api-key": GEMINI_API_KEY,
  };
}

let cachedTextModels = null;
let lastGoodModel = "";

async function discoverTextModels() {
  if (cachedTextModels?.length) return cachedTextModels;
  try {
    const res = await fetch(`${API}/models`, { headers: authHeaders() });
    const data = await res.json().catch(() => ({}));
    const names = (data.models || [])
      .filter((model) => (model.supportedGenerationMethods || []).includes("generateContent"))
      .map((model) => String(model.name || "").replace(/^models\//, ""));
    const preferred = TEXT_MODELS.filter((name) => names.includes(name));
    const flash = names.filter((name) => /flash/i.test(name) && !/image|tts|live|embed|computer|2\.5|2\.0/i.test(name));
    cachedTextModels = preferred.length ? preferred : flash.length ? flash.slice(0, 6) : TEXT_MODELS;
  } catch {
    cachedTextModels = TEXT_MODELS;
  }
  return cachedTextModels;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postModel(model, body) {
  const res = await fetch(`${API}/models/${model}:generateContent`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error?.message || `Model ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return data;
}

function requestBody(parts, extra, thinking) {
  return {
    systemInstruction: { parts: [{ text: extra.system || OFFICE_RULES }] },
    contents: [{ role: "user", parts }],
    generationConfig: {
      temperature: extra.temperature ?? 0.2,
      ...(thinking ? { thinkingConfig: { thinkingLevel: "low" } } : {}),
      ...(extra.json ? { responseMimeType: "application/json" } : {}),
      ...(extra.audioOut ? { responseModalities: ["AUDIO"] } : {}),
    },
  };
}

async function generate(parts, extra = {}) {
  if (!hasGemini()) throw new Error("Model key is not set.");
  const discovered = extra.models || await discoverTextModels();
  const models = (lastGoodModel ? [lastGoodModel, ...discovered.filter((name) => name !== lastGoodModel)] : discovered).slice(0, 2);
  let last = null;
  for (const model of models) {
    try {
      const data = await postModel(model, requestBody(parts, extra, false));
      lastGoodModel = model;
      return data;
    } catch (err) {
      last = err;
      if (err.status === 429) {
        await wait(2000);
        try {
          const data = await postModel(model, requestBody(parts, extra, false));
          lastGoodModel = model;
          return data;
        } catch (retry) {
          throw retry.status === 429
            ? new Error("The model is rate-limited. The archive answer is on screen.")
            : retry;
        }
      }
      if (err.status && ![400, 404, 503].includes(err.status)) break;
    }
  }
  throw last || new Error("The model did not answer.");
}

export async function geminiText(prompt, extra = {}) {
  const data = await generate([{ text: prompt }], extra);
  return textOf(data);
}

export async function geminiJSON(prompt, extra = {}) {
  const raw = await geminiText(prompt, { ...extra, json: true });
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0) throw new Error("No JSON in the model reply.");
  return JSON.parse(raw.slice(start, end + 1));
}

export async function geminiVisionJSON(prompt, base64, mime = "image/png") {
  const data = await generate(
    [
      { text: prompt },
      { inlineData: { mimeType: mime, data: String(base64).replace(/^data:[^;]+;base64,/, "") } },
    ],
    { json: true, temperature: 0.1 },
  );
  const raw = textOf(data);
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0) throw new Error("No JSON in the vision reply.");
  return JSON.parse(raw.slice(start, end + 1));
}

export async function geminiFromAudio(prompt, base64, mime = "audio/webm") {
  const data = await generate(
    [
      { text: prompt },
      { inlineData: { mimeType: mime, data: String(base64).replace(/^data:[^;]+;base64,/, "") } },
    ],
    { temperature: 0.2 },
  );
  return textOf(data);
}

export function liveSocketUrl() {
  return `${WS}?key=${encodeURIComponent(GEMINI_API_KEY)}`;
}

export function liveModels() {
  return LIVE_MODELS;
}

export function officeRules() {
  return OFFICE_RULES;
}

export function toBase64(bytes) {
  let bin = "";
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const chunk = 0x8000;
  for (let i = 0; i < arr.length; i += chunk) {
    bin += String.fromCharCode(...arr.subarray(i, i + chunk));
  }
  return btoa(bin);
}

export function fromBase64(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

export function floatTo16(float32) {
  const out = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i += 1) {
    const s = Math.max(-1, Math.min(1, float32[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}
