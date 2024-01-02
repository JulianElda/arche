/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/test-setup.ts",
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: "src/lib/index.ts",
      name: "scratchpad",
      fileName: "main",
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
  },
});
