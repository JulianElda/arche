import type { InputFieldProperties } from "lib/input-field/input-field.types";

import { clsx } from "clsx";

export function InputField(properties: InputFieldProperties) {
  return (
    <input
      className={clsx(
        properties.type === "range"
          ? "h-2 w-full rounded-md bg-ink-gray accent-primary-500"
          : `
            form-input block w-full appearance-none border-1 border-ink-gray
            bg-white p-2 px-3 text-ink-black ring-inset
            focus:border-primary-300 focus:ring-1 focus:ring-primary-300
            focus:ring-inset
            dark:bg-slate dark:text-app-text-dark
          `,
        properties.withIconLeft === true ? "rounded-l-md" : "rounded-md"
      )}
      data-testid={properties.id}
      disabled={properties.disabled === true}
      id={properties.id}
      max={
        properties.type === "number" || properties.type === "range"
          ? properties.max
          : undefined
      }
      maxLength={properties.maxLength ?? undefined}
      min={
        properties.type === "number" || properties.type === "range"
          ? properties.min
          : undefined
      }
      name={properties.id}
      onChange={(event) => properties.onChange?.(event.target.value)}
      onKeyDown={(event) => properties.onKeyDown?.(event.key)}
      placeholder={properties.placeholder}
      type={properties.type}
      value={properties.value}
    />
  );
}
