import {
  textAreaFieldProps1,
  textAreaFieldProps2,
} from "lib/textarea-field/textarea-field.mocks";
import { TextAreaProps } from "lib/textarea/textarea.types";

export const textAreaProps1: TextAreaProps = {
  ...textAreaFieldProps1,
  label: "Textarea text",
};

export const textAreaProps2: TextAreaProps = {
  ...textAreaFieldProps2,
  label: "Textarea number",
};
