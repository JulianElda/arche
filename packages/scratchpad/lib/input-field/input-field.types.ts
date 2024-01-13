import { InputFieldTypes } from "lib/commons/commons.types";

export type InputFieldProps = {
  id: string;
  type: InputFieldTypes;
  value: string | number;
  autofocus?: boolean;
  onChange?: (value: string) => void;
  onKeyDown?: (key: string) => void;
};
