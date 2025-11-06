import type { InputLabelProps } from "lib/input-label/input-label.types";

export type InputSliderProps = InputLabelProps & {
  disabled?: boolean;
  max: number;
  min: number;
  onChange?: (value: number | string) => void;
  value: number;
};
