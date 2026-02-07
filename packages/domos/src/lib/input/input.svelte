<script lang="ts">
  import InputField from "$lib/input-field/input-field.svelte";
  import InputLabel from "$lib/input-label/input-label.svelte";
  import type { InputProps } from "./input.types.ts";

  const {
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

<div class="flex-1">
  <InputLabel
    {hideLabel}
    {id}
    {label} />
  <div class="mt-1">
    <InputField
      {disabled}
      {id}
      {onChange}
      {onKeyDown}
      {placeholder}
      {type}
      {value} />
  </div>
</div>
