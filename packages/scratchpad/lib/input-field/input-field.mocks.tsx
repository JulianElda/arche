import type { InputFieldTypes } from "lib/commons/commons.types";

import type { InputFieldProperties } from "./input-field.types";

export const inputFieldProperties1: InputFieldProperties = {
  id: "input-id-1",
  type: "text" as InputFieldTypes,
  value: "Input value",
};

export const inputFieldProperties2: InputFieldProperties = {
  id: "input-id-2",
  type: "number" as InputFieldTypes,
  value: 100,
};

export const inputFieldProperties3: InputFieldProperties = {
  id: "input-id-3",
  type: "search" as InputFieldTypes,
  value: "Search query",
};

export const inputFieldProperties4: InputFieldProperties = {
  id: "input-id-4",
  max: 64,
  min: 8,
  type: "number" as InputFieldTypes,
  value: 100,
};

export const inputFieldProperties5: InputFieldProperties = {
  id: "input-id-5",
  max: 64,
  min: 8,
  type: "range" as InputFieldTypes,
  value: 10,
};
