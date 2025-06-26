import type { TextAreaFieldProperties } from "lib/textarea-field/textarea-field.types";

export function TextAreaField(properties: TextAreaFieldProperties) {
  const onChange = (value: string) => {
    if (!properties.onChange) return;

    properties.onChange(value);
  };

  return (
    <textarea
      autoFocus={Boolean(properties.autofocus)}
      className="form-textarea focus:border-primary-300 focus:ring-primary-300 border-ink-gray text-ink-black dark:text-ink-white block w-full appearance-none rounded-md border-1 bg-white p-2 px-3 ring-inset focus:ring-1 focus:ring-inset dark:bg-slate-700"
      data-testid={properties.id}
      id={properties.id}
      name={properties.id}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => properties.onKeyDown?.(event.key)}
      value={properties.value}
    />
  );
}
