import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Footer } from "./footer";

test("renders footer elements", () => {
  render(<Footer />);
  expect(screen.getByText(/Julius Polar/)).toBeInTheDocument();
  expect(screen.getByText(/GitHub/)).toBeInTheDocument();
});
