import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ThemeToggleDark } from "./theme-toggle-dark";

test("renders elements", async () => {
  const { getByLabelText, getByRole, getByTestId } = await render(
    <ThemeToggleDark onToggleDarkMode={() => {}} />,
  );
  await expect.element(getByTestId("footer-toggle-light")).toBeInTheDocument();
  await expect.element(getByLabelText("Toggle light mode")).toBeInTheDocument();
  await expect
    .element(getByRole("button", { name: "Toggle light mode" }))
    .toBeInTheDocument();
});

test("calls callback when clicked", async () => {
  const onToggleDarkMode = vi.fn<() => void>();
  const { getByTestId } = await render(
    <ThemeToggleDark onToggleDarkMode={onToggleDarkMode} />,
  );
  await getByTestId("footer-toggle-light").click();
  expect(onToggleDarkMode).toHaveBeenCalledOnce();
});
