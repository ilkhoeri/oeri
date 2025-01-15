import React from "react";
import { Sheets, SheetsClosed, SheetsContent, SheetsTrigger } from "@/ui/sheets";
import { __docs_demo } from "../../__docs_demo";

export function Demo() {
  const { side, ...props } = __docs_demo.useDemo({ Side: "right" });
  return (
    <__docs_demo>
    <__docs_demo.area>
    <Sheets variant="drawer" side={side}>
      <SheetsTrigger id="drawer">
        <span
          data-labelopen="Open Drawer"
          data-labelclosed="Close Drawer"
          className="group-data-[state=closed]:before:content-[attr(data-labelopen)] group-data-[state=open]:before:content-[attr(data-labelclosed)]"
        />
      </SheetsTrigger>

      <SheetsContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 space-y-1.5 text-start">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            Lorem ipsum
          </h2>
          <p className="text-sm text-muted-foreground">
            Tenetur fugiat aspernatur aut quas ex praesentium molestias
            officiis. repudiandae.
          </p>
        </div>
        <div className="flex size-full flex-col overflow-y-auto text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
          fugiat aspernatur aut quas ex praesentium molestias officiis fugit
          accusamus expedita alias repudiandae, exercitationem maiores velit
          quos reiciendis recusandae, quod iusto earum? Fugiat fuga dolor
          atque nobis esse dignissimos temporibus vel incidunt maxime
          provident ut dolorem hic explicabo corrupti, praesentium a.
        </div>

        <SheetsClosed />
      </SheetsContent>
    </Sheets>
    <__docs_demo.label htmlFor="drawer" variant="labelOnly" title="Drawer" />
    </__docs_demo.area>
    <__docs_demo.controls>
    <__docs_demo.setSideAlign side={side} setSide={props.setSide} />
    </__docs_demo.controls>
    </__docs_demo>
  );
}
