import type { InputLabelProperties } from "lib/input-label/input-label.types";

import { clsx } from "clsx";

export function InputLabel(properties: InputLabelProperties) {
  return (
    <div className="flex">
      <label
        className={clsx(
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
