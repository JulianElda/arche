<script lang="ts">
  import Card from "$lib/card/card.svelte";
  import MarkdownEditor from "$lib/markdown-editor/markdown-editor.svelte";

  let markdownContent = `# Hello Markdown
\`\`\`ts
console.log("Hello World")
\`\`\`

## This is a markdown editor built with CodeMirror in Svelte.

This is a (hyperlink)[https://example.com] and this is **bold text**.
`;
  const handleMarkdownChange = (newContent: string) => {
    markdownContent = newContent;
  };
</script>

<Card>
  <MarkdownEditor
    value={markdownContent}
    onChange={handleMarkdownChange} />
</Card>
