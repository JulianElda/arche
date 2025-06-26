import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputButton } from "./input-button";
import {
  inputButtonProperties1,
  inputButtonProperties2,
  inputButtonProperties3,
  inputButtonProperties4,
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
    ...inputButtonProperties1,
  },
  name: "Input with icon button",
};

export const TextInputButton: Story = {
  args: {
    ...inputButtonProperties2,
  },
  name: "Input with text button",
};

export const NumberInputButton: Story = {
  args: {
    ...inputButtonProperties3,
  },
  name: "Input number with icon button",
};

export const SearchInputButton: Story = {
  args: {
    ...inputButtonProperties4,
  },
  name: "Input search with icon button",
};
