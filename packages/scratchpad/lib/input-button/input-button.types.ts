import type { InputFieldProperties } from "lib/input-field/input-field.types";
import type { InputLabelProperties } from "lib/input-label/input-label.types";

export type InputButtonProperties = IconButtonProperties &
  InputFieldProperties &
  InputLabelProperties;

interface IconButtonProperties {
  buttonAriaLabel: string;
  icon?: React.ReactNode;
  onButtonClick: () => void;
}
