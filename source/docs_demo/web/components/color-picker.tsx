"use client";
import { useState } from "react";
import { Input } from "@/ui/input";
import { ColorPicker } from "@/ui/color-picker";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: size, boo: withShadow, ...prop } = __docs_demo.useDemo({ Numb: 16, Boo: false });
  const { boo: fullWidth, ...props } = __docs_demo.useDemo({ Boo: false });
  const { numb: swatchPerRow, boo: withPicker, ...pro } = __docs_demo.useDemo({ Numb: 6, Boo: true });
  const [value, onChange] = useState("rgba(47, 119, 150, 0.7)");
  const swatches = ["#ffffff", "#000000", "#2e2e2e", "#868e96", "#fa5252", "#e64980", "#be4bdb", "#7950f2", "#4c6ef5", "#228be6", "#15aabf", "#12b886", "#40c057", "#82c91e", "#fab005", "#fd7e14" ];
  return (
    <__docs_demo>
    <__docs_demo.area>
      <ColorPicker
        format="hsla"
        size={size}
        fullWidth={fullWidth}
        withPicker={withPicker}
        withShadow={withShadow}
        swatchPerRow={swatchPerRow}
        onChange={onChange}
        value={value}
        swatches={swatches}
      >
      <Input value={value} onChange={e => onChange(e.target.value)} className="mt-[--cp-space] h-auto p-[--cp-space] [font-size:--cp-size]" />
      </ColorPicker>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="size" value={size} setNumb={prop.setNumb} min="8" max="23" />
    <__docs_demo.setRange label="swatchPerRow" value={swatchPerRow} setNumb={pro.setNumb} min="4" max="32" />
    <__docs_demo.setBoo label="withPicker" booleanish={false} boo={withPicker} setBoo={pro.setBoo} />
    <__docs_demo.setBoo label="fullWidth" booleanish={false} boo={fullWidth} setBoo={props.setBoo} />
    <__docs_demo.setBoo label="withShadow" booleanish={false} boo={withShadow} setBoo={prop.setBoo} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
