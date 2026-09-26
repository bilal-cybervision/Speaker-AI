import { defineConfig } from "vite";
import { compileThemes } from "./tools/compile-themes.mjs";

export default defineConfig(async () => {
  await compileThemes();
  return {
    server: { port: 5173 },
    build: { modulePreload: false },
  };
});
