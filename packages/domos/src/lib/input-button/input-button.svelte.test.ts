import { CheckIcon } from "@lucide/svelte";
import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import InputButton from "./input-button.svelte";

test("render elements", async () => {
  const { getByLabelText, getByPlaceholder, getByRole, getByTestId } = render(
    InputButton,
    {
      props: {
        buttonAriaLabel: "Submit input button",
        "data-testid": "test-input-button",
        icon: CheckIcon,
        id: "test-input-button",
        label: "Test Input Button",
        onButtonClick: vi.fn<() => void>(),
        placeholder: "Enter text...",
        type: "text",
        value: "",
      },
    },
  );
  await expect.element(getByTestId("test-input-button")).toBeInTheDocument();
  await expect.element(getByLabelText("Test Input Button")).toBeInTheDocument();
  await expect.element(getByPlaceholder("Enter text...")).toBeInTheDocument();
  await expect.element(getByRole("textbox")).toBeInTheDocument();
  await expect
    .element(getByRole("button", { name: "Submit input button" }))
    .toBeInTheDocument();
});

test("calls onButtonClick when button is clicked", async () => {
  const onButtonClick = vi.fn<() => void>();
  const { getByRole } = render(InputButton, {
    props: {
      buttonAriaLabel: "Submit",
      "data-testid": "test-input-button",
      id: "test-input-button",
      label: "Test",
      onButtonClick,
      type: "text",
      value: "",
    },
  });
  await getByRole("button", { name: "Submit" }).click();
  expect(onButtonClick).toHaveBeenCalledOnce();
});
