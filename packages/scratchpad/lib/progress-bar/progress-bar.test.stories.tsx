import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProgressBar } from "lib/progress-bar/progress-bar";
import {
  progressBarProps1,
  progressBarProps2,
} from "lib/progress-bar/progress-bar.mocks";
import { expect } from "storybook/test";

const meta = {
  component: ProgressBar,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "Tests/ProgressBar",
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressBarNoLabelElements: Story = {
  args: {
    ...progressBarProps2,
  },
  name: "render elements without label",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(progressBarProps2.id)).toBeInTheDocument();
    await expect(canvas.getByText(progressBarProps2.label)).toBeInTheDocument();
    await expect(
      canvas.getByRole("progressbar", { name: progressBarProps2.label })
    ).toHaveValue(progressBarProps2.value);
  },
};

export const ProgressBarWithLabelElements: Story = {
  args: {
    ...progressBarProps1,
  },
  name: "render elements with label",
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(progressBarProps1.id)).toBeInTheDocument();
    await expect(canvas.getByText(progressBarProps1.label)).toBeInTheDocument();
    await expect(
      canvas.getByRole("progressbar", { name: progressBarProps1.label })
    ).toHaveValue(progressBarProps1.value);
  },
};
