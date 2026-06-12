import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { buttonPropsPrimary } from "./button.mocks.ts";
import Button from "./button.svelte";

test("render elements", async () => {
  const { getByRole, getByTestId, getByText } = render(Button, {
    props: {
      ...buttonPropsPrimary,
      onClick: vi.fn<() => void>(),
    },
  });
  await expect.element(getByTestId(buttonPropsPrimary.id)).toBeInTheDocument();
  await expect
    .element(getByRole("button", { name: buttonPropsPrimary.text }))
    .toBeInTheDocument();
  await expect.element(getByText(buttonPropsPrimary.text)).toBeInTheDocument();
});

test("call onClick handler when clicked", async () => {
  const onClickMock = vi.fn<() => void>();
  const { getByRole } = render(Button, {
    props: {
      ...buttonPropsPrimary,
      onClick: onClickMock,
    },
  });
  const button = getByRole("button", { name: buttonPropsPrimary.text });
  await button.click();
  expect(onClickMock).toHaveBeenCalledOnce();
});
