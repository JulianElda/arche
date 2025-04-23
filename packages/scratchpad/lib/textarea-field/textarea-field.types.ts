import { InputFieldProps } from "lib/input-field/input-field.types";

export type TextAreaFieldProps = Omit<InputFieldProps, "type" | "withIconLeft">;
