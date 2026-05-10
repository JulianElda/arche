import type { ButtonProps } from "lib/button/button.types";

import { clsx } from "clsx";

export function Button(props: ButtonProps) {
  const { id, onClick, style, text, type } = props;

  return (
    <button
      aria-label={text}
      className={clsx(
        `hover:border-primary-500 hover:bg-primary-500 focus:ring-primary-300 focus-visible:outline-primary-300 active:bg-primary-700 dark:hover:bg-primary-500 cursor-pointer appearance-none rounded-lg p-2 text-lg shadow-sm focus-visible:outline focus-visible:outline-offset-2`,
        style === "primary" &&
          "border-primary-700 bg-primary-700 text-ink-white",
        style === "secondary" &&
          `border-ink-500 bg-card-background-light text-ink-black dark:bg-slate dark:text-ink-white border hover:text-white`,
      )}
      data-testid={id}
      id={id}
      onClick={onClick}
      type={type || "button"}>
      {text}
    </button>
  );
}
