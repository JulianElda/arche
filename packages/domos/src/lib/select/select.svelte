<script lang="ts">
  import InputLabel from "$lib/input-label/input-label.svelte";
  import SelectField from "$lib/select-field/select-field.svelte";
  import { clsx } from "clsx";
  import { twMerge } from "tailwind-merge";

  import type { SelectProps } from "./select.types.ts";

  const {
    class: className,
    hideLabel,
    id,
    label,
    ...rest
  }: SelectProps = $props();
</script>

<div class={twMerge("flex flex-1 flex-col gap-1", clsx(className))}>
  <InputLabel
    {hideLabel}
    {id}
    {label} />
  <SelectField
    {id}
    {...rest} />
</div>
