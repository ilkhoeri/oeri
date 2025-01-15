"use client";
import { useState } from "react";
import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { useMeasureScrollbar } from "@/hooks/use-measure-scrollbar";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { Button } from "@/ui/button";\nimport { Typography } from "@/ui/typography";\nimport { useMeasureScrollbar } from "@/hooks/use-measure-scrollbar";\n\nexport function UseMeasureScrollbarDemo() {\n  const [open, setOpen] = useState<boolean>(false);\n  const [, scrollbarWidth] = useMeasureScrollbar(open);\n\n  return (\n    <>\n      <Button data-state={open ? "open" : "closed"} onClick={() => setOpen(o => !o)} className="w-24">\n        {open ? "Close" : "Open"}\n      </Button>\n      {open && (\n        <div\n          data-state={open ? "open" : "closed"}\n          className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"\n        >\n          <Typography prose="muted">Scroll body removed</Typography>\n        </div>\n      )}\n      <Typography el="p" prose="h4" className="absolute left-0 top-0">\n        browser scrollbar: {scrollbarWidth}px\n      </Typography>\n    </>\n  );\n}'
};

function Demo() {
  const [open, setOpen] = useState<boolean>(false);
  const [, scrollbarWidth] = useMeasureScrollbar(open);

  return (
    <>
      <Button data-state={open ? "open" : "closed"} onClick={() => setOpen(o => !o)} className="w-24">
        {open ? "Close" : "Open"}
      </Button>
      {open && (
        <div
          data-state={open ? "open" : "closed"}
          className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        >
          <Typography prose="muted">Scroll body removed</Typography>
        </div>
      )}
      <Typography el="p" prose="h4" className="absolute left-0 top-0">
        browser scrollbar: {scrollbarWidth}px
      </Typography>
    </>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

export const UseMeasureScrollbarDemos = {
  usage
};
