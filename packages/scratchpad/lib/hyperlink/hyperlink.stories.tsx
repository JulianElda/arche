import type { Meta, StoryObj } from "@storybook/react";
import { Hyperlink } from "./hyperlink";

const meta = {
  title: "Hyperlink",
  component: Hyperlink,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Hyperlink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HyperlinkWithAsterisk: Story = {
  name: "Hyperlink",
  args: {
    href: "https://julianelda.github.io",
    title: "Julius Polar@GitHub",
  },
};

export const HyperlinkWithoutAsterisk: Story = {
  name: "Hyperlink without asterisk",
  args: {
    href: "https://julianelda.github.io",
    title: "Julius Polar@GitHub",
    asterisk: false,
  },
};
