import { render, screen } from "@testing-library/react";
import { Card } from "./card";

test("renders child content", () => {
  render(
    <Card>
      <p>card content</p>
    </Card>
  );
  expect(screen.getByText("card content")).toBeInTheDocument();
});
