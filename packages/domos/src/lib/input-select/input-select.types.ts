export interface InputSelectProps {
  hideLabel?: boolean;
  inputDisabled?: boolean;
  inputId: string;
  inputLabel: string;
  inputPlaceholder?: string;
  inputValue: number | string;
  onInputChange?: (value: number | string) => void;
  onInputKeydown?: (key: number | string) => void;
  onSelectChange?: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  selectId: string;
  selectLabel: string;
  selectValue: string;
  type: "number" | "search" | "text";
}
