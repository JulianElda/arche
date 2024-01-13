import { InputField } from "./../input-field/input-field";
import { InputLabel } from "./../input-label/input-label";
import { SelectField } from "./../select-field/select-field";

type InputSelectProps = {
  type: "text" | "number" | "search";
  inputId: string;
  selectId: string;
  hideLabel?: boolean;
  inputLabel: string;
  selectLabel: string;
  inputValue: string | number;
  selectValue: string;
  options: {
    value: string;
    label: string;
  }[];
  onInputChange?: (value: string) => void;
  onSelectChange?: (value: string) => void;
};

export function InputSelect(props: InputSelectProps) {
  return (
    <div className="flex-1">
      <InputLabel
        id={props.inputId}
        label={props.inputLabel}
        hideLabel={props.hideLabel}
      />
      <div className="relative mt-1 rounded-md shadow-sm">
        <InputField
          id={props.inputId}
          type={props.type}
          value={props.inputValue}
          onChange={(value) => props.onInputChange?.(value)}
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
