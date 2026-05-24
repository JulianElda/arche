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
        icon: CheckIcon,
        id: "test-input-button",
        label: "Test Input Button",
        onButtonClick: vi.fn<() => void>(),
        onChange: vi.fn<() => void>(),
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
