import { CheckboxProps } from "lib/checkbox/checkbox.types";
import { InputLabel } from "lib/input-label/input-label";

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
          onChange={(event) => props.onChange(event.target.checked)}
          className="form-checkbox focus:border-primary-300 focus:ring-primary-300 ring-ink-500 accent-primary-500 text-primary-500 dark:bg-ink-500 inline-block size-4 rounded-md border-0 bg-white p-1 ring-1 ring-inset focus:ring-1 focus:ring-inset"
        />
      </div>
      <div className="ml-1 leading-6">
        <InputLabel
          id={props.id}
          label={props.label}
          hideLabel={!!props.hideLabel}
        />
      </div>
    </div>
  );
}
