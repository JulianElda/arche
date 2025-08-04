import type { Meta, StoryObj } from "@storybook/react-vite";

import { GitHubButton } from "lib/github-button/github-button";

const meta = {
  component: GitHubButton,
  title: "GitHubButton",
} satisfies Meta<typeof GitHubButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GitHubButtonLight: Story = {
  args: {
    link: "https://julianelda.io",
  },
  globals: {
    theme: "light",
  },
  name: "GitHubButton light",
};

export const GitHubButtonDark: Story = {
  args: {
    link: "https://julianelda.io",
  },
  globals: {
    theme: "dark",
  },
  name: "GitHubButton dark",
};
