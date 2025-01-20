"use client";
import { Button } from "@/ui/button";
import { Stack } from "@/ui/stack";
import { Typography } from "@/ui/typography";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { MinimizeIcon, MaximizeIcon } from "@/icons/*";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

function Demo() {
  const { fullscreen, toggle } = useFullscreen();

  function fS<T1, T2>(t1: T1, t2: T2) {
    return fullscreen ? (t1 as T1) : (t2 as T2);
  }

  return (
    <Button onClick={toggle} title={fS("Minimize", "Maximize")} variant="outline" size="icon" color={fS("red", "blue")}>
      {fS(<MinimizeIcon strokeWidth={2.25} />, <MaximizeIcon strokeWidth={2.25} />)}
    </Button>
  );
}

function WithRefDemo() {
  const { ref: refImage, toggle: onClickImage } = useFullscreen();

  return (
    <Stack align="center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={refImage}
        src="/icons/oeri-asset.png"
        alt="oeri logo"
        width={96}
        height={96}
        onClick={onClickImage}
        className="mt-8 size-24 rounded-lg border bg-black"
      />
      <Typography prose="span">Click image to view fullscreen</Typography>
    </Stack>
  );
}

const codes = {
  usage:
    '"use client";\nimport { useFullscreen } from "@/hooks/use-fullscreen";\nimport { MinimizeIcon, MaximizeIcon } from "@/icons/*";\nimport { Button } from "@/ui/button";\n\nexport function UseFullscreenDemo() {\n  const { fullscreen, toggle } = useFullscreen();\n\n  function fS<T1, T2>(t1: T1, t2: T2) {\n    return fullscreen ? (t1 as T1) : (t2 as T2);\n  }\n\n  return (\n    <Button onClick={toggle} title={fS("Minimize", "Maximize")} variant="outline" size="icon" color={fS("red", "blue")}>\n      {fS(<MinimizeIcon strokeWidth={2.25} />, <MaximizeIcon strokeWidth={2.25} />)}\n    </Button>\n  );\n}',
  withRef:
    '"use client";\nimport { Stack } from "@/ui/stack";\nimport { Button } from "@/ui/button";\nimport { Typography } from "@/ui/typography";\nimport { MinimizeIcon, MaximizeIcon } from "@/icons/*";\nimport { useFullscreen } from "@/hooks/use-fullscreen";\n\nexport function UseFullscreenDemo() {\n  const { ref: refImage, toggle: onClickImage } = useFullscreen();\n\n  return (\n    <Stack align="center">\n      {/* eslint-disable-next-line @next/next/no-img-element */}\n      <img\n        ref={refImage}\n        src="/...asset.jpg"\n        alt="oeri logo"\n        width={96}\n        height={96}\n        onClick={onClickImage}\n        className="mt-8 size-24 rounded-lg border bg-black"\n      />\n      <Typography prose="span">Click image to view fullscreen</Typography>\n    </Stack>\n  );\n}'
};

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered" }
};

const withRefUsage: DataTrees = {
  type: "code",
  component: WithRefDemo,
  code: codes.withRef,
  classNames: { demoInner: "min-h-60 w-full centered" }
};

export const UseFullscreenDemos = {
  usage,
  withRefUsage
};
