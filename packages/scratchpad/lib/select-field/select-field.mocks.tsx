export const selectFieldOptions1 = [
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

export const selectFieldOptions2 = [
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

export const selectFieldProps1 = {
  id: "select-id-1",
  inInputField: false,
  onChange: () => {
    console.log();
  },
  options: [...selectFieldOptions1],
  value: selectFieldOptions1[0].value,
};

export const selectFieldProps2 = {
  id: "select-id-2",
  inInputField: false,
  onChange: () => {
    console.log();
  },
  options: [...selectFieldOptions2],
  value: selectFieldOptions2[2].value,
};
