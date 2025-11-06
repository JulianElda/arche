import type { TextAreaFieldProps } from "lib/textarea-field/textarea-field.types";

export function TextAreaField(props: TextAreaFieldProps) {
  const { id, onChange, onKeyDown, value } = props;

  return (
    <textarea
      className={`
        block w-full form-textarea appearance-none rounded-md border-1
        border-ink-gray bg-white p-2 px-3 text-ink-black ring-inset
        focus:border-primary-300 focus:ring-1 focus:ring-primary-300
        focus:ring-inset
        dark:bg-slate-700 dark:text-ink-white
      `}
      data-testid={id}
      id={id}
      name={id}
      onChange={(event) => onChange?.(event.target.value)}
      onKeyDown={(event) => onKeyDown?.(event.key)}
      value={value}
    />
  );
}
