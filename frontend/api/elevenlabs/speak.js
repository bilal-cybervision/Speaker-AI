import { handleSpeakRequest } from "../../server/elevenlabs.mjs";

export default function handler(req, res) {
  return handleSpeakRequest(req, res, process.env.ELEVENLABS_API_KEY || "");
}
