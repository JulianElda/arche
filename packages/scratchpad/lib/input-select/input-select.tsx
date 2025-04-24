import { InputField } from "lib/input-field/input-field";
import { InputLabel } from "lib/input-label/input-label";
import { InputSelectProps } from "lib/input-select/input-select.types";
import { SelectField } from "lib/select-field/select-field";

export function InputSelect(props: InputSelectProps) {
  return (
    <div className="flex-1">
      <InputLabel
        id={props.inputId}
        label={props.inputLabel}
        hideLabel={props.hideLabel}
      />
      <div className="relative mt-1 rounded-md shadow-xs">
        <InputField
          id={props.inputId}
          type={props.type}
          value={props.inputValue}
          autofocus={props.autofocus}
          onChange={(value) => props.onInputChange?.(value)}
          onKeyDown={(value) => props.onInputKeydown?.(value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <InputLabel
            id={props.selectId}
            label={props.selectLabel}
            hideLabel={true}
          />
          <SelectField
            inInputField={true}
            id={props.selectId}
            value={props.selectValue}
            options={props.options}
            onChange={(value) => props.onSelectChange?.(value)}
          />
        </div>
      </div>
    </div>
  );
}
