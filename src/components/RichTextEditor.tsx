import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const BTN =
  "flex h-8 min-w-8 items-center justify-center rounded-md border border-border px-2 font-mono text-xs transition-colors hover:bg-foreground/10";
const BTN_ON = "bg-foreground/15 border-foreground/40 text-foreground";

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [3] } })],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "rte-content min-h-[120px] w-full rounded-b-lg border border-t-0 border-border bg-background/60 px-3 py-2 text-sm leading-relaxed focus:outline-none",
        "aria-label": placeholder ?? "Éditeur de contenu",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html === "<p></p>" ? "" : html);
    },
  });

  // Keep editor in sync if the value is replaced externally (e.g. switching chapter)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const incoming = value || "<p></p>";
    if (incoming !== current && (value || current !== "<p></p>")) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return null;

  const is = (name: string, attrs?: Record<string, unknown>) =>
    editor.isActive(name, attrs) ? `${BTN} ${BTN_ON}` : BTN;

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="flex flex-wrap gap-1 rounded-t-lg border border-border bg-card/60 p-1.5">
        <button type="button" className={is("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Gras">
          <strong>B</strong>
        </button>
        <button type="button" className={is("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italique">
          <em>i</em>
        </button>
        <button type="button" className={is("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Souligné">
          <u>U</u>
        </button>
        <button type="button" className={is("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} title="Barré">
          <s>S</s>
        </button>
        <span className="mx-1 w-px self-stretch bg-border" />
        <button type="button" className={is("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Titre">
          H
        </button>
        <button type="button" className={is("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Liste à puces">
          • —
        </button>
        <button type="button" className={is("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Liste numérotée">
          1.
        </button>
        <button type="button" className={is("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Citation">
          ❝
        </button>
        <span className="mx-1 w-px self-stretch bg-border" />
        <button type="button" className={BTN} onClick={() => editor.chain().focus().setHardBreak().run()} title="Saut de ligne">
          ↵
        </button>
        <button type="button" className={BTN} onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} title="Effacer le style">
          ⌫
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}