import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import {
  inputFieldProps1,
  inputFieldProps2,
  inputFieldProps3,
} from "./input-field.mocks.ts";
import InputField from "./input-field.svelte";

describe("type='text'", () => {
  test("render elements", async () => {
    const { getByPlaceholder, getByRole, getByTestId } = render(InputField, {
      props: { ...inputFieldProps1, placeholder: "Enter text..." },
    });
    await expect
      .element(getByTestId(inputFieldProps1["data-testid"]!))
      .toBeInTheDocument();
    await expect.element(getByPlaceholder("Enter text...")).toBeInTheDocument();
    await expect.element(getByRole("textbox")).toBeInTheDocument();
  });

  test("calls oninput handler when input changes", async () => {
    const oninput = vi.fn<(e: Event) => void>();
    const { getByRole } = render(InputField, {
      props: { ...inputFieldProps1, oninput, value: "" },
    });
    await getByRole("textbox").fill("test");
    expect(oninput).toHaveBeenCalledOnce();
  });

  test("reflects typed value", async () => {
    const { getByRole } = render(InputField, {
      props: { ...inputFieldProps1, value: "" },
    });
    const input = getByRole("textbox");
    await input.fill("Hello 👋 世界 @#$%");
    await expect.element(input).toHaveValue("Hello 👋 世界 @#$%");
  });

  test("updates when value prop changes", async () => {
    const { getByRole, rerender } = render(InputField, {
      props: { ...inputFieldProps1, value: "initial" },
    });
    const input = getByRole("textbox");
    await expect.element(input).toHaveValue("initial");

    await rerender({ ...inputFieldProps1, value: "updated" });
    await expect.element(input).toHaveValue("updated");
  });
});

describe("type='number'", () => {
  test("render elements", async () => {
    const { getByRole, getByTestId } = render(InputField, {
      props: inputFieldProps2,
    });
    await expect
      .element(getByTestId(inputFieldProps2["data-testid"]!))
      .toBeInTheDocument();
    await expect.element(getByRole("spinbutton")).toBeInTheDocument();
  });

  test("reflects numeric input value", async () => {
    const { getByRole } = render(InputField, {
      props: { ...inputFieldProps2, value: "" },
    });
    const input = getByRole("spinbutton");
    await input.fill("3.14");
    await expect.element(input).toHaveValue(3.14);
  });
});

describe("type='search'", () => {
  test("render elements", async () => {
    const { getByRole, getByTestId } = render(InputField, {
      props: inputFieldProps3,
    });
    await expect
      .element(getByTestId(inputFieldProps3["data-testid"]!))
      .toBeInTheDocument();
    await expect.element(getByRole("searchbox")).toBeInTheDocument();
  });

  test("calls oninput handler when search query changes", async () => {
    const oninput = vi.fn<(e: Event) => void>();
    const { getByRole } = render(InputField, {
      props: { ...inputFieldProps3, oninput, value: "" },
    });
    await getByRole("searchbox").fill("test");
    expect(oninput).toHaveBeenCalledOnce();
  });
});

describe("disabled prop", () => {
  test("input element has disabled attribute when disabled={true}", async () => {
    const { getByTestId } = render(InputField, {
      props: { ...inputFieldProps1, disabled: true },
    });
    await expect
      .element(getByTestId(inputFieldProps1["data-testid"]!))
      .toBeDisabled();
  });

  test("input element does not have disabled attribute when disabled={false}", async () => {
    const { getByTestId } = render(InputField, {
      props: { ...inputFieldProps1, disabled: false },
    });
    await expect
      .element(getByTestId(inputFieldProps1["data-testid"]!))
      .not.toBeDisabled();
  });
});
