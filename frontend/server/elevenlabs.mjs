/** Server-only ElevenLabs speech. The browser calls this app; the key never leaves the server. */

const VOICE_ID = "onwK4e9ZLuTAKqWW03F9";
const MAX_CHARS = 900;

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  const raw = await readBody(req);
  try { return JSON.parse(raw || "{}"); } catch { return {}; }
}

export async function synthesizeSpeech({ key, text, urdu }) {
  const line = String(text || "").replace(/\s+/g, " ").trim().slice(0, MAX_CHARS);
  if (!key) return { ok: false, status: 503, error: "Voice key is not set." };
  if (!line) return { ok: false, status: 400, error: "Nothing to speak." };
  const model = urdu ? "eleven_v3" : "eleven_flash_v2_5";
  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_22050_32`,
    {
      method: "POST",
      headers: {
        "xi-api-key": key,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text: line,
        model_id: model,
        voice_settings: {
          stability: 0.82,
          similarity_boost: 0.75,
          style: 0,
          use_speaker_boost: true,
        },
      }),
    },
  );
  if (!upstream.ok) {
    let error = "The voice could not speak that line.";
    try {
      const payload = await upstream.json();
      const detail = payload?.detail?.message || payload?.detail || payload?.message;
      if (typeof detail === "string" && detail.trim()) error = detail.trim();
      else if (detail) error = JSON.stringify(detail).slice(0, 240);
    } catch { /* keep the short message */ }
    return { ok: false, status: upstream.status, error: String(error).slice(0, 240) };
  }
  return { ok: true, status: 200, audio: Buffer.from(await upstream.arrayBuffer()) };
}

export async function handleSpeakRequest(req, res, key) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "POST only." }));
    return;
  }
  try {
    const body = await readJson(req);
    const result = await synthesizeSpeech({ key, text: body.text, urdu: Boolean(body.urdu) });
    if (!result.ok) {
      res.statusCode = result.status;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: result.error }));
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    res.end(result.audio);
  } catch {
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Speech proxy failed." }));
    }
  }
}
