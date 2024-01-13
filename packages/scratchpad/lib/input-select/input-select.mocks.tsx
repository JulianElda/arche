import {
  selectFieldOptions1,
  selectFieldOptions2,
} from "./../select-field/select-field.mocks";

type InputFieldTypes = "text" | "number" | "search";

export const inputSelectProps1 = {
  type: "text" as InputFieldTypes,
  inputId: "input-id-1",
  selectId: "select-id-1",
  inputLabel: "Currency amount",
  selectLabel: "Currency select",
  inputValue: "100",
  selectValue: selectFieldOptions1[0].value,
  options: [...selectFieldOptions1],
};

export const inputSelectProps2 = {
  type: "text" as InputFieldTypes,
  inputId: "input-id-2",
  selectId: "select-id-2",
  inputLabel: "Currency amount",
  selectLabel: "Currency select",
  inputValue: "100",
  selectValue: selectFieldOptions2[2].value,
  options: [...selectFieldOptions2],
};
