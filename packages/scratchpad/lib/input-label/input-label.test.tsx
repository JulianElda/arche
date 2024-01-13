import { render, screen } from "@testing-library/react";
import { InputLabel } from "./input-label";

describe("InputLabel", () => {
  test("renders InputLabel elements", () => {
    render(
      <InputLabel
        id="label-id"
        label="input-label"
        hideLabel={true}
      />
    );
    expect(screen.getByText("input-label")).toHaveAttribute("for", "label-id");
  });
});
