import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";

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
    tailwindcss(),
    react(),
    dts({
      //entryRoot: "./lib",
      tsconfigPath: "./tsconfig.lib.json",
    }),
  ],
  test: {
    browser: {
      enabled: true,
      instances: [
        {
          browser: "chromium",
        },
      ],
      provider: playwright({
        launchOptions: {
          executablePath: "/usr/bin/chromium",
        },
      }),
    },
    coverage: {
      enabled: true,
      exclude: ["lib/**/*.mocks.{ts,tsx}"],
      provider: "v8",
    },
    setupFiles: "./lib/test-setup.ts",
  },
});
