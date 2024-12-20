"use client";
import { useState } from "react";
import { useHotkeys } from "@/hooks/use-hotkeys";
import globalStyle from "@/source/styles/styles";
import { SetProps, SetPropsText, useSetProps } from "../__set_props";

export function Demo() {
  const { str: hotKeys, ...props } = useSetProps({ Str: "ctrl+X" });
  const [open, setOpen] = useState<boolean>(false);

  useHotkeys([[hotKeys, () => setOpen(!open)]]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        type="button"
        role="button"
        // prettier-ignore
        className={globalStyle({ button: "default", size: "sm" }, "min-w-24")}
      >
        {hotKeys} to {open ? "close" : "open"}
      </button>

      {open && (
        <div
          role="tooltip"
          className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100">
          <span className="text-sm">
            / | M | ctrl+X | ctrl+K | alt+mod+shift+X
          </span>
        </div>
      )}
      <SetProps.Wrapper>
        <SetPropsText str={hotKeys} {...props} />
      </SetProps.Wrapper>
    </div>
  );
}
