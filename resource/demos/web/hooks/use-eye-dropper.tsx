"use client";
import { Button } from "@/ui/button";
import { PickColorIcon } from "@/icons/*";
import { Typography } from "@/ui/typography";
import { useEyeDropper } from "@/hooks/use-eye-dropper";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { Button } from "@/ui/button";\nimport { PickColorIcon } from "@/icons/*";\nimport { Typography } from "@/ui/typography";\nimport { useEyeDropper } from "@/hooks/use-eye-dropper";\n\nexport function UseEyeDropperDemo() {\n  const { pickColor, color, supported, error } = useEyeDropper();\n\n  let message: string = "Pick color";\n  if (!supported) return "Your browser does not support the EyeDropper API";\n  if (error) message = error?.message;\n  if (color) message = color;\n\n  return (\n    <>\n      <Button variant="outline" size="icon" onClick={pickColor} className="relative z-[99]">\n        <PickColorIcon color={color} size={20} />\n      </Button>\n      <Typography prose="p" className="absolute -top-2 left-2 font-bold z-9">{message}</Typography>\n      <div\n        className="absolute inset-0 flex size-full min-h-full min-w-full items-center justify-center rounded-lg"\n        {...{ style: { backgroundColor: color } }}\n      />\n    </>\n  );\n}'
};

function Demo() {
  const { pickColor, color, supported, error } = useEyeDropper();

  let message: string = "Pick color";
  if (!supported) return "Your browser does not support the EyeDropper API";
  if (error) message = error?.message;
  if (color) message = color;

  return (
    <>
      <Button variant="outline" size="icon" onClick={pickColor} className="relative z-[99]">
        <PickColorIcon color={color} size={20} />
      </Button>
      <Typography prose="p" className="absolute -top-2 left-2 font-bold z-9">
        {message}
      </Typography>
      <div className="absolute inset-0 flex size-full min-h-full min-w-full items-center justify-center rounded-lg" {...{ style: { backgroundColor: color } }} />
    </>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative overflow-hidden" }
};

export const UseEyeDropperDemos = {
  usage
};
