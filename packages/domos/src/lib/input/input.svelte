<script lang="ts">
  import InputField from "$lib/input-field/input-field.svelte";
  import InputLabel from "$lib/input-label/input-label.svelte";
  import { clsx } from "clsx";
  import { twMerge } from "tailwind-merge";

  import type { InputProps } from "./input.types.ts";

  const {
    class: className,
    hideLabel,
    id,
    label,
    ...rest
  }: InputProps = $props();
</script>

<div class={twMerge("flex flex-1 flex-col gap-1", clsx(className))}>
  <InputLabel
    {hideLabel}
    {id}
    {label} />
  <InputField
    {id}
    {...rest} />
</div>
