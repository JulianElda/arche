import { expect, test } from "vitest";
import { render } from "vitest-browser-svelte";

import InputLabel from "./input-label.svelte";

test("renders label text", async () => {
  const { getByText } = render(InputLabel, {
    props: { id: "test-id", label: "Test Label" },
  });
  await expect.element(getByText("Test Label")).toBeInTheDocument();
});

test("associates label with input via for attribute", async () => {
  const { getByText } = render(InputLabel, {
    props: { id: "my-input", label: "My Label" },
  });
  await expect
    .element(getByText("My Label"))
    .toHaveAttribute("for", "my-input");
});

test("hideLabel=false shows label visually", async () => {
  const { getByText } = render(InputLabel, {
    props: { hideLabel: false, id: "test-id", label: "Visible Label" },
  });
  await expect.element(getByText("Visible Label")).not.toHaveClass("sr-only");
});

test("hideLabel=true visually hides label with sr-only class", async () => {
  const { getByText } = render(InputLabel, {
    props: { hideLabel: true, id: "test-id", label: "Hidden Label" },
  });
  await expect.element(getByText("Hidden Label")).toHaveClass("sr-only");
});

test("renders no value span when value is empty string", async () => {
  const { getByText } = render(InputLabel, {
    props: { id: "test-id", label: "My Label", value: "" },
  });
  const label = getByText("My Label");
  await expect.element(label.elements()[0].querySelector("span")).toBeNull();
});

test("renders sr-only value span when value is provided", async () => {
  const { getByText } = render(InputLabel, {
    props: { id: "test-id", label: "Volume", value: "50%" },
  });
  await expect.element(getByText("50%")).toBeInTheDocument();
  await expect.element(getByText("50%")).toHaveClass("sr-only");
});

test("renders sr-only value span when value is a number", async () => {
  const { getByText } = render(InputLabel, {
    props: { id: "test-id", label: "Count", value: 42 },
  });
  await expect.element(getByText("42")).toBeInTheDocument();
  await expect.element(getByText("42")).toHaveClass("sr-only");
});
