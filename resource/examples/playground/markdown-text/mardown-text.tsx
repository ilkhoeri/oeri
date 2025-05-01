"use client";
import { useState } from "react";
import { Textarea } from "@/ui/textarea";
import { CopyButton } from "@/source/assets/toggle";
import { Tabs } from "@/ui/tabs";
import { PlayTabs } from "@/source/assets/playtabs";
import { useRehype } from "@/resource/docs_demo/assets/rehype/use-rehype";

export function MarkdownText() {
  const [text, setText] = useState<string>("");

  const rehype = useRehype(text);

  const edit = (
    <>
      <Textarea name="playground" data-rehype-pretty-code-fragment="" id="playground" title="playground" aria-label="playground" cols={30} rows={10} className="relative !border-0 !bg-transparent scrollbar" spellCheck={false} value={text} onChange={e => setText(e.currentTarget.value)} />
      <CopyButton className="absolute right-4 top-4 z-9" value={text} />
      <span className="sr-only hidden [background-image:linear-gradient(135deg,#667eea_0%,#764ba2_100%)] hover:!text-white" />
      <span className="sr-only z-[3] hidden hover:!text-black active:scale-[0.985]" />
    </>
  );

  const preview = <div data-rehype-pretty-code-fragment="" className="textarea_class markdown-body relative flex-col whitespace-pre-line !border-0 !bg-transparent scrollbar" dangerouslySetInnerHTML={{ __html: rehype }} />;

  return (
    <Tabs defaultValue="preview" id="preview" className="mb-auto size-full scroll-m-20">
      <PlayTabs defaultValue="preview" childrens={{ edit, preview }} />
    </Tabs>
  );
}
