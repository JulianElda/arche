import type { TextAreaFieldProps } from "lib/textarea-field/textarea-field.types";

export function TextAreaField(props: TextAreaFieldProps) {
  const { id, onChange, onKeyDown, value } = props;

  return (
    <textarea
      className="form-textarea border-ink-gray text-ink-black focus:border-primary-300 focus:ring-primary-300 dark:text-ink-white block w-full appearance-none rounded-md border bg-white p-2 px-3 ring-inset focus:ring-1 focus:ring-inset dark:bg-slate-700"
      data-testid={id}
      id={id}
      name={id}
      onChange={(event) => onChange?.(event.target.value)}
      onKeyDown={(event) => onKeyDown?.(event.key)}
      value={value}
    />
  );
}
