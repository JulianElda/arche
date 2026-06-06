import type { InputFieldProps } from "lib/input-field/input-field.types";
import type { InputLabelProps } from "lib/input-label/input-label.types";

export type InputButtonProps = IconButtonProps &
  InputFieldProps &
  InputLabelProps;

interface IconButtonProps {
  buttonAriaLabel: string;
  icon?: React.ReactNode;
  onButtonClick: () => void;
}
