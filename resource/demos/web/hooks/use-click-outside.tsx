"use client";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { Button } from "@/ui/button";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useRef, useState } from "react";\nimport { useClickOutside } from "@/hooks/use-click-outside";\nimport { Button } from "@/ui/button";\n\nexport function UseClickOutsideDemo({ withRef }: { withRef?: boolean }) {\n  const [open, setOpen] = useState<boolean>(false);\n\n  const buttonRef = useRef<HTMLButtonElement>(null);\n  const contentRef = useRef<HTMLDivElement>(null);\n\n  useClickOutside(() => setOpen(false), [buttonRef, contentRef]);\n\n  return (\n    <>\n      <Button ref={withRef ? buttonRef : undefined} data-state={open ? "open" : "closed"} onClick={() => setOpen(!open)}>\n        {open ? "Close" : "Open"}\n      </Button>\n\n      {open && (\n        <div\n          ref={withRef ? contentRef : undefined}\n          data-state={open ? "open" : "closed"}\n          className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"\n        >\n          <span>{withRef ? "Click outside to close" : "Can\'t click outside to close"}</span>\n        </div>\n      )}\n    </>\n  );\n}'
};

function Demo({ withRef }: { withRef?: boolean }) {
  const [open, setOpen] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(() => setOpen(false), [buttonRef, contentRef]);

  return (
    <>
      <Button ref={withRef ? buttonRef : undefined} data-state={open ? "open" : "closed"} onClick={() => setOpen(!open)}>
        {open ? "Close" : "Open"}
      </Button>

      {open && (
        <div
          ref={withRef ? contentRef : undefined}
          data-state={open ? "open" : "closed"}
          className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        >
          <span>{withRef ? "Click outside to close" : "Can't click outside to close"}</span>
        </div>
      )}
    </>
  );
}

const usage: DataTrees = {
  type: "configurator",
  component: Demo,
  code: codes.usage,
  orientation: "vertical",
  classNames: { demoInner: "min-h-60 w-full centered relative" },
  controls: [{ prop: "withRef", type: "boolean", initialValue: false, libraryValue: false }]
};

export const UseClickOutsideDemos = {
  usage
};
