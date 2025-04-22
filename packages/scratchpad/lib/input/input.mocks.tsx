import {
  inputFieldProps1,
  inputFieldProps2,
  inputFieldProps3,
} from "lib/input-field/input-field.mocks";
import { InputProps } from "./input.types";

export const inputProps1: InputProps = {
  ...inputFieldProps1,
  label: "Input text",
};

export const inputProps2: InputProps = {
  ...inputFieldProps2,
  label: "Input number",
};

export const inputProps3: InputProps = {
  ...inputFieldProps3,
  label: "Input search",
};
