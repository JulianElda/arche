import type { InputLabelProperties } from "lib/input-label/input-label.types";

export type ProgressBarProperties = InputLabelProperties & {
  max: number;
  min: number;
  value: number;
};
