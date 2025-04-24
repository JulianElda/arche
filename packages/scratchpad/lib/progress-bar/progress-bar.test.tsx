import { render, screen } from "@testing-library/react";
import { ProgressBar } from "lib/progress-bar/progress-bar";
import { progressBarProps1 } from "lib/progress-bar/progress-bar.mocks";

describe("ProgressBar", () => {
  test("renders ProgressBar elements", () => {
    render(<ProgressBar {...progressBarProps1} />);
    expect(screen.getByTestId(progressBarProps1.id)).toBeInTheDocument();
    expect(screen.getByText(progressBarProps1.label)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveValue(
      progressBarProps1.value
    );
  });
});
