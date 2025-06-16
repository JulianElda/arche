import { InputLabel } from "lib/input-label/input-label";
import { ProgressBarProps } from "lib/progress-bar/progress-bar.types";

export function ProgressBar(props: ProgressBarProps) {
  const totalRange = props.max - props.min;
  const currentRange = props.value - props.min;
  const currentPercent = Math.floor((currentRange * 100) / totalRange);

  return (
    <div className="flex-1">
      <InputLabel
        id={props.id}
        label={props.label}
        hideLabel={!!props.hideLabel}
      />
      <div className="mt-1 h-2 rounded-md bg-gray-200 dark:bg-gray-500">
        <div
          id={props.id}
          data-testid={props.id}
          className="bg-primary h-2 rounded-md"
          style={{
            width: `${currentPercent}%`,
          }}
          role="progressbar"
          aria-valuemax={props.max}
          aria-valuemin={props.min}
          aria-valuenow={props.value}
          aria-label={props.label}
        />
      </div>
    </div>
  );
}
