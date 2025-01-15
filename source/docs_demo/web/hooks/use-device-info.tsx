"use client";
import { useDeviceInfo } from "@/hooks/use-device-info";
import { dataRenderer, Table } from "@/ui/table";

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
    { property: "Touch Device", value: `${device.isTouchDevice ? "Yes" : "No"}` },
    { property: "Device Memory", value: `${device.deviceMemory ?? "N/A"} GB` },
    { property: "Hardware Concurrency", value: `${device.hardwareConcurrency ?? "N/A"} cores` }
  ];

  const tableData = {
    caption: "Device Info",
    head: ["Property", "Value"],
    body: dataRenderer(data, ["property", "value"])
  }

  return <Table withTableBorder={false} variant="vertical" data={tableData} />;
}
