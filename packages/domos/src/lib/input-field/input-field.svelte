<script lang="ts">
  import type { InputFieldProps } from "./input-field.types.ts";

  const {
    borderless = false,
    withIconLeft = false,
    ...rest
  }: InputFieldProps = $props();
</script>

<input
  {...rest}
  class={[
    "form-input block w-full appearance-none border text-ink-black dark:text-app-text-dark",
    borderless === true
      ? "border-0 bg-transparent p-0 ring-0 outline-none focus:ring-0 focus:outline-none"
      : "border-ink-gray bg-white p-2 px-3 ring-inset focus:border-primary-300 focus:ring-1 focus:ring-primary-300 focus:ring-inset dark:bg-slate",
    withIconLeft === true ? "rounded-l-md" : "rounded-md",
  ]} />

<style>
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
</style>
