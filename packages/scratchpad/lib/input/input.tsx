import { InputField } from "lib/input-field/input-field";
import { InputLabel } from "lib/input-label/input-label";
import { InputProps } from "./input.types";

export function Input(props: InputProps) {
  return (
    <div className="flex-1">
      <InputLabel
        id={props.id}
        label={props.label}
        hideLabel={!!props.hideLabel}
      />
      <div className="mt-1">
        <InputField
          type={props.type}
          id={props.id}
          value={props.value}
          max={props.max}
          min={props.min}
          disabled={props.disabled}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          autofocus={props.autofocus}
          onChange={(value) => props.onChange?.(value)}
          onKeyDown={(value) => props.onKeyDown?.(value)}
        />
      </div>
    </div>
  );
}
