import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
      "@components": "/src/components",
      "@apis": "/src/apis",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@styles": "/src/styles",
      "@layout": "/src/layout",
      "@contexts": "/src/contexts",
    },
  },
  server: {
    port: 5173,
  },
});
