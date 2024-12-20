"use client";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const [open, setOpen] = useState<boolean>(false);
  const [withRef, setWithRef] = useState<boolean>(true);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickOutside(() => setOpen(false), [buttonRef, contentRef]);

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        role="button"
        onClick={() => setWithRef(!withRef)}
        className="absolute left-4 top-4 w-max min-w-26 cursor-pointer justify-start rounded-md border bg-background px-2 py-1 text-sm"
      >
        {withRef ? "withRef" : "whitOutRef"}
      </button>

      <button
        ref={withRef ? buttonRef : undefined}
        type="button"
        role="button"
        data-state={open ? "open" : "closed"}
        onClick={() => setOpen(!open)}
        className={globalStyle({ button: "default", size: "sm" }, "w-24")}
      >
        {open ? "Close" : "Open"}
      </button>

      {open && (
        <div
          ref={withRef ? contentRef : undefined}
          data-state={open ? "open" : "closed"}
          className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        >
          <span>
            {withRef
              ? "Click outside to close"
              : "Can't click outside to close"}
          </span>
        </div>
      )}
    </div>
  );
}
