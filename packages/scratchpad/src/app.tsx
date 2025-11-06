import { Card, Input, InputSelect } from "lib";
import { useState } from "react";

function App() {
  const [value, setValue] = useState(123);
  const [selected, setSelected] = useState("option-1");

  return (
    <div className="mx-auto max-w-lg pt-16">
      <Card>
        <div className="flex flex-col space-y-4">
          <p>{value}</p>
          <InputSelect
            inputId="input-select"
            inputLabel="Input Select"
            inputValue={value}
            onInputChange={(v) => setValue(v as number)}
            onSelectChange={(v) => setSelected(v as string)}
            options={[
              { label: "Option 1", value: "option-1" },
              { label: "Option 2", value: "option-2" },
            ]}
            selectId="select-select"
            selectLabel="Select"
            selectValue={selected}
            type="number"
          />
          <Input
            id="input"
            label="Input"
            onChange={(v) => setValue(v as number)}
            type="number"
            value={value}
          />
        </div>
      </Card>
    </div>
  );
}

export default App;
