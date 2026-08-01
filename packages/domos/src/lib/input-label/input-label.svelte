<script lang="ts">
  import { clsx } from "clsx";
  import { twMerge } from "tailwind-merge";

  import type { InputLabelProps } from "./input-label.types.ts";

  const {
    class: className,
    hideLabel = false,
    id,
    label,
    value = "",
    ...rest
  }: InputLabelProps = $props();
</script>

<label
  {...rest}
  class={twMerge(
    "font-heading mr-auto font-bold",
    hideLabel && "sr-only",
    clsx(className),
  )}
  for={id}>
  {label}
  {#if value !== ""}
    <span class="sr-only">{value}</span>
  {/if}
</label>
