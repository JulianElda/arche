/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      //entryRoot: "./lib",
      tsconfigPath: "./tsconfig.lib.json",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./lib/test-setup.ts",
  },
  resolve: {
    alias: {
      lib: path.resolve(__dirname, "lib"),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "scratchpad",
      fileName: "scratchpad",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
