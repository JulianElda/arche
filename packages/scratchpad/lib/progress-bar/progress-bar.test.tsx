import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { ProgressBar } from "./progress-bar";
import { progressBarProps1, progressBarProps2 } from "./progress-bar.mocks";

test("renders elements without label", async () => {
  const { getByRole, getByTestId, getByText } = await render(
    <ProgressBar
      hideLabel={progressBarProps2.hideLabel}
      id={progressBarProps2.id}
      label={progressBarProps2.label}
      max={progressBarProps2.max}
      min={progressBarProps2.min}
      value={progressBarProps2.value}
    />,
  );

  await expect.element(getByTestId(progressBarProps2.id)).toBeInTheDocument();
  await expect.element(getByText(progressBarProps2.label)).toBeInTheDocument();
  await expect
    .element(getByRole("progressbar", { name: progressBarProps2.label }))
    .toHaveValue(progressBarProps2.value);
});

test("renders elements with label", async () => {
  const { getByRole, getByTestId, getByText } = await render(
    <ProgressBar
      id={progressBarProps1.id}
      label={progressBarProps1.label}
      max={progressBarProps1.max}
      min={progressBarProps1.min}
      value={progressBarProps1.value}
    />,
  );

  await expect.element(getByTestId(progressBarProps1.id)).toBeInTheDocument();
  await expect.element(getByText(progressBarProps1.label)).toBeInTheDocument();
  await expect
    .element(getByRole("progressbar", { name: progressBarProps1.label }))
    .toHaveValue(progressBarProps1.value);
});
