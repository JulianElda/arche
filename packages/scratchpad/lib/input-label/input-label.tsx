import { clsx } from "clsx";

import type { InputLabelProps } from "./input-label.types";

export function InputLabel(props: InputLabelProps) {
  const { hideLabel, id, label, value } = props;

  return (
    <div className="flex">
      <label
        className={clsx(
          // eslint-disable-next-line better-tailwindcss/no-unregistered-classes
          "font-heading mr-auto font-bold",
          hideLabel && "sr-only",
        )}
        htmlFor={id}>
        {label}
      </label>
      {value && <label>{value}</label>}
    </div>
  );
}
