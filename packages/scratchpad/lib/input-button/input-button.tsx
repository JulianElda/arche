import { InputButtonProps } from "lib/input-button/input-button.types";
import { InputField } from "lib/input-field/input-field";
import { InputLabel } from "lib/input-label/input-label";

export function InputButton(props: InputButtonProps) {
  return (
    <div className="flex-1">
      <InputLabel
        id={props.id}
        label={props.label}
        hideLabel={!!props.hideLabel}
      />
      <div className="mt-1 flex">
        <div className="relative flex grow items-stretch focus-within:z-10">
          <InputField
            id={props.id}
            type={props.type}
            value={props.value}
            autofocus={props.autofocus}
            onChange={(value) => props.onChange?.(value)}
            onKeyDown={(value) => props.onKeyDown?.(value)}
            withIconLeft={true}
          />
        </div>
        <button
          type="button"
          aria-label={props.buttonAriaLabel}
          onClick={() => props.onButtonClick()}
          className="relative -ml-px inline-flex cursor-pointer items-center gap-x-1.5 rounded-r-md border-1 border-l-0 border-gray-400 px-3 py-2 text-sm font-semibold ring-inset hover:bg-sky-500 hover:text-gray-700 focus:border-sky-300 focus:ring-1 focus:ring-sky-300 focus:ring-inset active:bg-sky-700">
          {props.icon}
        </button>
      </div>
    </div>
  );
}
