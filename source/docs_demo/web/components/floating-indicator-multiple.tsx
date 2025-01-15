"use client";
import { useState } from "react";
import { ArrowIcon, CircleIcon } from "@/icons/*";
import { UnstyledButton } from "@/ui/button";
import { FloatingIndicator } from "@/ui/floating-indicator";
import { cvx, cvxProps } from "str-merge";

const classes = cvx({
  variants: {
    selector: {
      root: "m-auto relative w-max p-2 rounded-lg border bg-muted/60",
      indicator: "bg-muted/60 rounded-md shadow-md border border-solid",
      controls: "flex",
      control: "size-[50px] flex items-center justify-center text-muted-foreground rounded-md data-[active]:text-color hover:text-color hover:bg-muted/60 [&>svg]:block [&>svg]:relative [&>svg]:z-1"
    }
  }
});

const style = (selector: NonNullable<cvxProps<typeof classes>>["selector"]) => classes({ selector });

export function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState<string>("center");

  const setControlRef = (name: string) => (node: HTMLButtonElement) => {
    controlsRefs[name] = node;
    setControlsRefs(controlsRefs);
  };
  const dataActive = (state: string) => ({ "data-active": active === state });

  const controls = [
    ["up-left", "up", "up-right"],
    ["left", "center", "right"],
    ["down-left", "down", "down-right"]
  ];

  const renderIcon = (name: string) => {
    if (name === "center") return <CircleIcon size={26} stroke={1.5} />;
    return <ArrowIcon arrow={name as any} size={26} stroke={1.5} />;
  };

  return (
    <div className={style("root")} dir="ltr" ref={setRootRef}>
      <FloatingIndicator target={controlsRefs[active]} parent={rootRef} className={style("indicator")} />
      {controls.map((row, rowIndex) => (
        <div key={rowIndex} className={style("controls")}>
          {row.map(name => (
            <UnstyledButton
              key={name}
              className={style("control")}
              onClick={() => setActive(name)}
              ref={setControlRef(name)}
              {...dataActive(name)}
            >
              {renderIcon(name)}
            </UnstyledButton>
          ))}
        </div>
      ))}
    </div>
  );
}
