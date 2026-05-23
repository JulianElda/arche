import type {
  SelectFieldOption,
  SelectFieldProps,
} from "./select-field.types.ts";

export const selectFieldOptions1: SelectFieldOption[] = [
  {
    label: "Euro",
    value: "EUR",
  },
  {
    label: "British Pound",
    value: "GBP",
  },
  {
    label: "Japanese Yen",
    value: "JPY",
  },
  {
    label: "United States Dollar",
    value: "USD",
  },
];

export const selectFieldOptions2: SelectFieldOption[] = [
  {
    label: "EUR",
    value: "EUR",
  },
  {
    label: "GBP",
    value: "GBP",
  },
  {
    label: "JPY",
    value: "JPY",
  },
  {
    label: "USD",
    value: "USD",
  },
];

export const selectFieldProps1: SelectFieldProps = {
  id: "select-id-1",
  inInputField: false,
  onChange: () => {},
  options: [...selectFieldOptions1],
  value: selectFieldOptions1[0].value,
};

export const selectFieldProps2: SelectFieldProps = {
  id: "select-id-2",
  inInputField: false,
  onChange: () => {},
  options: [...selectFieldOptions2],
  value: selectFieldOptions2[2].value,
};
