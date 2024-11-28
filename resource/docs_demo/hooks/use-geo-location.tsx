"use client";
import { useGeoLocation } from "@/modules/hooks-rest";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow
} from "@/modules/components/web";

export function Demo() {
  const location = useGeoLocation();

  if (location.loading) return <p>Fetch Location...</p>;

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
        {Object.entries(location).map(([key, value]) => (
          <TableRow key={key}>
            <TableData>{String(key)}</TableData>
            <TableData>{String(value)}</TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
