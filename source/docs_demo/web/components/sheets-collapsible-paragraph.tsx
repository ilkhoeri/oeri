"use client";
import React from "react";
import { Sheets } from "@/ui/sheets";

export function Demo() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="m-auto flex flex-col items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative z-50 h-9 w-24 min-w-24 rounded-md bg-color px-2 text-center font-semibold text-background hover:bg-color/90"
      >
        {isOpen ? "Close" : "Read"}
      </button>
      <Sheets
        variant="collapsible"
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-80 text-justify text-sm"
      >
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
    </div>
  );
}
