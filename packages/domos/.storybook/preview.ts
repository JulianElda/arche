import type { Preview } from "@storybook/sveltekit";

import { withThemeByClassName } from "@storybook/addon-themes";

import "./storybook-tailwind.css";

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      defaultTheme: "light",
      themes: {
        dark: "dark",
        light: "",
      },
    }),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
