import { SelectFieldProps } from "./select-field.types";

export function SelectField(props: SelectFieldProps) {
  let baseClass = `
    form-select rounded-md border-0 w-full 
    py-2 pl-2 pr-8 
    focus:ring-1 focus:ring-inset 
    focus:ring-sky-300 
  `;

  if (props.inInputField)
    baseClass += `
      h-full bg-transparent text-gray-600 dark:text-gray-300
    `;
  else
    baseClass += `
      block pl-3 bg-white dark:bg-slate-700
      text-gray-900 dark:text-gray-100
      ring-1 ring-inset ring-gray-300 dark:ring-gray-600
    `;

  return (
    <select
      id={props.id}
      name={props.id}
      data-testid={props.id}
      value={props.value}
      className={baseClass}
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
