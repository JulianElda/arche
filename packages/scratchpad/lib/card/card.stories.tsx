import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./card";

const meta = {
  title: "Card",
  component: Card,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardWithContent: Story = {
  name: "Card",
  args: {
    children: <p>Card content</p>,
  },
};
