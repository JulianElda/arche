import type { InputSelectProps } from "./input-select.types.ts";

import {
  selectFieldOptions1,
  selectFieldOptions2,
} from "./../select-field/select-field.mocks.ts";

export const inputSelectProps1: InputSelectProps = {
  inputProps: {
    "data-testid": "input-id-1",
    id: "input-id-1",
    label: "Currency amount",
    type: "text",
    value: "100",
  },
  selectProps: {
    "data-testid": "select-id-1",
    id: "select-id-1",
    label: "Currency select",
    options: [...selectFieldOptions1],
    value: selectFieldOptions1[0].value,
  },
};

export const inputSelectProps2: InputSelectProps = {
  inputProps: {
    "data-testid": "input-id-2",
    id: "input-id-2",
    label: "Currency amount",
    type: "text",
    value: "100",
  },
  selectProps: {
    "data-testid": "select-id-2",
    id: "select-id-2",
    label: "Currency select",
    options: [...selectFieldOptions2],
    value: selectFieldOptions2[2].value,
  },
};
