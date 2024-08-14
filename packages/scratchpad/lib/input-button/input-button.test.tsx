import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputButton } from "./input-button";
import { inputButtonProps1 } from "./input-button.mocks";

describe("InputButton", () => {
  test("renders Input elements", () => {
    render(<InputButton {...inputButtonProps1} />);
    expect(screen.getByLabelText(inputButtonProps1.label)).toBeInTheDocument();
    expect(screen.getByText(inputButtonProps1.label)).toBeInTheDocument();
    expect(screen.getByTestId(inputButtonProps1.id)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(inputButtonProps1.value)
    ).toBeInTheDocument();
  });

  test.skip("callbacks function when icon is clicked", async () => {
    const onClickMock = vi.fn();
    const props: typeof inputButtonProps1 = {
      ...inputButtonProps1,
      onChange: onClickMock,
    };
    const user = userEvent.setup();
    render(<InputButton {...props} />);

    await user.click(screen.getByLabelText("copy"));
    expect(onClickMock).toHaveBeenCalled();
  });
});
