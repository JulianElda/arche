export interface SelectFieldProperties {
  id: string;
  inInputField?: boolean;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
}
