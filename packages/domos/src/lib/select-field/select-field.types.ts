export interface SelectFieldProps {
  id: string;
  inInputField?: boolean;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
}
