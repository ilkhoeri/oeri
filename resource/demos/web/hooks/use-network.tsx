"use client";
import { useNetwork } from "@/hooks/use-network";
import { Table } from "@/ui/table";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useNetwork } from "@/hooks/use-network";\nimport { Table } from "@/ui/table";\n\nexport function UseNetworkDemo() {\n  const status = useNetwork();\n\n  const data = [\n    { property: "Online", value: `${status.online ? "Online" : "Offline"}`, is: status.online },\n    { property: "Network Type", value: `${status.effectiveType}` },\n    { property: "Connection Type", value: `${status.type}` },\n    { property: "rtt", value: `${status.rtt}` },\n    { property: "Downlink", value: `${status.downlink}` },\n    { property: "Save Data", value: `${status.saveData ? "true" : "false"}`, is: status.saveData }\n  ];\n\n  return (\n    <Table withTableBorder={false} classNames={{ root: "m-auto", table: "w-96 min-w-[auto] max-w-[auto]" }}>\n      <Table.Header>\n        <Table.Row>\n          <Table.Head>Property</Table.Head>\n          <Table.Head>Value</Table.Head>\n        </Table.Row>\n      </Table.Header>\n\n      <Table.Body>\n        {data.map(i => (\n          <Table.Row key={i.property}>\n            <Table.Data>{i.property}</Table.Data>\n            <Table.Data className={i.hasOwnProperty("is") ? (i.is ? "text-blue-500" : "text-red-600") : undefined}>{i.value}</Table.Data>\n          </Table.Row>\n        ))}\n      </Table.Body>\n    </Table>\n  );\n}'
};

export function Demo() {
  const status = useNetwork();

  const data = [
    { property: "Online", value: `${status.online ? "Online" : "Offline"}`, is: status.online },
    { property: "Network Type", value: `${status.effectiveType}` },
    { property: "Connection Type", value: `${status.type}` },
    { property: "rtt", value: `${status.rtt}` },
    { property: "Downlink", value: `${status.downlink}` },
    { property: "Save Data", value: `${status.saveData ? "true" : "false"}`, is: status.saveData }
  ];

  return (
    <Table withTableBorder={false} classNames={{ root: "m-auto", table: "w-96 min-w-[auto] max-w-[auto]" }}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Property</Table.Head>
          <Table.Head>Value</Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map(i => (
          <Table.Row key={i.property}>
            <Table.Data>{i.property}</Table.Data>
            <Table.Data className={i.hasOwnProperty("is") ? (i.is ? "text-blue-500" : "text-red-600") : undefined}>{i.value}</Table.Data>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered relative" }
};

export const UseNetworkDemos = {
  usage
};
