/// <reference types="vitest/config" />
/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import path, { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const __dirname = import.meta.dirname;

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      fileName: "scratchpad",
      formats: ["es"],
      name: "scratchpad",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
  plugins: [
    react(),
    dts({
      //entryRoot: "./lib",
      tsconfigPath: "./tsconfig.lib.json",
    }),
  ],
  resolve: {
    alias: {
      lib: path.resolve(__dirname, "lib"),
    },
  },
  test: {
    coverage: {
      enabled: true,
      exclude: ["lib/**/*.mocks.{ts,tsx}"],
      provider: "v8",
    },
    environment: "jsdom",
    globals: true,
    projects: [
      {
        extends: true,
        test: {
          browser: {
            enabled: true,
            instances: [
              {
                browser: "chromium",
              },
            ],
            provider: playwright(),
          },
          name: "component",
          setupFiles: "./lib/test-setup.ts",
        },
      },
    ],
  },
});
