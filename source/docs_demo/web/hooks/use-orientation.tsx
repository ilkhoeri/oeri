"use client";
import { useOrientation } from "@/hooks/use-orientation";
import { dataRenderer, Table } from "@/ui/table";

export function Demo() {
  const orientation = useOrientation();

  const data = [
    { property: "Angle", value: `${orientation.angle}` },
    { property: "Type", value: `${orientation.type}` }
  ];
  const tableData = {
    caption: "Orientation",
    head: ["Property", "Value"],
    body: dataRenderer(data, ["property", "value"])
  }

  return <Table data={tableData} withTableBorder={false} classNames={classNames} />;
}

const classNames = {
  root: "m-auto w-full min-w-[auto] max-w-[300px] [&>table]:min-w-[auto] [&>table]:max-w-[300px]",
  table: "w-full"
};