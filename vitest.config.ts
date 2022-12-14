import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify"
import * as path from "path";

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  test: {
    deps: {
      inline: ["vuetify"],
    },
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
