// @lovable.dev/vite-tanstack-config already includes default plugins.
// Passing additional manual settings safely via defineConfig overrides:
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    publicDir: "public",
    build: {
      outDir: "dist",
      emptyOutDir: true,
    }
  },
});