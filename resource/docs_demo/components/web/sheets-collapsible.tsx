import React from "react";
import { Sheets, SheetsTrigger, SheetsContent } from "@/modules/components/web";
import { ChevronIcon } from "@/modules/icons";

export function Demo() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative z-50 h-9 w-24 min-w-24 rounded-md bg-color px-2 text-center font-semibold text-background hover:bg-color/90">
        {isOpen ? "Close" : "Read"}
      </button>
      <Sheets
        variant="collapsible"
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-80 text-justify text-sm">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat,
          eius adipisci voluptas nemo reprehenderit recusandae. Incidunt
          distinctio voluptates veniam quia soluta voluptate unde nisi autem
          dignissimos doloremque fuga, corrupti repellat pariatur molestiae
          illum. Enim iure doloribus culpa soluta mollitia, dolores labore
          cupiditate fugiat temporibus? Officia est laudantium consectetur ipsam
          doloribus.
        </p>
      </Sheets>

      <hr className="w-80" />

      <Sheets
        variant="collapsible"
        clickOutsideToClose
        className="w-80 space-y-2">
        <SheetsTrigger className="w-full justify-between bg-background font-mono text-sm text-color">
          Select your &lt;Sheets /&gt;
          <span className="rounded-md border p-1 transition-colors group-hover:bg-muted/90 group-data-[state=open]:border-color">
            <ChevronIcon chevron="up-down" />
          </span>
        </SheetsTrigger>

        <a
          href="#sheets-collapsible"
          className="mt-4 w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm hover:bg-muted/60">
          @sheets/collapsible
        </a>

        <SheetsContent className="space-y-2">
          {["accordion", "dialog", "drawer", "dropdown"].map(i => (
            <a
              key={i}
              href={`#sheets-${i}`}
              className="w-full justify-start rounded-md border px-4 py-2 font-mono text-sm shadow-sm hover:bg-muted/60">
              @sheets/{i}
            </a>
          ))}
        </SheetsContent>
      </Sheets>
    </div>
  );
}
