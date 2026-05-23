import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { selectFieldProps1 } from "./select-field.mocks.ts";
import SelectField from "./select-field.svelte";

test("render elements", async () => {
  const { getByRole, getByTestId } = render(SelectField, {
    props: {
      ...selectFieldProps1,
    },
  });
  await expect.element(getByTestId(selectFieldProps1.id)).toBeInTheDocument();
  await expect.element(getByRole("combobox")).toBeInTheDocument();
});

test("callback when select changes", async () => {
  const onChangeMock = vi.fn();
  const { getByTestId } = render(SelectField, {
    props: {
      ...selectFieldProps1,
      onChange: onChangeMock,

      value: "",
    },
  });
  const select = getByTestId(selectFieldProps1.id);
  await select.selectOptions(selectFieldProps1.options[1].value);
  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenLastCalledWith(
    selectFieldProps1.options[1].value,
  );
});
