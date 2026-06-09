import { InputLabel } from "lib/input-label/input-label";
import { SelectField } from "lib/select-field/select-field";

import type { SelectProps } from "./select.types";

export function Select(props: SelectProps) {
  const { hideLabel, id, label, onChange, options, value } = props;

  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(hideLabel)}
        id={id}
        label={label}
      />
      <div className="mt-1">
        <SelectField
          id={id}
          onChange={onChange}
          options={options}
          value={value}
        />
      </div>
    </div>
  );
}
