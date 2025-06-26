import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { InputButton } from "./input-button";
import { inputButtonProperties1 } from "./input-button.mocks";

describe("InputButton", () => {
  test("renders Input elements", () => {
    render(<InputButton {...inputButtonProperties1} />);
    expect(
      screen.getByLabelText(inputButtonProperties1.label)
    ).toBeInTheDocument();
    expect(screen.getByText(inputButtonProperties1.label)).toBeInTheDocument();
    expect(screen.getByTestId(inputButtonProperties1.id)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(inputButtonProperties1.value)
    ).toBeInTheDocument();
  });

  test.skip("callbacks function when icon is clicked", async () => {
    const onClickMock = vi.fn();
    const properties: typeof inputButtonProperties1 = {
      ...inputButtonProperties1,
      onChange: onClickMock,
    };
    const user = userEvent.setup();
    render(<InputButton {...properties} />);

    await user.click(screen.getByLabelText("copy"));
    expect(onClickMock).toHaveBeenCalled();
  });
});
