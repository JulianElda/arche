import { clsx } from "clsx";
import { InputLabelProps } from "./input-label.types";

export function InputLabel(props: InputLabelProps) {
  return (
    <label
      htmlFor={props.id}
      className={clsx(
        "font-heading font-semibold",
        props.hideLabel && "sr-only"
      )}>
      {props.label}
    </label>
  );
}
