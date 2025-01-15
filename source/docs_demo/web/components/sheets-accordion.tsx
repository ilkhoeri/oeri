import React from "react";
import { Sheets, SheetsItem, SheetsContent, SheetsTrigger } from "@/ui/sheets";
import { ChevronIcon } from "@/icons/*";
import { __docs_demo } from "../../__docs_demo";

const data = [
  { title: "Accessibility", description: "Accessibility items that can be changed." },
  { title: "Terms and Conditions", description: "You can find out more here" },
  { title: "Preferences", description: "Change the theme, color, and font style according to your preferences" },
  { title: "Updates", description: "Find the latest news about us here." }
];

export function Demo() {
  const { boo: multipleOpen, ...props } = __docs_demo.useDemo();
  return (
    <__docs_demo>
    <__docs_demo.area className="gap-10">
    <Sheets multipleOpen={multipleOpen} className="w-full max-w-96 rounded-lg border px-6">
      {data.map((i, index) => (
        <SheetsItem key={index} className="last-of-type:border-b-0">
          <SheetsTrigger id={String(i.title.toLowerCase().replace(/\s/g, "-"))}>
            {i.title}
            <ChevronIcon chevron="down" data-origin="arrow-collapse" />
          </SheetsTrigger>

          <SheetsContent className="text-sm" id={String(index)}>
            <p className="pb-4">{i.description}</p>
          </SheetsContent>
        </SheetsItem>
      ))}
    </Sheets>
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setBoo label="multipleOpen" booleanish={false} boo={multipleOpen} setBoo={props.setBoo} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
