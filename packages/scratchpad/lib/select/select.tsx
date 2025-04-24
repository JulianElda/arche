import { InputLabel } from "lib/input-label/input-label";
import { SelectField } from "lib/select-field/select-field";
import { SelectProps } from "lib/select/select.types";

export function Select(props: SelectProps) {
  return (
    <div className="flex-1">
      <InputLabel
        id={props.id}
        label={props.label}
        hideLabel={!!props.hideLabel}
      />
      <div className="mt-1">
        <SelectField
          id={props.id}
          value={props.value}
          options={props.options}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
