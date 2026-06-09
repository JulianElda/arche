import type { InputLabelProps } from "../input-label/input-label.types";

export type ProgressBarProps = InputLabelProps & {
  max: number;
  min: number;
  value: number;
};
