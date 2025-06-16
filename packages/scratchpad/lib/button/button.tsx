import { clsx } from "clsx";
import { ButtonProps } from "lib/button/button.types";

export function Button(props: ButtonProps) {
  return (
    <button
      type={props.type || "button"}
      id={props.id}
      data-testid={props.id}
      aria-label={props.text}
      onClick={() => props.onClick()}
      className={clsx(
        "active:bg-primary-darker focus:ring-primary-lighter focus-visible:outline-primary-lighter cursor-pointer appearance-none rounded-md p-2 text-lg font-semibold shadow-sm focus-visible:outline focus-visible:outline-offset-2",
        props.style === "primary" &&
          "border-primary hover:primary bg-primary-darker border text-white",
        props.style === "secondary" &&
          "hover:primary dark:hover:primary hover:border-primary border border-gray-300 bg-white text-gray-900 hover:text-white dark:bg-slate-700 dark:text-gray-50"
      )}>
      {props.text}
    </button>
  );
}
