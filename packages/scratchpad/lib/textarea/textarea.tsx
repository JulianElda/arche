import type { TextAreaProperties } from "lib/textarea/textarea.types";

import { InputLabel } from "lib/input-label/input-label";
import { TextAreaField } from "lib/textarea-field/textarea-field";

export function TextArea(properties: TextAreaProperties) {
  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(properties.hideLabel)}
        id={properties.id}
        label={properties.label}
      />
      <div className="mt-1">
        <TextAreaField
          autofocus={properties.autofocus}
          id={properties.id}
          onChange={(value) => properties.onChange?.(value)}
          onKeyDown={(value) => properties.onKeyDown?.(value)}
          value={properties.value}
        />
      </div>
    </div>
  );
}
