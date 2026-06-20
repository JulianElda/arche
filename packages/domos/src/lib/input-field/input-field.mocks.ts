import type { InputFieldProps, InputFieldTypes } from "./input-field.types.ts";

export const inputFieldProps1: InputFieldProps = {
  "data-testid": "input-id-1",
  id: "input-id-1",
  type: "text" as InputFieldTypes,
  value: "Input value",
};

export const inputFieldProps2: InputFieldProps = {
  "data-testid": "input-id-2",
  id: "input-id-2",
  type: "number" as InputFieldTypes,
  value: 100,
};

export const inputFieldProps3: InputFieldProps = {
  "data-testid": "input-id-3",
  id: "input-id-3",
  type: "search" as InputFieldTypes,
  value: "Search query",
};

export const inputFieldProps4: InputFieldProps = {
  "data-testid": "input-id-4",
  id: "input-id-4",
  type: "number" as InputFieldTypes,
  value: 100,
};

export const inputFieldProps5: InputFieldProps = {
  "data-testid": "input-id-5",
  id: "input-id-5",
  type: "range" as InputFieldTypes,
  value: 10,
};
