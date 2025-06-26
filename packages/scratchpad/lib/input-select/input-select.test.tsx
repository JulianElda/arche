import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { InputSelect } from "./input-select";
import { inputSelectProperties1 } from "./input-select.mocks";

describe("InputSelect", () => {
  test("renders InputSelect elements", () => {
    render(<InputSelect {...inputSelectProperties1} />);
    expect(
      screen.getByTestId(inputSelectProperties1.inputId)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(inputSelectProperties1.selectId)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(inputSelectProperties1.inputLabel)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(inputSelectProperties1.selectLabel)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(inputSelectProperties1.inputValue)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(inputSelectProperties1.options[0].label)
    ).toBeInTheDocument();
    expect(
      screen.getByText(inputSelectProperties1.inputLabel)
    ).toBeInTheDocument();
  });

  test("callbacks functions", async () => {
    const onInputChangeMock = vi.fn();
    const onSelectChangeMock = vi.fn();
    const properties: typeof inputSelectProperties1 = {
      ...inputSelectProperties1,
      onInputChange: onInputChangeMock,
      onSelectChange: onSelectChangeMock,
    };
    const user = userEvent.setup();
    render(<InputSelect {...properties} />);

    await user.type(screen.getByTestId(properties.inputId), "a");
    expect(onInputChangeMock).toHaveBeenLastCalledWith(
      properties.inputValue + "a"
    );

    await user.selectOptions(
      screen.getByTestId(properties.selectId),
      properties.options[2].label
    );
    expect(onSelectChangeMock).toHaveBeenLastCalledWith(
      properties.options[2].value
    );
  });
});
