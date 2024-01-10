import { render, screen } from "@testing-library/react";
import { Input } from "./input";

test("renders input form", async () => {
  render(
    <Input
      id="test-id"
      type="text"
      label="test-label"
      value={"value"}
      onChange={vi.fn()}
    />
  );
  expect(screen.getByLabelText("test-label")).toBeInTheDocument();
  expect(screen.getByTestId("test-id")).toBeInTheDocument();
});
