import { useState } from "react";
import { Card, Input, Footer } from "lib";

function App() {
  const [phone, setPhone] = useState(12);

  const onChangePhone = (value: number) => {
    setPhone(value);
  };

  return (
    <Card>
      <Input
        id="test-id"
        type="number"
        label="test-phone"
        value={phone}
        onChange={onChangePhone as (value: string | number) => void}
      />
      <Footer
        label="Julius Polar@GitHub"
        link="https://github.com/JulianElda/scratchpad"
      />
    </Card>
  );
}

export default App;
