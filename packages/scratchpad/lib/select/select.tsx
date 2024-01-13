import { InputLabel } from "./../input-label/input-label";
import { SelectField } from "./../select-field/select-field";

type SelectProps = {
  id: string;
  label: string;
  hideLabel?: boolean;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
};

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
