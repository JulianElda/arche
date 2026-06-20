import type { InputFieldProps } from "./../input-field/input-field.types.ts";

export interface InputProps extends InputFieldProps {
  hideLabel?: boolean;
  id: string;
  label: string;
}
