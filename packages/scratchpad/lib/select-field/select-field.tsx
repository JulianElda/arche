import { clsx } from "clsx";
import { SelectFieldProps } from "./select-field.types";

export function SelectField(props: SelectFieldProps) {
  return (
    <select
      id={props.id}
      name={props.id}
      data-testid={props.id}
      value={props.value}
      className={clsx(
        "form-select w-full appearance-none rounded-md border-0 py-2 pr-8 pl-2 text-gray-900 focus:ring-1 focus:ring-sky-300 focus:ring-inset dark:bg-slate-700 dark:text-gray-100",
        props.inInputField && "h-full bg-transparent",
        !props.inInputField &&
          "block bg-white pl-3 ring-1 ring-gray-300 ring-inset dark:ring-gray-600"
      )}
      onChange={(event) => props.onChange(event.target.value)}>
      {props.options.slice().map((option) => (
        <option
          value={option.value}
          key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
