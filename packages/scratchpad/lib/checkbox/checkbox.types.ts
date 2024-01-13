export type CheckboxProps = {
  id: string;
  label: string;
  value: boolean;
  hideLabel?: boolean;
  onChange: (value: boolean) => void;
};
