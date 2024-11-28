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
        wrap: "border-0",
        table: "w-96 min-w-[auto] max-w-[auto]"
      }}>
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
