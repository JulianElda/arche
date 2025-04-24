import { ProgressBarProps } from "lib/progress-bar/progress-bar.types";

export const progressBarProps1: ProgressBarProps = {
  id: "progress-bar-1",
  label: "Progress with label",
  max: 100,
  min: 0,
  value: 66,
};

export const progressBarProps2: ProgressBarProps = {
  id: "progress-bar-2",
  label: "Progress bar",
  hideLabel: true,
  max: 32,
  min: 4,
  value: 8,
};
