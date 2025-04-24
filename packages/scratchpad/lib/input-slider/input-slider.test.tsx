import { render, screen } from "@testing-library/react";
import { InputSlider } from "lib/input-slider/input-slider";
import { inputSliderProps1 } from "lib/input-slider/input-slider.mocks";

describe("InputSlider", () => {
  test("renders Input elements", () => {
    render(<InputSlider {...inputSliderProps1} />);
    expect(screen.getByLabelText(inputSliderProps1.label)).toBeInTheDocument();
    expect(screen.getByText(inputSliderProps1.label)).toBeInTheDocument();
    expect(screen.getByTestId(inputSliderProps1.id)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(inputSliderProps1.value)
    ).toBeInTheDocument();
  });

  test("renders InputSlider elements", () => {
    render(<InputSlider {...inputSliderProps1} />);
    expect(screen.getByText(inputSliderProps1.value)).toBeInTheDocument();
  });
});
