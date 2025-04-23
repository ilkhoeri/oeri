"use client";
import { useState } from "react";
import { Skeleton, type SkeletonProps } from "@/ui/skeleton";
import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { Button } from "@/ui/button";\nimport { Skeleton } from "@/ui/skeleton";\n\nexport function SkeletonDemo() {\n  const [loading, setLoading] = useState(true);\n  return (\n    <div className="m-auto flex size-full flex-col items-center justify-center px-4">\n      <div className="mb-6 flex items-start gap-4 max-md:flex-col md:flex-row">\n        <Skeleton asChild circle visible={loading} size={120}>\n          <button type="button" className="border font-heading">\n            B\n          </button>\n        </Skeleton>\n        <div className="flex flex-col items-center justify-center gap-1">\n          <Skeleton visible={loading} round={8}>\n            Lorem ipsum dolor sit amet...\n          </Skeleton>\n          <Skeleton visible={loading} round={8}>\n            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat adipisci, iste ducimus quasi ipsa autem tenetur! Exercitationem perferendis\n            mollitia omnis.\n          </Skeleton>\n          <Skeleton visible={loading} round={8}>\n            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro unde itaque ea corrupti maxime perferendis deserunt praesentium iure nemo,\n            consequatur obcaecati eaque, ipsum et alias saepe, ab placeat quo reiciendis.\n          </Skeleton>\n        </div>\n      </div>\n\n      <Button onClick={() => setLoading(l => !l)}>Toggle Skeleton</Button>\n    </div>\n  );\n}',
  configurator: 'import { Skeleton } from "@/ui/skeleton";\nimport { Avatar } from "@/ui/avatar";\n\nexport function SkeletonDemo() {\n  return (\n    <Skeleton{{props}} asChild>\n      <Avatar fallback="el khoeri" className="border" />\n    </Skeleton>\n  );\n}'
};

function Demo() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="m-auto flex size-full flex-col items-center justify-center px-4">
      <div className="mb-6 flex items-start gap-4 max-md:flex-col md:flex-row">
        <Skeleton asChild circle visible={loading} size={120}>
          <button type="button" className="border font-heading">
            B
          </button>
        </Skeleton>
        <div className="flex flex-col items-center justify-center gap-1">
          <Skeleton visible={loading} round={8}>
            Lorem ipsum dolor sit amet...
          </Skeleton>
          <Skeleton visible={loading} round={8}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat adipisci, iste ducimus quasi ipsa autem tenetur! Exercitationem perferendis mollitia omnis.
          </Skeleton>
          <Skeleton visible={loading} round={8}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro unde itaque ea corrupti maxime perferendis deserunt praesentium iure nemo, consequatur obcaecati eaque, ipsum et alias saepe, ab placeat quo reiciendis.
          </Skeleton>
        </div>
      </div>

      <Button onClick={() => setLoading(l => !l)}>Toggle Skeleton</Button>
    </div>
  );
}

function ConfiguratorDemo(props: SkeletonProps) {
  return (
    <Skeleton {...props} asChild>
      <Avatar fallback="el khoeri" className="border">
        xyz
      </Avatar>
    </Skeleton>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "size", type: "number", initialValue: 120, libraryValue: null, min: 62, max: 142 },
    { prop: "round", type: "number", initialValue: 8, libraryValue: 8, min: 2, max: 99 },
    { prop: "color", type: "color", initialValue: "hsl(var(--background))", libraryValue: "hsl(var(--background))" },
    { prop: "animate", type: "boolean", initialValue: true, libraryValue: true },
    { prop: "visible", type: "boolean", initialValue: true, libraryValue: false },
    { prop: "circle", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

export const SkeletonDemos = {
  usage,
  configurator
};
