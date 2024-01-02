type SelectFieldProps = {
  id: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
};

export function SelectField(props: SelectFieldProps) {
  return (
    <select
      id={props.id}
      name={props.id}
      data-testid={props.id}
      value={props.value}
      className="h-full rounded-md border-0 bg-transparent
        py-0 pl-2 pr-8 text-gray-600
        focus:ring-1 focus:ring-inset
      focus:ring-sky-300 dark:text-gray-300"
      onChange={(event) => props.onChange(event.target.value)}>
      {props.options.slice().map((option) => (
        <option
          value={option.value}
          key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
