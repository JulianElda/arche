import { clsx } from "clsx";
import { isValidNumber } from "lib/commons/commons";
import { InputFieldProps } from "./input-field.types";

export function InputField(props: InputFieldProps) {
  const onChange = (value: string) => {
    if (!props.onChange) return;

    if (props.type === "number") {
      if (value === "") {
        props.onChange?.(value);
      } else if (isValidNumber(value)) {
        props.onChange?.(parseInt(value));
      } else {
        props.onChange?.(0);
      }
    } else if (props.type === "text" || props.type === "search") {
      props.onChange(value);
    }
  };

  return (
    <input
      type={props.type}
      id={props.id}
      name={props.id}
      data-testid={props.id}
      value={props.value}
      autoFocus={!!props.autofocus}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => props.onKeyDown?.(event.key)}
      className={clsx(
        "form-input block w-full appearance-none border-0 bg-white p-2 px-3 text-gray-900 ring-1 ring-gray-300 ring-inset focus:border-sky-300 focus:ring-1 focus:ring-sky-300 focus:ring-inset dark:bg-slate-700 dark:text-gray-100 dark:ring-gray-600",
        props.withIconLeft === true ? "rounded-l-md" : "rounded-md"
      )}
    />
  );
}
