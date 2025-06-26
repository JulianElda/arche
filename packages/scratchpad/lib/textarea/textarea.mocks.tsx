import type { TextAreaProperties } from "lib/textarea/textarea.types";

import { textAreaFieldProperties1 } from "lib/textarea-field/textarea-field.mocks";

export const textAreaProperties1: TextAreaProperties = {
  ...textAreaFieldProperties1,
  label: "Textarea text",
};

export const textAreaProperties2: TextAreaProperties = {
  ...textAreaFieldProperties1,
  label: "Textarea number",
};
