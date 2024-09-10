import { isValidNumber } from "lib/commons/commons";
import { InputFieldProps } from "./input-field.types";
import clsx from "clsx";

export function InputField(props: InputFieldProps) {
  const roundingClass =
    props.withIconLeft === true ? "rounded-l-md" : "rounded-md";

  const standardClasses = `form-input block w-full
        border-0 bg-white p-2 px-3 text-gray-900
        ring-1 ring-inset ring-gray-300 focus:border-sky-300 focus:ring-1
        focus:ring-inset focus:ring-sky-300 dark:bg-slate-700
        dark:text-gray-100 dark:ring-gray-600`;

  const onChange = (value: string) => {
    if (!props.onChange) return;

    if (props.type === "number" && isValidNumber(value))
      props.onChange?.(parseInt(value));
    else if (props.type === "text" || props.type === "search")
      props.onChange(value);
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
      className={clsx(roundingClass, standardClasses)}
    />
  );
}
