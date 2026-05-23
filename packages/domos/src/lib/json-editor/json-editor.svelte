<script lang="ts">
  import Button from "$lib/button/button.svelte";
  import { codeToHtml } from "shiki";

  const { jsonText, setJsonText } = $props<{
    jsonText: string;
    setJsonText: (text: string) => void;
  }>();

  let highlighted = $state("");

  let textareaRef: HTMLTextAreaElement | undefined;
  let preRef: HTMLDivElement | undefined;
  let gutterRef: HTMLDivElement | undefined;
  let mirrorRef: HTMLDivElement | undefined;

  /* ---------------------------------------------
   * Highlighting
   * --------------------------------------------- */
  $effect(() => {
    let cancelled = false;

    (async () => {
      const html = await codeToHtml(jsonText, {
        lang: "json",
        theme: "ayu-dark",
      });

      if (!cancelled) {
        highlighted = html;
      }
    })();

    return () => {
      cancelled = true;
    };
  });

  /* ---------------------------------------------
   * Scroll sync
   * --------------------------------------------- */
  function handleScroll() {
    if (!textareaRef || !preRef || !gutterRef) return;

    preRef.scrollTop = textareaRef.scrollTop;
    preRef.scrollLeft = textareaRef.scrollLeft;
    gutterRef.scrollTop = textareaRef.scrollTop;
  }

  /* ---------------------------------------------
   * Line numbers
   * --------------------------------------------- */
  const lineNumbers = $derived<number[]>(
    jsonText.split("\n").map((_: string, i: number) => i + 1)
  );

  /* ---------------------------------------------
   * Actions
   * --------------------------------------------- */
  function onPrettify() {
    const parsed = JSON.parse(jsonText);
    setJsonText(JSON.stringify(parsed, undefined, 2));
  }

  function onSort() {
    const parsed = JSON.parse(jsonText);
    setJsonText(JSON.stringify(parsed, undefined, 2));
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== "Tab") return;

    e.preventDefault();
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;

    setJsonText(jsonText.slice(0, start) + "  " + jsonText.slice(end));

    queueMicrotask(() => {
      if (!textareaRef) return;
      textareaRef.selectionStart = textareaRef.selectionEnd = start + 2;
    });
  }
</script>

<div>
  <div class="flex gap-2 pb-2">
    <Button
      id="prettify"
      type="button"
      text="Prettify"
      style="primary"
      onClick={onPrettify} />
    <Button
      id="sort"
      type="button"
      text="Sort"
      style="primary"
      onClick={onSort} />
  </div>

  <div
    class="relative flex w-full overflow-hidden rounded border bg-card-background-light dark:bg-card-background-dark">
    <!-- Gutter -->
    <div
      bind:this={gutterRef}
      class="overflow-hidden bg-neutral-900 p-2 font-mono leading-relaxed text-gray-500 select-none">
      {#each lineNumbers as line (line)}<div class="px-1 text-right">
          {line}
        </div>{/each}
    </div>

    <!-- Editor -->
    <div class="relative flex-1">
      <!-- Highlighted code -->
      <div
        bind:this={preRef}
        class="pointer-events-none absolute inset-0 p-2 font-mono leading-relaxed wrap-break-word whitespace-pre-wrap">
        {@html highlighted}
      </div>

      <!-- Mirror (controls height) -->
      <div
        bind:this={mirrorRef}
        class="pointer-events-none invisible absolute top-0 left-0 w-full p-2 font-mono leading-relaxed wrap-break-word whitespace-pre-wrap">
        {jsonText + "\n"}
      </div>

      <!-- Textarea -->
      <textarea
        bind:this={textareaRef}
        class="relative w-full resize-none overflow-hidden bg-transparent p-2 font-mono leading-relaxed wrap-break-word whitespace-pre-wrap text-transparent caret-white focus:ring-0 focus:outline-none"
        style="height: {mirrorRef?.offsetHeight ?? 0}px"
        value={jsonText}
        spellcheck="false"
        oninput={(e) => setJsonText((e.target as HTMLTextAreaElement).value)}
        onkeydown={onKeyDown}
        onscroll={handleScroll}></textarea>
    </div>
  </div>
</div>
