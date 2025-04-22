import {
  selectFieldOptions1,
  selectFieldOptions2,
} from "lib/select-field/select-field.mocks";

export const selectProps1 = {
  id: "select-id-1",
  label: "Select currency",
  value: selectFieldOptions1[0].value,
  options: [...selectFieldOptions1],
  onChange: () => undefined,
};

export const selectProps2 = {
  id: "select-id-2",
  label: "Select currency",
  value: selectFieldOptions1[2].value,
  options: [...selectFieldOptions2],
  onChange: () => undefined,
};
