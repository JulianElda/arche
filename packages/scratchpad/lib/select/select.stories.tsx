import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

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
    id: "select-id",
    label: "Select",
    value: "two",
    options: [
      {
        label: "One",
        value: "one",
      },
      {
        label: "Two",
        value: "two",
      },
      {
        label: "Three",
        value: "three",
      },
    ],
  },
};
