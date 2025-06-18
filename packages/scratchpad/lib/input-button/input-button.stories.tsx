import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputButton } from "./input-button";
import {
  inputButtonProps1,
  inputButtonProps2,
  inputButtonProps3,
  inputButtonProps4,
} from "./input-button.mocks";

const meta = {
  title: "InputButton",
  component: InputButton,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconInputButton: Story = {
  name: "Input with icon button",
  args: {
    ...inputButtonProps1,
  },
};

export const TextInputButton: Story = {
  name: "Input with text button",
  args: {
    ...inputButtonProps2,
  },
};

export const NumberInputButton: Story = {
  name: "Input number with icon button",
  args: {
    ...inputButtonProps3,
  },
};

export const SearchInputButton: Story = {
  name: "Input search with icon button",
  args: {
    ...inputButtonProps4,
  },
};
