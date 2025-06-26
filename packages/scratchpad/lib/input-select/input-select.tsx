import type { InputSelectProperties } from "lib/input-select/input-select.types";

import { InputField } from "lib/input-field/input-field";
import { InputLabel } from "lib/input-label/input-label";
import { SelectField } from "lib/select-field/select-field";

export function InputSelect(properties: InputSelectProperties) {
  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={properties.hideLabel}
        id={properties.inputId}
        label={properties.inputLabel}
      />
      <div className="relative mt-1 rounded-md shadow-xs">
        <InputField
          autofocus={properties.autofocus}
          id={properties.inputId}
          onChange={(value) => properties.onInputChange?.(value)}
          onKeyDown={(value) => properties.onInputKeydown?.(value)}
          type={properties.type}
          value={properties.inputValue}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <InputLabel
            hideLabel={true}
            id={properties.selectId}
            label={properties.selectLabel}
          />
          <SelectField
            id={properties.selectId}
            inInputField={true}
            onChange={(value) => properties.onSelectChange?.(value)}
            options={properties.options}
            value={properties.selectValue}
          />
        </div>
      </div>
    </div>
  );
}
