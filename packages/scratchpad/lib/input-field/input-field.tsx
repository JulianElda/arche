type InputFieldProps = {
  id: string;
  type: "text" | "number" | "search";
  value: string | number;
  autofocus?: boolean;
  onChange: (value: string) => void;
  onKeyDown?: (key: string) => void;
};

export function InputField(props: InputFieldProps) {
  return (
    <input
      type={props.type}
      id={props.id}
      name={props.id}
      data-testid={props.id}
      value={props.value}
      autoFocus={!!props.autofocus}
      onChange={(event) => props.onChange(event.target.value)}
      onKeyDown={(event) => props.onKeyDown?.(event.key)}
      className="form-input block w-full
        rounded-md border-0 bg-white p-2 px-3 text-gray-900
        ring-1 ring-inset ring-gray-300 focus:border-sky-300 focus:ring-1
        focus:ring-inset focus:ring-sky-300 dark:bg-slate-700
        dark:text-gray-100 dark:ring-gray-600"
    />
  );
}
