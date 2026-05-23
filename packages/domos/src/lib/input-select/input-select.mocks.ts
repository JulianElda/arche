import type { InputFieldTypes } from "./../input-field/input-field.types.ts";
import type { InputSelectProps } from "./input-select.types.ts";

import {
  selectFieldOptions1,
  selectFieldOptions2,
} from "./../select-field/select-field.mocks.ts";

export const inputSelectProps1: InputSelectProps = {
  inputId: "input-id-1",
  inputLabel: "Currency amount",
  inputValue: "100",
  options: [...selectFieldOptions1],
  selectId: "select-id-1",
  selectLabel: "Currency select",
  selectValue: selectFieldOptions1[0].value,
  type: "text" as InputFieldTypes,
};

export const inputSelectProps2: InputSelectProps = {
  inputId: "input-id-2",
  inputLabel: "Currency amount",
  inputValue: "100",
  options: [...selectFieldOptions2],
  selectId: "select-id-2",
  selectLabel: "Currency select",
  selectValue: selectFieldOptions2[2].value,
  type: "text" as InputFieldTypes,
};
