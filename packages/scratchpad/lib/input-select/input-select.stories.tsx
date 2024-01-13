import type { Meta, StoryObj } from "@storybook/react";
import { InputSelect } from "./input-select";

const meta = {
  title: "InputSelect",
  component: InputSelect,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputWithSelect: Story = {
  name: "Input with select",
  args: {
    type: "text",
    inputId: "input-id",
    inputLabel: "Input with select",
    inputValue: "Input value",
    selectId: "select-id",
    selectLabel: "Select label",
    selectValue: "two",
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

export const InputSelectHiddenLabel: Story = {
  name: "Input select hidden label",
  args: {
    type: "text",
    inputId: "input-id",
    inputLabel: "Input with select",
    inputValue: "Input value",
    hideLabel: true,
    selectId: "select-id",
    selectLabel: "Select label",
    selectValue: "one",
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
