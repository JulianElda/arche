import type { InputProps } from "lib/input/input.types";

import { InputField } from "lib/input-field/input-field";
import { InputLabel } from "lib/input-label/input-label";

export function Input(props: InputProps) {
  const {
    disabled,
    hideLabel,
    id,
    label,
    max,
    maxLength,
    min,
    onChange,
    onKeyDown,
    placeholder,
    type,
    value,
  } = props;

  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(hideLabel)}
        id={id}
        label={label}
      />
      <div className="mt-1">
        <InputField
          disabled={disabled}
          id={id}
          max={max}
          maxLength={maxLength}
          min={min}
          onChange={(value) => onChange?.(value)}
          onKeyDown={(value) => onKeyDown?.(value)}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </div>
    </div>
  );
}
