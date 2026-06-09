import type { TextAreaProps } from "./textarea.types";

import { textAreaFieldProps1 } from "../textarea-field/textarea-field.mocks";

export const textAreaProps1: TextAreaProps = {
  ...textAreaFieldProps1,
  label: "Textarea text",
};

export const textAreaProps2: TextAreaProps = {
  ...textAreaFieldProps1,
  label: "Textarea number",
};
