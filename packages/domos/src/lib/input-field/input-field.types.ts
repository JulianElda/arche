export interface InputFieldProps {
  disabled?: boolean;
  id: string;
  onChange?: (value: number | string) => void;
  onKeyDown?: (value: number | string) => void;
  placeholder?: string;
  type: "number" | "search" | "text";
  value: number | string;
  withIconLeft?: boolean;
}
