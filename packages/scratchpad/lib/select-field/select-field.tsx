import type { SelectFieldProperties } from "lib/select-field/select-field.types";

import { clsx } from "clsx";

export function SelectField(properties: SelectFieldProperties) {
  return (
    <select
      className={clsx(
        "form-select focus:ring-primary-300 border-ink-gray text-ink-black dark:bg-slate dark:text-ink-white w-full appearance-none rounded-md border-1 py-2 pr-8 pl-2 focus:ring-1 focus:ring-inset",
        properties.inInputField && "h-full rounded-l-none bg-transparent",
        !properties.inInputField && "block pl-3"
      )}
      data-testid={properties.id}
      id={properties.id}
      name={properties.id}
      onChange={(event) => properties.onChange(event.target.value)}
      value={properties.value}>
      {[...properties.options].map((option) => (
        <option
          key={option.value}
          value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
