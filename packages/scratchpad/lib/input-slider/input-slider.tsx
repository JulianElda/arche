import type { InputSliderProps } from "lib/input-slider/input-slider.types";

import { InputField } from "lib/input-field/input-field";
import { InputLabel } from "lib/input-label/input-label";

export function InputSlider(props: InputSliderProps) {
  const { disabled, hideLabel, id, label, max, min, onChange, value } = props;

  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(hideLabel)}
        id={id}
        label={label}
        value={value}
      />
      <div>
        <InputField
          disabled={disabled}
          id={id}
          max={max}
          min={min}
          onChange={(value) => onChange?.(value)}
          type="range"
          value={value}
        />
      </div>
    </div>
  );
}
