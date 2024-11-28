import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow
} from "@/modules/components/web";

export function Demo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Table wrap>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Mass</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map(i => (
            <TableRow key={i.name}>
              <TableData>{i.name}</TableData>
              <TableData>{i.symbol}</TableData>
              <TableData>{i.position}</TableData>
              <TableData>{i.mass}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <samp className="mt-5 max-w-[27rem] rounded-lg border bg-muted p-4 text-xs [overflow-wrap:anywhere]">
        {JSON.stringify(data)}
      </samp>
    </div>
  );
}

const data = [
  { name: "Carbon", symbol: "C", position: 6, mass: 12.011 },
  { name: "Nitrogen", symbol: "N", position: 7, mass: 14.007 },
  { name: "Yttrium", symbol: "Y", position: 39, mass: 88.906 },
  { name: "Barium", symbol: "Ba", position: 56, mass: 137.33 },
  { name: "Cerium", symbol: "Ce", position: 58, mass: 140.12 }
];
