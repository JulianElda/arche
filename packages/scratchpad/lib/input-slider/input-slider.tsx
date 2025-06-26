import type { InputSliderProperties } from "lib/input-slider/input-slider.types";

import { InputField } from "lib/input-field/input-field";
import { InputLabel } from "lib/input-label/input-label";

export function InputSlider(properties: InputSliderProperties) {
  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(properties.hideLabel)}
        id={properties.id}
        label={properties.label}
        value={properties.value}
      />
      <div>
        <InputField
          disabled={properties.disabled}
          id={properties.id}
          max={properties.max}
          min={properties.min}
          onChange={(value) => properties.onChange?.(value)}
          type="range"
          value={properties.value}
        />
      </div>
    </div>
  );
}
