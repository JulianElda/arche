import type { InputFieldProps } from "lib/input-field/input-field.types";

import { clsx } from "clsx";

export function InputField(props: InputFieldProps) {
  const {
    disabled,
    id,
    max,
    maxLength,
    min,
    onChange,
    onKeyDown,
    placeholder,
    type,
    value,
    withIconLeft,
  } = props;

  return (
    <input
      className={clsx(
        type === "range"
          ? "h-2 w-full rounded-md bg-ink-gray accent-primary-500"
          : `
            form-input block w-full appearance-none border-1 border-ink-gray
            bg-white p-2 px-3 text-ink-black ring-inset
            focus:border-primary-300 focus:ring-1 focus:ring-primary-300
            focus:ring-inset
            dark:bg-slate dark:text-app-text-dark
          `,
        withIconLeft === true ? "rounded-l-md" : "rounded-md"
      )}
      data-testid={id}
      disabled={disabled === true}
      id={id}
      max={type === "number" || type === "range" ? max : undefined}
      maxLength={maxLength ?? undefined}
      min={type === "number" || type === "range" ? min : undefined}
      name={id}
      onChange={(event) => onChange?.(event.target.value)}
      onKeyDown={(event) => onKeyDown?.(event.key)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}
