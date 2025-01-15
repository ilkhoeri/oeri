"use client";
import { useHover } from "@/hooks/use-hover";
import { __docs_demo } from "../../__docs_demo";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const { boo: touch, ...props } = __docs_demo.useDemo();
  const { ref, hovered } = useHover<HTMLButtonElement>(undefined, { touch });

  return (
    <>
    <__docs_demo.area>
      <button
        ref={ref}
        type="button"
        role="button"
        className={globalStyle({ button: "default", size: "sm" }, "min-w-24")}
      >
        {hovered ? "Yey..." : touch ? "Touch" : "Hover me"}
      </button>

      {hovered && (
        <div
          role="tooltip"
          className="absolute top-[calc(50%+20px)] rounded-md border bg-background p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100"
        >
          {touch ? "You can also use touch" : "onTouch can't be used"}
        </div>
      )}
    </__docs_demo.area>
    <__docs_demo.controls><__docs_demo.setBoo label="touch" boo={touch} setBoo={props.setBoo} /></__docs_demo.controls>
    </>
  );
}
