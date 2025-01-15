"use client";
import { useState } from "react";
import { Input } from "@/ui/input";
import { Stack } from "@/ui/stack";
import { Typography } from "@/ui/typography";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { purify } from "@/source/libs/dom-purify";

function Demo() {
  const [newTitle, setNewTitle] = useState<string>("describe your title");
  useDocumentTitle(newTitle);

  return (
    <Stack className="m-auto max-w-96">
      <Input value={purify(newTitle)} onChange={e => setNewTitle(e.target.value)} />
      <Typography prose="p">Changing the title on the &lt;title&gt; Element:</Typography>
    </Stack>
  );
}

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { Input } from "@/ui/input";\nimport { Stack } from "@/ui/stack";\nimport { Typography } from "@/ui/typography";\nimport { useDocumentTitle } from "@/hooks/use-document-title";\n\nexport function UseDocumentTitleDemo() {\n  const [newTitle, setNewTitle] = useState<string>("describe your title");\n  useDocumentTitle(newTitle);\n\n  return (\n    <Stack className="m-auto max-w-96">\n      <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} />\n      <Typography prose="p">Changing the title on the &lt;title&gt; Element:</Typography>\n    </Stack>\n  );\n}'
};

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered" }
};

export const UseDocumentTitleDemos = {
  usage
};
