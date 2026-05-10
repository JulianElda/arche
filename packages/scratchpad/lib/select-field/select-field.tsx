import type { SelectFieldProps } from "lib/select-field/select-field.types";

import { clsx } from "clsx";

export function SelectField(props: SelectFieldProps) {
  const { id, inInputField, onChange, options, value } = props;

  return (
    <select
      className={clsx(
        `form-select border-ink-gray text-ink-black focus:ring-primary-300 dark:bg-slate dark:text-ink-white w-full appearance-none rounded-md border py-2 pr-8 pl-2 focus:ring-1 focus:ring-inset`,
        inInputField && "h-full rounded-l-none bg-transparent",
        !inInputField && "block pl-3",
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
