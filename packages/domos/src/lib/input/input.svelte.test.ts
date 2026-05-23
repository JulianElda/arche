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
        onChange: vi.fn(),
      },
    },
  );

  await Promise.all([
    expect.element(getByTestId(inputProps1.id)).toBeInTheDocument(),
    expect.element(getByLabelText(inputProps1.label)).toBeInTheDocument(),
    expect
      .element(getByPlaceholder(inputProps1.placeholder!))
      .toBeInTheDocument(),
    expect.element(getByRole("textbox")).toBeInTheDocument(),
  ]);
});

test("callback when input changes", async () => {
  const onChangeMock = vi.fn();
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
