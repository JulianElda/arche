import { render, screen } from "@testing-library/react";
import { Checkbox } from "./checkbox";

test("renders checkbox", async () => {
  render(
    <Checkbox
      id="test-id"
      label="test-label"
      value={true}
      onChange={vi.fn()}
    />
  );
  expect(screen.getByLabelText("test-label")).toBeInTheDocument();
  expect(screen.getByTestId("test-id")).toBeInTheDocument();
});
