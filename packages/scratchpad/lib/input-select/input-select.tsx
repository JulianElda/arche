import type { InputSelectProps } from "./input-select.types";

import { InputField } from "../input-field/input-field";
import { InputLabel } from "../input-label/input-label";
import { SelectField } from "../select-field/select-field";

export function InputSelect(props: InputSelectProps) {
  const {
    hideLabel,
    inputDisabled,
    inputId,
    inputLabel,
    inputMaxLength,
    inputPlaceholder,
    inputValue,
    onInputChange,
    onInputKeydown,
    onSelectChange,
    options,
    selectId,
    selectLabel,
    selectValue,
    type,
  } = props;

  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={hideLabel}
        id={inputId}
        label={inputLabel}
      />
      <div className="relative mt-1 rounded-md shadow-xs">
        <InputField
          disabled={inputDisabled}
          id={inputId}
          maxLength={inputMaxLength}
          onChange={onInputChange}
          onKeyDown={onInputKeydown}
          placeholder={inputPlaceholder}
          type={type}
          value={inputValue}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <InputLabel
            hideLabel={true}
            id={selectId}
            label={selectLabel}
          />
          <SelectField
            id={selectId}
            inInputField={true}
            onChange={(value) => onSelectChange?.(value)}
            options={options}
            value={selectValue}
          />
        </div>
      </div>
    </div>
  );
}
