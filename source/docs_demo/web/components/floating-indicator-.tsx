"use client";
import { useState } from "react";
import { UnstyledButton } from "@/ui/button";
import { FloatingIndicator } from "@/ui/floating-indicator";

const data = ["React", "Vue", "Angular", "Svelte"];

export function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };
  const isActive = (index: number) => (active === index ? "true" : undefined);

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item}
      className="touch-manipulation appearance-none rounded-md text-sm font-medium leading-none text-muted-foreground transition-[color] hover:text-color data-[active]:text-color"
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      data-active={isActive(index)}
    >
      <span className="relative z-1 px-3 py-[.4375rem]" onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)}>{item}</span>
    </UnstyledButton>
  ));

  return (
    <div className="relative m-auto w-fit rounded-lg border bg-background p-[.3125rem]" ref={setRootRef}>
      {controls}
      <FloatingIndicator target={controlsRefs[hover ?? active]} parent={rootRef} className="rounded-md" />
    </div>
  );
}
