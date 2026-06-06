import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputSelect } from "./input-select";
import { inputSelectProps1, inputSelectProps2 } from "./input-select.mocks";

const meta = {
  component: InputSelect,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "InputSelect",
} satisfies Meta<typeof InputSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputWithSelect1: Story = {
  args: {
    ...inputSelectProps1,
  },
  name: "Input with select",
};

export const InputWithSelect2: Story = {
  args: {
    ...inputSelectProps2,
  },
  name: "Input with shorter select",
};

export const InputSelectHiddenLabel: Story = {
  args: {
    ...inputSelectProps1,
    hideLabel: true,
  },
  name: "Input select hidden label",
};
