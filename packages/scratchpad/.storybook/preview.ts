import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";

//import "./../lib/assets/styles/styles.css";
import "./../lib/assets/fonts/heliotrope.css";
import "./../src/tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // @ts-ignore
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
