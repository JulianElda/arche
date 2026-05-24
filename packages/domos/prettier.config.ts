import prettier from "@julianelda/lexis/prettier";

/** @type {import('prettier').Config} */
const config = {
  ...prettier,
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
  plugins: [
    "@prettier/plugin-oxc",
    "prettier-plugin-svelte",
    "prettier-plugin-tailwindcss",
  ],
  tailwindStylesheet: "./src/lib/tailwind.css",
};

export default config;
