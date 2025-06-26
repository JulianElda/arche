import type { InputFieldTypes } from "lib/commons/commons.types";

import {
  selectFieldOptions1,
  selectFieldOptions2,
} from "lib/select-field/select-field.mocks";

import type { InputSelectProperties } from "./input-select.types";

export const inputSelectProperties1: InputSelectProperties = {
  inputId: "input-id-1",
  inputLabel: "Currency amount",
  inputValue: "100",
  options: [...selectFieldOptions1],
  selectId: "select-id-1",
  selectLabel: "Currency select",
  selectValue: selectFieldOptions1[0].value,
  type: "text" as InputFieldTypes,
};

export const inputSelectProperties2: InputSelectProperties = {
  inputId: "input-id-2",
  inputLabel: "Currency amount",
  inputValue: "100",
  options: [...selectFieldOptions2],
  selectId: "select-id-2",
  selectLabel: "Currency select",
  selectValue: selectFieldOptions2[2].value,
  type: "text" as InputFieldTypes,
};
