import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";
import { buttonPropsPrimary } from "./button.mocks";

describe("Button", () => {
  test("renders Button elements", async () => {
    render(<Button {...buttonPropsPrimary} />);
    expect(screen.getByLabelText(buttonPropsPrimary.text)).toBeInTheDocument();
    expect(screen.getByTestId(buttonPropsPrimary.id)).toBeInTheDocument();
  });

  test("callbacks function when clicked", async () => {
    const onClickMock = vi.fn();
    const testProps: typeof buttonPropsPrimary = {
      ...buttonPropsPrimary,
      onClick: onClickMock,
    };
    const user = userEvent.setup();

    render(<Button {...testProps} />);

    await user.click(screen.getByTestId(testProps.id));
    expect(onClickMock).toHaveBeenCalled();
  });
});
