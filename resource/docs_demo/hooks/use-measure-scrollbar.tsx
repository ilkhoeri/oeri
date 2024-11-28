"use client";
import { useState } from "react";
import { useMeasureScrollbar } from "@/hooks/use-measure-scrollbar";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const [open, setOpen] = useState<boolean>(false);
  const [, scrollbarWidth] = useMeasureScrollbar(open);

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        role="button"
        data-state={open ? "open" : "closed"}
        onClick={() => setOpen(!open)}
        className={globalStyle({ button: "default", size: "sm" }, "w-24")}>
        {open ? "Close" : "Open"}
      </button>
      {open && (
        <div
          data-state={open ? "open" : "closed"}
          className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100">
          <span>Scroll body removed</span>
        </div>
      )}
      <p className="absolute left-4 top-4">
        browser scrollbar: {scrollbarWidth}px
      </p>
    </div>
  );
}
