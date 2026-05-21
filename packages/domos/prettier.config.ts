import prettier from "@julianelda/lexis/prettier";

/** @type {import('prettier').Config} */
const config = {
  ...prettier,
  plugins: [
    "@prettier/plugin-oxc",
    "prettier-plugin-svelte",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
