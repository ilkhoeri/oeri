"use client";
import { useGeoLocation } from "@/hooks/use-geo-location";
import { Table } from "@/ui/table";

export function Demo() {
  const location = useGeoLocation();

  if (location.loading) return <p>Fetch Location...</p>;

  return (
    <Table
      classNames={{
        root: "border-0",
        table: "w-96 min-w-[auto] max-w-[auto]"
      }}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Property</Table.Head>
          <Table.Head>Value</Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Object.entries(location).map(([key, value]) => (
          <Table.Row key={key}>
            <Table.Data>{String(key)}</Table.Data>
            <Table.Data>{String(value)}</Table.Data>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
