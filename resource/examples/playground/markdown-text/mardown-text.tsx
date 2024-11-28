"use client";
import { useState } from "react";
import { Textarea } from "@/modules/components/web/textarea";
import { CopyButton } from "@/source/ui/toggle";
import { markdownText } from "./markdown-text";
import { Tabs } from "@/source/ui/tabs";
import { Playground } from "@/source/ui/playground";

export function MarkdownText() {
  const [text, setText] = useState<string>(sample);

  const edit = (
    <>
      <Textarea
        name="playground"
        data-rehype-pretty-code-fragment=""
        id="playground"
        title="playground"
        aria-label="playground"
        cols={30}
        rows={10}
        className="!border-0 !bg-transparent scrollbar"
        spellCheck={false}
        value={text}
        onChange={e => setText(e.currentTarget.value)}
      />
      <CopyButton className="absolute right-4 top-4 z-9" value={text} />
    </>
  );

  const preview = (
    <div
      data-rehype-pretty-code-fragment=""
      className="textarea_class markdown-body flex-col whitespace-pre-line !border-0 !bg-transparent scrollbar"
      dangerouslySetInnerHTML={{ __html: markdownText(text) }}
    />
  );

  return (
    <Tabs
      defaultValue="preview"
      id="preview"
      className="mb-auto size-full scroll-m-20">
      <Playground childrens={{ edit, preview }} />
    </Tabs>
  );
}

const sample = `<div align="center">
  <a href="https://www.github.com/ilkhoeri/modules" target="_blank">
    <img src="https://raw.githubusercontent.com/ioeridev/.github/main/profile/ioeri-512x512.png" alt="ioeri" height="200" style="width: 200px;height: 200px;border-radius: 8px;overflow: hidden;" />
  </a>
</div>

___

# Title h1

## Title h2

### Title h3

1 ordered...
2 ordered...
3 ordered...
4 ordered...

- unordered list 1
- unordered list 2
- unordered list 3
- un ordered list 4

> blockquote

[Link](https://...)

<address@mail.com>

\`\`\`\
function stripHtml(text: string) {
  text = text.replace(/<[^>]*>/g, "");
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  return text.trim();
}
\`\`\`\

<div align="left">
  <a href="https://www.npmjs.com/package/ioeri">
    <img src="https://badgen.net/npm/v/ioeri" alt="version" />
  </a>
  <a href="https://npmjs.org/package/ioeri">
    <img src="https://badgen.now.sh/npm/dm/ioeri" alt="downloads" />
  </a>
</div>
`;
