"use client";
import { Svg } from "@/ui/svg";
import { Button } from "@/ui/button";
import { useReload } from "@/hooks/use-reload";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { Svg } from "@/ui/svg";\nimport { Button } from "@/ui/button";\nimport { useReload } from "@/hooks/use-reload";\n\nexport function UseReloadDemo() {\n  const { reload, onReload } = useReload();\n\n  return (\n    <Button title="reload" onClick={onReload} variant="outline" size="icon" color={reload ? "red" : "default"} className="p-1 [--sz:36px]">\n      <Svg size={28} className="transition-transform">\n        <g className={reload ? "occure_load" : undefined}>\n          <path d="m4,11c.6-4.4,4.7-7.5,9.1-6.9,2.8.4,5.3,2.3,6.4,4.9m.5-4v4h-4" />\n          <path d="m20,13c-.6,4.4-4.7,7.5-9.1,6.9-2.8-.4-5.3-2.3-6.4-4.9m-.5,4v-4h4" />\n        </g>\n      </Svg>\n      <span className="sr-only">Reload window</span>\n    </Button>\n  );\n}'
};

function Demo() {
  const { reload, onReload } = useReload();

  return (
    <Button title="reload" onClick={onReload} variant="outline" size="icon" color={reload ? "red" : "default"} className="p-1 [--sz:36px]">
      <Svg size={28} className="transition-transform">
        <g className={reload ? "occure_load" : undefined}>
          <path d="m4,11c.6-4.4,4.7-7.5,9.1-6.9,2.8.4,5.3,2.3,6.4,4.9m.5-4v4h-4" />
          <path d="m20,13c-.6,4.4-4.7,7.5-9.1,6.9-2.8-.4-5.3-2.3-6.4-4.9m-.5,4v-4h4" />
        </g>
      </Svg>
      <span className="sr-only">Reload window</span>
    </Button>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

export const UseReloadDemos = {
  usage
};
