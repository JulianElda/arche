import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { InputSlider } from "./input-slider";
import { inputSliderProps1 } from "./input-slider.mocks";

test("render elements", async () => {
  const { getByLabelText, getByRole, getByTestId, getByText } = await render(
    <InputSlider
      id={inputSliderProps1.id}
      label={inputSliderProps1.label}
      max={inputSliderProps1.max}
      min={inputSliderProps1.min}
      value={inputSliderProps1.value}
    />,
  );
  await expect
    .element(getByLabelText(inputSliderProps1.label))
    .toBeInTheDocument();
  await expect.element(getByText(inputSliderProps1.label)).toBeInTheDocument();
  await expect
    .element(getByText(inputSliderProps1.value.toString()))
    .toBeInTheDocument();
  await expect.element(getByTestId(inputSliderProps1.id)).toBeInTheDocument();
  await expect
    .element(
      getByRole("slider", {
        name: inputSliderProps1.label,
      }),
    )
    .toBeInTheDocument();
});
