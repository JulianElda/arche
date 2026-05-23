import type { InputFieldTypes } from "./../input-field/input-field.types.ts";
import type { SelectFieldOption } from "./../select-field/select-field.types.ts";

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
  options: SelectFieldOption[];
  selectId: string;
  selectLabel: string;
  selectValue: string;
  type: InputFieldTypes;
}
