import type { ButtonProperties } from "lib/button/button.types";

import { clsx } from "clsx";

export function Button(properties: ButtonProperties) {
  return (
    <button
      aria-label={properties.text}
      className={clsx(
        "active:bg-primary-700 focus:ring-primary-300 dark:hover:bg-primary-500 hover:border-primary-500 hover:bg-primary-500 focus-visible:outline-primary-300 cursor-pointer appearance-none rounded-lg p-2 text-lg shadow-sm focus-visible:outline focus-visible:outline-offset-2",
        properties.style === "primary" &&
          "border-primary-700 bg-primary-700 text-ink-white",
        properties.style === "secondary" &&
          "border-ink-500 bg-card-background-light text-ink-black dark:bg-slate dark:text-ink-white border hover:text-white"
      )}
      data-testid={properties.id}
      id={properties.id}
      onClick={() => properties.onClick()}
      type={properties.type || "button"}>
      {properties.text}
    </button>
  );
}
