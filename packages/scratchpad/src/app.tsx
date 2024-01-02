import { useState } from "react";
import { Input, Footer } from "lib";

function App() {
  const [count, setCount] = useState("count");

  return (
    <>
      <Input
        id="test-id"
        type="text"
        label="test-label"
        value={count}
        onChange={setCount}
      />
      <p>count {count}</p>
      <Footer
        label="Julius Polar@GitHub"
        link="https://github.com/JulianElda/scratchpad"
      />
    </>
  );
}

export default App;
