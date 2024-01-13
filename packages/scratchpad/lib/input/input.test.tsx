import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";
import { inputProps1 } from "./input.mocks";

describe("Input", () => {
  test("renders Input elements", () => {
    render(<Input {...inputProps1} />);
    expect(screen.getByLabelText(inputProps1.label)).toBeInTheDocument();
    expect(screen.getByText(inputProps1.label)).toBeInTheDocument();
    expect(screen.getByTestId(inputProps1.id)).toBeInTheDocument();
    expect(screen.getByDisplayValue(inputProps1.value)).toBeInTheDocument();
  });

  test("callbacks function when typed", async () => {
    const onChangeMock = vi.fn();
    const props: typeof inputProps1 = {
      ...inputProps1,
      onChange: onChangeMock,
    };
    const user = userEvent.setup();
    render(<Input {...props} />);

    await user.type(screen.getByTestId(props.id), "a");
    expect(onChangeMock).toHaveBeenLastCalledWith(props.value + "a");
  });
});
