import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProgressBar } from "lib/progress-bar/progress-bar";
import {
  progressBarProperties1,
  progressBarProperties2,
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
    ...progressBarProperties2,
  },
  name: "render elements without label",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByTestId(progressBarProperties2.id)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(progressBarProperties2.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("progressbar", { name: progressBarProperties2.label })
    ).toHaveValue(progressBarProperties2.value);
  },
};

export const ProgressBarWithLabelElements: Story = {
  args: {
    ...progressBarProperties1,
  },
  name: "render elements with label",
  play: async ({ canvas }) => {
    await expect(
      canvas.getByTestId(progressBarProperties1.id)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(progressBarProperties1.label)
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("progressbar", { name: progressBarProperties1.label })
    ).toHaveValue(progressBarProperties1.value);
  },
};
