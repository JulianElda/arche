import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { buttonPropsPrimary } from "./button.mocks.tsx";
import { Button } from "./button.tsx";

test("renders elements", async () => {
  const { getByLabelText, getByRole, getByTestId } = await render(
    <Button {...buttonPropsPrimary} />
  );
  await expect.element(getByTestId(buttonPropsPrimary.id)).toBeInTheDocument();
  await expect
    .element(getByLabelText(buttonPropsPrimary.text))
    .toBeInTheDocument();
  await expect
    .element(getByRole("button", { name: buttonPropsPrimary.text }))
    .toBeInTheDocument();
});

test("calls callback when clicked", async () => {
  const onClick = vi.fn();
  const { getByTestId } = await render(
    <Button
      {...buttonPropsPrimary}
      onClick={onClick}
    />
  );
  await getByTestId(buttonPropsPrimary.id).click();
  expect(onClick).toHaveBeenCalled();
});
