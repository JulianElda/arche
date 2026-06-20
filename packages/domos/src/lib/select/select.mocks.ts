import type { SelectProps } from "./select.types.ts";

import {
  selectFieldProps1,
  selectFieldProps2,
} from "./../select-field/select-field.mocks.ts";

export const selectProps1: SelectProps = {
  ...selectFieldProps1,
  label: "Select currency",
};

export const selectProps2: SelectProps = {
  ...selectFieldProps2,
  label: "Select currency",
};
