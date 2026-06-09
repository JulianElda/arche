import { InputField } from "lib/input-field/input-field";
import { InputLabel } from "lib/input-label/input-label";

import type { InputSliderProps } from "./input-slider.types";

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
          onChange={onChange}
          type="range"
          value={value}
        />
      </div>
    </div>
  );
}
