import type { Component } from "svelte";

import type { InputFieldProps } from "./../input-field/input-field.types.ts";
import type { InputLabelProps } from "./../input-label/input-label.types.ts";

export type InputButtonProps = IconButtonProps &
  InputFieldProps &
  InputLabelProps;

interface IconButtonProps {
  buttonAriaLabel: string;
  icon?: Component;
  onButtonClick: () => void;
}
