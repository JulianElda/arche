import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, fn } from "storybook/test";

import { Button } from "./button";
import { buttonPropertiesPrimary } from "./button.mocks";

const meta = {
  component: Button,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  tags: ["!autodocs"],
  title: "Tests/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestElements: Story = {
  args: {
    ...buttonPropertiesPrimary,
  },
  name: "render elements",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByTestId(buttonPropertiesPrimary.id)
    ).toBeInTheDocument();
    await expect(
      canvas.getByLabelText(buttonPropertiesPrimary.text)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: buttonPropertiesPrimary.text })
    ).toBeInTheDocument();
  },
};

export const TestClick: Story = {
  args: {
    ...buttonPropertiesPrimary,
    onClick: fn(),
  },
  name: "callback when clicked",
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByTestId(buttonPropertiesPrimary.id));
    await expect(args.onClick).toHaveBeenCalled();
  },
};
