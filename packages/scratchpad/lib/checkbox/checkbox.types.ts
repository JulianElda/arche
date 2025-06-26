export interface CheckboxProperties {
  hideLabel?: boolean;
  id: string;
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
}
