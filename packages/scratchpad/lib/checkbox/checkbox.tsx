import type { CheckboxProps } from "lib/checkbox/checkbox.types";

import { InputLabel } from "lib/input-label/input-label";

export function Checkbox(props: CheckboxProps) {
  const { hideLabel, id, label, onChange, value } = props;

  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          checked={value}
          className="form-checkbox text-primary-500 accent-primary-500 ring-ink-500 focus:border-primary-300 focus:ring-primary-300 dark:bg-ink-500 inline-block size-4 rounded-md border-0 bg-white p-1 ring-1 ring-inset focus:ring-1 focus:ring-inset"
          data-testid={id}
          id={id}
          name={id}
          onChange={(event) => onChange(event.target.checked)}
          type="checkbox"
        />
      </div>
      <div className="ml-1 leading-6">
        <InputLabel
          hideLabel={Boolean(hideLabel)}
          id={id}
          label={label}
        />
      </div>
    </div>
  );
}
