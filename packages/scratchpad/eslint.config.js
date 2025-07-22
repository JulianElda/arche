import lexis from "@julianelda/lexis/react";
import tailwind from "@julianelda/lexis/tsx-tailwind";
import storybook from "eslint-plugin-storybook";

export default [
  ...lexis,
  ...tailwind,
  ...storybook.configs["flat/recommended"],
  {
    settings: {
      "better-tailwindcss": {
        entryPoint: "lib/tailwind.css",
      },
    },
  },
];
