<script lang="ts">
  import InputField from "$lib/input-field/input-field.svelte";
  import InputLabel from "$lib/input-label/input-label.svelte";
  import SelectField from "$lib/select-field/select-field.svelte";

  import type { InputSelectProps } from "./input-select.types.ts";

  const {
    hideLabel,
    inputDisabled,
    inputId,
    inputLabel,
    inputPlaceholder,
    inputValue,
    onInputChange,
    onInputKeydown,
    onSelectChange,
    options,
    selectId,
    selectLabel,
    selectValue,
    type,
  }: InputSelectProps = $props();
</script>

<div class="flex-1">
  <InputLabel
    {hideLabel}
    id={inputId}
    label={inputLabel} />
  <div class="relative mt-1 rounded-md shadow-xs">
    <InputField
      disabled={inputDisabled}
      id={inputId}
      onChange={(value) => onInputChange?.(value)}
      onKeyDown={(value) => onInputKeydown?.(value)}
      placeholder={inputPlaceholder}
      {type}
      value={inputValue} />
    <div class="absolute inset-y-0 right-0 flex items-center">
      <InputLabel
        hideLabel={true}
        id={selectId}
        label={selectLabel} />
      <SelectField
        id={selectId}
        inInputField={true}
        onChange={(value) => onSelectChange?.(value)}
        {options}
        value={selectValue} />
    </div>
  </div>
</div>
