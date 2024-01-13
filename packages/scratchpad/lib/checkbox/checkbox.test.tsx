import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./checkbox";
import { checkboxProps } from "./checkbox.mocks";

describe("Checkbox", () => {
  test("renders Checkbox elements", () => {
    render(<Checkbox {...checkboxProps} />);
    expect(screen.getByLabelText(checkboxProps.label)).toBeInTheDocument();
    expect(screen.getByText(checkboxProps.label)).toBeInTheDocument();
    expect(screen.getByTestId(checkboxProps.id)).toBeInTheDocument();
  });

  test("callbacks function when clicked", async () => {
    const onChangeMock = vi.fn();
    const props: typeof checkboxProps = {
      ...checkboxProps,
      onChange: onChangeMock,
    };
    const user = userEvent.setup();
    render(<Checkbox {...props} />);

    await user.click(screen.getByTestId(checkboxProps.id));
    expect(onChangeMock).toHaveBeenCalled();
  });
});
