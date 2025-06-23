import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Card } from "./card";

const meta = {
  title: "Tests/Card",
  component: Card,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  tags: ["!autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardWithContent: Story = {
  name: "render content",
  args: {
    children: <p>Card content</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Card content")).toBeInTheDocument();
  },
};
