import type { HTMLInputAttributes } from "svelte/elements";

export interface CheckboxProps extends HTMLInputAttributes {
  hideLabel?: boolean;
  id: string;
  label: string;
}
