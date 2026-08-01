import type { InputFieldProps } from "./../input-field/input-field.types.ts";
import type { SelectFieldProps } from "./../select-field/select-field.types.ts";

export interface InputSelectInputProps extends InputFieldProps {
  label: string;
}

export interface InputSelectProps {
  class?: string;
  hideLabel?: boolean;
  inputProps: InputSelectInputProps;
  selectProps: InputSelectSelectProps;
}

export interface InputSelectSelectProps extends SelectFieldProps {
  label: string;
}
