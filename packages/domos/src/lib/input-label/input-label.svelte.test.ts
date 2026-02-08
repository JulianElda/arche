import { expect, test } from "vitest";
import { render } from "vitest-browser-svelte";
import InputLabel from "./input-label.svelte";

test("render input label element", async () => {
  const { getByText } = render(InputLabel, {
    props: {
      id: "test-input-label",
      label: "Test Input Label",
    },
  });
  await expect.element(getByText("Test Input Label")).toBeInTheDocument();
});
