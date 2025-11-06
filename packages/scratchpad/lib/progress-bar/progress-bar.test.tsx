import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { ProgressBar } from "./progress-bar";
import { progressBarProps1, progressBarProps2 } from "./progress-bar.mocks";

test("renders elements without label", async () => {
  const { getByRole, getByTestId, getByText } = await render(
    <ProgressBar {...progressBarProps2} />
  );

  await expect.element(getByTestId(progressBarProps2.id)).toBeInTheDocument();
  await expect.element(getByText(progressBarProps2.label)).toBeInTheDocument();
  await expect
    .element(getByRole("progressbar", { name: progressBarProps2.label }))
    .toHaveValue(progressBarProps2.value);
});

test("renders elements with label", async () => {
  const { getByRole, getByTestId, getByText } = await render(
    <ProgressBar {...progressBarProps1} />
  );

  await expect.element(getByTestId(progressBarProps1.id)).toBeInTheDocument();
  await expect.element(getByText(progressBarProps1.label)).toBeInTheDocument();
  await expect
    .element(getByRole("progressbar", { name: progressBarProps1.label }))
    .toHaveValue(progressBarProps1.value);
});
