import type { TextAreaProps } from "./textarea.types";

import { InputLabel } from "../input-label/input-label";
import { TextAreaField } from "../textarea-field/textarea-field";

export function TextArea(props: TextAreaProps) {
  const { hideLabel, id, label, onChange, onKeyDown, value } = props;

  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(hideLabel)}
        id={id}
        label={label}
      />
      <div className="mt-1">
        <TextAreaField
          id={id}
          onChange={(value) => onChange?.(value)}
          onKeyDown={(value) => onKeyDown?.(value)}
          value={value}
        />
      </div>
    </div>
  );
}
