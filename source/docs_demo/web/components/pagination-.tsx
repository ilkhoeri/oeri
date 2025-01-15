"use client";
import React from "react";
import { Pagination } from "@/ui/pagination";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: sibling, boo: withEdges, ...pro } = __docs_demo.useDemo({ Numb: 2 });
  const { numb: boundaries, str: color, ...prop } = __docs_demo.useDemo({ Numb: 1, Str: undefined });
  const state = (state: number, name: string) => state === 1 ? `${state} ${name} (default)` : `${state} ${name}`; // ignore
  return (
    <__docs_demo>
    <__docs_demo.area>
    <p data-ignore className="mb-4 w-full text-center text-sm text-muted-foreground">{state(sibling, "sibling")} | {state(boundaries, "boundaries")}</p>
    <Pagination key={boundaries} siblings={sibling} boundaries={boundaries} withEdges={withEdges} color={color} total={21} defaultValue={11} />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="Sibling" value={sibling} setNumb={pro.setNumb} min="1" max="3" />
    <__docs_demo.setRange label="Boundaries" value={boundaries} setNumb={prop.setNumb} min="1" max="3" />
    <__docs_demo.setBoo label="WithEdges" boo={withEdges} setBoo={pro.setBoo} />
    <__docs_demo.setColor str={color} {...prop} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}