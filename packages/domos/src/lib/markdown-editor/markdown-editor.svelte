<script lang="ts">
  import { onMount } from "svelte";
  import { basicSetup } from "codemirror";
  import { EditorView } from "@codemirror/view";
  import { EditorState } from "@codemirror/state";
  import { markdown, markdownLanguage } from "@codemirror/lang-markdown";

  interface MarkdownEditorProps {
    value: string;
    onChange: (newValue: string) => void;
  }
  const { onChange, value }: MarkdownEditorProps = $props();

  let editorDiv: HTMLDivElement;
  let editor: EditorView;
  let saveTimer: any;

  onMount(async () => {
    editor = new EditorView({
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
      parent: editorDiv,
    });
  });
</script>

<div
  bind:this={editorDiv}
  style="height:100vh; width:100%;">
</div>
