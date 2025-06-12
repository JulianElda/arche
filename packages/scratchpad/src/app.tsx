import { Input, Card, Footer } from "lib";
import { inputProps2 } from "lib/input/input.mocks";
import { useState } from "react";

function App() {
  const [value, setValue] = useState<number>(inputProps2.value as number);

  const double = value * 2;
  return (
    <div className="mx-auto max-w-lg pt-16">
      <Card>
        <div className="flex flex-col space-y-4">
          <Input
            {...inputProps2}
            type="number"
            value={value}
            onChange={(newValue) => setValue(newValue as number)}
          />
          <strong>{double}</strong>
        </div>
      </Card>
      <Footer
        label="Julius Polar"
        link="https://github.com/JulianElda/scratchpad"
        extraClass="max-w-lg"
      />
    </div>
  );
}

export default App;
