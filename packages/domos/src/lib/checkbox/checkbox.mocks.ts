import type { CheckboxProps } from "./checkbox.types.ts";

export const checkboxProps: CheckboxProps = {
  id: "checkbox-id",
  label: "Checkbox label",
  onChange: () => {
    console.log("");
  },
  value: true,
};
