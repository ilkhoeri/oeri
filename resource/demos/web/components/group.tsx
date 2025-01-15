import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    'import { Group } from "@/ui/group";\nimport { Button } from "@/ui/button";\n\nexport function GroupDemo() {\n  const groups = [\n    ["1", "2", "3"],\n    ["4", "5", "6"],\n    ["7", "8", "9"]\n  ];\n\n  return (\n    <div className="grid grid-rows-1 gap-3">\n      {groups.map((buttons, index) => (\n        <Group grow key={index}>\n          {buttons.map(label => (\n            <Button key={label} variant="outline" size="sm">\n              {label}\n            </Button>\n          ))}\n        </Group>\n      ))}\n    </div>\n  );\n}',
  configurator:
    'import { Group } from "@/ui/group";\nimport { Button } from "@/ui/button";\n\nexport function GroupDemo() {\n  return (\n    <Group{{props}}>\n      <Button variant="outline" size="sm">1</Button>\n      <Button variant="outline" size="sm">2</Button>\n      <Button variant="outline" size="sm">3</Button>\n    </Group>\n  );\n}'
};
import { Group, type GroupProps } from "@/ui/group";
import { Button } from "@/ui/button";

function Demo() {
  const groups = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"]
  ];

  return (
    <div className="grid grid-rows-1 gap-3">
      {groups.map((buttons, index) => (
        <Group grow key={index}>
          {buttons.map(label => (
            <Button key={label} variant="outline" size="sm">
              {label}
            </Button>
          ))}
        </Group>
      ))}
    </div>
  );
}

function ConfiguratorDemo(props: GroupProps) {
  return (
    <Group {...props}>
      <Button variant="outline" size="sm">
        1
      </Button>
      <Button variant="outline" size="sm">
        2
      </Button>
      <Button variant="outline" size="sm">
        3
      </Button>
    </Group>
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
  classNames: { demoInner: "h-72 w-full centered" },
  controls: [
    { prop: "wrap", type: "select", initialValue: "wrap", libraryValue: "wrap", data: ["nowrap", "wrap", "wrap-reverse", "unset"] },
    {
      prop: "align",
      type: "select",
      initialValue: "stretch",
      libraryValue: "stretch",
      data: ["start", "center", "end", "baseline", "normal", "stretch", "unset"]
    },
    { prop: "justify", type: "select", initialValue: "center", libraryValue: "center", data: ["flex-start", "center", "flex-end", "space-between"] },
    { prop: "gap", type: "number", initialValue: 12, libraryValue: 12, min: 4, max: 32 },
    { prop: "grow", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "preventGrowOverflow", type: "boolean", initialValue: true, libraryValue: true }
  ]
};

export const GroupDemos = {
  usage,
  configurator
};
