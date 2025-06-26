import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputSlider } from "lib/input-slider/input-slider";
import { inputSliderProperties1 } from "lib/input-slider/input-slider.mocks";

const meta = {
  component: InputSlider,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "InputSlider",
} satisfies Meta<typeof InputSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputSliderMinMax: Story = {
  args: {
    ...inputSliderProperties1,
  },
  name: "Input type text",
};
