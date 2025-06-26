import type { InputFieldProperties } from "lib/input-field/input-field.types";

export type TextAreaFieldProperties = Omit<
  InputFieldProperties,
  "type" | "withIconLeft"
>;
