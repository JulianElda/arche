import type { Meta, StoryObj } from "@storybook/react";
import { InputSlider } from "lib/input-slider/input-slider";
import { inputSliderProps1 } from "lib/input-slider/input-slider.mocks";

const meta = {
  title: "InputSlider",
  component: InputSlider,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputSliderMinMax: Story = {
  name: "Input type text",
  args: {
    ...inputSliderProps1,
  },
};
