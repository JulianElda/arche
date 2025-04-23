import { render, screen } from "@testing-library/react";
import { TextAreaField } from "lib/textarea-field/textarea-field";
import { textAreaFieldProps1 } from "lib/textarea-field/textarea-field.mocks";

describe("TextAreaField", () => {
  test("renders TextAreaField elements", () => {
    render(<TextAreaField {...textAreaFieldProps1} />);
    expect(screen.getByTestId(textAreaFieldProps1.id)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(textAreaFieldProps1.value)
    ).toBeInTheDocument();
  });
});
