import { defineConfig } from "tsdown";

export default defineConfig({
  copy: [
    { from: "lib/tailwind.css", to: "dist" },
    {
      from: "lib/assets/style/background.css",
      to: "dist",
    },
  ],
  deps: {
    neverBundle: ["react", "react-dom"],
  },
  dts: {
    tsconfig: "./tsconfig.lib.json",
  },
  entry: { scratchpad: "./lib/index.ts" },
  format: "esm",
  platform: "neutral",
});
