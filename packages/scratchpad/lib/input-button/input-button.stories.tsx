import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputButton } from "./input-button";
import {
  inputButtonProps1,
  inputButtonProps2,
  inputButtonProps3,
  inputButtonProps4,
} from "./input-button.mocks";

const meta = {
  component: InputButton,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "InputButton",
} satisfies Meta<typeof InputButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconInputButton: Story = {
  args: {
    ...inputButtonProps1,
  },
  name: "Input with icon button",
};

export const TextInputButton: Story = {
  args: {
    ...inputButtonProps2,
  },
  name: "Input with text button",
};

export const NumberInputButton: Story = {
  args: {
    ...inputButtonProps3,
  },
  name: "Input number with icon button",
};

export const SearchInputButton: Story = {
  args: {
    ...inputButtonProps4,
  },
  name: "Input search with icon button",
};
