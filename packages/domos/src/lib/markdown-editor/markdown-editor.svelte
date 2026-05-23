<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // oxlint-disable no-unassigned-vars
  import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
  import { EditorState } from "@codemirror/state";
  import { EditorView } from "@codemirror/view";
  import { basicSetup } from "codemirror";
  import { onMount } from "svelte";

  interface MarkdownEditorProps {
    onChange: (newValue: string) => void;
    value: string;
  }
  const { onChange, value }: MarkdownEditorProps = $props();

  let editorDiv: HTMLDivElement;
  let editor: EditorView;
  let saveTimer: ReturnType<typeof setTimeout>;

  onMount(async () => {
    editor = new EditorView({
      parent: editorDiv,
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          markdown({ base: markdownLanguage }),
          EditorView.updateListener.of((update) => {
            if (!update.docChanged) {
              return;
            }

            const newContent = update.state.doc.toString();
            clearTimeout(saveTimer);
            saveTimer = setTimeout(() => {
              if (update.docChanged) {
                onChange(newContent);
              }
            }, 500);
          }),
        ],
      }),
    });
  });
</script>

<div
  bind:this={editorDiv}
  style="height:100vh; width:100%;">
</div>
