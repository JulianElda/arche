import { InputField } from "./../input-field/input-field";
import { InputLabel } from "./../input-label/input-label";
import { InputButtonProps } from "./input-button.types";

export function InputButton(props: InputButtonProps) {
  return (
    <div className="flex-1">
      <InputLabel
        id={props.id}
        label={props.label}
        hideLabel={!!props.hideLabel}
      />
      <div className="mt-1 flex">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
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
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {props.icon}
        </button>
      </div>
    </div>
  );
}
