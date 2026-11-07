import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

/** Status codes Apache is configured to answer with a page (see .htaccess). */
const ERROR_PAGE_STATUSES = [400, 404, 500];

/** Folder holding the generator page. Apache serves its index.html for /generate-config/. */
const GENERATOR_FOLDER = "generate-config";

/**
 * Apache can only serve files that exist, but the app is a single HTML shell.
 * This writes copies of the shell where Apache needs them:
 * - one per error code, with the http-status meta changed. The app reads that
 *   meta at startup to know which status page to show.
 * - one for the generator page, which the app recognizes from the URL.
 */
function staticPages(): Plugin {
  let outDir = "";

  return {
    name: "static-pages",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const shell = readFileSync(resolve(outDir, "index.html"), "utf-8");
      const defaultMeta = '<meta name="http-status" content="200" />';

      if (!shell.includes(defaultMeta)) {
        throw new Error(`index.html is missing ${defaultMeta}, cannot build error pages.`);
      }

      for (const status of ERROR_PAGE_STATUSES) {
        const page = shell.replace(defaultMeta, `<meta name="http-status" content="${status}" />`);
        writeFileSync(resolve(outDir, `${status}.html`), page);
      }

      mkdirSync(resolve(outDir, GENERATOR_FOLDER), { recursive: true });
      writeFileSync(resolve(outDir, GENERATOR_FOLDER, "index.html"), shell);
    },
  };
}

export default defineConfig({
  plugins: [react(), staticPages()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
