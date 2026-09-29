import { hasGemini, liveSocketUrl, liveModels, officeRules, toBase64, fromBase64, floatTo16 } from "./gemini.js";

const CAPTURE = `
class CaptureProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const ch = inputs[0] && inputs[0][0];
    if (ch && ch.length) this.port.postMessage(ch);
    return true;
  }
}
registerProcessor("capture-pcm", CaptureProcessor);
`;

export class GeminiLive {
  constructor(hooks = {}) {
    this.hooks = hooks;
    this.ws = null;
    this.ready = false;
    this.model = "";
    this.mic = null;
    this.capture = null;
    this.playCtx = null;
    this.nextPlay = 0;
    this.closed = false;
  }

  async connect(system) {
    if (!hasGemini()) throw new Error("Model key is not set.");
    const models = liveModels();
    let last = null;
    for (const model of models) {
      try {
        await this.#open(model, system);
        this.model = model;
        return this;
      } catch (err) {
        last = err;
        this.#tearSocket();
      }
    }
    throw last || new Error("Live voice could not open.");
  }

  #open(model, system) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(liveSocketUrl());
      this.ws = ws;
      let settled = false;
      const timer = setTimeout(() => {
        if (!settled) {
          settled = true;
          reject(new Error("Live connection timed out."));
          try { ws.close(); } catch { /* ignore */ }
        }
      }, 12000);
      ws.onopen = () => {
        ws.send(JSON.stringify({
          setup: {
            model: `models/${model}`,
            generationConfig: { responseModalities: ["AUDIO"] },
            systemInstruction: { parts: [{ text: `${officeRules()}\n\n${system || ""}` }] },
          },
        }));
      };
      const handle = (raw) => {
        let msg = {};
        try { msg = JSON.parse(raw); } catch { return; }
        if (msg.error) {
          if (!settled) {
            settled = true;
            clearTimeout(timer);
            reject(new Error(msg.error.message || "Live setup failed."));
          }
          return;
        }
        if (msg.setupComplete || msg.setup_complete) {
          this.ready = true;
          if (!settled) {
            settled = true;
            clearTimeout(timer);
            resolve(this);
          }
          this.hooks.onReady?.(model);
          return;
        }
        this.#onMessage(msg);
      };
      ws.onmessage = (event) => {
        if (event.data instanceof Blob) event.data.text().then(handle).catch(() => {});
        else handle(event.data);
      };
      ws.onerror = () => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          reject(new Error("Live voice socket error."));
        }
      };
      ws.onclose = (ev) => {
        this.ready = false;
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          reject(new Error(ev.reason || "Live socket closed."));
        } else if (!this.closed) {
          this.hooks.onError?.(new Error(ev.reason || "Live session ended."));
        }
      };
    });
  }

  #onMessage(msg) {
    const sc = msg.serverContent || msg.server_content || {};
    const input = msg.inputTranscription || msg.input_transcription || sc.inputTranscription || sc.input_transcription;
    const output = msg.outputTranscription || msg.output_transcription || sc.outputTranscription || sc.output_transcription;
    if (input?.text) this.hooks.onInput?.(input.text, Boolean(input.finished || input.isFinal));
    if (output?.text) this.hooks.onOutput?.(output.text);
    const parts = sc.modelTurn?.parts || sc.model_turn?.parts || [];
    for (const part of parts) {
      if (part.text) this.hooks.onOutput?.(part.text);
      const blob = part.inlineData || part.inline_data;
      if (blob?.data) this.#playPcm(fromBase64(blob.data), blob.mimeType || blob.mime_type);
    }
    if (sc.turnComplete || sc.turn_complete || sc.generationComplete || sc.generation_complete) {
      this.hooks.onTurn?.();
    }
    if (msg.error) this.hooks.onError?.(new Error(msg.error.message || "Live error"));
  }

  sendText(text) {
    if (!this.ws || this.ws.readyState !== 1) return;
    this.ws.send(JSON.stringify({ realtimeInput: { text } }));
  }

  sendPcm16(int16) {
    if (!this.ws || this.ws.readyState !== 1) return;
    const b64 = toBase64(new Uint8Array(int16.buffer, int16.byteOffset, int16.byteLength));
    this.ws.send(JSON.stringify({
      realtimeInput: {
        audio: { data: b64, mimeType: "audio/pcm;rate=16000" },
      },
    }));
  }

  async startMic() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } });
    this.mic = stream;
    const ctx = new AudioContext({ sampleRate: 16000 });
    this.capture = ctx;
    const blob = URL.createObjectURL(new Blob([CAPTURE], { type: "application/javascript" }));
    await ctx.audioWorklet.addModule(blob);
    const node = new AudioWorkletNode(ctx, "capture-pcm");
    node.port.onmessage = (event) => {
      const pcm = floatTo16(event.data);
      this.sendPcm16(pcm);
    };
    const src = ctx.createMediaStreamSource(stream);
    const mute = ctx.createGain();
    mute.gain.value = 0;
    src.connect(node);
    node.connect(mute);
    mute.connect(ctx.destination);
    this._node = node;
  }

  stopMic() {
    this.mic?.getTracks().forEach((track) => track.stop());
    this.mic = null;
    try { this.capture?.close(); } catch { /* ignore */ }
    this.capture = null;
    if (this.ws?.readyState === 1) {
      try { this.ws.send(JSON.stringify({ realtimeInput: { audioStreamEnd: true } })); } catch { /* ignore */ }
    }
  }

  stopPlayback() {
    this.nextPlay = 0;
    try { this.playCtx?.close(); } catch { /* ignore */ }
    this.playCtx = null;
    if (this.ws?.readyState === 1) {
      try {
        this.ws.send(JSON.stringify({
          clientContent: { turns: [], turnComplete: true },
        }));
      } catch { /* ignore */ }
    }
  }

  #playPcm(_bytes, _mime = "") {
    /* Live is ears only. Spoken replies go through ElevenLabs so the voice stays the same. */
  }

  #tearSocket() {
    try { this.ws?.close(); } catch { /* ignore */ }
    this.ws = null;
    this.ready = false;
  }

  close() {
    this.closed = true;
    this.stopMic();
    this.#tearSocket();
    try { this.playCtx?.close(); } catch { /* ignore */ }
    this.playCtx = null;
  }
}
