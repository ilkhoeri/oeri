"use client";
import { useDeviceInfo } from "@/modules/hooks-rest";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow
} from "@/modules/components/web";

export function Demo() {
  const device = useDeviceInfo();

  if (!device) return <p>Detecting...</p>;

  const data = [
    { property: "Operating System", value: `${device.os}` },
    { property: "Orientation", value: `${device.orientation}` },
    { property: "User Agent", value: `${device.userAgent}` },
    { property: "Language", value: `${device.language}` },
    { property: "Screen Width", value: `${device.screenWidth}px` },
    { property: "Screen Height", value: `${device.screenHeight}px` },
    { property: "Device Pixel Ratio", value: `${device.devicePixelRatio}` },
    {
      property: "Touch Device",
      value: `${device.isTouchDevice ? "Yes" : "No"}`
    },
    { property: "Device Memory", value: `${device.deviceMemory ?? "N/A"} GB` },
    {
      property: "Hardware Concurrency",
      value: `${device.hardwareConcurrency ?? "N/A"} cores`
    }
  ];

  return (
    <Table wrap classNames={{ wrap: "border-0" }}>
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
