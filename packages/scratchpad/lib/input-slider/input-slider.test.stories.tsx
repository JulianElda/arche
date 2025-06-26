import type { Meta, StoryObj } from "@storybook/react-vite";

import { InputSlider } from "lib/input-slider/input-slider";
import { inputSliderProperties1 } from "lib/input-slider/input-slider.mocks";
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
    ...inputSliderProperties1,
  },
  name: "render elements",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByLabelText(inputSliderProperties1.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(inputSliderProperties1.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(inputSliderProperties1.value)
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId(inputSliderProperties1.id)
    ).toBeInTheDocument();
    await expect(
      canvas.getByDisplayValue(inputSliderProperties1.value)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("slider", { name: inputSliderProperties1.label })
    ).toBeInTheDocument();
  },
};
