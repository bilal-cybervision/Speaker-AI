export async function textFromPdf(buffer) {
  const { getDocument } = await import("../../../node_modules/pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(buffer);
  const doc = await getDocument({ data, disableWorker: true, verbosity: 0 }).promise;
  let text = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => ("str" in item ? item.str : "")).join(" ") + "\n";
  }
  return text.replace(/[ \t]+/g, " ").replace(/\n{2,}/g, "\n").trim();
}
