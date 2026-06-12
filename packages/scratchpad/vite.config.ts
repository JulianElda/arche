import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss(), react()],
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
    include: ["lib/**/*.test.{ts,tsx}"],
    setupFiles: "./lib/test.setup.ts",
  },
});
