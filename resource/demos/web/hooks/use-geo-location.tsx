"use client";
import { useGeoLocation } from "@/hooks/use-geo-location";
import { Table } from "@/ui/table";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    '"use client";\nimport { useGeoLocation } from "@/hooks/use-geo-location";\nimport { Table } from "@/ui/table";\n\nexport function UseGeoLocationDemo() {\n  const location = useGeoLocation();\n\n  if (location.loading) return <p>Fetch Location...</p>;\n\n  return (\n    <Table classNames={{ root: "border-transparent", table: "w-full" }}>\n      <Table.Header>\n        <Table.Row>\n          <Table.Head>Property</Table.Head>\n          <Table.Head>Value</Table.Head>\n        </Table.Row>\n      </Table.Header>\n\n      <Table.Body>\n        {Object.entries(location).map(([key, value]) => (\n          <Table.Row key={key}>\n            <Table.Data>{String(key)}</Table.Data>\n            <Table.Data>{String(value)}</Table.Data>\n          </Table.Row>\n        ))}\n      </Table.Body>\n    </Table>\n  );\n}'
};

function Demo() {
  const location = useGeoLocation();

  if (location.loading) return <p>Fetch Location...</p>;

  return (
    <Table classNames={{ root: "border-transparent", table: "w-full" }}>
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

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-60 w-full centered" }
};

export const UseGeoLocationDemos = {
  usage
};
