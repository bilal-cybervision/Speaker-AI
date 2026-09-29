import { defineConfig, loadEnv } from "vite";
import { handleSpeakRequest } from "./server/elevenlabs.mjs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const key = env.ELEVENLABS_API_KEY || "";
  const attach = (server) => {
    server.middlewares.use((req, res, next) => {
      const path = (req.url || "").split("?")[0];
      if (path !== "/api/elevenlabs/speak") return next();
      handleSpeakRequest(req, res, key);
    });
  };
  return {
    server: {
      port: 5173,
      watch: { ignored: ["**/public/rulings/**/*.pdf"] },
    },
    plugins: [{
      name: "elevenlabs-proxy",
      configureServer: attach,
      configurePreviewServer: attach,
    }],
    build: { modulePreload: false },
  };
});
