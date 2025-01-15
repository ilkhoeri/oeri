"use client";
import { Typography } from "@/ui/typography";
import { getRandomColor } from "@/hooks/use-random-colors";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { Typography } from "@/ui/typography";\nimport { getRandomColor } from "@/hooks/use-random-colors";\n\nexport function RandomColorDemo() {\n  const color = getRandomColor();\n  return (\n    <Typography el="p" prose="h1" style={{ color }}>\n      useRandomColor\n    </Typography>\n  );\n}'
};

function Demo() {
  const color = getRandomColor();
  return (
    <Typography el="p" prose="h1" style={{ color }}>
      useRandomColor
    </Typography>
  );
}


const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

export const UseRandomColorsDemos = {
  usage
};
