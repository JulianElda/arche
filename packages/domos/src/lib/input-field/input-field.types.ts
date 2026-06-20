import type { HTMLInputAttributes } from "svelte/elements";

export interface InputFieldProps extends HTMLInputAttributes {
  borderless?: boolean;
  id: string;
  withIconLeft?: boolean;
}

export type InputFieldTypes = "number" | "range" | "search" | "text";
