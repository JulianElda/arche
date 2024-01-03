import { InputLabel } from "../input-label/input-label";

type CheckboxProps = {
  id: string;
  label: string;
  value: boolean;
  hideLabel?: boolean;
  onChange?: (value: boolean) => void;
};

export function Checkbox(props: CheckboxProps) {
  return (
    <div className="w-full">
      <input
        type="checkbox"
        id={props.id}
        name={props.id}
        data-testid={props.id}
        checked={props.value}
        onChange={(event) => props.onChange?.(event.target.checked)}
        className="form-checkbox mr-1
          inline-block rounded-md
          border-0 bg-white p-1
          ring-1 ring-inset ring-gray-300
          focus:border-sky-300 focus:ring-1
          focus:ring-inset focus:ring-sky-300 dark:bg-slate-700
          dark:ring-gray-600"
      />
      <InputLabel
        id={props.id}
        label={props.label}
        hideLabel={!!props.hideLabel}
      />
    </div>
  );
}
