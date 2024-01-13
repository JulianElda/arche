import { InputLabel } from "../input-label/input-label";
import { CheckboxProps } from "./checkbox.types";

export function Checkbox(props: CheckboxProps) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          type="checkbox"
          id={props.id}
          name={props.id}
          data-testid={props.id}
          checked={props.value}
          onChange={(event) => props.onChange?.(event.target.checked)}
          className="form-checkbox
          inline-block h-4 w-4
          rounded-md border-0 bg-white p-1
          ring-1 ring-inset ring-gray-300
          focus:border-sky-300 focus:ring-1
          focus:ring-inset focus:ring-sky-300 dark:bg-slate-700
          dark:ring-gray-600"
        />
      </div>
      <div className="ml-1 text-sm leading-6">
        <InputLabel
          id={props.id}
          label={props.label}
          hideLabel={!!props.hideLabel}
        />
      </div>
    </div>
  );
}
