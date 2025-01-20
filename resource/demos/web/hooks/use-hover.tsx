"use client";
import { Button } from "@/ui/button";
import { useHover } from "@/hooks/use-hover";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useHover } from "@/hooks/use-hover";\nimport { Button } from "@/ui/button";\n\nexport function UseHoverDemo({ touch }: { touch?: boolean }) {\n  const { ref, hovered } = useHover<HTMLButtonElement>(undefined, { touch });\n\n  return (\n    <>\n      <Button ref={ref} className="w-24 px-0">\n        {hovered ? "Yey..." : touch ? "Touch me" : "Hover me"}\n      </Button>\n\n      {hovered && (\n        <div role="tooltip" className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100">\n          {touch ? "You can also use touch" : "onTouch can\'t be used"}\n        </div>\n      )}\n    </>\n  );\n}'
};

function Demo({ touch = false }: { touch?: boolean }) {
  const { ref, hovered } = useHover<HTMLButtonElement>(undefined, { touch });

  return (
    <>
      <Button ref={ref} className="w-24 px-0">
        {hovered ? "Yey..." : touch ? "Touch me" : "Hover me"}
      </Button>

      {hovered && (
        <div
          role="tooltip"
          className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        >
          {touch ? "You can also use touch" : "onTouch can't be used"}
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
  controls: [{ prop: "touch", type: "boolean", initialValue: false, libraryValue: null }]
};

export const UseHoverDemos = {
  usage
};
