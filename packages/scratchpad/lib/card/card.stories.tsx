import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./card";

const meta = {
  component: Card,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "Card",
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardWithContent: Story = {
  args: {
    children: <p>Card content</p>,
  },
  name: "Card",
};
