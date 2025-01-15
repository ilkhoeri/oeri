"use client";
import { useApp as useAppContext } from "@/config/app-context";
import { TextDirectionIcon } from "@/icons/*";
import { Button } from "@/ui/button";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

function Demo() {
  const { toggleDirection, dir } = useAppContext();
  return (
    <Button size="icon" variant="primitive" onClick={toggleDirection} className="m-auto">
      <TextDirectionIcon dir={dir} size="md" />
    </Button>
  );
}

const codes = {
  usage:
    '"use client";\nimport { useApp as useAppContext } from "@/config/app-context";\nimport { TextDirectionIcon } from "@/icons/*";\nimport { Button } from "@/ui/button";\n\nexport function UseDirectionDemo() {\n  const { toggleDirection, dir } = useAppContext();\n  return (\n    <Button size="icon" variant="primitive" onClick={toggleDirection} className="m-auto">\n      <TextDirectionIcon dir={dir} size="md" />\n    </Button>\n  );\n}'
};

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered" }
};

export const UseDirectionDemos = {
  usage
};
