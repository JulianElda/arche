<script lang="ts">
  import Card from "$lib/card/card.svelte";
  import Checkbox from "$lib/checkbox/checkbox.svelte";
  import InputButton from "$lib/input-button/input-button.svelte";
  import InputSelect from "$lib/input-select/input-select.svelte";
  import Input from "$lib/input/input.svelte";
  import Select from "$lib/select/select.svelte";
  import { BadgeDollarSign } from "@lucide/svelte";

  let inputValue: string = $state("input value");
  let selectValue: string = $state("option1");
  let checkboxValue: boolean = $state(false);
  let inputButtonValue: string = $state("input button value");

  let inputSelectInputValue: string = $state("input select value");
  let inputSelectSelectValue: string = $state("option1");
</script>

<Card>
  <Input
    id="input"
    type="text"
    label="Test input"
    placeholder="Type something..."
    value={inputValue}
    onChange={(e) => (inputValue = e as string)} />
  <p class="mt-4">INPUT VALUE: {inputValue}</p>

  <Select
    id="select"
    label="Test select"
    options={[
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ]}
    value={selectValue}
    onChange={(e) => (selectValue = e)} />
  <p class="mt-4">SELECT VALUE: {selectValue}</p>

  <Checkbox
    id="checkbox"
    label="Test checkbox"
    onChange={(e) => (checkboxValue = e)}
    value={checkboxValue} />

  <InputButton
    id="input-button"
    buttonAriaLabel="Submit input button"
    icon={BadgeDollarSign}
    label="Test input button"
    placeholder="Type something..."
    type="text"
    value={inputButtonValue}
    onChange={(e) => (inputButtonValue = e as string)}
    onButtonClick={() => alert("Button clicked!")} />

  <InputSelect
    type="text"
    inputId="input-select-input"
    selectId="input-select-select"
    inputLabel="Test input select"
    selectLabel="Test input select"
    inputPlaceholder="Type something..."
    options={[
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ]}
    inputValue={inputSelectInputValue}
    selectValue={inputSelectSelectValue}
    onInputChange={(e) => (inputSelectInputValue = e as string)}
    onSelectChange={(e) => (inputSelectSelectValue = e)} />
  <p class="mt-4">INPUT SELECT INPUT VALUE: {inputSelectInputValue}</p>
  <p class="mt-4">INPUT SELECT SELECT VALUE: {inputSelectSelectValue}</p>
</Card>
