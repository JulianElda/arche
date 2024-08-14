import { InputFieldProps } from "./../input-field/input-field.types";
import { InputLabelProps } from "./../input-label/input-label.types";

type IconButtonProps = {
  icon?: React.ReactNode;
  buttonAriaLabel: string;
  onButtonClick: () => void;
};

export type InputButtonProps = InputFieldProps &
  InputLabelProps &
  IconButtonProps;
