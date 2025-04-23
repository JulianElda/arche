import { InputLabel } from "lib/input-label/input-label";
import { TextAreaField } from "lib/textarea-field/textarea-field";
import { TextAreaProps } from "lib/textarea/textarea.types";

export function TextArea(props: TextAreaProps) {
  return (
    <div className="flex-1">
      <InputLabel
        id={props.id}
        label={props.label}
        hideLabel={!!props.hideLabel}
      />
      <div className="mt-1">
        <TextAreaField
          id={props.id}
          value={props.value}
          autofocus={props.autofocus}
          onChange={(value) => props.onChange?.(value)}
          onKeyDown={(value) => props.onKeyDown?.(value)}
        />
      </div>
    </div>
  );
}
