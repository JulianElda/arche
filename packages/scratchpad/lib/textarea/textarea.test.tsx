import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextArea } from "lib/textarea/textarea";
import { textAreaProperties1 } from "lib/textarea/textarea.mocks";

describe("TextArea", () => {
  test("render TextArea elements", () => {
    render(<TextArea {...textAreaProperties1} />);
    expect(
      screen.getByLabelText(textAreaProperties1.label)
    ).toBeInTheDocument();
    expect(screen.getByText(textAreaProperties1.label)).toBeInTheDocument();
    expect(screen.getByTestId(textAreaProperties1.id)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(textAreaProperties1.value)
    ).toBeInTheDocument();
  });

  test("callbacks function when typed", async () => {
    const onChangeMock = vi.fn();
    const properties: typeof textAreaProperties1 = {
      ...textAreaProperties1,
      onChange: onChangeMock,
    };
    const user = userEvent.setup();
    render(<TextArea {...properties} />);

    await user.type(screen.getByTestId(properties.id), "a");
    expect(onChangeMock).toHaveBeenLastCalledWith(properties.value + "a");
  });
});
