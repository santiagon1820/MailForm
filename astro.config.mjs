import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  output: "static",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    optimizeDeps: {
      exclude: ["swagger-jsdoc"],
    },
    server: {
      host: true,
    },
  },
});