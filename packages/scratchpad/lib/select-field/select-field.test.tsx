import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { SelectField } from "./select-field";

test("renders select element", () => {
  render(
    <SelectField
      id="test-id"
      onChange={vi.fn()}
      value="value-2"
      options={[
        {
          label: "label-1",
          value: "value-1",
        },
        {
          label: "label-2",
          value: "value-2",
        },
      ]}
    />
  );
  expect(screen.getByTestId("test-id")).toBeInTheDocument();
});
