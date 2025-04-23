import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { inputProps1, inputProps2, inputProps3 } from "./input.mocks";

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
    ...inputProps1,
    hideLabel: false,
  },
};

export const InputAutofocus: Story = {
  name: "Input with autofocus",
  args: {
    ...inputProps1,
    hideLabel: false,
    autofocus: true,
  },
};

export const InputNumber: Story = {
  name: "Input type number",
  args: {
    ...inputProps2,
    hideLabel: false,
  },
};

export const InputSearch: Story = {
  name: "Input type search",
  args: {
    ...inputProps3,
    hideLabel: false,
  },
};

export const InputHiddenLabel: Story = {
  name: "Input without label",
  args: {
    ...inputProps1,
    hideLabel: true,
  },
};

export const InputWithPlaceholder: Story = {
  name: "Input with placeholder",
  args: {
    ...inputProps1,
    hideLabel: false,
    value: "",
    placeholder: "Type here",
  },
};
