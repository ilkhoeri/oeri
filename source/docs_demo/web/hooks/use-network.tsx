"use client";
import { useNetwork } from "@/hooks/use-network";
import { Table } from "@/ui/table";

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
            <Table.Data
              className={
                i.hasOwnProperty("is")
                  ? i.is
                    ? "text-blue-500"
                    : "text-red-600"
                  : undefined
              }>
              {i.value}
            </Table.Data>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
