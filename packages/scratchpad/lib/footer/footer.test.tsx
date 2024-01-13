import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Footer } from "./footer";
import { footerProps } from "./footer.mocks";

describe("Footer", () => {
  test("renders Footer elements", () => {
    render(<Footer {...footerProps} />);
    expect(screen.getByText(/Julius Polar/)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/)).toBeInTheDocument();
  });

  test("callbacks function on click dark icon", async () => {
    const toggleDarkThemeMock = vi.fn();
    const props: typeof footerProps = {
      ...footerProps,
      toggleDarkTheme: toggleDarkThemeMock,
    };
    const user = userEvent.setup();
    render(<Footer {...props} />);

    await user.click(screen.getByTestId("footer-toggle-light"));
    expect(toggleDarkThemeMock).toHaveBeenCalled();
  });

  test("callbacks function on click light icon", async () => {
    const toggleDarkThemeMock = vi.fn();
    const props: typeof footerProps = {
      ...footerProps,
      darkTheme: false,
      toggleDarkTheme: toggleDarkThemeMock,
    };
    const user = userEvent.setup();
    render(<Footer {...props} />);

    await user.click(screen.getByTestId("footer-toggle-dark"));
    expect(toggleDarkThemeMock).toHaveBeenCalled();
  });
});
