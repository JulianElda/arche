import type { InputFieldProps } from "../input-field/input-field.types";

export type TextAreaFieldProps = Omit<InputFieldProps, "type" | "withIconLeft">;
