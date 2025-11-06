import type { ProgressBarProps } from "lib/progress-bar/progress-bar.types";

import { InputLabel } from "lib/input-label/input-label";

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
      <div
        className={`
          mt-1 h-2 rounded-md bg-gray-200
          dark:bg-gray-500
        `}>
        <div
          aria-label={label}
          aria-valuemax={max}
          aria-valuemin={min}
          aria-valuenow={value}
          className="h-2 rounded-md bg-primary-500"
          data-testid={id}
          id={id}
          role="progressbar"
          style={{
            width: `${currentPercent}%`,
          }}
        />
      </div>
    </div>
  );
}
