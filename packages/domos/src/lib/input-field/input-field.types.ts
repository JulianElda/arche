export interface InputFieldProps {
  borderless?: boolean;
  disabled?: boolean;
  id: string;
  onChange?: (value: string) => void;
  onKeyDown?: (value: string) => void;
  placeholder?: string;
  type: InputFieldTypes;
  value: number | string;
  withIconLeft?: boolean;
}

export type InputFieldTypes = "number" | "range" | "search" | "text";
