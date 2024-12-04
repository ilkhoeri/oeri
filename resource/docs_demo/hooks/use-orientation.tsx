"use client";
import { useOrientation } from "@/hooks/use-orientation";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow
} from "@/modules/components/web";

export function Demo() {
  const orientation = useOrientation();

  const data = [
    { property: "Angle", value: `${orientation.angle}` },
    { property: "Type", value: `${orientation.type}` }
  ];

  return (
    <Table
      wrap
      classNames={{
        wrap: "w-full min-w-[auto] max-w-[300px] [&>table]:min-w-[auto] [&>table]:max-w-[300px]",
        table: "w-full"
      }}
    >
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map(i => (
          <TableRow key={i.property}>
            <TableData>{i.property}</TableData>
            <TableData>{i.value}</TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
