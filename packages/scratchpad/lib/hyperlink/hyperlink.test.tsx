import { render, screen } from "@testing-library/react";
import { Hyperlink } from "./hyperlink";
import {
  hyperlinkPropsDefault,
  hyperlinkPropsAsterisk,
  hyperlinkPropsNoAsterisk,
} from "./hyperlink.mocks";

describe("Hyperlink", () => {
  test("shows asterisks by default", () => {
    render(<Hyperlink {...hyperlinkPropsDefault} />);
    expect(screen.getByText(/GitHub/)).toHaveAttribute(
      "href",
      hyperlinkPropsDefault.href
    );
    expect(
      screen.getByText(hyperlinkPropsDefault.title + "*")
    ).toBeInTheDocument();
  });

  test("shows asterisks", () => {
    render(<Hyperlink {...hyperlinkPropsAsterisk} />);
    expect(screen.getByText(/GitHub/)).toHaveAttribute(
      "href",
      hyperlinkPropsAsterisk.href
    );
    expect(
      screen.getByText(hyperlinkPropsAsterisk.title + "*")
    ).toBeInTheDocument();
  });

  test("shows no asterisks", () => {
    render(<Hyperlink {...hyperlinkPropsNoAsterisk} />);
    expect(
      screen.getByText(hyperlinkPropsNoAsterisk.title)
    ).toBeInTheDocument();
  });
});
