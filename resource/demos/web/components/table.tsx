"use client";
import React from "react";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Stack } from "@/ui/stack";
import { Button } from "@/ui/button";
import { Table, TableBody, TableCaption, TableData, TableHead, TableHeader, TableRow, dataRenderer, type DataTableProps, type TableProps } from "@/ui/table";
import { Code } from "@/ui/code";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    'import { Table, TableBody, TableCaption, TableData, TableHead, TableHeader, TableRow } from "@/ui/table";\nimport { Code } from "@/ui/code";\n\nconst data = [\n  { name: "Carbon", symbol: "C", position: 6, mass: 12.011 },\n  { name: "Nitrogen", symbol: "N", position: 7, mass: 14.007 },\n  { name: "Yttrium", symbol: "Y", position: 39, mass: 88.906 },\n  { name: "Barium", symbol: "Ba", position: 56, mass: 137.33 },\n  { name: "Cerium", symbol: "Ce", position: 58, mass: 140.12 },\n  { name: "Sodium", symbol: "Na", position: 11, mass: 22.99 }\n];\n\n// Independent Components - Flat Component Structure\nexport function TableDemo() {\n  return (\n    <Table className="flex max-w-full flex-col items-center justify-center">\n      <TableCaption className="px-2 text-left">\n        <Code samp={data} className="w-full" />\n      </TableCaption>\n\n      <TableHeader>\n        <TableRow>\n          <TableHead>Name</TableHead>\n          <TableHead>Symbol</TableHead>\n          <TableHead>Position</TableHead>\n          <TableHead>Mass</TableHead>\n        </TableRow>\n      </TableHeader>\n\n      <TableBody>\n        {data.slice(0, 3).map(i => (\n          <TableRow key={i.name}>\n            <TableData>{i.name}</TableData>\n            <TableData>{i.symbol}</TableData>\n            <TableData>{i.position}</TableData>\n            <TableData>{i.mass}</TableData>\n          </TableRow>\n        ))}\n      </TableBody>\n    </Table>\n  );\n}',
  configurator:
    '"use client";\nimport React from "react";\nimport { Input } from "@/ui/input";\nimport { Label } from "@/ui/label";\nimport { Stack } from "@/ui/stack";\nimport { Button } from "@/ui/button";\nimport { Table, dataRenderer, type DataTableProps } from "@/ui/table";\n\nfunction name(value: string | number) {\n  return String(value).toLowerCase().replace(/\\s/g, "-");\n}\n\nfunction ConfiguratorDemo() {\n  const [data, setData] = React.useState(somePeriodic);\n  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);\n  const allRowPositions = React.useMemo(() => data.map(item => item.name), [data]);\n\n  const isAllSelected = selectedRows.length === allRowPositions.length;\n  const isSomeSelected = selectedRows.length > 0 && !isAllSelected;\n\n  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {\n    if (event.currentTarget.checked) {\n      setSelectedRows(allRowPositions); // Select all rows\n    } else {\n      setSelectedRows([]); // Deselect all rows\n    }\n  };\n\n  const handleDelete = () => {\n    // Filter out rows that are not selected\n    const newData = data.filter(item => !selectedRows.includes(item.name));\n    setData(newData); // Update data\n    setSelectedRows([]); // Clear selected rows\n  };\n\n  const tableData: DataTableProps = {\n    caption: (\n      <div className="grid grid-flow-row items-center justify-center">\n        <span>{data.length ? "Some elements from periodic table" : "Empty"}</span>\n      </div>\n    ),\n    head: [\n      <Label key={"select-all"} htmlFor="select-all" aria-label="select-all" className="mt-1.5 h-[17px] cursor-pointer">\n        <Input\n          type="checkbox"\n          id="select-all"\n          name="select-all"\n          aria-label="Select All"\n          checked={data.length > 0 && isAllSelected}\n          indeterminate={isSomeSelected}\n          onChange={handleSelectAll}\n        />\n        &nbsp;&nbsp;All\n      </Label>,\n      "Element name",\n      "Symbol",\n      "Position",\n      "Atomic mass",\n      "Description"\n    ],\n    body: dataRenderer(data, [\n      (item, index) => (\n        <div className="flex flex-row items-center justify-start gap-1">\n          <Input\n            type="checkbox"\n            id={name(item.name)}\n            name={name(item.name)}\n            aria-label="Select row"\n            checked={selectedRows.includes(item.name)}\n            onChange={event => setSelectedRows(event.currentTarget.checked ? [...selectedRows, item.name] : selectedRows.filter(name => name !== item.name))}\n          />\n          &nbsp;&nbsp;{index + 1}\n        </div>\n      ),\n      item => (\n        <Label htmlFor={name(item.name)} className="cursor-pointer">\n          {item.name}\n        </Label>\n      ),\n      "symbol",\n      "position",\n      "mass",\n      "description"\n    ])\n  };\n\n  return (\n    <Stack>\n      <Table\n        {{props}}\n        data={tableData}\n        classNames={{ thead: "bg-primitive" }}\n        styles={{\n          root: {\n            height: "29rem"\n          },\n          "tbody.tr": index => ({\n            backgroundColor: selectedRows.includes(data[index].name) && "rgba(0, 123, 255, 0.15)"\n          }),\n          "thead.tr.th": index => ({\n            backgroundColor: index === 2 && "rgb(202 138 4 / var(--tw-bg-opacity, 1))"\n          }),\n          "tbody.tr.td": index => ({\n            backgroundColor: selectedRows.includes(data[index].name) && index === 2 && "rgb(234 179 8 / var(--tw-bg-opacity, 1))"\n          })\n        }}\n      />\n      <Button variant="destructive" size="default" className="w-max" disabled={selectedRows.length === 0} onClick={handleDelete}>\n        Delete\n      </Button>\n    </Stack>\n  );\n}\n\nconst somePeriodic = [\n  { name: "Sodium", symbol: "Na", position: 11, mass: 22.99, description: "A soft metal that reacts vigorously with water." },\n  { name: "Magnesium", symbol: "Mg", position: 12, mass: 24.305, description: "A metal used in lightweight alloys." },\n  { name: "Aluminum", symbol: "Al", position: 13, mass: 26.982, description: "A lightweight, corrosion-resistant metal." },\n  { name: "Silicon", symbol: "Si", position: 14, mass: 28.085, description: "A key component in semiconductors." },\n  { name: "Phosphorus", symbol: "P", position: 15, mass: 30.974, description: "Essential for DNA and energy transfer in cells." },\n  { name: "Sulfur", symbol: "S", position: 16, mass: 32.06, description: "A yellow, nonmetallic element used in fertilizers." },\n  { name: "Chlorine", symbol: "Cl", position: 17, mass: 35.45, description: "A reactive halogen used for water purification." },\n  { name: "Argon", symbol: "Ar", position: 18, mass: 39.948, description: "A noble gas used in light bulbs and welding." },\n  { name: "Potassium", symbol: "K", position: 19, mass: 39.098, description: "An essential element for human health." },\n  { name: "Calcium", symbol: "Ca", position: 20, mass: 40.078, description: "A metal crucial for bones and teeth." },\n  { name: "Iron", symbol: "Fe", position: 26, mass: 55.845, description: "A key element in hemoglobin, the oxygen-carrying molecule in blood." },\n  { name: "Copper", symbol: "Cu", position: 29, mass: 63.546, description: "A conductor of electricity used in wiring." },\n  { name: "Zinc", symbol: "Zn", position: 30, mass: 65.38, description: "An essential trace element for humans." },\n  { name: "Yttrium", symbol: "Y", position: 39, mass: 88.906, description: "A rare-earth metal used in lasers and superconductors." },\n  { name: "Barium", symbol: "Ba", position: 56, mass: 137.33, description: "A metal used in medical imaging." },\n  { name: "Cerium", symbol: "Ce", position: 58, mass: 140.12, description: "A rare-earth element used in catalytic converters." },\n  { name: "Hydrogen", symbol: "H", position: 1, mass: 1.008, description: "The lightest element and most abundant chemical substance in the universe." },\n  { name: "Helium", symbol: "He", position: 2, mass: 4.0026, description: "A noble gas used in balloons and cooling systems." },\n  { name: "Lithium", symbol: "Li", position: 3, mass: 6.94, description: "A soft, silvery metal used in rechargeable batteries." },\n  { name: "Beryllium", symbol: "Be", position: 4, mass: 9.0122, description: "A hard metal used in aerospace materials." },\n  { name: "Boron", symbol: "B", position: 5, mass: 10.81, description: "An element used in glass and detergents." },\n  { name: "Carbon", symbol: "C", position: 6, mass: 12.011, description: "A versatile element, the basis for organic life." },\n  { name: "Nitrogen", symbol: "N", position: 7, mass: 14.007, description: "Makes up 78% of Earth\'s atmosphere." },\n  { name: "Oxygen", symbol: "O", position: 8, mass: 15.999, description: "Essential for respiration in most living organisms." },\n  { name: "Fluorine", symbol: "F", position: 9, mass: 18.998, description: "A highly reactive gas used in toothpaste." },\n  { name: "Neon", symbol: "Ne", position: 10, mass: 20.18, description: "A noble gas used in neon signs and lighting." }\n];'
};

const data = [
  { name: "Carbon", symbol: "C", position: 6, mass: 12.011 },
  { name: "Nitrogen", symbol: "N", position: 7, mass: 14.007 },
  { name: "Yttrium", symbol: "Y", position: 39, mass: 88.906 },
  { name: "Barium", symbol: "Ba", position: 56, mass: 137.33 },
  { name: "Cerium", symbol: "Ce", position: 58, mass: 140.12 },
  { name: "Sodium", symbol: "Na", position: 11, mass: 22.99 }
];

// Independent Components - Flat Component Structure
function Demo() {
  return (
    <Table className="flex max-w-full flex-col items-center justify-center">
      <TableCaption className="px-2 text-left">
        <Code samp={data} className="w-full" />
      </TableCaption>
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

function name(value: string | number) {
  return String(value).toLowerCase().replace(/\s/g, "-");
}

function ConfiguratorDemo(props: TableProps) {
  const [data, setData] = React.useState(somePeriodic);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const allRowPositions = React.useMemo(() => data.map(item => item.name), [data]);

  const isAllSelected = selectedRows.length === allRowPositions.length;
  const isSomeSelected = selectedRows.length > 0 && !isAllSelected;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      setSelectedRows(allRowPositions); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  const handleDelete = () => {
    // Filter out rows that are not selected
    const newData = data.filter(item => !selectedRows.includes(item.name));
    setData(newData); // Update data
    setSelectedRows([]); // Clear selected rows
  };

  const tableData: DataTableProps = {
    caption: (
      <div className="grid grid-flow-row items-center justify-center">
        <span>{data.length ? "Some elements from periodic table" : "Empty"}</span>
      </div>
    ),
    head: [
      <Label key={"select-all"} htmlFor="select-all" aria-label="select-all" className="mt-1.5 h-[17px] cursor-pointer">
        <Input type="checkbox" id="select-all" name="select-all" aria-label="Select All" checked={data.length > 0 && isAllSelected} indeterminate={isSomeSelected} onChange={handleSelectAll} />
        &nbsp;&nbsp;All
      </Label>,
      "Element name",
      "Symbol",
      "Position",
      "Atomic mass",
      "Description"
    ],
    body: dataRenderer(data, [
      (item, index) => (
        <div className="flex flex-row items-center justify-start gap-1">
          <Input type="checkbox" id={name(item.name)} name={name(item.name)} aria-label="Select row" checked={selectedRows.includes(item.name)} onChange={event => setSelectedRows(event.currentTarget.checked ? [...selectedRows, item.name] : selectedRows.filter(name => name !== item.name))} />
          &nbsp;&nbsp;{index + 1}
        </div>
      ),
      item => (
        <Label htmlFor={name(item.name)} className="cursor-pointer">
          {item.name}
        </Label>
      ),
      "symbol",
      "position",
      "mass",
      "description"
    ])
  };

  return (
    <Stack>
      <Table
        {...props}
        data={tableData}
        classNames={{ thead: "bg-primitive" }}
        styles={{
          root: {
            height: "29rem"
          },
          "tbody.tr": index => ({
            backgroundColor: selectedRows.includes(data[index].name) && "rgba(0, 123, 255, 0.15)"
          }),
          "thead.tr.th": index => ({
            backgroundColor: index === 2 && "rgb(202 138 4 / var(--tw-bg-opacity, 1))"
          }),
          "tbody.tr.td": index => ({
            backgroundColor: selectedRows.includes(data[index].name) && index === 2 && "rgb(234 179 8 / var(--tw-bg-opacity, 1))"
          })
        }}
      />
      <Button variant="destructive" size="default" className="w-max" disabled={selectedRows.length === 0} onClick={handleDelete}>
        Delete
      </Button>
    </Stack>
  );
}

const somePeriodic = [
  { name: "Sodium", symbol: "Na", position: 11, mass: 22.99, description: "A soft metal that reacts vigorously with water." },
  { name: "Magnesium", symbol: "Mg", position: 12, mass: 24.305, description: "A metal used in lightweight alloys." },
  { name: "Aluminum", symbol: "Al", position: 13, mass: 26.982, description: "A lightweight, corrosion-resistant metal." },
  { name: "Silicon", symbol: "Si", position: 14, mass: 28.085, description: "A key component in semiconductors." },
  { name: "Phosphorus", symbol: "P", position: 15, mass: 30.974, description: "Essential for DNA and energy transfer in cells." },
  { name: "Sulfur", symbol: "S", position: 16, mass: 32.06, description: "A yellow, nonmetallic element used in fertilizers." },
  { name: "Chlorine", symbol: "Cl", position: 17, mass: 35.45, description: "A reactive halogen used for water purification." },
  { name: "Argon", symbol: "Ar", position: 18, mass: 39.948, description: "A noble gas used in light bulbs and welding." },
  { name: "Potassium", symbol: "K", position: 19, mass: 39.098, description: "An essential element for human health." },
  { name: "Calcium", symbol: "Ca", position: 20, mass: 40.078, description: "A metal crucial for bones and teeth." },
  { name: "Iron", symbol: "Fe", position: 26, mass: 55.845, description: "A key element in hemoglobin, the oxygen-carrying molecule in blood." },
  { name: "Copper", symbol: "Cu", position: 29, mass: 63.546, description: "A conductor of electricity used in wiring." },
  { name: "Zinc", symbol: "Zn", position: 30, mass: 65.38, description: "An essential trace element for humans." },
  { name: "Yttrium", symbol: "Y", position: 39, mass: 88.906, description: "A rare-earth metal used in lasers and superconductors." },
  { name: "Barium", symbol: "Ba", position: 56, mass: 137.33, description: "A metal used in medical imaging." },
  { name: "Cerium", symbol: "Ce", position: 58, mass: 140.12, description: "A rare-earth element used in catalytic converters." },
  { name: "Hydrogen", symbol: "H", position: 1, mass: 1.008, description: "The lightest element and most abundant chemical substance in the universe." },
  { name: "Helium", symbol: "He", position: 2, mass: 4.0026, description: "A noble gas used in balloons and cooling systems." },
  { name: "Lithium", symbol: "Li", position: 3, mass: 6.94, description: "A soft, silvery metal used in rechargeable batteries." },
  { name: "Beryllium", symbol: "Be", position: 4, mass: 9.0122, description: "A hard metal used in aerospace materials." },
  { name: "Boron", symbol: "B", position: 5, mass: 10.81, description: "An element used in glass and detergents." },
  { name: "Carbon", symbol: "C", position: 6, mass: 12.011, description: "A versatile element, the basis for organic life." },
  { name: "Nitrogen", symbol: "N", position: 7, mass: 14.007, description: "Makes up 78% of Earth's atmosphere." },
  { name: "Oxygen", symbol: "O", position: 8, mass: 15.999, description: "Essential for respiration in most living organisms." },
  { name: "Fluorine", symbol: "F", position: 9, mass: 18.998, description: "A highly reactive gas used in toothpaste." },
  { name: "Neon", symbol: "Ne", position: 10, mass: 20.18, description: "A noble gas used in neon signs and lighting." }
];

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    { prop: "captionSide", type: "select", initialValue: "bottom", libraryValue: "bottom", data: ["top", "bottom"] },
    { prop: "orientation", type: "select", initialValue: "vertical", libraryValue: "vertical", data: ["vertical", "horizontal"] },
    { prop: "variant", type: "select", initialValue: "default", libraryValue: "default", data: ["default", "tile"] },
    { prop: "striped", type: "select", initialValue: "", libraryValue: "", data: ["odd", "even"] },
    // { prop: "striped", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "overflowWrap", type: "boolean", initialValue: true, libraryValue: true },
    { prop: "withTableBorder", type: "boolean", initialValue: true, libraryValue: true },
    { prop: "withRowBorders", type: "boolean", initialValue: true, libraryValue: true },
    { prop: "highlightOnHover", type: "boolean", initialValue: true, libraryValue: true },
    { prop: "withColumnBorders", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "stickyHeader", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

export const TableDemos = {
  usage,
  configurator
};
