import type { ProgressBarProperties } from "lib/progress-bar/progress-bar.types";

import { InputLabel } from "lib/input-label/input-label";

export function ProgressBar(properties: ProgressBarProperties) {
  const totalRange = properties.max - properties.min;
  const currentRange = properties.value - properties.min;
  const currentPercent = Math.floor((currentRange * 100) / totalRange);

  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(properties.hideLabel)}
        id={properties.id}
        label={properties.label}
      />
      <div className="mt-1 h-2 rounded-md bg-gray-200 dark:bg-gray-500">
        <div
          aria-label={properties.label}
          aria-valuemax={properties.max}
          aria-valuemin={properties.min}
          aria-valuenow={properties.value}
          className="bg-primary-500 h-2 rounded-md"
          data-testid={properties.id}
          id={properties.id}
          role="progressbar"
          style={{
            width: `${currentPercent}%`,
          }}
        />
      </div>
    </div>
  );
}
