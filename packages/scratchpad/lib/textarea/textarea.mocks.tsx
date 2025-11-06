import type { TextAreaProps } from "lib/textarea/textarea.types";

import { textAreaFieldProps1 } from "lib/textarea-field/textarea-field.mocks";

export const textAreaProps1: TextAreaProps = {
  ...textAreaFieldProps1,
  label: "Textarea text",
};

export const textAreaProps2: TextAreaProps = {
  ...textAreaFieldProps1,
  label: "Textarea number",
};
