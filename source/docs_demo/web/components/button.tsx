"use client";
import React from "react";
import { Button, UnstyledButton } from "@/ui/button";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { str: variant, ...pro } = __docs_demo.useDemo({ Str: "default" });
  const { str: color, ...prop } = __docs_demo.useDemo({ Str: "default" });
  const { str: size, ...props } = __docs_demo.useDemo({ Str: "default" });
  const [loading, setLoading] = React.useState(false);
  return (
    <>
    <__docs_demo.area>
      <UnstyledButton loading={loading}>UnstyledButton</UnstyledButton>
      {/* @ts-ignore */}
      <Button variant={variant} color={color} size={size}
      loading={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2500);
      }}
      >
        {size === "icon" ? "B" : "Button"}
      </Button>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSelect label="Variant" values={["default", "link", "destructive", "constructive", "conservative", "primitive", "outline", "ghost"]} str={variant} setStr={pro.setStr}/>
    <__docs_demo.setSelect label="Color" values={["default", "base", "blue", "grape", "green", "red", "gradient-blue", "gradient-orange", "outline-base", "outline-indigo", "outline-teal"]} str={color} setStr={prop.setStr}/>
    <__docs_demo.setSelect label="Size" values={["default", "badge", "sm", "lg", "icon"]} str={size} setStr={props.setStr}/>
    </__docs_demo.controls>
    </>
  );
}
