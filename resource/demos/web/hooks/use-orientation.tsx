"use client";
import { useOrientation } from "@/hooks/use-orientation";
import { dataRenderer, Table, type TableProps } from "@/ui/table";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useOrientation } from "@/hooks/use-orientation";\nimport { dataRenderer, Table, type TableProps } from "@/ui/table";\n\nconst classNames: TableProps["classNames"] = {\n  root: "m-auto w-full min-w-[auto] max-w-[300px] [&>table]:min-w-[auto] [&>table]:max-w-[300px]",\n  table: "w-full"\n};\n\nexport function Demo() {\n  const orientation = useOrientation();\n\n  const data = [\n    { property: "Angle", value: `${orientation.angle}` },\n    { property: "Type", value: `${orientation.type}` }\n  ];\n  const tableData = {\n    caption: "Orientation",\n    head: ["Property", "Value"],\n    body: dataRenderer(data, ["property", "value"])\n  };\n\n  return <Table data={tableData} withTableBorder={false} {...{ classNames }} />;\n}'
};

const classNames: TableProps["classNames"] = {
  root: "m-auto w-full min-w-[auto] max-w-[300px] [&>table]:min-w-[auto] [&>table]:max-w-[300px]",
  table: "w-full"
};

function Demo() {
  const orientation = useOrientation();

  const data = [
    { property: "Angle", value: `${orientation.angle}` },
    { property: "Type", value: `${orientation.type}` }
  ];
  const tableData = {
    caption: "Orientation",
    head: ["Property", "Value"],
    body: dataRenderer(data, ["property", "value"])
  };

  return <Table data={tableData} withTableBorder={false} {...{ classNames }} />;
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

export const UseOrientationDemos = {
  usage
};
