import type { InputLabelProperties } from "lib/input-label/input-label.types";

import { clsx } from "clsx";

export function InputLabel(properties: InputLabelProperties) {
  return (
    <div className="flex">
      <label
        className={clsx(
          // eslint-disable-next-line better-tailwindcss/no-unregistered-classes
          "font-heading mr-auto font-bold",
          properties.hideLabel && "sr-only"
        )}
        htmlFor={properties.id}>
        {properties.label}
      </label>
      {properties.value && <label>{properties.value}</label>}
    </div>
  );
}
