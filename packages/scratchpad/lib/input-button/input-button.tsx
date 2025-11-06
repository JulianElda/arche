import type { InputButtonProps } from "lib/input-button/input-button.types";

import { InputField } from "lib/input-field/input-field";
import { InputLabel } from "lib/input-label/input-label";

export function InputButton(props: InputButtonProps) {
  const {
    buttonAriaLabel,
    disabled,
    hideLabel,
    icon,
    id,
    label,
    max,
    maxLength,
    min,
    onButtonClick,
    onChange,
    onKeyDown,
    placeholder,
    type,
    value,
  } = props;

  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(hideLabel)}
        id={id}
        label={label}
      />
      <div className="mt-1 flex">
        <div
          className={`
            relative flex grow items-stretch
            focus-within:z-10
          `}>
          <InputField
            disabled={disabled}
            id={id}
            max={max}
            maxLength={maxLength}
            min={min}
            onChange={(value) => onChange?.(value)}
            onKeyDown={(value) => onKeyDown?.(value)}
            placeholder={placeholder}
            type={type}
            value={value}
            withIconLeft={true}
          />
        </div>
        <button
          aria-label={buttonAriaLabel}
          className={`
            relative -ml-px inline-flex cursor-pointer appearance-none
            items-center gap-x-1.5 rounded-r-md border-1 border-l-0
            border-ink-gray px-3 py-2 text-sm font-bold ring-inset
            hover:bg-primary-500 hover:text-ink-white
            focus:border-primary-300 focus:ring-1 focus:ring-primary-300
            focus:ring-inset
            active:bg-primary-700
          `}
          data-testid={id + "-button"}
          onClick={() => onButtonClick()}
          type="button">
          {icon}
        </button>
      </div>
    </div>
  );
}
