import type { Meta, StoryObj } from "@storybook/react-vite";

import { Hyperlink } from "./hyperlink";
import {
  hyperlinkPropertiesAsterisk,
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

export const HyperlinkWithAsterisk: Story = {
  args: {
    ...hyperlinkPropertiesAsterisk,
  },
  name: "Hyperlink",
};

export const HyperlinkWithoutAsterisk: Story = {
  args: {
    ...hyperlinkPropertiesNoAsterisk,
  },
  name: "Hyperlink without asterisk",
};
