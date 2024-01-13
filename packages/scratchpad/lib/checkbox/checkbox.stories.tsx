import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Checkbox",
  component: Checkbox,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxChecked: Story = {
  name: "Checkbox checked",
  args: {
    id: "checkbox-id",
    label: "Checkbox label",
    value: true,
  },
};

export const CheckboxUnchecked: Story = {
  name: "Checkbox unchecked",
  args: {
    id: "checkbox-id",
    label: "Checkbox label",
    value: false,
  },
};

export const CheckboxNoLabel: Story = {
  name: "Checkbox without label",
  args: {
    id: "checkbox-id",
    label: "Checkbox label",
    value: true,
    hideLabel: true,
  },
};
