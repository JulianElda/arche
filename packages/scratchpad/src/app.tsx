import { Card, Footer, InputSelect, Select } from "lib";
import { inputSelectProps1 } from "lib/input-select/input-select.mocks";
import { InputSlider } from "lib/input-slider/input-slider";
import { ProgressBar } from "lib/progress-bar/progress-bar";
import { selectProps1 } from "lib/select/select.mocks";
import { useState } from "react";

function App() {
  const [value, setValue] = useState<number>(16);

  return (
    <div className="mx-auto max-w-lg pt-16">
      <Card>
        <InputSlider
          id="input-range"
          label="Range"
          value={value}
          min={4}
          max={32}
          onChange={(newValue) => setValue(newValue as number)}
        />
        <InputSelect {...inputSelectProps1} />
        <Select {...selectProps1} />
        <ProgressBar
          min={4}
          max={32}
          value={value}
          id="bar-1"
          label="Test bar"
        />
        <Footer
          label="Julius Polar@GitHub"
          link="https://github.com/JulianElda/scratchpad"
        />
      </Card>
    </div>
  );
}

export default App;
