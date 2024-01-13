export type SelectFieldProps = {
  id: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  inInputField?: boolean;
  onChange: (value: string) => void;
};
