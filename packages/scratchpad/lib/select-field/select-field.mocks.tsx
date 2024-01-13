export const selectFieldOptions1 = [
  {
    value: "EUR",
    label: "Euro",
  },
  {
    value: "GBP",
    label: "British Pound",
  },
  {
    value: "JPY",
    label: "Japanese Yen",
  },
  {
    value: "USD",
    label: "United States Dollar",
  },
];

export const selectFieldOptions2 = [
  {
    value: "EUR",
    label: "EUR",
  },
  {
    value: "GBP",
    label: "GBP",
  },
  {
    value: "JPY",
    label: "JPY",
  },
  {
    value: "USD",
    label: "USD",
  },
];

export const selectFieldProps1 = {
  id: "select-id-1",
  value: selectFieldOptions1[0].value,
  options: [...selectFieldOptions1],
  inInputField: false,
  onChange: () => undefined,
};

export const selectFieldProps2 = {
  id: "select-id-2",
  value: selectFieldOptions2[2].value,
  options: [...selectFieldOptions2],
  inInputField: false,
  onChange: () => undefined,
};
