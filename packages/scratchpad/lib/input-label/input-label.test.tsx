import { render, screen } from "@testing-library/react";

import { InputLabel } from "./input-label";

describe("InputLabel", () => {
  test("renders InputLabel elements", () => {
    render(
      <InputLabel
        hideLabel={true}
        id="label-id"
        label="input-label"
      />
    );
    expect(screen.getByText("input-label")).toHaveAttribute("for", "label-id");
  });
});
