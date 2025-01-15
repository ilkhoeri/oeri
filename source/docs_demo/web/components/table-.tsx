import { Table, TableBody, TableCaption, TableData, TableHead, TableHeader, TableRow } from "@/ui/table";
import { Code } from "@/ui/code";

const data = [
  { name: "Carbon", symbol: "C", position: 6, mass: 12.011 },
  { name: "Nitrogen", symbol: "N", position: 7, mass: 14.007 },
  { name: "Yttrium", symbol: "Y", position: 39, mass: 88.906 },
  { name: "Barium", symbol: "Ba", position: 56, mass: 137.33 },
  { name: "Cerium", symbol: "Ce", position: 58, mass: 140.12 },
  { name: "Sodium", symbol: "Na", position: 11, mass: 22.99 }
];

export function Demo() {
  return (
    <div className="flex max-w-full flex-col items-center justify-center">
      <IndependentComponents />
      <hr data-ignore />
      <CompoundComponents />
      <hr data-ignore />
      <Code samp={data} className="w-full" />
    </div>
  );
}

function IndependentComponents() {
  return (
    <Table>
      <TableCaption>Flat Component Structure<br />(Independent Components)</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Mass</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.slice(0, 3).map(i => (
          <TableRow key={i.name}>
            <TableData>{i.name}</TableData>
            <TableData>{i.symbol}</TableData>
            <TableData>{i.position}</TableData>
            <TableData>{i.mass}</TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function CompoundComponents() {
  return (
    <Table>
      <Table.Caption>Namespaced Component Structure<br />(Compound Components)</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Symbol</Table.Head>
          <Table.Head>Position</Table.Head>
          <Table.Head>Mass</Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.slice(3, 6).map(i => (
          <Table.Row key={i.name}>
            <Table.Data>{i.name}</Table.Data>
            <Table.Data>{i.symbol}</Table.Data>
            <Table.Data>{i.position}</Table.Data>
            <Table.Data>{i.mass}</Table.Data>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
