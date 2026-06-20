import type { Component } from "svelte";

import type { InputFieldProps } from "./../input-field/input-field.types.ts";

export interface InputButtonProps extends InputFieldProps {
  buttonAriaLabel: string;
  hideLabel?: boolean;
  icon?: Component;
  id: string;
  label: string;
  onButtonClick: () => void;
}
