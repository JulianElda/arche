import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Hyperlink } from "./hyperlink";

test("renders hyperlink element", () => {
  render(
    <Hyperlink
      link="https://julianelda.github.io"
      text="GitHub"
    />
  );
  expect(screen.getByText(/GitHub/)).toHaveAttribute(
    "href",
    "https://julianelda.github.io"
  );
});
