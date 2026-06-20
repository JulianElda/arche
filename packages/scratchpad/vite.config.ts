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
        /*
        launchOptions: {
          executablePath: "/usr/bin/chromium",
        },
        */
      }),
    },
    expect: { requireAssertions: true },
    include: ["lib/**/*.test.{ts,tsx}"],
    setupFiles: "./lib/test.setup.ts",
  },
});
