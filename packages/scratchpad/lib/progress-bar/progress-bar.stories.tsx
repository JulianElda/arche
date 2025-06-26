import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProgressBar } from "lib/progress-bar/progress-bar";
import {
  progressBarProperties1,
  progressBarProperties2,
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
    ...progressBarProperties2,
  },
  name: "Progress bar",
};

export const ProgressBarWithLabel: Story = {
  args: {
    ...progressBarProperties1,
  },
  name: "Progress bar with label",
};
