type InputLabelProps = {
  id: string;
  label: string;
  hideLabel: boolean;
};

export function InputLabel(props: InputLabelProps) {
  return (
    <label
      htmlFor={props.id}
      className={
        "font-heading font-semibold " + (props.hideLabel ? "sr-only" : "")
      }>
      {props.label}
    </label>
  );
}
