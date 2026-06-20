import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";

import { selectProps1 } from "./select.mocks.ts";
import Select from "./select.svelte";

test("render elements", async () => {
  const { getByLabelText, getByRole, getByTestId } = render(Select, {
    props: selectProps1,
  });
  await expect
    .element(getByTestId(selectProps1["data-testid"]!))
    .toBeInTheDocument();
  await expect.element(getByLabelText(selectProps1.label)).toBeInTheDocument();
  await expect.element(getByRole("combobox")).toBeInTheDocument();
});

test("reflects selected value", async () => {
  const { getByRole } = render(Select, { props: selectProps1 });
  await expect
    .element(getByRole("combobox"))
    .toHaveValue(selectProps1.value as string);
});

test("calls oninput handler when selection changes", async () => {
  const oninput = vi.fn<(e: Event) => void>();
  const { getByRole } = render(Select, {
    props: { ...selectProps1, oninput, value: "" },
  });
  await getByRole("combobox").selectOptions(selectProps1.options[1].value);
  expect(oninput).toHaveBeenCalledOnce();
});
