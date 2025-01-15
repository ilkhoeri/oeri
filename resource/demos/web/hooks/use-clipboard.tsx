"use client";
import { useState } from "react";
import { useClipboard } from "@/hooks/use-clipboard";
import { CheckIcon, CopyIcon } from "@/icons/*";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { Input } from "@/ui/input";
import { Stack } from "@/ui/stack";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { Button } from "@/ui/button";\nimport { Input } from "@/ui/input";\nimport { Stack } from "@/ui/stack";\nimport { Typography } from "@/ui/typography";\nimport { CheckIcon, CopyIcon } from "@/icons/*";\nimport { useClipboard } from "@/hooks/use-clipboard";\n\nexport function UseClipboardDemo() {\n  const { copy, copied, error } = useClipboard();\n  const [text, setText] = useState<string | undefined>(undefined);\n\n  if (error) return <Typography className="text-sm text-destructive">{error.message}</Typography>;\n\n  return (\n    <Stack className="m-auto size-full max-w-96">\n      <Button\n        title="copy"\n        variant="outline"\n        color="green"\n        size="icon"\n        aria-label="copy button"\n        disabled={!text}\n        onClick={() => {\n          if (text) copy(text);\n        }}\n      >\n        {copied ? <CheckIcon /> : <CopyIcon />}\n      </Button>\n\n      <Input id="set-text" title="input text" placeholder="input text to copy" onChange={e => setText(e.target.value)} />\n    </Stack>\n  );\n}'
};

function Demo() {
  const { copy, copied, error } = useClipboard();
  const [text, setText] = useState<string | undefined>(undefined);

  if (error) return <Typography className="text-sm text-destructive">{error.message}</Typography>;

  return (
    <Stack className="m-auto size-full max-w-96">
      <Button
        title="copy"
        variant="outline"
        color="green"
        size="icon"
        aria-label="copy button"
        disabled={!text}
        onClick={() => {
          if (text) copy(text);
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>

      <Input id="set-text" title="input text" placeholder="input text to copy" onChange={e => setText(e.target.value)} />
    </Stack>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered" }
};

export const UseClipboardDemos = {
  usage
};
