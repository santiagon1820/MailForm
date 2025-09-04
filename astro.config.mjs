import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: ["swagger-jsdoc"],
    },
  },
});
