"use client";
import React from "react";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Stack } from "@/ui/stack";
import { Button } from "@/ui/button";
import { Table, dataRenderer, type TableDataProps } from "@/ui/table";
import { __docs_demo } from "../../__docs_demo";

function name(value: string | number) {
  return String(value).toLowerCase().replace(/\s/g, "-");
}

export function Demo() {
  const { numb: spacingX, boo: tableOverflow, ...first } = __docs_demo.useDemo({ Numb: 8, Boo: true });
  const { numb: spacingY, boo: striped, ...second } = __docs_demo.useDemo({ Numb: 8, Boo: false });
  const { boo: highlightOnHover, str: captionSide, ...third } = __docs_demo.useDemo({ Boo: true, Str: "bottom" });
  const { boo: withTableBorder, str: variant, ...fourth } = __docs_demo.useDemo({ Boo: false, Str: "horizontal" });
  const { boo: withColumnBorders, ...fifth } = __docs_demo.useDemo({ Boo: false });
  const { boo: withRowBorders, ...sixth } = __docs_demo.useDemo({ Boo: false });
  const { boo: stickyHeader, ...seventh } = __docs_demo.useDemo({ Boo: false });
  const [data, setData] = React.useState(someDataPeriodic);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const allRowPositions = React.useMemo(() => data.map((item) => item.name), [data]);

  const isAllSelected = selectedRows.length === allRowPositions.length;
  const isSomeSelected = selectedRows.length > 0 && !isAllSelected;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      // ignore // Select all rows
      setSelectedRows(allRowPositions);
    } else {
      // ignore // Deselect all rows
      setSelectedRows([]);
    }
  };

  const handleDelete = () => {
    // ignore // Filter out rows that are not selected
    const newData = data.filter((item) => !selectedRows.includes(item.name));
    // ignore // Update data
    setData(newData);
    // ignore // Clear selected rows
    setSelectedRows([]);
  };

  const tableData: TableDataProps = {
    caption: (
      <div className="grid grid-flow-row items-center justify-center">
        <span>{data.length ? "Some elements from periodic table" : "Empty"}</span>
      </div>
    ),
    head: [
      <Label key={"select-all"} htmlFor="select-all" aria-label="select-all" className="mt-1.5 h-[17px] cursor-pointer">
        <Input
          type="checkbox"
          id="select-all"
          name="select-all"
          aria-label="Select All"
          checked={(data.length > 0) && isAllSelected}
          indeterminate={isSomeSelected}
          onChange={handleSelectAll}
        />
        &nbsp;&nbsp;All
      </Label>,
      "Element name", "Symbol", "Position", "Atomic mass", "Description"
    ],
    body: dataRenderer(data, [
      (item, index) => (
        <div className="flex flex-row items-center justify-start gap-1">
          <Input
            type="checkbox"
            id={name(item.name)}
            name={name(item.name)}
            aria-label="Select row"
            checked={selectedRows.includes(item.name)}
            onChange={event =>
              setSelectedRows(
                event.currentTarget.checked
                  ? [...selectedRows, item.name]
                  : selectedRows.filter(name => name !== item.name)
              )
            }
          />
          &nbsp;&nbsp;{index + 1}
        </div>
      ),
      item => (
        <Label htmlFor={name(item.name)} className="cursor-pointer">
          {item.name}
        </Label>
      ),
      "symbol", "position", "mass", "description"
    ])
  };

  return (
    <__docs_demo>
    <__docs_demo.area className="overflow-hidden">
    <Stack>
      <Table
        data={tableData}
        striped={striped}
        // @ts-ignore
        variant={variant}
        // @ts-ignore
        captionSide={captionSide}
        stickyHeader={stickyHeader}
        tableOverflow={tableOverflow}
        withRowBorders={withRowBorders}
        withTableBorder={withTableBorder}
        highlightOnHover={highlightOnHover}
        withColumnBorders={withColumnBorders}
        spacing={{ x: spacingX, y: spacingY }}
        styles={{
          root: {
            height: "29rem"
          },
          trbody: (index ) => ({
            backgroundColor: selectedRows.includes(data[index].name) ? "rgba(0, 123, 255, 0.15)" : undefined
          })
        }}
      />
      <Button
       variant="destructive"
       size="default"
       className="w-max"
       disabled={selectedRows.length === 0}
       onClick={handleDelete}
      >
        Delete
      </Button>
    </Stack>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="spacing?.x" value={spacingX} setNumb={first.setNumb} min="4" max="16" />
    <__docs_demo.setRange label="spacing?.y" value={spacingY} setNumb={second.setNumb} min="4" max="16" />
    <__docs_demo.setSelect label="Caption Side" values={["top", "bottom"]} str={captionSide} setStr={third.setStr} />
    <__docs_demo.setSelect label="Variant" values={["horizontal", "vertical"]} str={variant} setStr={fourth.setStr} />
    <__docs_demo.setBoo label="Striped" boo={striped} setBoo={second.setBoo} booleanish={false} />
    <__docs_demo.setBoo label="highlightOnHover" boo={highlightOnHover} setBoo={third.setBoo} booleanish={false} />
    <__docs_demo.setBoo label="withTableBorder" boo={withTableBorder} setBoo={fourth.setBoo} booleanish={false} />
    <__docs_demo.setBoo label="withRowBorders" boo={withRowBorders} setBoo={sixth.setBoo} booleanish={false} />
    <__docs_demo.setBoo label="withColumnBorders" boo={withColumnBorders} setBoo={fifth.setBoo} booleanish={false} />
    <__docs_demo.setBoo label="tableOverflow" boo={tableOverflow} setBoo={first.setBoo} booleanish={false} />
    <__docs_demo.setBoo label="stickyHeader" boo={stickyHeader} setBoo={seventh.setBoo} booleanish={false} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}

const someDataPeriodic = [
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
  { name: "Iron", symbol: "Fe", position: 26, mass: 55.845, description:     "A key element in hemoglobin, the oxygen-carrying molecule in blood." },
  { name: "Copper", symbol: "Cu", position: 29, mass: 63.546, description: "A conductor of electricity used in wiring." },
  { name: "Zinc", symbol: "Zn", position: 30, mass: 65.38, description: "An essential trace element for humans." },
  { name: "Yttrium", symbol: "Y", position: 39, mass: 88.906, description: "A rare-earth metal used in lasers and superconductors." },
  { name: "Barium", symbol: "Ba", position: 56, mass: 137.33, description: "A metal used in medical imaging." },
  { name: "Cerium", symbol: "Ce", position: 58, mass: 140.12, description: "A rare-earth element used in catalytic converters." },
  { name: "Hydrogen", symbol: "H", position: 1, mass: 1.008, description:     "The lightest element and most abundant chemical substance in the universe." },
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
