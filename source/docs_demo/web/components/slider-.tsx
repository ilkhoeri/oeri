"use client";
import React from "react";
import { Slider } from "@/ui/slider";
import { Typography } from "@/ui/typography";
import { useApp as useAppContext } from "@/config/app-context";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: size, str: string, ...pro } = __docs_demo.useDemo({ Numb: 8, Str: "#f08c00" });
  const { numb: round, boo: disabled, ...prop } = __docs_demo.useDemo({ Numb: 8, Boo: false });
  const { boo: labelAlwaysOn, ...props } = __docs_demo.useDemo({ Numb: 20 });
  const ctx = useAppContext();
  const [value, setValue] = React.useState(35);
  const [endValue, setEndValue] = React.useState(35);

  const marks = [
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" }
  ];
  return (
    <__docs_demo>
    <__docs_demo.area>
    <div className="mb-8 flex size-full max-w-96 flex-col items-center justify-center">
      <Slider dir={ctx.dir} color={string} size={size} round={round} disabled={disabled} defaultValue={35} value={value} onChange={setValue} onChangeEnd={setEndValue} marks={marks} labelAlwaysOn={labelAlwaysOn} />
      <Typography prose="span">onChange value: <b>{value}</b></Typography>
      <Typography prose="span">onChangeEnd value: <b>{endValue}</b></Typography>
    </div>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setColor format="hex" str={string} {...pro} className="max-md:!grow-0 max-md:[&>[data-cp=root]]:hidden" />
    <__docs_demo.setBoo label="disabled" booleanish={false} boo={disabled} setBoo={prop.setBoo} />
    <__docs_demo.setBoo label="labelAlwaysOn" booleanish={false} boo={labelAlwaysOn} setBoo={props.setBoo} />
    <__docs_demo.setRange label="size" value={size} setNumb={pro.setNumb} min="8" max="18" />
    <__docs_demo.setRange label="round" value={round} setNumb={prop.setNumb} min="8" max="18" />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
