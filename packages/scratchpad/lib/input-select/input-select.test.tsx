import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputSelect } from "./input-select";
import { inputSelectProps1 } from "./input-select.mocks";

describe("InputSelect", () => {
  test("renders InputSelect elements", () => {
    render(<InputSelect {...inputSelectProps1} />);
    expect(screen.getByTestId(inputSelectProps1.inputId)).toBeInTheDocument();
    expect(screen.getByTestId(inputSelectProps1.selectId)).toBeInTheDocument();
    expect(
      screen.getByLabelText(inputSelectProps1.inputLabel)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(inputSelectProps1.selectLabel)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(inputSelectProps1.inputValue)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(inputSelectProps1.options[0].label)
    ).toBeInTheDocument();
    expect(screen.getByText(inputSelectProps1.inputLabel)).toBeInTheDocument();
  });

  test("callbacks functions", async () => {
    const onInputChangeMock = vi.fn();
    const onSelectChangeMock = vi.fn();
    const props: typeof inputSelectProps1 = {
      ...inputSelectProps1,
      onInputChange: onInputChangeMock,
      onSelectChange: onSelectChangeMock,
    };
    const user = userEvent.setup();
    render(<InputSelect {...props} />);

    await user.type(screen.getByTestId(props.inputId), "a");
    expect(onInputChangeMock).toHaveBeenLastCalledWith(props.inputValue + "a");

    await user.selectOptions(
      screen.getByTestId(props.selectId),
      props.options[2].label
    );
    expect(onSelectChangeMock).toHaveBeenLastCalledWith(props.options[2].value);
  });
});
