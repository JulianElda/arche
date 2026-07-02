import type { ProgressBarProps } from "./progress-bar.types";

import { InputLabel } from "../input-label/input-label";

export function ProgressBar(props: ProgressBarProps) {
  const { hideLabel, id, label, max, min, value } = props;

  const totalRange = max - min;
  const currentRange = value - min;
  const currentPercent = Math.floor((currentRange * 100) / totalRange);

  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(hideLabel)}
        id={id}
        label={label}
      />
      <div className="mt-1 h-2 rounded-md bg-gray-200 dark:bg-gray-500">
        <progress
          aria-label={label}
          aria-valuemax={max}
          aria-valuemin={min}
          aria-valuenow={value}
          className="bg-primary-500 h-2 rounded-md"
          data-testid={id}
          id={id}
          style={{
            width: `${currentPercent}%`,
          }}
        />
      </div>
    </div>
  );
}
