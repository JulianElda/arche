import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputSelect } from "./input-select";
import { inputSelectProps1, inputSelectProps2 } from "./input-select.mocks";

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

export const InputWithSelect1: Story = {
  name: "Input with select",
  args: {
    ...inputSelectProps1,
  },
};

export const InputWithSelect2: Story = {
  name: "Input with shorter select",
  args: {
    ...inputSelectProps2,
  },
};

export const InputSelectHiddenLabel: Story = {
  name: "Input select hidden label",
  args: {
    ...inputSelectProps1,
    hideLabel: true,
  },
};
