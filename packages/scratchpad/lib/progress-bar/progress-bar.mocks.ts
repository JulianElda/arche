import type { ProgressBarProperties } from "lib/progress-bar/progress-bar.types";

export const progressBarProperties1: ProgressBarProperties = {
  id: "progress-bar-1",
  label: "Progress with label",
  max: 100,
  min: 0,
  value: 66,
};

export const progressBarProperties2: ProgressBarProperties = {
  hideLabel: true,
  id: "progress-bar-2",
  label: "Progress bar",
  max: 32,
  min: 4,
  value: 8,
};
