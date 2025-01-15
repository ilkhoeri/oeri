import React from "react";
import { Group } from "@/ui/group";
import { Button } from "@/ui/button";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: gap, str: align, boo: grow, ...prop } = __docs_demo.useDemo({ Numb: 8, Str: "center", Boo: false });
  const { str: justify, ...props } = __docs_demo.useDemo({ Numb: 8, Str: "center" });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Group grow={grow} align={align} justify={justify} gap={gap} className="h-[19rem]">
      <Button variant="outline" size="sm">1</Button>
      <Button variant="outline" size="sm">2</Button>
      <Button variant="outline" size="sm">3</Button>
    </Group>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="Gap" value={gap} setNumb={prop.setNumb} min="4" max="32" />
    <__docs_demo.setBoo label="Grow" boo={grow} setBoo={prop.setBoo} />
    <__docs_demo.setSelect label="Align" values={["center", "flex-start", "flex-end"]} str={align} setStr={prop.setStr}/>
    <__docs_demo.setSelect label="Justify" values={["flex-start", "flex-end", "center", "space-between"]} str={justify} setStr={props.setStr} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
