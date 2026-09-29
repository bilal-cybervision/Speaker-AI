/** Gemini key from VITE_GEMINI_API_KEY. Vite copies it in at build time, including on Vercel. */
export const GEMINI_API_KEY =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ||
  "";

export function hasGemini() {
  return Boolean(GEMINI_API_KEY && GEMINI_API_KEY.length > 12);
}
