import { Card, Checkbox, Footer } from "lib";
import { useState } from "react";

function App() {
  const [value, setValue] = useState(true);

  return (
    <div className="mx-auto max-w-lg pt-16">
      <Card>
        <div className="flex flex-col space-y-4">
          <Checkbox
            id=""
            label="checkboxx"
            onChange={() => setValue((value_) => !value_)}
            value={value}
          />
        </div>
      </Card>
      <Footer
        extraClass="max-w-lg"
        label="Julius Polar"
        link="https://github.com/JulianElda/scratchpad"
      />
    </div>
  );
}

export default App;
