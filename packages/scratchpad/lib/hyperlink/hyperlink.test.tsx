import { render, screen } from "@testing-library/react";

import { Hyperlink } from "./hyperlink";
import {
  hyperlinkPropertiesAsterisk,
  hyperlinkPropertiesDefault,
  hyperlinkPropertiesNoAsterisk,
} from "./hyperlink.mocks";

describe("Hyperlink", () => {
  test("shows asterisks by default", () => {
    render(<Hyperlink {...hyperlinkPropertiesDefault} />);
    expect(screen.getByText(/GitHub/)).toHaveAttribute(
      "href",
      hyperlinkPropertiesDefault.href
    );
    expect(
      screen.getByText(hyperlinkPropertiesDefault.title + "*")
    ).toBeInTheDocument();
  });

  test("shows asterisks", () => {
    render(<Hyperlink {...hyperlinkPropertiesAsterisk} />);
    expect(screen.getByText(/GitHub/)).toHaveAttribute(
      "href",
      hyperlinkPropertiesAsterisk.href
    );
    expect(
      screen.getByText(hyperlinkPropertiesAsterisk.title + "*")
    ).toBeInTheDocument();
  });

  test("shows no asterisks", () => {
    render(<Hyperlink {...hyperlinkPropertiesNoAsterisk} />);
    expect(
      screen.getByText(hyperlinkPropertiesNoAsterisk.title)
    ).toBeInTheDocument();
  });
});
