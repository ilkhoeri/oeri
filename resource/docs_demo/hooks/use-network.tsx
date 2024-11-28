"use client";
import { useNetwork } from "@/modules/hooks-rest";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow
} from "@/modules/components/web";

export function Demo() {
  const status = useNetwork();

  const data = [
    {
      property: "Online",
      value: `${status.online ? "Online" : "Offline"}`,
      is: status.online
    },
    { property: "Network Type", value: `${status.effectiveType}` },
    { property: "Connection Type", value: `${status.type}` },
    { property: "rtt", value: `${status.rtt}` },
    { property: "Downlink", value: `${status.downlink}` },
    {
      property: "Save Data",
      value: `${status.saveData ? "true" : "false"}`,
      is: status.saveData
    }
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
            <TableData
              className={
                i.hasOwnProperty("is")
                  ? i.is
                    ? "text-blue-500"
                    : "text-red-600"
                  : undefined
              }>
              {i.value}
            </TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
