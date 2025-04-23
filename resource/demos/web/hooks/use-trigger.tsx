"use client";
import { Button } from "@/ui/button";
import { useTrigger } from "@/hooks/use-trigger";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { Button } from "@/ui/button";\nimport { useTrigger } from "@/hooks/use-trigger";\n\nexport function UseTriggerDemo() {\n  const { ref, open } = useTrigger<HTMLButtonElement>({ defaultOpen: true });\n\n  return (\n    <>\n      <Button ref={ref}>Click me to {open ? "close" : "open"}</Button>\n\n      {open && (\n        <div role="tooltip" className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100">\n          Content that is {open ? "open" : "closed"}\n        </div>\n      )}\n    </>\n  );\n}'
};

function Demo() {
  const { ref, open } = useTrigger<HTMLButtonElement>({ defaultOpen: true });

  return (
    <>
      <Button ref={ref}>Click me to {open ? "close" : "open"}</Button>

      {open && (
        <div role="tooltip" className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100">
          Content that is {open ? "open" : "closed"}
        </div>
      )}
    </>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

export const UseTriggerDemos = {
  usage
};
