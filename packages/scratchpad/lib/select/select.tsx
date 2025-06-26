import type { SelectProperties } from "lib/select/select.types";

import { InputLabel } from "lib/input-label/input-label";
import { SelectField } from "lib/select-field/select-field";

export function Select(properties: SelectProperties) {
  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(properties.hideLabel)}
        id={properties.id}
        label={properties.label}
      />
      <div className="mt-1">
        <SelectField
          id={properties.id}
          onChange={properties.onChange}
          options={properties.options}
          value={properties.value}
        />
      </div>
    </div>
  );
}
