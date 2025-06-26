import type { InputLabelProperties } from "lib/input-label/input-label.types";

export type InputSliderProperties = InputLabelProperties & {
  disabled?: boolean;
  max: number;
  min: number;
  onChange?: (value: number | string) => void;
  value: number;
};
