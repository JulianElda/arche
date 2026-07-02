import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ThemeToggleLight } from "./theme-toggle-light";

test("renders elements", async () => {
  const { getByLabelText, getByRole, getByTestId } = await render(
    <ThemeToggleLight onToggleDarkMode={() => {}} />,
  );
  await expect.element(getByTestId("footer-toggle-dark")).toBeInTheDocument();
  await expect.element(getByLabelText("Toggle dark mode")).toBeInTheDocument();
  await expect
    .element(getByRole("button", { name: "Toggle dark mode" }))
    .toBeInTheDocument();
});

test("calls callback when clicked", async () => {
  const onToggleDarkMode = vi.fn<() => void>();
  const { getByTestId } = await render(
    <ThemeToggleLight onToggleDarkMode={onToggleDarkMode} />,
  );
  await getByTestId("footer-toggle-dark").click();
  expect(onToggleDarkMode).toHaveBeenCalledOnce();
});
