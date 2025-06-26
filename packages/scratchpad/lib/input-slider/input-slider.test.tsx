import { render, screen } from "@testing-library/react";
import { InputSlider } from "lib/input-slider/input-slider";
import { inputSliderProperties1 } from "lib/input-slider/input-slider.mocks";

describe("InputSlider", () => {
  test("renders Input elements", () => {
    render(<InputSlider {...inputSliderProperties1} />);
    expect(
      screen.getByLabelText(inputSliderProperties1.label)
    ).toBeInTheDocument();
    expect(screen.getByText(inputSliderProperties1.label)).toBeInTheDocument();
    expect(screen.getByTestId(inputSliderProperties1.id)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(inputSliderProperties1.value)
    ).toBeInTheDocument();
  });

  test("renders InputSlider elements", () => {
    render(<InputSlider {...inputSliderProperties1} />);
    expect(screen.getByText(inputSliderProperties1.value)).toBeInTheDocument();
  });
});
