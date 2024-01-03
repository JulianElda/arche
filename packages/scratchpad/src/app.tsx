import { useState } from "react";
import { Input, Footer, Checkbox } from "lib";

function App() {
  const [count, setCount] = useState("count");
  const [isGandoo, setIsGandoo] = useState(true);

  return (
    <>
      <Input
        id="test-id"
        type="text"
        label="test-label"
        value={count}
        onChange={setCount}
      />
      <Checkbox
        id="test-checkbox"
        label="its a checkbox"
        value={isGandoo}
        onChange={setIsGandoo}
      />
      <Footer
        label="Julius Polar@GitHub"
        link="https://github.com/JulianElda/scratchpad"
      />
    </>
  );
}

export default App;
