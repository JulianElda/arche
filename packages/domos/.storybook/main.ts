import type { StorybookConfig } from "@storybook/sveltekit";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|ts|svelte)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-svelte-csf",
    "@storybook/addon-themes",
  ],
  core: {
    disableTelemetry: true,
  },
  framework: "@storybook/sveltekit",
};
export default config;
