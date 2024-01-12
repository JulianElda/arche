import { InputField } from "./../input-field/input-field";
import { InputLabel } from "./../input-label/input-label";

type InputProps = {
  id: string;
  type: "text" | "number" | "search";
  label: string;
  value: string | number;
  hideLabel?: boolean;
  onChange?: (value: string) => void;
};

export function Input(props: InputProps) {
  return (
    <div className="flex-1">
      <InputLabel
        id={props.id}
        label={props.label}
        hideLabel={!!props.hideLabel}
      />
      <InputField
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={(value) => props.onChange?.(value)}
      />
    </div>
  );
}
