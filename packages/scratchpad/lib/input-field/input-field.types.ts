import { InputFieldTypes } from "lib/commons/commons.types";

export type InputFieldProps = {
  id: string;
  type: InputFieldTypes;
  value: string | number;
  placeholder?: string;
  disabled?: boolean;
  autofocus?: boolean;
  onChange?: (value: string | number) => void;
  onKeyDown?: (value: string | number) => void;
  withIconLeft?: boolean;
  max?: number;
  min?: number;
  maxLength?: number;
};
