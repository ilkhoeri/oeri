"use client";
import React from "react";
import { Slider } from "@/ui/slider";
import { useApp as useAppContext } from "@/config/app-context";
import { Typography } from "@/ui/typography";

export function Demo() {
  const ctx = useAppContext();
  return (
    <div className="mb-12 flex size-full max-w-96 flex-col items-center justify-center [&>span:not(:first-of-type)]:mt-6">
      <Typography prose="span">No label</Typography>
      <Slider dir={ctx.dir} defaultValue={40} label={null} />

      <Typography prose="span">Formatted label</Typography>
      <Slider dir={ctx.dir} defaultValue={40} label={(value) => `${value} °C`} />

      <Typography prose="span">Label always visible</Typography>
      <Slider dir={ctx.dir} defaultValue={40} labelAlwaysOn />

      <Typography prose="span">Custom label transition</Typography>
      <Slider dir={ctx.dir} defaultValue={40} labelTransitionProps={{ transition: "skew-down", duration: 150, timingFunction: "linear" }} />
    </div>
  );
}
