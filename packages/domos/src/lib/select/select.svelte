<script lang="ts">
  import InputLabel from "$lib/input-label/input-label.svelte";
  import SelectField from "$lib/select-field/select-field.svelte";

  import type { SelectProps } from "./select.types.ts";

  const { hideLabel, id, label, onChange, options, value }: SelectProps =
    $props();
</script>

<div class="flex-1">
  <InputLabel
    {hideLabel}
    {id}
    {label} />
  <div class="mt-1">
    <SelectField
      {id}
      {onChange}
      {options}
      {value} />
  </div>
</div>
