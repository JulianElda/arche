import { InputFieldTypes, Option } from "lib/commons/commons.types";

export type InputSelectProps = {
  type: InputFieldTypes;
  inputId: string;
  selectId: string;
  hideLabel?: boolean;
  inputLabel: string;
  selectLabel: string;
  inputValue: string | number;
  selectValue: string;
  options: Option[];
  autofocus?: boolean;
  onInputChange?: (value: string | number) => void;
  onInputKeydown?: (key: string | number) => void;
  onSelectChange?: (value: string) => void;
};
