"use client";
import { useState } from "react";
import { Burger } from "@/ui/burger";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const [open, setOpen] = useState(false);
  const { numb: number, str: color, ...props } = __docs_demo.useDemo({ Numb: 32, Str: "#757575" });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Burger open={open} setOpen={setOpen} size={number} color={color} className="border" />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="size" value={number} setNumb={props.setNumb} min="28" max="64" />
    <__docs_demo.setColor format="hex" swatches={["#fab005", "#f08c00", "#fd7e14"]} str={color} {...props} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
