import React from "react";
import { Stack } from "@/ui/stack";
import { Button } from "@/ui/button";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: gap, str: align, ...prop } = __docs_demo.useDemo({ Numb: 8, Str: "stretch" });
  const { str: justify, ...props } = __docs_demo.useDemo({ Numb: 8, Str: "center" });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Stack align={align} justify={justify} gap={gap} className="h-[19rem] w-full">
      <Button variant="outline" size="sm">1</Button>
      <Button variant="outline" size="sm">2</Button>
      <Button variant="outline" size="sm">3</Button>
    </Stack>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="Gap" value={gap} setNumb={prop.setNumb} min="0" max="32" />
    <__docs_demo.setSelect label="Align" values={["stretch", "center", "flex-start", "flex-end"]} str={align} setStr={prop.setStr}/>
    <__docs_demo.setSelect label="Justify" values={["center", "flex-start", "flex-end", "space-between", "space-around"]} str={justify} setStr={props.setStr} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
