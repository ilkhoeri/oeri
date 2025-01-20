"use client";
import { dataRenderer, Table } from "@/ui/table";
import { useDeviceInfo } from "@/hooks/use-device-info";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

function Demo() {
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
  };

  return <Table withTableBorder={false} variant="horizontal" data={tableData} />;
}

const codes = {
  usage:
    '"use client";\nimport { useDeviceInfo } from "@/hooks/use-device-info";\nimport { dataRenderer, Table } from "@/ui/table";\n\nexport function UseDeviceInfoDemo() {\n  const device = useDeviceInfo();\n\n  if (!device) return <p>Detecting...</p>;\n\n  const data = [\n    { property: "Operating System", value: `${device.os}` },\n    { property: "Orientation", value: `${device.orientation}` },\n    { property: "User Agent", value: `${device.userAgent}` },\n    { property: "Language", value: `${device.language}` },\n    { property: "Screen Width", value: `${device.screenWidth}px` },\n    { property: "Screen Height", value: `${device.screenHeight}px` },\n    { property: "Device Pixel Ratio", value: `${device.devicePixelRatio}` },\n    { property: "Touch Device", value: `${device.isTouchDevice ? "Yes" : "No"}` },\n    { property: "Device Memory", value: `${device.deviceMemory ?? "N/A"} GB` },\n    { property: "Hardware Concurrency", value: `${device.hardwareConcurrency ?? "N/A"} cores` }\n  ];\n\n  const tableData = {\n    caption: "Device Info",\n    head: ["Property", "Value"],\n    body: dataRenderer(data, ["property", "value"])\n  };\n\n  return <Table withTableBorder={false} variant="horizontal" data={tableData} />;\n}'
};

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered" }
};

export const UseDeviceInfoDemos = {
  usage
};
