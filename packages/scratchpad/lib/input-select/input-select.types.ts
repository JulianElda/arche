import { InputFieldTypes, Option } from "lib/commons/commons.types";

export type InputSelectProps = {
  type: InputFieldTypes;
  inputId: string;
  selectId: string;
  hideLabel?: boolean;
  inputLabel: string;
  selectLabel: string;
  inputValue: string;
  selectValue: string;
  options: Option[];
  autofocus?: boolean;
  onInputChange?: (value: string) => void;
  onInputKeydown?: (key: string) => void;
  onSelectChange?: (value: string) => void;
};
