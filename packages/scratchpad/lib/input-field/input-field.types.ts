import { InputFieldTypes } from "lib/commons/commons.types";

export type InputFieldProps = {
  id: string;
  type: InputFieldTypes;
  value: string | number;
  autofocus?: boolean;
  onChange?: (value: string | number) => void;
  onKeyDown?: (key: string | number) => void;
  withIconLeft?: boolean;
};
