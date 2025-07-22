import type { InputButtonProperties } from "lib/input-button/input-button.types";

import { InputField } from "lib/input-field/input-field";
import { InputLabel } from "lib/input-label/input-label";

export function InputButton(properties: InputButtonProperties) {
  return (
    <div className="flex-1">
      <InputLabel
        hideLabel={Boolean(properties.hideLabel)}
        id={properties.id}
        label={properties.label}
      />
      <div className="mt-1 flex">
        <div
          className={`
            relative flex grow items-stretch
            focus-within:z-10
          `}>
          <InputField
            id={properties.id}
            onChange={(value) => properties.onChange?.(value)}
            onKeyDown={(value) => properties.onKeyDown?.(value)}
            type={properties.type}
            value={properties.value}
            withIconLeft={true}
          />
        </div>
        <button
          aria-label={properties.buttonAriaLabel}
          className={`
            relative -ml-px inline-flex cursor-pointer appearance-none
            items-center gap-x-1.5 rounded-r-md border-1 border-l-0
            border-ink-gray px-3 py-2 text-sm font-bold ring-inset
            hover:bg-primary-500 hover:text-ink-white
            focus:border-primary-300 focus:ring-1 focus:ring-primary-300
            focus:ring-inset
            active:bg-primary-700
          `}
          data-testid={properties.id + "-button"}
          onClick={() => properties.onButtonClick()}
          type="button">
          {properties.icon}
        </button>
      </div>
    </div>
  );
}
