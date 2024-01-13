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
  name: "Input type text",
  args: {
    id: "input-id",
    label: "Input label",
    type: "text",
    value: "Input value",
    hideLabel: false,
  },
};

export const InputAutofocus: Story = {
  name: "Input with autofocus",
  args: {
    id: "input-id",
    label: "Input label",
    type: "text",
    value: "Input value",
    hideLabel: false,
    autofocus: true,
  },
};

export const InputNumber: Story = {
  name: "Input type number",
  args: {
    id: "input-id",
    label: "Input number",
    type: "number",
    value: 12345,
    hideLabel: false,
  },
};

export const InputSearch: Story = {
  name: "Input type search",
  args: {
    id: "input-id",
    label: "Input search",
    type: "search",
    value: "Input search",
    hideLabel: false,
  },
};

export const InputHiddenLabel: Story = {
  name: "Input without label",
  args: {
    id: "input-id",
    label: "Input label",
    type: "text",
    value: "Input value",
    hideLabel: true,
  },
};
