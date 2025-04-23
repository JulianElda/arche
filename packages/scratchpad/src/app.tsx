import { Card, Footer, Input, InputSelect, Select } from "lib";
import { inputSelectProps1 } from "lib/input-select/input-select.mocks";
import { inputProps4 } from "lib/input/input.mocks";
import { selectProps1 } from "lib/select/select.mocks";
import { useState } from "react";

function App() {
  const [value, setValue] = useState<number>(32);

  return (
    <Card>
      <Input
        {...inputProps4}
        value={value}
        onChange={(newValue) => setValue(newValue as number)}
      />
      <InputSelect {...inputSelectProps1} />
      <Select {...selectProps1} />
      <Footer
        label="Julius Polar@GitHub"
        link="https://github.com/JulianElda/scratchpad"
      />
    </Card>
  );
}

export default App;
