import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";
import { buttonPropsPrimary } from "./button.mocks";

test("renders button and trigger callback", async () => {
  const onClickMock = vi.fn();
  const testProps = {
    ...buttonPropsPrimary,
    onClick: onClickMock,
  };
  const user = userEvent.setup();

  render(<Button {...testProps} />);
  expect(screen.getByLabelText(testProps.text)).toBeInTheDocument();
  expect(screen.getByTestId(testProps.id)).toBeInTheDocument();

  await user.click(screen.getByTestId(testProps.id));
  expect(onClickMock).toHaveBeenCalled();
});
