import type { SelectFieldProps } from "lib/select-field/select-field.types";

import { clsx } from "clsx";

export function SelectField(props: SelectFieldProps) {
  const { id, inInputField, onChange, options, value } = props;

  return (
    <select
      className={clsx(
        `
          w-full form-select appearance-none rounded-md border-1 border-ink-gray
          py-2 pr-8 pl-2 text-ink-black
          focus:ring-1 focus:ring-primary-300 focus:ring-inset
          dark:bg-slate dark:text-ink-white
        `,
        inInputField && "h-full rounded-l-none bg-transparent",
        !inInputField && "block pl-3"
      )}
      data-testid={id}
      id={id}
      name={id}
      onChange={(event) => onChange(event.target.value)}
      value={value}>
      {[...options].map((option) => (
        <option
          key={option.value}
          value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
