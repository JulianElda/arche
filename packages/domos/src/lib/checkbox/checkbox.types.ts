import type { HTMLInputAttributes } from "svelte/elements";

export interface CheckboxProps extends HTMLInputAttributes {
  hideLabel?: boolean;
  label: string;
}
