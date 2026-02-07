<script lang="ts">
  import Card from "$lib/card/card.svelte";
  import Input from "$lib/input/input.svelte";
  import Select from "$lib/select/select.svelte";

  let inputValue: string = $state("input value");
  let selectValue: string = $state("option1");
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
</Card>
