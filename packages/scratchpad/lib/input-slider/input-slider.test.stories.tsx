import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputSlider } from "lib/input-slider/input-slider";
import { inputSliderProps1 } from "lib/input-slider/input-slider.mocks";
import { expect } from "storybook/test";

const meta = {
  component: InputSlider,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  tags: ["!autodocs"],
  title: "Tests/InputSlider",
} satisfies Meta<typeof InputSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TestElement: Story = {
  args: {
    ...inputSliderProps1,
  },
  name: "render elements",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText(inputSliderProps1.label)
    ).toBeInTheDocument();
    await expect(canvas.getByText(inputSliderProps1.label)).toBeInTheDocument();
    await expect(canvas.getByText(inputSliderProps1.value)).toBeInTheDocument();
    await expect(canvas.getByTestId(inputSliderProps1.id)).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(inputSliderProps1.value)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("slider", { name: inputSliderProps1.label })
    ).toBeInTheDocument();
  },
};
