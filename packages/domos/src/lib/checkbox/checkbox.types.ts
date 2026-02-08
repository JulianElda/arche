export interface CheckboxProps {
  hideLabel?: boolean;
  id: string;
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
}
