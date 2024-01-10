import { render, screen } from "@testing-library/react";
import { Hyperlink } from "./hyperlink";

describe("hyperlink", () => {
  test("renders hyperlink element", () => {
    render(
      <Hyperlink
        href="https://julianelda.github.io"
        title="GitHub"
      />
    );
    expect(screen.getByText(/GitHub/)).toHaveAttribute(
      "href",
      "https://julianelda.github.io"
    );
  });

  test("shows asterisks by default", () => {
    render(
      <Hyperlink
        href="https://julianelda.github.io"
        title="GitHub"
      />
    );
    expect(screen.getByText("GitHub*")).toBeInTheDocument();
  });

  test("shows no asterisks", () => {
    render(
      <Hyperlink
        href="https://julianelda.github.io"
        title="GitHub"
        asterisk={false}
      />
    );
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });
});
