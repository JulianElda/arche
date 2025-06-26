import { render, screen } from "@testing-library/react";
import { ProgressBar } from "lib/progress-bar/progress-bar";
import { progressBarProperties1 } from "lib/progress-bar/progress-bar.mocks";

describe("ProgressBar", () => {
  test("renders ProgressBar elements", () => {
    render(<ProgressBar {...progressBarProperties1} />);
    expect(screen.getByTestId(progressBarProperties1.id)).toBeInTheDocument();
    expect(screen.getByText(progressBarProperties1.label)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveValue(
      progressBarProperties1.value
    );
  });
});
