import type { StorybookConfig } from "@storybook/sveltekit";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-svelte-csf",
    "@storybook/addon-themes",
  ],
  core: {
    disableTelemetry: true,
  },
  framework: "@storybook/sveltekit",
  stories: ["../src/**/*.stories.@(js|ts|svelte)"],
};
export default config;
