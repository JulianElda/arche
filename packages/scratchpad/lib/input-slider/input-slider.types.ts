import { InputLabelProps } from "lib/input-label/input-label.types";

export type InputSliderProps = {
  value: number;
  min: number;
  max: number;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
} & InputLabelProps;
