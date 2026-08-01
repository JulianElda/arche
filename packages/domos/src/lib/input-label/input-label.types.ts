import type { HTMLLabelAttributes } from "svelte/elements";

export interface InputLabelProps extends HTMLLabelAttributes {
  hideLabel?: boolean;
  id: string;
  label: string;
  value?: number | string;
}
