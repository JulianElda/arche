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
      props: {
        ...inputFieldProps1,
        onChange: vi.fn<() => void>(),
        placeholder: "Enter text...",
      },
    });

    await expect.element(getByTestId(inputFieldProps1.id)).toBeInTheDocument();
    await expect.element(getByPlaceholder("Enter text...")).toBeInTheDocument();
    await expect.element(getByRole("textbox")).toBeInTheDocument();
  });

  test("call onChange handler when input changes", async () => {
    const onChangeMock = vi.fn<(value: string) => void>();
    const { getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps1,
        onChange: onChangeMock,
        value: "",
      },
    });
    const input = getByTestId(inputFieldProps1.id);
    await input.fill("test");
    expect(onChangeMock).toHaveBeenCalledOnce();
    expect(onChangeMock).toHaveBeenLastCalledWith("test");
  });

  test("update input when value prop changes", async () => {
    let value = "initial";
    const { getByTestId, rerender } = render(InputField, {
      props: {
        ...inputFieldProps1,
        onChange: vi.fn<() => void>(),
        value,
      },
    });
    const input = getByTestId(inputFieldProps1.id);
    await expect.element(input).toHaveValue("initial");

    value = "updated";
    await rerender({
      ...inputFieldProps1,
      onChange: vi.fn<() => void>(),
      value,
    });
    await expect.element(input).toHaveValue("updated");
  });

  test("call onChange handler with special characters", async () => {
    const onChangeMock = vi.fn<(value: string) => void>();
    const { getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps1,
        onChange: onChangeMock,
        value: "",
      },
    });
    const input = getByTestId(inputFieldProps1.id);
    await input.fill("@#$%^&*()_+-=[]{}|;:',.<>?/");
    expect(onChangeMock).toHaveBeenCalledWith("@#$%^&*()_+-=[]{}|;:',.<>?/");
  });

  test("call onChange handler with emojis and unicode", async () => {
    const onChangeMock = vi.fn<(value: string) => void>();
    const { getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps1,
        onChange: onChangeMock,
        value: "",
      },
    });
    const input = getByTestId(inputFieldProps1.id);
    await input.fill("Hello 👋 世界 🌍");
    expect(onChangeMock).toHaveBeenCalledWith("Hello 👋 世界 🌍");
  });

  test("handle multiple interactions: type, clear, type again", async () => {
    const onChangeMock = vi.fn<(value: string) => void>();
    const { getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps1,
        onChange: onChangeMock,
        value: "",
      },
    });
    const input = getByTestId(inputFieldProps1.id);

    await input.fill("first");
    expect(onChangeMock).toHaveBeenLastCalledWith("first");

    await input.fill("");
    expect(onChangeMock).toHaveBeenLastCalledWith("");

    await input.fill("second");
    expect(onChangeMock).toHaveBeenLastCalledWith("second");

    expect(onChangeMock).toHaveBeenCalledTimes(3);
  });
});

describe("type='number'", () => {
  test("render elements", async () => {
    const { getByRole, getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps2,
        onChange: vi.fn<() => void>(),
      },
    });

    await expect.element(getByTestId(inputFieldProps2.id)).toBeInTheDocument();
    await expect.element(getByRole("spinbutton")).toBeInTheDocument();
  });

  test("call onChange handler with string value when number is typed", async () => {
    const onChangeMock = vi.fn<(value: string) => void>();
    const { getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps2,
        onChange: onChangeMock,
        value: "",
      },
    });
    const input = getByTestId(inputFieldProps2.id);
    await input.fill("42");
    expect(onChangeMock).toHaveBeenCalledOnce();
    expect(onChangeMock).toHaveBeenLastCalledWith("42");
  });

  test("call onChange with empty string when input is cleared", async () => {
    const onChangeMock = vi.fn<(value: string) => void>();
    const { getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps2,
        onChange: onChangeMock,
        value: "5",
      },
    });
    const input = getByTestId(inputFieldProps2.id);
    await input.fill("");
    expect(onChangeMock).toHaveBeenCalledWith("");
    expect(onChangeMock).not.toHaveBeenCalledWith(Number.NaN);
  });

  test("call onChange when typing decimal number", async () => {
    const onChangeMock = vi.fn<(value: string) => void>();
    const { getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps2,
        onChange: onChangeMock,
        value: "",
      },
    });
    const input = getByTestId(inputFieldProps2.id);
    await input.fill("3.14");
    expect(onChangeMock).toHaveBeenCalledOnce();
    expect(onChangeMock).toHaveBeenLastCalledWith("3.14");
  });
});

describe("type='search'", () => {
  test("render elements", async () => {
    const { getByRole, getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps3,
        onChange: vi.fn<() => void>(),
      },
    });

    await expect.element(getByTestId(inputFieldProps3.id)).toBeInTheDocument();
    await expect.element(getByRole("searchbox")).toBeInTheDocument();
  });

  test("call onChange handler when search query changes", async () => {
    const onChangeMock = vi.fn<(value: string) => void>();
    const { getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps3,
        onChange: onChangeMock,
        value: "",
      },
    });
    const input = getByTestId(inputFieldProps3.id);
    await input.fill("test");
    expect(onChangeMock).toHaveBeenCalledOnce();
    expect(onChangeMock).toHaveBeenLastCalledWith("test");
  });
});

describe("disabled prop", () => {
  test("input element has disabled attribute when disabled={true}", async () => {
    const { getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps1,
        disabled: true,
      },
    });
    const input = getByTestId(inputFieldProps1.id);
    await expect.element(input).toBeDisabled();
  });

  test("input element does not have disabled attribute when disabled={false}", async () => {
    const { getByTestId } = render(InputField, {
      props: {
        ...inputFieldProps1,
        disabled: false,
      },
    });
    const input = getByTestId(inputFieldProps1.id);
    await expect.element(input).not.toBeDisabled();
  });
});
