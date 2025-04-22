import { clsx } from "clsx";
import { ButtonProps } from "./button.types";

export function Button(props: ButtonProps) {
  return (
    <button
      type={props.type || "button"}
      id={props.id}
      data-testid={props.id}
      aria-label={props.text}
      onClick={() => props.onClick()}
      className={clsx(
        "cursor-pointer rounded-md p-2 text-lg font-semibold shadow-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-300",
        props.style === "primary" && "bg-sky-700 text-white hover:bg-sky-500",
        props.style === "secondary" &&
          "border border-gray-300 bg-white text-gray-900 hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:bg-slate-700 dark:text-gray-50 dark:hover:bg-sky-500"
      )}>
      {props.text}
    </button>
  );
}
