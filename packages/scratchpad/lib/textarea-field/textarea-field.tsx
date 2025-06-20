import { TextAreaFieldProps } from "lib/textarea-field/textarea-field.types";

export function TextAreaField(props: TextAreaFieldProps) {
  const onChange = (value: string) => {
    if (!props.onChange) return;

    props.onChange(value);
  };

  return (
    <textarea
      id={props.id}
      name={props.id}
      data-testid={props.id}
      value={props.value}
      autoFocus={!!props.autofocus}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => props.onKeyDown?.(event.key)}
      className="form-textarea focus:border-primary-300 focus:ring-primary-300 border-ink-gray text-ink-black dark:text-ink-white block w-full appearance-none rounded-md border-1 bg-white p-2 px-3 ring-inset focus:ring-1 focus:ring-inset dark:bg-slate-700"
    />
  );
}
