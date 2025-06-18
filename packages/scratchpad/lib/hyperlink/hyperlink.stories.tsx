import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hyperlink } from "./hyperlink";
import {
  hyperlinkPropsAsterisk,
  hyperlinkPropsNoAsterisk,
} from "./hyperlink.mocks";

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
    ...hyperlinkPropsAsterisk,
  },
};

export const HyperlinkWithoutAsterisk: Story = {
  name: "Hyperlink without asterisk",
  args: {
    ...hyperlinkPropsNoAsterisk,
  },
};
