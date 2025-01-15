import React from "react";
import { Loader } from "@/ui/loader";
import { BrandOeriIcon } from "@/icons/*";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { numb: size, str: color, ...props } = __docs_demo.useDemo({ Numb: 14, Str: "hsl(var(--color))" });
  const { str: variant, ...pro } = __docs_demo.useDemo({ Str: "clockwise" });
  return (
    <__docs_demo>
    <__docs_demo.area>
      {/* @ts-ignore */}
    <Loader variant={variant} size={size} color={color}>
      <BrandOeriIcon />
    </Loader>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="Variant" values={["spinner", "orbit", "clockwise", "dots", "buffer", "rises"]} str={variant} setStr={pro.setStr}/>
    <__docs_demo.setRange label="Size" value={size} setNumb={props.setNumb} min="12" max="120" />
    <__docs_demo.setColor str={color} {...props} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
