import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button";
import { buttonPropsPrimary, buttonPropsSecondary } from "./button.mocks";

const meta = {
  component: Button,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonPrimary: Story = {
  args: {
    ...buttonPropsPrimary,
  },
  name: "Primary button",
};

export const ButtonSecondary: Story = {
  args: {
    ...buttonPropsSecondary,
  },
  name: "Secondary button",
};
