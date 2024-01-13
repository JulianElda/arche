import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectField } from "./select-field";
import { selectFieldProps1, selectFieldProps2 } from "./select-field.mocks";

test("renders select field", () => {
  render(<SelectField {...selectFieldProps2} />);
  expect(screen.getByTestId(selectFieldProps2.id)).toBeInTheDocument();
  expect(screen.getByDisplayValue(selectFieldProps2.value)).toBeInTheDocument();
});

describe("callbacks selected value", () => {
  test("find by option value", async () => {
    const onChangeMock = vi.fn();
    const testProps = {
      ...selectFieldProps2,
      onChange: onChangeMock,
    };
    const user = userEvent.setup();

    render(<SelectField {...testProps} />);

    await user.selectOptions(
      screen.getByTestId(testProps.id),
      testProps.options[0].value
    );
    expect(onChangeMock).toHaveBeenCalledWith(testProps.options[0].value);
  });

  test("find by option label", async () => {
    const onChangeMock = vi.fn();
    const testProps = {
      ...selectFieldProps1,
      onChange: onChangeMock,
    };
    const user = userEvent.setup();

    render(<SelectField {...testProps} />);

    await user.selectOptions(
      screen.getByTestId(testProps.id),
      testProps.options[2].label
    );
    expect(onChangeMock).toHaveBeenCalledWith(testProps.options[2].value);
  });
});
