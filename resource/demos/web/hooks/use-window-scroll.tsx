"use client";
import { Button } from "@/ui/button";
import { Stack } from "@/ui/stack";
import { Typography } from "@/ui/typography";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { Button } from "@/ui/button";\nimport { Stack } from "@/ui/stack";\nimport { Typography } from "@/ui/typography";\nimport { useWindowScroll } from "@/hooks/use-window-scroll";\n\nexport function UseWindowScrollDemo() {\n  const { bottom, scrollWindow, mounted, position } = useWindowScroll();\n\n  if (!mounted) return null;\n\n  return (\n    <Stack align="center">\n      <Button\n        onClick={scrollWindow}\n        className="w-max"\n        /* onClick={() => scrollTo({ y: position.y + 250 })} // use scrollTo() to specify a scroll with a specific value */\n      >\n        Scroll to {bottom ? "top" : "bottom"}\n      </Button>\n      <Typography prose="muted">\n        window scroll x=&#123;{position.x}&#125; y=&#123;{position.y}&#125;\n      </Typography>\n    </Stack>\n  );\n}'
};

function Demo() {
  const { bottom, scrollWindow, mounted, position } = useWindowScroll();

  if (!mounted) return null;

  return (
    <Stack align="center">
      <Button
        onClick={scrollWindow}
        className="w-max"
        /* onClick={() => scrollTo({ y: position.y + 250 })} // use scrollTo() to specify a scroll with a specific value */
      >
        Scroll to {bottom ? "top" : "bottom"}
      </Button>
      <Typography prose="muted">
        window scroll x=&#123;{position.x}&#125; y=&#123;{position.y}&#125;
      </Typography>
    </Stack>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

export const UseWindowScrollDemos = {
  usage
};
