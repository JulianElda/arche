export interface SelectFieldOption {
  label: string;
  value: string;
}

export interface SelectFieldProps {
  id: string;
  inInputField?: boolean;
  onChange: (value: string) => void;
  options: SelectFieldOption[];
  value: string;
}
