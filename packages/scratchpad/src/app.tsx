import { useState } from "react";
import {
  Button,
  Card,
  Input,
  Footer,
  Checkbox,
  InputButton,
  InputSelect,
  useDarkMode,
} from "lib";

function App() {
  const [name, setName] = useState("name");
  const [isChecked, setIsChecked] = useState(true);
  const [selectedOption, setSelectedOption] = useState("one");
  const options = [
    {
      label: "One",
      value: "one",
    },
    {
      label: "Two",
      value: "two",
    },
  ];

  const { isDarkTheme, toggleDarkTheme } = useDarkMode();

  return (
    <Card>
      <InputButton
        id="input-button"
        label="Input button"
        type="text"
        value={name}
        onChange={setName}
        buttonAriaLabel="copy"
        icon={<span>copy</span>}
        onButtonClick={() => console.log("input button")}
      />
      <InputSelect
        type="text"
        inputId="test-inputselect-input"
        selectId="test-inputselect-select"
        inputLabel="Input select"
        selectLabel="Input select options"
        inputValue={name}
        onInputChange={setName}
        selectValue={selectedOption}
        onSelectChange={setSelectedOption}
        options={options}
      />
      <Input
        id="test-id"
        type="text"
        label="test-label"
        value={name}
        onChange={setName}
      />
      <Checkbox
        id="test-checkbox"
        label="its a checkbox"
        value={isChecked}
        onChange={setIsChecked}
      />
      <Button
        type="button"
        style="primary"
        id="test-button"
        text="its a button"
        onClick={() => {
          console.log("clicked");
        }}
      />
      <Button
        type="button"
        style="secondary"
        id="test-button2"
        text="its a button"
        onClick={() => {
          console.log("clicked");
        }}
      />
      <Footer
        label="Julius Polar@GitHub"
        link="https://github.com/JulianElda/scratchpad"
        darkTheme={isDarkTheme}
        toggleDarkTheme={toggleDarkTheme}
      />
    </Card>
  );
}

export default App;
