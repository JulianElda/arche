import { textAreaFieldProps1 } from "lib/textarea-field/textarea-field.mocks";

import type { TextAreaProps } from "./textarea.types";

export const textAreaProps1: TextAreaProps = {
  ...textAreaFieldProps1,
  label: "Textarea text",
};

export const textAreaProps2: TextAreaProps = {
  ...textAreaFieldProps1,
  label: "Textarea number",
};
