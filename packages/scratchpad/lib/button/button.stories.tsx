import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { buttonPropsPrimary, buttonPropsSecondary } from "./button.mocks";

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
    ...buttonPropsPrimary,
  },
};

export const ButtonSecondary: Story = {
  name: "Secondary button",
  args: {
    ...buttonPropsSecondary,
  },
};
