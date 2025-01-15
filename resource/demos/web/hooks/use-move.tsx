"use client";
import { useState } from "react";
import { useMove } from "@/hooks/use-move";
import { Typography } from "@/ui/typography";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { useMove } from "@/hooks/use-move";\nimport { Typography } from "@/ui/typography";\n\nexport function UseMoveDemo() {\n  const [value, setValue] = useState({ x: 0, y: 0 });\n  const { ref, active } = useMove<HTMLDivElement>(setValue);\n\n  return (\n    <div ref={ref} className="relative m-auto flex size-80 items-center justify-center rounded-lg border bg-background">\n      <div\n        data-state={active ? "active" : undefined}\n        className="size-2"\n        {...{\n          style: {\n            position: "absolute",\n            left: `calc(${value.x * 100}% - 4px)`,\n            top: `calc(${value.y * 100}% - 4px)`,\n            backgroundColor: active ? "hsl(var(--destructive))" : "hsl(var(--constructive))"\n          }\n        }}\n      />\n\n      {active && <Typography prose="muted">:active</Typography>}\n\n      <Typography className="absolute -bottom-8 flex h-6 items-center justify-center rounded-sm border bg-color px-2 text-xs text-background">\n        x:{value.x} y:{value.y}\n      </Typography>\n    </div>\n  );\n}'
};

function Demo() {
  const [value, setValue] = useState({ x: 0, y: 0 });
  const { ref, active } = useMove<HTMLDivElement>(setValue);

  return (
    <div ref={ref} className="relative m-auto flex size-80 items-center justify-center rounded-lg border bg-background">
      <div
        data-state={active ? "active" : undefined}
        className="size-2"
        {...{
          style: {
            position: "absolute",
            left: `calc(${value.x * 100}% - 4px)`,
            top: `calc(${value.y * 100}% - 4px)`,
            backgroundColor: active ? "hsl(var(--destructive))" : "hsl(var(--constructive))"
          }
        }}
      />

      {active && <Typography prose="muted">:active</Typography>}

      <Typography className="absolute -bottom-8 flex h-6 items-center justify-center rounded-sm border bg-color px-2 text-xs text-background">
        x:{value.x} y:{value.y}
      </Typography>
    </div>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-96 w-full centered relative" }
};

export const UseMoveDemos = {
  usage
};
