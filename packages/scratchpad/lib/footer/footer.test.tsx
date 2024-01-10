import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

test("renders footer elements", () => {
  render(
    <Footer
      label="Julius Polar@GitHub"
      link="https://github.com/JulianElda/scratchpad"
      darkTheme={true}
      toggleDarkTheme={vi.fn()}
    />
  );
  expect(screen.getByText(/Julius Polar/)).toBeInTheDocument();
  expect(screen.getByText(/GitHub/)).toBeInTheDocument();
});
