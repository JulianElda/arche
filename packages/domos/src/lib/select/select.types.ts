import type { SelectFieldProps } from "./../select-field/select-field.types.ts";

export interface SelectProps extends SelectFieldProps {
  hideLabel?: boolean;
  id: string;
  label: string;
}
