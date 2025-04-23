"use client";
import { useState } from "react";
import { Group } from "@/ui/group";
import { Button } from "@/ui/button";
import { Kbd, kbdMatcher } from "@/ui/kbd";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { Group } from "@/ui/group";\nimport { Button } from "@/ui/button";\nimport { Kbd, kbdMatcher } from "@/ui/kbd";\nimport { useHotkeys } from "@/hooks/use-hotkeys";\n\nexport function UseHotkeysDemo({ hotKeys = "ctrl+X" }: { hotKeys?: string }) {\n  const [open, setOpen] = useState<boolean>(false);\n\n  useHotkeys([[hotKeys, () => setOpen(o => !o)]]);\n\n  const [items, separators] = kbdMatcher(hotKeys);\n  const [items2, separators2] = kbdMatcher(["/", "M", "ctrl+X", "ctrl+K", "alt+mod+shift+X"].join("|"));\n\n  return (\n    <>\n      <Button asChild variant="outline">\n        <Group gap={4} className="h-auto w-max">\n          <Kbd items={items} separator={index => separators[index]} /> to {open ? "close" : "open"}\n        </Group>\n      </Button>\n\n      {open && (\n        <div role="tooltip" aria-label="modal" className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100">\n          <Group gap={4}>\n            <Kbd size="sm" items={items2} separator={index => separators2[index]} />\n          </Group>\n        </div>\n      )}\n    </>\n  );\n}'
};

function Demo({ hotKeys = "ctrl+X" }: { hotKeys?: string }) {
  const [open, setOpen] = useState<boolean>(false);

  useHotkeys([[hotKeys, () => setOpen(o => !o)]]);

  const [items, separators] = kbdMatcher(hotKeys);
  const [items2, separators2] = kbdMatcher(["/", "M", "ctrl+X", "ctrl+K", "alt+mod+shift+X"].join("|"));

  return (
    <>
      <Button asChild variant="outline">
        <Group gap={4} className="h-auto w-max">
          <Kbd items={items} separator={index => separators[index]} /> to {open ? "close" : "open"}
        </Group>
      </Button>

      {open && (
        <div role="tooltip" aria-label="modal" className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100">
          <Group gap={4}>
            <Kbd size="sm" items={items2} separator={index => separators2[index]} />
          </Group>
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
  controls: [{ prop: "hotKeys", type: "string", initialValue: "ctrl+X", libraryValue: null }]
};

export const UseHotkeysDemos = {
  usage
};
