import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./checkbox";
import { checkboxProps } from "./checkbox.mocks";

const meta = {
  component: Checkbox,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "Checkbox",
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxChecked: Story = {
  args: {
    ...checkboxProps,
  },
  name: "Checkbox checked",
};

export const CheckboxUnchecked: Story = {
  args: {
    ...checkboxProps,
    value: false,
  },
  name: "Checkbox unchecked",
};

export const CheckboxNoLabel: Story = {
  args: {
    ...checkboxProps,
    hideLabel: true,
  },
  name: "Checkbox without label",
};
