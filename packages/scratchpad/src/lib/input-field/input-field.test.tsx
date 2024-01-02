import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { InputField } from "./input-field";

test("renders input field", () => {
  render(
    <InputField
      id="input-id"
      type="text"
      value={"value"}
      onChange={vi.fn()}
    />
  );
  expect(screen.getByTestId("input-id")).toBeInTheDocument();
});
