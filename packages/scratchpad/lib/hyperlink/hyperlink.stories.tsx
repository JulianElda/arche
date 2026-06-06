import type { Meta, StoryObj } from "@storybook/react-vite";

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
};

export const HyperlinkWithAsterisk: Story = {
  args: {
    ...hyperlinkPropsAsterisk,
  },
  name: "Hyperlink with asterisk",
};

export const HyperlinkWithoutAsterisk: Story = {
  args: {
    ...hyperlinkPropsNoAsterisk,
  },
  name: "Hyperlink without asterisk",
};
