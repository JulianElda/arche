import { render, screen } from "@testing-library/react";
import { Checkbox } from "./checkbox";
import { checkboxProps } from "./checkbox.mocks";

test("renders checkbox", () => {
  render(<Checkbox {...checkboxProps} />);
  expect(screen.getByLabelText(checkboxProps.label)).toBeInTheDocument();
  expect(screen.getByText(checkboxProps.label)).toBeInTheDocument();
  expect(screen.getByTestId(checkboxProps.id)).toBeInTheDocument();
});
