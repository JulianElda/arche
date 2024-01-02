import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { InputLabel } from "./inputlabel";

test("renders input label element", () => {
  render(
    <InputLabel
      id="label-id"
      label="input-label"
      hideLabel={true}
    />
  );
  expect(screen.getByText("input-label")).toBeInTheDocument();
});
