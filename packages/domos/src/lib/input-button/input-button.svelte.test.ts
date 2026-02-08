import { CheckIcon } from "@lucide/svelte";
import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import InputButton from "./input-button.svelte";

test("render elements", async () => {
  const { getByLabelText, getByTestId, getByPlaceholder, getByRole } = render(
    InputButton,
    {
      props: {
        id: "test-input-button",
        buttonAriaLabel: "Submit input button",
        label: "Test Input Button",
        placeholder: "Enter text...",
        type: "text",
        value: "",
        icon: CheckIcon,
        onChange: vi.fn(),
        onButtonClick: vi.fn(),
      },
    }
  );
  await expect.element(getByTestId("test-input-button")).toBeInTheDocument();
  await expect.element(getByLabelText("Test Input Button")).toBeInTheDocument();
  await expect.element(getByPlaceholder("Enter text...")).toBeInTheDocument();
  await expect.element(getByRole("textbox")).toBeInTheDocument();
  await expect
    .element(getByRole("button", { name: "Submit input button" }))
    .toBeInTheDocument();
});
