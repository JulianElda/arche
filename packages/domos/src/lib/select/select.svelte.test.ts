import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { selectProps1 } from "./select.mocks.ts";
import Select from "./select.svelte";

test("render elements", async () => {
  const { getByLabelText, getByRole, getByTestId } = render(Select, {
    props: {
      ...selectProps1,
    },
  });
  await expect.element(getByTestId(selectProps1.id)).toBeInTheDocument();
  await expect.element(getByLabelText(selectProps1.label)).toBeInTheDocument();
  await expect.element(getByRole("combobox")).toBeInTheDocument();
});

test("callback when select changes", async () => {
  const onChangeMock = vi.fn<() => void>();
  const { getByTestId } = render(Select, {
    props: {
      ...selectProps1,
      onChange: onChangeMock,
    },
  });
  const select = getByTestId(selectProps1.id);
  await select.selectOptions(selectProps1.options[1].value);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenLastCalledWith(selectProps1.options[1].value);
});
