import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextArea } from "lib/textarea/textarea";
import { textAreaProps1 } from "lib/textarea/textarea.mocks";

describe("TextArea", () => {
  test("render TextArea elements", () => {
    render(<TextArea {...textAreaProps1} />);
    expect(screen.getByLabelText(textAreaProps1.label)).toBeInTheDocument();
    expect(screen.getByText(textAreaProps1.label)).toBeInTheDocument();
    expect(screen.getByTestId(textAreaProps1.id)).toBeInTheDocument();
    expect(screen.getByDisplayValue(textAreaProps1.value)).toBeInTheDocument();
  });

  test("callbacks function when typed", async () => {
    const onChangeMock = vi.fn();
    const props: typeof textAreaProps1 = {
      ...textAreaProps1,
      onChange: onChangeMock,
    };
    const user = userEvent.setup();
    render(<TextArea {...props} />);

    await user.type(screen.getByTestId(props.id), "a");
    expect(onChangeMock).toHaveBeenLastCalledWith(props.value + "a");
  });
});
