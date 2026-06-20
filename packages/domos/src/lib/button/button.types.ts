import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export interface ButtonProps extends HTMLButtonAttributes {
  children?: Snippet;
  variant?: "primary" | "secondary";
}
