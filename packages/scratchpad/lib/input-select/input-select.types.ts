import type { InputFieldTypes, Option } from "lib/commons/commons.types";

export interface InputSelectProps {
  hideLabel?: boolean;
  inputDisabled?: boolean;
  inputId: string;
  inputLabel: string;
  inputMaxLength?: number;
  inputPlaceholder?: string;
  inputValue: number | string;
  onInputChange?: (value: number | string) => void;
  onInputKeydown?: (key: number | string) => void;
  onSelectChange?: (value: string) => void;
  options: Option[];
  selectId: string;
  selectLabel: string;
  selectValue: string;
  type: InputFieldTypes;
}
