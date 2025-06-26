import { render, screen } from "@testing-library/react";
import { mockMatchMedia, mockStorage } from "lib/test-utilities";

import { Footer } from "./footer";
import { footerProperties } from "./footer.mocks";

describe("Footer", () => {
  mockStorage("localStorage");
  mockMatchMedia(true);

  test("renders Footer elements", () => {
    render(<Footer {...footerProperties} />);
    expect(screen.getByText(/Julius Polar/)).toBeInTheDocument();
  });
});
