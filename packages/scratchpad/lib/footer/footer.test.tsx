import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";
import { footerProps } from "./footer.mocks";
import { mockMatchMedia, mockStorage } from "lib/test-utils";

describe("Footer", () => {
  mockStorage("localStorage");
  mockMatchMedia(true);

  test("renders Footer elements", () => {
    render(<Footer {...footerProps} />);
    expect(screen.getByText(/Julius Polar/)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/)).toBeInTheDocument();
  });
});
