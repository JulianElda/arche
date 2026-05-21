<script lang="ts">
  import InputField from "$lib/input-field/input-field.svelte";
  import InputLabel from "$lib/input-label/input-label.svelte";

  import type { InputProps } from "./input.types.ts";

  const {
    borderless,
    disabled,
    hideLabel,
    id,
    label,
    onChange,
    onKeyDown,
    placeholder,
    type,
    value,
  }: InputProps = $props();
</script>

<div class="flex flex-1 flex-col gap-1">
  <InputLabel
    {hideLabel}
    {id}
    {label} />
  <InputField
    {borderless}
    {disabled}
    {id}
    {onChange}
    {onKeyDown}
    {placeholder}
    {type}
    {value} />
</div>
