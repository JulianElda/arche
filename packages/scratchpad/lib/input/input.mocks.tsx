import {
  inputFieldProperties1,
  inputFieldProperties2,
  inputFieldProperties3,
  inputFieldProperties4,
} from "lib/input-field/input-field.mocks";

import type { InputProperties } from "./input.types";

export const inputProperties1: InputProperties = {
  ...inputFieldProperties1,
  label: "Input text",
};

export const inputProperties2: InputProperties = {
  ...inputFieldProperties2,
  label: "Input number",
};

export const inputProperties3: InputProperties = {
  ...inputFieldProperties3,
  label: "Input search",
};

export const inputProperties4: InputProperties = {
  ...inputFieldProperties4,
  label: "Input number with limit",
};
