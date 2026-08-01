import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}
