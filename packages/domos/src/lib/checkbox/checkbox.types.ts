export interface CheckboxProps {
  disabled?: boolean;
  hideLabel?: boolean;
  id: string;
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
}
