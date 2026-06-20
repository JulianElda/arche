<script lang="ts">
  import InputField from "$lib/input-field/input-field.svelte";
  import InputLabel from "$lib/input-label/input-label.svelte";
  import SelectField from "$lib/select-field/select-field.svelte";

  import type { InputSelectProps } from "./input-select.types.ts";

  const { hideLabel, inputProps, selectProps }: InputSelectProps = $props();

  const inputFieldProps = $derived.by(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label: _label, ...rest } = inputProps;
    return rest;
  });

  const selectFieldProps = $derived.by(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { label: _label, ...rest } = selectProps;
    return rest;
  });
</script>

<div class="flex flex-1 flex-col gap-1">
  <InputLabel
    {hideLabel}
    id={inputProps.id}
    label={inputProps.label} />
  <div class="relative rounded-md shadow-xs">
    <InputField {...inputFieldProps} />
    <div class="absolute inset-y-0 right-0 flex items-center">
      <InputLabel
        hideLabel={true}
        id={selectProps.id}
        label={selectProps.label} />
      <SelectField
        {...selectFieldProps}
        inInputField={true} />
    </div>
  </div>
</div>
