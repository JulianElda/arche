import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Button",
  component: Button,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonPrimary: Story = {
  name: "Primary button",
  args: {
    id: "primary-button",
    style: "primary",
    type: "button",
    text: "Primary button",
  },
};

export const ButtonSecondary: Story = {
  name: "Secondary button",
  args: {
    id: "secondary-button",
    style: "secondary",
    type: "button",
    text: "Secondary button",
    onClick: () => undefined,
  },
};
