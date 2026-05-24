<script lang="ts">
  import InputLabel from "$lib/input-label/input-label.svelte";
  import SelectField from "$lib/select-field/select-field.svelte";

  import type { SelectProps } from "./select.types.ts";

  const {
    borderless,
    hideLabel,
    id,
    label,
    onChange,
    options,
    value,
  }: SelectProps = $props();
</script>

<div class="flex flex-1 flex-col gap-1">
  <InputLabel
    {hideLabel}
    {id}
    {label} />
  <SelectField
    {borderless}
    {id}
    {onChange}
    {options}
    {value} />
</div>
