import { Card, Footer, InputSelect, Select } from "lib";
import { inputSelectProps1 } from "lib/input-select/input-select.mocks";
import { selectProps1 } from "lib/select/select.mocks";

function App() {
  return (
    <Card>
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
