import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import Image from "next/image";
import { Indicator, IndicatorProps } from "@/ui/indicator";
import { Avatar } from "@/ui/avatar";

const codes = {
  usage:
    'import Image from "next/image";\nimport { Indicator } from "@/ui/indicator";\n\nexport function IndicatorDemo() {\n  return (\n    <Indicator withBorder processing color="white">\n      <Image unoptimized alt="" height="60" width="60" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jude" className="rounded-md" />\n    </Indicator>\n  );\n}',
  configurator:
    'import { Indicator } from "@/ui/indicator";\nimport { Avatar } from "@/ui/avatar";\n\nexport function IndicatorDemo() {\n  return (\n    <Indicator{{props}}>\n      <Avatar unoptimized alt="" size="60" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Rudy" className="rounded-md" />\n    </Indicator>\n  );\n}'
};

function Demo() {
  return (
    <Indicator withBorder processing color="white">
      <Image unoptimized alt="" height="60" width="60" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jude" className="rounded-md" />
    </Indicator>
  );
}

function ConfiguratorDemo(props: IndicatorProps) {
  return (
    <Indicator {...props}>
      <Avatar unoptimized alt="" size="60" src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Rudy" className="rounded-md" />
    </Indicator>
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
    {
      prop: "position",
      type: "select",
      initialValue: "top-end",
      libraryValue: "top-end",
      data: ["top-start", "top-center", "top-end", "middle-start", "middle-center", "middle-end", "bottom-start", "bottom-center", "bottom-end"]
    },
    { prop: "size", type: "number", initialValue: 10, libraryValue: 10, min: 6, max: 32 },
    { prop: "offset", type: "number", initialValue: 0, libraryValue: 0, min: -16, max: 16 },
    { prop: "color", type: "color", initialValue: "hsl(var(--constructive))", libraryValue: "hsl(var(--constructive))" },
    { prop: "processing", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "withBorder", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "disabled", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

export const IndicatorDemos = {
  usage,
  configurator
};
