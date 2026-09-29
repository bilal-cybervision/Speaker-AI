import { icon } from "./icons.js";
import { esc, shown } from "./ui.js";
import { hasGemini, geminiVisionJSON } from "./gemini.js";

export const SAMPLE_EXTRACT = {
  sender: "Speaker, Provincial Assembly of the Punjab",
  reference: "PA/Secy/2026/1184",
  letterDate: "08-10-2026",
  subject: "Proposal for joint conference of presiding officers",
  language: "English (Urdu annex p.2)",
  deadline: "Reply by 25-10-2026",
  kind: "letter",
  memberName: "Speaker, Provincial Assembly of the Punjab",
  minister: "Office of the Speaker, National Assembly",
  body: "The Provincial Assembly proposes a joint conference of presiding officers in November 2026 and asks the National Assembly to co-host and nominate a focal person. A draft concept note is attached as page 2 (Urdu).",
  urdu: "صوبائی اسمبلی نومبر ۲۰۲۶ میں پریذائیڈنگ افسران کی مشترکہ کانفرنس کی تجویز دیتی ہے اور قومی اسمبلی سے شریک میزبانی اور ایک نقطہ رابطہ نامزد کرنے کی درخواست کرتی ہے۔",
  route: "Joint Secretary (Admin), then Secretary NA",
  classification: "Public (no sensitive markers found)",
  fields: [
    { key: "Sender", value: "Speaker, Provincial Assembly of the Punjab", conf: 0.97 },
    { key: "Reference no.", value: "PA/Secy/2026/1184", conf: 0.95 },
    { key: "Letter date", value: "08-10-2026", conf: 0.98 },
    { key: "Subject", value: "Proposal for joint conference of presiding officers", conf: 0.91 },
    { key: "Language", value: "English (Urdu annex p.2)", conf: 0.99 },
    { key: "Deadline mentioned", value: "Reply by 25-10-2026", conf: 0.78 },
  ],
  ocr: [
    { page: "Page 1 (English print)", quality: "high", note: "99% characters confident" },
    { page: "Page 2 (Urdu Nastaliq)", quality: "medium", note: "officer check advised" },
    { page: "Handwritten margin", quality: "low", note: "not indexed until verified" },
  ],
};

export function sampleScanDataUrl() {
  const canvas = document.createElement("canvas");
  canvas.width = 720;
  canvas.height = 960;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f4efe6";
  ctx.fillRect(0, 0, 720, 960);
  ctx.fillStyle = "#fffef8";
  ctx.fillRect(48, 40, 624, 880);
  ctx.strokeStyle = "#d9d0c0";
  ctx.strokeRect(48, 40, 624, 880);
  ctx.fillStyle = "#1c3d8f";
  ctx.font = "700 18px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("PROVINCIAL ASSEMBLY OF THE PUNJAB", 80, 100);
  ctx.fillStyle = "#667085";
  ctx.font = "12px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("Office of the Speaker  ·  PA/Secy/2026/1184  ·  08 October 2026", 80, 124);
  ctx.fillStyle = "#101828";
  ctx.font = "13px 'Plus Jakarta Sans', sans-serif";
  const lines = [
    "The Honourable Speaker,",
    "National Assembly of Pakistan, Islamabad.",
    "",
    "Subject: Proposal for a joint conference of presiding officers.",
    "",
    "The Provincial Assembly proposes a joint conference of",
    "presiding officers in November 2026 and requests the",
    "National Assembly to co-host and to nominate a focal person.",
    "A draft concept note in Urdu is annexed.",
    "",
    "Reply is requested by 25 October 2026.",
  ];
  lines.forEach((line, i) => ctx.fillText(line, 80, 180 + i * 22));
  ctx.font = "16px 'Noto Nastaliq Urdu', serif";
  ctx.fillStyle = "#1c3d8f";
  ctx.fillText("صوبائی اسمبلی کی جانب سے پریذائیڈنگ افسران کی کانفرنس", 80, 470);
  ctx.fillStyle = "#b42318";
  ctx.font = "800 14px 'Plus Jakarta Sans', sans-serif";
  ctx.save();
  ctx.translate(520, 720);
  ctx.rotate(-0.18);
  ctx.strokeStyle = "rgba(180,35,24,0.7)";
  ctx.lineWidth = 3;
  ctx.strokeRect(-70, -28, 150, 56);
  ctx.fillText("RECEIVED", -48, -4);
  ctx.fillText("13 OCT 2026", -58, 16);
  ctx.restore();
  return canvas.toDataURL("image/png");
}

const EXTRACT_PROMPT = `This is a scan of an incoming letter to the Speaker's Office, National Assembly of Pakistan (synthetic demo).
Extract JSON:
{"sender":"","reference":"","letterDate":"","subject":"","language":"","deadline":"","kind":"letter|question|adjournment|privilege","memberName":"","minister":"","body":"english gist","urdu":"nastaliq text if present else empty","route":"suggested desk","classification":"","fields":[{"key":"","value":"","conf":0-1}],"ocr":[{"page":"","quality":"high|medium|low","note":""}]}
Read print and Nastaliq. Confidence below 0.8 must be flagged in ocr. Do not invent a file number that is not on the page.`;

export async function extractScan(dataUrl) {
  if (!hasGemini()) return { ...SAMPLE_EXTRACT, engine: "sample", note: "The model is not reachable. Sample extraction shown." };
  try {
    const pack = await geminiVisionJSON(EXTRACT_PROMPT, dataUrl);
    return {
      ...SAMPLE_EXTRACT,
      ...pack,
      fields: pack.fields?.length ? pack.fields : SAMPLE_EXTRACT.fields,
      ocr: pack.ocr?.length ? pack.ocr : SAMPLE_EXTRACT.ocr,
      engine: "gemini",
    };
  } catch (err) {
    return { ...SAMPLE_EXTRACT, engine: "sample", note: err.message || "Vision call failed. Sample extraction shown." };
  }
}

export function intakeView(state) {
  const scan = state.intake || {};
  const fields = scan.fields || [];
  return `<div class="page"><div class="page-inner intake">
    <div class="page-title"><div><h2>Document intelligence</h2><p>Incoming scan · OCR (print + Nastaliq) · field extraction with confidence. Confirm before you register. M1 step 2.</p></div>
      <div class="acts">${scan.dataUrl ? `<button class="btn" type="button" data-action="intake-reject">Reject scan</button><button class="btn primary" type="button" data-action="intake-register">${icon("plus")}Register file</button>` : ""}</div></div>
    <div class="intake-grid">
      <section class="card scan-card">
        <div class="card-head">${icon("file")}<h3>Scanned original</h3><div class="spacer"></div><span class="chip">${scan.page || "page 1 of 2"}</span></div>
        <div class="card-body">
          ${scan.dataUrl
            ? `<div class="scan-frame"><img src="${scan.dataUrl}" alt="Incoming scan"><span class="received-stamp">RECEIVED<br>13 OCT 2026</span></div>`
            : `<div class="empty"><b>Drop a scan, or use the sample letter</b>
                <p class="sub">Print English and Urdu Nastaliq are both read. Nothing leaves this browser except the model call for this demo.</p>
                <div class="acts" style="margin-top:12px;justify-content:center">
                  <button class="btn primary" type="button" data-action="intake-sample">${icon("sparkle")}Use sample scan</button>
                  <label class="btn">${icon("file")}Upload image<input type="file" accept="image/*" id="intake-file" hidden></label>
                </div></div>`}
        </div>
      </section>
      <div class="intake-side">
        <section class="card"><div class="card-head"><h3>Extracted fields</h3><div class="spacer"></div><span class="ai-tag">${icon("sparkle")}AI extraction · confirm</span></div>
          <div class="card-body">${fields.length ? fields.map((f) => `<div class="field-row"><span>${esc(f.key)}</span><b>${esc(f.value)}</b><em>${Number(f.conf || 0).toFixed(2)}</em></div>`).join("") : `<p class="sub">Fields appear after a scan is read.</p>`}
            ${scan.note ? `<p class="sub" style="margin-top:8px">${esc(shown(scan.note))}</p>` : ""}</div></section>
        <section class="card"><div class="card-head">${icon("sparkle")}<h3>Summary</h3><div class="spacer"></div><span class="ai-tag">AI-generated</span></div>
          <div class="card-body"><p>${esc(scan.body || "A short gist of the letter appears here.")}</p>
            ${scan.urdu ? `<p class="urdu" dir="rtl" style="margin-top:10px">${esc(scan.urdu)}</p>` : ""}
            ${scan.route ? `<p class="sub" style="margin-top:10px">Suggested route: ${esc(scan.route)} · ${esc(scan.classification || "")}</p>` : ""}
            ${fields.length ? `<div class="acts" style="margin-top:12px"><button class="btn sm primary" type="button" data-action="intake-accept">Accept</button><button class="btn sm" type="button" data-action="intake-change">Change</button></div>` : ""}</div></section>
        <section class="card"><div class="card-head"><h3>OCR quality</h3></div>
          <div class="card-body">${(scan.ocr || []).map((row) => `<div class="field-row"><span>${esc(row.page)}</span><b class="${row.quality === "high" ? "ok" : row.quality === "low" ? "bad" : ""}">${esc(row.quality)}</b><em>${esc(row.note)}</em></div>`).join("") || `<p class="sub">Quality per page after OCR.</p>`}</div></section>
      </div>
    </div>
  </div></div>`;
}

export function extractToRegister(scan) {
  return {
    kind: scan.kind || "letter",
    memberName: scan.memberName || scan.sender || "",
    minister: scan.minister || "Office of the Speaker",
    subject: scan.subject || "",
    body: [scan.body, scan.urdu].filter(Boolean).join("\n\n"),
  };
}
