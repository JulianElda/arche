import { Card, Footer, Checkbox } from "lib";
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
            value={value}
            onChange={() => setValue((val) => !val)}
          />
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
