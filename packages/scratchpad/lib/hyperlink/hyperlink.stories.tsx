import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect } from "storybook/test";

import { Hyperlink } from "./hyperlink";
import {
  hyperlinkPropsAsterisk,
  hyperlinkPropsDefault,
  hyperlinkPropsNoAsterisk,
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
    ...hyperlinkPropsDefault,
  },
  name: "Hyperlink",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(hyperlinkPropsDefault.title + "*")
    ).toHaveAttribute("href", hyperlinkPropsDefault.href);
    await expect(
      canvas.getByText(hyperlinkPropsDefault.title + "*")
    ).toBeInTheDocument();
  },
};

export const HyperlinkWithAsterisk: Story = {
  args: {
    ...hyperlinkPropsAsterisk,
  },
  name: "Hyperlink with asterisk",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(hyperlinkPropsDefault.title + "*")
    ).toHaveAttribute("href", hyperlinkPropsDefault.href);
    await expect(
      canvas.getByText(hyperlinkPropsDefault.title + "*")
    ).toBeInTheDocument();
  },
};

export const HyperlinkWithoutAsterisk: Story = {
  args: {
    ...hyperlinkPropsNoAsterisk,
  },
  name: "Hyperlink without asterisk",
  play: async ({ canvas }) => {
    await expect(canvas.getByText(hyperlinkPropsDefault.title)).toHaveAttribute(
      "href",
      hyperlinkPropsDefault.href
    );
    await expect(
      canvas.getByText(hyperlinkPropsDefault.title)
    ).toBeInTheDocument();
  },
};
