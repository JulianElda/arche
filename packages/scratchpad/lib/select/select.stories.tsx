import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";
import { selectProps1 } from "./select.mocks";

const meta = {
  title: "Select",
  component: Select,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicSelect: Story = {
  name: "Select",
  args: {
    ...selectProps1,
  },
};

export const SelectWithoutLabel: Story = {
  name: "Select without label",
  args: {
    ...selectProps1,
    hideLabel: true,
  },
};
