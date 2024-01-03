import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  title: "Input",
  component: Input,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputText: Story = {
  args: {
    id: "input-id",
    label: "Input label",
    type: "text",
    value: "Input value",
    hideLabel: false,
  },
};

export const InputNumber: Story = {
  args: {
    id: "input-id",
    label: "Input number",
    type: "number",
    value: 12345,
    hideLabel: false,
  },
};

export const InputSearch: Story = {
  args: {
    id: "input-id",
    label: "Input search",
    type: "search",
    value: "Input search",
    hideLabel: false,
  },
};

export const InputHiddenLabel: Story = {
  args: {
    id: "input-id",
    label: "Input label",
    type: "text",
    value: "Input value",
    hideLabel: true,
  },
};
