import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input";
import {
  inputProperties1,
  inputProperties2,
  inputProperties3,
} from "./input.mocks";

const meta = {
  component: Input,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "Input",
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputText: Story = {
  args: {
    ...inputProperties1,
    hideLabel: false,
  },
  name: "Input type text",
};

export const InputNumber: Story = {
  args: {
    ...inputProperties2,
    hideLabel: false,
  },
  name: "Input type number",
};

export const InputSearch: Story = {
  args: {
    ...inputProperties3,
    hideLabel: false,
  },
  name: "Input type search",
};

export const InputHiddenLabel: Story = {
  args: {
    ...inputProperties1,
    hideLabel: true,
  },
  name: "Input without label",
};

export const InputWithPlaceholder: Story = {
  args: {
    ...inputProperties1,
    hideLabel: false,
    placeholder: "Type here",
    value: "",
  },
  name: "Input with placeholder",
};
