import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Separate config so thumbnail rendering never runs with the unit tests.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["scripts/render-thumbnails.tsx"],
  },
});
