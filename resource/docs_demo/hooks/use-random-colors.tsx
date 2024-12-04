"use client";
import { getRandomColor } from "@/hooks/use-random-colors";

export function Demo() {
  const color = getRandomColor();
  return (
    <div className="flex flex-row items-center gap-4">
      <h4 {...{ className: "text-h1 font-extrabold", style: { color } }}>
        useRandomColor
      </h4>
    </div>
  );
}
