import { useState } from "react";
import { Button, Card, Input, Footer, Checkbox, useDarkMode } from "lib";

function App() {
  const [name, setName] = useState("name");
  const [isChecked, setIsChecked] = useState(true);
  const { isDarkTheme, toggleDarkTheme } = useDarkMode();

  return (
    <Card>
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
