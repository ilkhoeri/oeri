import React from "react";
import { Sheets, SheetsContent, SheetsTrigger } from "@/ui/sheets";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { boo: clickOutsideToClose, numb: offset, align, side, ...props } = __docs_demo.useDemo({ Numb: 4 });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Sheets variant="dropdown" side={side} align={align} sideOffset={offset} clickOutsideToClose={clickOutsideToClose}>
      <SheetsTrigger id="dropdown" className="m-auto">
        <span data-labelopen="Dropdown" data-labelclosed="Dropdown" className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]" />
      </SheetsTrigger>

      <SheetsContent className="z-20 h-[178px] w-44">
        <div className="flex size-full flex-col gap-0.5 overflow-y-auto p-2 text-xs">
          {[...Array(15)].map((_, index) => (
            <p key={index} className="rounded-sm border p-1">
              Lorem ipsum...
            </p>
          ))}
        </div>
      </SheetsContent>
    </Sheets>
    <__docs_demo.label variant="labelOnly" htmlFor="dropdown" title="Dropdown" />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setRange label="sideOffset" value={offset} setNumb={props.setNumb} min={2} max={32} />
    <__docs_demo.setSideAlign side={side} align={align} setSide={props.setSide} setAlign={props.setAlign} />
    <__docs_demo.setBoo label="clickOutsideToClose" booleanish={false} boo={clickOutsideToClose} setBoo={props.setBoo} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
