import { clsx } from "clsx";
import { isValidNumber } from "lib/commons/commons";
import { InputFieldProps } from "lib/input-field/input-field.types";

export function InputField(props: InputFieldProps) {
  const onChange = (value: string) => {
    if (!props.onChange) return;

    if (props.type === "number") {
      if (value === "") {
        props.onChange(value);
      } else if (isValidNumber(value)) {
        const nextValue = parseFloat(value);
        if (
          props.max &&
          props.min &&
          nextValue < props.max &&
          props.min < nextValue
        ) {
          props.onChange(nextValue);
        } else if (props.max && nextValue < props.max) {
          props.onChange(nextValue);
        } else if (props.min && props.min < nextValue) {
          props.onChange(nextValue);
        } else {
          props.onChange(nextValue);
        }
      } else {
        props.onChange(0);
      }
    } else if (
      props.type === "text" ||
      props.type === "search" ||
      props.type === "range"
    ) {
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
      max={
        props.type === "number" || props.type === "range"
          ? props.max
          : undefined
      }
      min={
        props.type === "number" || props.type === "range"
          ? props.min
          : undefined
      }
      maxLength={props.maxLength ?? undefined}
      disabled={props.disabled === true}
      placeholder={props.placeholder}
      autoFocus={!!props.autofocus}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => props.onKeyDown?.(event.key)}
      className={clsx(
        props.type === "range"
          ? "h-2 w-full rounded-md bg-gray-500 accent-sky-500"
          : "form-input block w-full appearance-none border-1 border-gray-400 bg-white p-2 px-3 text-gray-900 ring-inset focus:border-sky-300 focus:ring-1 focus:ring-sky-300 focus:ring-inset dark:bg-slate-700 dark:text-gray-100",
        props.withIconLeft === true ? "rounded-l-md" : "rounded-md"
      )}
    />
  );
}
