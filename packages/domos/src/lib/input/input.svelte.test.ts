import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { inputProps1 } from "./input.mocks.ts";
import Input from "./input.svelte";

test("render elements", async () => {
  const { getByLabelText, getByPlaceholder, getByRole, getByTestId } = render(
    Input,
    {
      props: {
        ...inputProps1,
        onChange: vi.fn<() => void>(),
      },
    },
  );

  await expect.element(getByTestId(inputProps1.id)).toBeInTheDocument();
  await expect.element(getByLabelText(inputProps1.label)).toBeInTheDocument();
  await expect
    .element(getByPlaceholder(inputProps1.placeholder!))
    .toBeInTheDocument();
  await expect.element(getByRole("textbox")).toBeInTheDocument();
});

test("callback when input changes", async () => {
  const onChangeMock = vi.fn<() => void>();
  const { getByRole } = render(Input, {
    props: {
      ...inputProps1,
      onChange: onChangeMock,
      value: "",
    },
  });
  const input = getByRole("textbox");
  await input.fill("test");
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenLastCalledWith("test");
});

test("hideLabel=false shows label visually", async () => {
  const { getByText } = render(Input, {
    props: {
      ...inputProps1,
      hideLabel: false,
      onChange: vi.fn<() => void>(),
    },
  });
  const label = getByText(inputProps1.label);
  await expect.element(label).toBeVisible();
});

test("hideLabel=true hides label visually but keeps it accessible", async () => {
  const { getByLabelText, getByText } = render(Input, {
    props: {
      ...inputProps1,
      hideLabel: true,
      onChange: vi.fn<() => void>(),
    },
  });
  const label = getByText(inputProps1.label);
  await expect.element(label).toHaveClass("sr-only");
  const input = getByLabelText(inputProps1.label);
  await expect.element(input).toBeInTheDocument();
});
