import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProgressBar } from "lib/progress-bar/progress-bar";
import {
  progressBarProps1,
  progressBarProps2,
} from "lib/progress-bar/progress-bar.mocks";

const meta = {
  component: ProgressBar,
  decorators: [
    (Story) => (
      <div className="max-w-sm text-lg">
        <Story />
      </div>
    ),
  ],
  title: "ProgressBar",
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressBarNoLabel: Story = {
  args: {
    ...progressBarProps2,
  },
  name: "Progress bar",
};

export const ProgressBarWithLabel: Story = {
  args: {
    ...progressBarProps1,
  },
  name: "Progress bar with label",
};
