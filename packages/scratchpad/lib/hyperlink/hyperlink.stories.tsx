import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect } from "storybook/test";

import { Hyperlink } from "./hyperlink";
import {
  hyperlinkPropertiesAsterisk,
  hyperlinkPropertiesDefault,
  hyperlinkPropertiesNoAsterisk,
} from "./hyperlink.mocks";

const meta = {
  component: Hyperlink,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "Hyperlink",
} satisfies Meta<typeof Hyperlink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HyperlinkDefault: Story = {
  args: {
    ...hyperlinkPropertiesDefault,
  },
  name: "Hyperlink",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(hyperlinkPropertiesDefault.title + "*")
    ).toHaveAttribute("href", hyperlinkPropertiesDefault.href);
    await expect(
      canvas.getByText(hyperlinkPropertiesDefault.title + "*")
    ).toBeInTheDocument();
  },
};

export const HyperlinkWithAsterisk: Story = {
  args: {
    ...hyperlinkPropertiesAsterisk,
  },
  name: "Hyperlink with asterisk",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(hyperlinkPropertiesDefault.title + "*")
    ).toHaveAttribute("href", hyperlinkPropertiesDefault.href);
    await expect(
      canvas.getByText(hyperlinkPropertiesDefault.title + "*")
    ).toBeInTheDocument();
  },
};

export const HyperlinkWithoutAsterisk: Story = {
  args: {
    ...hyperlinkPropertiesNoAsterisk,
  },
  name: "Hyperlink without asterisk",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(hyperlinkPropertiesDefault.title)
    ).toHaveAttribute("href", hyperlinkPropertiesDefault.href);
    await expect(
      canvas.getByText(hyperlinkPropertiesDefault.title)
    ).toBeInTheDocument();
  },
};
