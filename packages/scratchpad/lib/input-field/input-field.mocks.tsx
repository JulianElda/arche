import { InputFieldTypes } from "lib/commons/commons.types";
import { InputFieldProps } from "./input-field.types";

export const inputFieldProps1: InputFieldProps = {
  id: "input-id-1",
  type: "text" as InputFieldTypes,
  value: "Input value",
};

export const inputFieldProps2: InputFieldProps = {
  id: "input-id-2",
  type: "number" as InputFieldTypes,
  value: 100,
};

export const inputFieldProps3: InputFieldProps = {
  id: "input-id-3",
  type: "search" as InputFieldTypes,
  value: "Search query",
};
