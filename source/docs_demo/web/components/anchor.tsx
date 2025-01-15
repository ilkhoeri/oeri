import React from "react";
import { Anchor } from "@/ui/anchor";
import { buttonStyle } from "@/ui/button";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { str: underline, ...pro } = __docs_demo.useDemo({ Str: "never" });
  return (
    <>
    <__docs_demo.area className="gap-8">
      {/* @ts-ignore */}
      <Anchor underline={underline}>Anchor</Anchor> {/* @ts-ignore */}
      <Anchor underline={underline} className={buttonStyle({ size: "default", variant: "primitive" })}>Anchor with button variant</Anchor>
      <hr data-ignore />
      <Anchor>Variants underline "never" (default)</Anchor>
      <Anchor underline="always">a variants underline "always"</Anchor>
      <Anchor underline="hover">a variants underline "hover"</Anchor>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="Underline" values={["always", "hover", "never"]} str={underline} setStr={pro.setStr}/>
    </__docs_demo.controls>
    </>
  );
}
