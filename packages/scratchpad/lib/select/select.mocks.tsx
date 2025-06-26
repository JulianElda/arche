import {
  selectFieldOptions1,
  selectFieldOptions2,
} from "lib/select-field/select-field.mocks";

export const selectProperties1 = {
  id: "select-id-1",
  label: "Select currency",
  onChange: () => {
    console.log();
  },
  options: [...selectFieldOptions1],
  value: selectFieldOptions1[0].value,
};

export const selectProperties2 = {
  id: "select-id-2",
  label: "Select currency",
  onChange: () => {
    console.log();
  },
  options: [...selectFieldOptions2],
  value: selectFieldOptions1[2].value,
};
