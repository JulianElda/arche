import { render, screen } from "@testing-library/react";
import { TextAreaField } from "lib/textarea-field/textarea-field";
import { textAreaFieldProperties1 } from "lib/textarea-field/textarea-field.mocks";

describe("TextAreaField", () => {
  test("renders TextAreaField elements", () => {
    render(<TextAreaField {...textAreaFieldProperties1} />);
    expect(screen.getByTestId(textAreaFieldProperties1.id)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(textAreaFieldProperties1.value)
    ).toBeInTheDocument();
  });
});
