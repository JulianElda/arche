import { render, screen } from "@testing-library/react";
import { InputField } from "./input-field";
import { inputFieldProps1 } from "./input-field.mocks";

describe("InputField", () => {
  test("renders InputField elements", () => {
    render(<InputField {...inputFieldProps1} />);
    expect(screen.getByTestId(inputFieldProps1.id)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(inputFieldProps1.value)
    ).toBeInTheDocument();
  });
});
