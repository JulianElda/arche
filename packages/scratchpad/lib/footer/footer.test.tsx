import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Footer } from "./footer";

test("renders footer elements", () => {
  render(
    <Footer
      label="Julius Polar@GitHub"
      link="https://github.com/JulianElda/scratchpad"
    />
  );
  expect(screen.getByText(/Julius Polar/)).toBeInTheDocument();
  expect(screen.getByText(/GitHub/)).toBeInTheDocument();
});
