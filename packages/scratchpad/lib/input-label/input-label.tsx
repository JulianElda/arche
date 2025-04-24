import { clsx } from "clsx";
import { InputLabelProps } from "./input-label.types";

export function InputLabel(props: InputLabelProps) {
  return (
    <div className="flex">
      <label
        htmlFor={props.id}
        className={clsx(
          "font-heading mr-auto font-semibold",
          props.hideLabel && "sr-only"
        )}>
        {props.label}
      </label>
      {props.value && <label>{props.value}</label>}
    </div>
  );
}
