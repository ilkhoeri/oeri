"use client";
import { useState } from "react";
import { useMove } from "@/modules/hooks-rest";

export function Demo() {
  const [value, setValue] = useState({ x: 0, y: 0 });
  const { ref, active } = useMove<HTMLDivElement>(setValue);

  return (
    <div
      ref={ref}
      className="relative flex h-80 w-80 items-center justify-center rounded-lg border bg-background">
      <div
        data-state={active ? "active" : undefined}
        className="size-2"
        style={{
          position: "absolute",
          left: `calc(${value.x * 100}% - 4px)`,
          top: `calc(${value.y * 100}% - 4px)`,
          backgroundColor: active
            ? "hsl(var(--destructive))"
            : "hsl(var(--constructive))"
        }}
      />

      {active && <i>:active</i>}

      <div className="absolute -bottom-8 flex h-6 items-center justify-center rounded-sm border bg-color px-2 text-xs text-background">
        x:{value.x} y:{value.y}
      </div>
    </div>
  );
}
