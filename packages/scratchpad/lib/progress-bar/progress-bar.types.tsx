import { InputLabelProps } from "lib/input-label/input-label.types";

export type ProgressBarProps = {
  max: number;
  min: number;
  value: number;
} & InputLabelProps;
