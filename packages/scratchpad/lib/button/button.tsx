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
        "active:bg-primary-700 focus:ring-primary-300 dark:hover:bg-primary-500 hover:border-primary-500 hover:bg-primary-500 focus-visible:outline-primary-300 cursor-pointer appearance-none rounded-lg p-2 text-lg shadow-sm focus-visible:outline focus-visible:outline-offset-2",
        props.style === "primary" &&
          "border-primary-700 bg-primary-700 text-ink-white",
        props.style === "secondary" &&
          "border-ink-500 bg-card-background-light text-ink-black dark:bg-slate dark:text-ink-white border hover:text-white"
      )}>
      {props.text}
    </button>
  );
}
