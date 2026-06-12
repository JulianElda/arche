import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
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
      exclude: ["src/**/*.mocks.ts"],
      provider: "v8",
    },
    expect: { requireAssertions: true },
    include: ["src/**/*.svelte.test.ts"],
    setupFiles: "./src/test.setup.ts",
  },
});
