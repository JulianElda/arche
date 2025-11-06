import { expect, test } from "vitest";
import { render } from "vitest-browser-react";

import { Card } from "./card.tsx";

test("renders content", async () => {
  const { getByText } = await render(
    <Card>
      <p>Test content</p>
    </Card>
  );
  await expect.element(getByText("Test content")).toBeInTheDocument();
});
