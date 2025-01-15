"use client";
import { getRandomColor } from "@/hooks/use-random-colors";

export function Demo() {
  const color = getRandomColor();
  return (
    <h4 {...{ className: "m-auto text-h1 font-extrabold", style: { color } }}>
      useRandomColor
    </h4>
  );
}
