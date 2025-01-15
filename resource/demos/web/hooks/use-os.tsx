"use client";
import { useOS } from "@/hooks/use-os";
import { Typography } from "@/ui/typography";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useOS } from "@/hooks/use-os";\nimport { Typography } from "@/ui/typography";\n\nexport function UseOSDemo() {\n  const os = useOS();\n  if (!os) return <Typography el="p">Detecting OS...</Typography>;\n  return <Typography prose="h4" className="m-auto font-mono">Your OS: {os}</Typography>;\n}'
};

function Demo() {
  const os = useOS();
  if (!os) return <Typography el="p">Detecting OS...</Typography>;
  return <Typography prose="h4" className="m-auto font-mono">Your OS: {os}</Typography>;
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

export const UseOsDemos = {
  usage
};
