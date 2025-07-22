import type { TextAreaFieldProperties } from "lib/textarea-field/textarea-field.types";

export function TextAreaField(properties: TextAreaFieldProperties) {
  const onChange = (value: string) => {
    if (!properties.onChange) return;

    properties.onChange(value);
  };

  return (
    <textarea
      className={`
        block w-full form-textarea appearance-none rounded-md border-1
        border-ink-gray bg-white p-2 px-3 text-ink-black ring-inset
        focus:border-primary-300 focus:ring-1 focus:ring-primary-300
        focus:ring-inset
        dark:bg-slate-700 dark:text-ink-white
      `}
      data-testid={properties.id}
      id={properties.id}
      name={properties.id}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => properties.onKeyDown?.(event.key)}
      value={properties.value}
    />
  );
}
