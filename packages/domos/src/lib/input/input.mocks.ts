import type { InputProps } from "./input.types.ts";

import {
  inputFieldProps1,
  inputFieldProps2,
  inputFieldProps3,
  inputFieldProps4,
} from "./../input-field/input-field.mocks.ts";

export const inputProps1: InputProps = {
  ...inputFieldProps1,
  label: "Input text",
  placeholder: "Placeholder",
};

export const inputProps2: InputProps = {
  ...inputFieldProps2,
  label: "Input number",
};

export const inputProps3: InputProps = {
  ...inputFieldProps3,
  label: "Input search",
};

export const inputProps4: InputProps = {
  ...inputFieldProps4,
  label: "Input number with limit",
};
