"use client";
import React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/ui/breadcrumb";
import { Typography } from "@/ui/typography";
import { __docs_demo } from "../../__docs_demo";

function renamed(str: string) {
  const words = str.split("-");
  return words
    .map(word => word.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
    .join(" ");
}

export function Demo() {
  const { numb: gap, boo: overflowWrap, str: color, ...pro } = __docs_demo.useDemo({ Numb: 4, Str: undefined });
  const pathname = "docs/web/components/breadcrumb";
  const paths = pathname.split("/").filter(Boolean);
  const active = (index: number) => index === paths.length - 1 || undefined;
  const links = (index: number) => active(index) ? "" : `/${paths.slice(0, index + 1).join("/")}`;
  const items = paths.map((path, index) => (
    <Link key={path} href={links(index)} aria-disabled={active(index)}>
      {renamed(path)}
    </Link>
  ));
  return (
    <>
      <__docs_demo.area>
      <Typography prose="span">Declarative Props</Typography>
      <Breadcrumb items={items} gap={gap} color={color} overflowWrap={overflowWrap} />
      <hr data-ignore />

      <Typography prose="span">Compound Components</Typography>
      <Breadcrumb gap={gap} color={color} overflowWrap={overflowWrap}>
        {paths.map((path, index) => (
          <React.Fragment key={path}>
            <Breadcrumb.Item>
              <Link href={links(index)} aria-disabled={active(index)}>{renamed(path)}</Link>
            </Breadcrumb.Item>
            {index < paths.length - 1 && <Breadcrumb.Separator separator="⇄" />}
          </React.Fragment>
        ))}
      </Breadcrumb>
      </__docs_demo.area>
      <__docs_demo.controls>
      <__docs_demo.setRange label="Gap" value={gap} setNumb={pro.setNumb} min="4" max="132" />
      <__docs_demo.setBoo label="overflowWrap" booleanish={false} boo={overflowWrap} setBoo={pro.setBoo} />
      <__docs_demo.setColor str={color} {...pro} />
      </__docs_demo.controls>
    </>
  );
}