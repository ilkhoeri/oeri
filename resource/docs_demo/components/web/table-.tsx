import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow
} from "@/modules/components/web";
import { typeToJson } from "@/modules/utility/text-parser";

export function Demo() {
  return (
    <div className="flex max-w-full flex-col items-center justify-center p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Mass</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map(i => (
            <TableRow key={i.name}>
              <TableData>{i.name}</TableData>
              <TableData>{i.symbol}</TableData>
              <TableData>{i.position}</TableData>
              <TableData>{i.mass}</TableData>
              <TableData>{i.description}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <samp className="mt-5 max-w-full rounded-lg border bg-muted p-4 text-xs [overflow-wrap:anywhere]">
        {typeToJson(data[0])}
      </samp>
    </div>
  );
}

const data = [
  {
    name: "Hydrogen",
    symbol: "H",
    position: 1,
    mass: 1.008,
    description:
      "The lightest element and most abundant chemical substance in the universe."
  },
  {
    name: "Helium",
    symbol: "He",
    position: 2,
    mass: 4.0026,
    description: "A noble gas used in balloons and cooling systems."
  },
  {
    name: "Lithium",
    symbol: "Li",
    position: 3,
    mass: 6.94,
    description: "A soft, silvery metal used in rechargeable batteries."
  },
  {
    name: "Beryllium",
    symbol: "Be",
    position: 4,
    mass: 9.0122,
    description: "A hard metal used in aerospace materials."
  },
  {
    name: "Boron",
    symbol: "B",
    position: 5,
    mass: 10.81,
    description: "An element used in glass and detergents."
  },
  {
    name: "Carbon",
    symbol: "C",
    position: 6,
    mass: 12.011,
    description: "A versatile element, the basis for organic life."
  },
  {
    name: "Nitrogen",
    symbol: "N",
    position: 7,
    mass: 14.007,
    description: "Makes up 78% of Earth's atmosphere."
  },
  {
    name: "Oxygen",
    symbol: "O",
    position: 8,
    mass: 15.999,
    description: "Essential for respiration in most living organisms."
  },
  {
    name: "Fluorine",
    symbol: "F",
    position: 9,
    mass: 18.998,
    description: "A highly reactive gas used in toothpaste."
  },
  {
    name: "Neon",
    symbol: "Ne",
    position: 10,
    mass: 20.18,
    description: "A noble gas used in neon signs and lighting."
  }
];
