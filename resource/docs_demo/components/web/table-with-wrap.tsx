import { Table, TableBody, TableData, TableHead, TableHeader, TableRow } from "@/modules/components/web";
import { typeToJson } from "@/modules/utility/text-parser";

export function Demo() {
  return (
    <div className="flex max-w-full flex-col items-center justify-center p-4">
      <Table wrap>
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
    name: "Sodium",
    symbol: "Na",
    position: 11,
    mass: 22.99,
    description: "A soft metal that reacts vigorously with water."
  },
  {
    name: "Magnesium",
    symbol: "Mg",
    position: 12,
    mass: 24.305,
    description: "A metal used in lightweight alloys."
  },
  {
    name: "Aluminum",
    symbol: "Al",
    position: 13,
    mass: 26.982,
    description: "A lightweight, corrosion-resistant metal."
  },
  {
    name: "Silicon",
    symbol: "Si",
    position: 14,
    mass: 28.085,
    description: "A key component in semiconductors."
  },
  {
    name: "Phosphorus",
    symbol: "P",
    position: 15,
    mass: 30.974,
    description: "Essential for DNA and energy transfer in cells."
  },
  {
    name: "Sulfur",
    symbol: "S",
    position: 16,
    mass: 32.06,
    description: "A yellow, nonmetallic element used in fertilizers."
  },
  {
    name: "Chlorine",
    symbol: "Cl",
    position: 17,
    mass: 35.45,
    description: "A reactive halogen used for water purification."
  },
  {
    name: "Argon",
    symbol: "Ar",
    position: 18,
    mass: 39.948,
    description: "A noble gas used in light bulbs and welding."
  },
  {
    name: "Potassium",
    symbol: "K",
    position: 19,
    mass: 39.098,
    description: "An essential element for human health."
  },
  {
    name: "Calcium",
    symbol: "Ca",
    position: 20,
    mass: 40.078,
    description: "A metal crucial for bones and teeth."
  },
  {
    name: "Iron",
    symbol: "Fe",
    position: 26,
    mass: 55.845,
    description:
      "A key element in hemoglobin, the oxygen-carrying molecule in blood."
  },
  {
    name: "Copper",
    symbol: "Cu",
    position: 29,
    mass: 63.546,
    description: "A conductor of electricity used in wiring."
  },
  {
    name: "Zinc",
    symbol: "Zn",
    position: 30,
    mass: 65.38,
    description: "An essential trace element for humans."
  },
  {
    name: "Yttrium",
    symbol: "Y",
    position: 39,
    mass: 88.906,
    description: "A rare-earth metal used in lasers and superconductors."
  },
  {
    name: "Barium",
    symbol: "Ba",
    position: 56,
    mass: 137.33,
    description: "A metal used in medical imaging."
  },
  {
    name: "Cerium",
    symbol: "Ce",
    position: 58,
    mass: 140.12,
    description: "A rare-earth element used in catalytic converters."
  }
];
