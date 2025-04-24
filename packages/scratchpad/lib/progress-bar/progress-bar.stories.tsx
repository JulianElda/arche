import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "lib/progress-bar/progress-bar";
import {
  progressBarProps1,
  progressBarProps2,
} from "lib/progress-bar/progress-bar.mocks";

const meta = {
  title: "ProgressBar",
  component: ProgressBar,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressBarNoLabel: Story = {
  name: "Progress bar",
  args: {
    ...progressBarProps2,
  },
};

export const ProgressBarWithLabel: Story = {
  name: "Progress bar with label",
  args: {
    ...progressBarProps1,
  },
};
