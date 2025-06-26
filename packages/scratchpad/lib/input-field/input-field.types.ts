import type { InputFieldTypes } from "lib/commons/commons.types";

export interface InputFieldProperties {
  disabled?: boolean;
  id: string;
  max?: number;
  maxLength?: number;
  min?: number;
  onChange?: (value: number | string) => void;
  onKeyDown?: (value: number | string) => void;
  placeholder?: string;
  type: InputFieldTypes;
  value: number | string;
  withIconLeft?: boolean;
}
