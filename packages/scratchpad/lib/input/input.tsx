import type { InputProperties } from "lib/input/input.types";

import { InputField } from "lib/input-field/input-field";
import { InputLabel } from "lib/input-label/input-label";

export function Input(properties: InputProperties) {
  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(properties.hideLabel)}
        id={properties.id}
        label={properties.label}
      />
      <div className="mt-1">
        <InputField
          autofocus={properties.autofocus}
          disabled={properties.disabled}
          id={properties.id}
          max={properties.max}
          maxLength={properties.maxLength}
          min={properties.min}
          onChange={(value) => properties.onChange?.(value)}
          onKeyDown={(value) => properties.onKeyDown?.(value)}
          placeholder={properties.placeholder}
          type={properties.type}
          value={properties.value}
        />
      </div>
    </div>
  );
}
