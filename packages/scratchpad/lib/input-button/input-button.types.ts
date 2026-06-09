import type { InputFieldProps } from "../input-field/input-field.types";
import type { InputLabelProps } from "../input-label/input-label.types";

export type InputButtonProps = IconButtonProps &
  InputFieldProps &
  InputLabelProps;

interface IconButtonProps {
  buttonAriaLabel: string;
  icon?: React.ReactNode;
  onButtonClick: () => void;
}
