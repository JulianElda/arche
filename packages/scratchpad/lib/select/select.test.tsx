import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./select";
import { selectProps1, selectProps2 } from "./select.mocks";

describe("renders select", () => {
  test("hideLabel not specified", () => {
    render(<Select {...selectProps1} />);
    expect(screen.getByTestId(selectProps1.id)).toBeInTheDocument();
    expect(screen.getByLabelText(selectProps1.label)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(selectProps1.options[0].label)
    ).toBeInTheDocument();
  });

  test("label shown", () => {
    const props = { ...selectProps1, hideLabel: false };
    render(<Select {...props} />);
    expect(screen.getByTestId(selectProps1.id)).toBeInTheDocument();
    expect(screen.getByLabelText(selectProps1.label)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(selectProps1.options[0].label)
    ).toBeInTheDocument();
  });

  test("label hidden", () => {
    const props = { ...selectProps1, hideLabel: true };
    render(<Select {...props} />);
    expect(screen.getByTestId(selectProps1.id)).toBeInTheDocument();
    expect(screen.getByLabelText(selectProps1.label)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(selectProps1.options[0].label)
    ).toBeInTheDocument();
  });
});

describe("callbacks selected value", () => {
  test("find by option value", async () => {
    const onChangeMock = vi.fn();
    const testProps = {
      ...selectProps2,
      onChange: onChangeMock,
    };
    const user = userEvent.setup();

    render(<Select {...testProps} />);

    await user.selectOptions(
      screen.getByTestId(testProps.id),
      testProps.options[0].value
    );
    expect(onChangeMock).toHaveBeenCalledWith(testProps.options[0].value);
  });

  test("find by option label", async () => {
    const onChangeMock = vi.fn();
    const testProps = {
      ...selectProps2,
      onChange: onChangeMock,
    };
    const user = userEvent.setup();

    render(<Select {...testProps} />);

    await user.selectOptions(
      screen.getByTestId(testProps.id),
      testProps.options[2].label
    );
    expect(onChangeMock).toHaveBeenCalledWith(testProps.options[2].value);
  });
});
