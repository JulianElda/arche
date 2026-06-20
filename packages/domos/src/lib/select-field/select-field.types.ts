import type { HTMLSelectAttributes } from "svelte/elements";

export interface SelectFieldOption {
  label: string;
  value: string;
}

export interface SelectFieldProps extends HTMLSelectAttributes {
  borderless?: boolean;
  id: string;
  inInputField?: boolean;
  options: SelectFieldOption[];
}
