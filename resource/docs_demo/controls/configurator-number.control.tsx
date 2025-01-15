"use client";
import { useApp } from "@/config/app-context";
import { Slider } from "@/ui/slider";
import { Input } from "@/ui/input";
import { ComponentProps } from "../assets/types/component";
import { getControlLabel } from "./get-control-label";
import { ConfiguratorControl } from "./types.control";
import { __cn } from "./classes.control";

export type ConfiguratorNumberControlOptions = ConfiguratorControl<"number", { initialValue: number; min?: number; max?: number; step?: number }>;

export interface ConfiguratorNumberControlProps extends ComponentProps<"div", "onChange"> {
  value: number;
  onChange: (value: number) => void;
  prop: string;
  step?: number;
  min?: number;
  max?: number;
}

export function ConfiguratorNumberControl(_props: ConfiguratorNumberControlProps) {
  const { value, onChange, prop, step, min, max, ...others } = _props;
  const ctx = useApp();
  return (
    <Input.Wrapper labelElement="div" dir={ctx.dir} label={getControlLabel(prop)} {...others} unstyled={{ label: true }} classNames={{ label: __cn("label") }}>
      <Slider dir={ctx.dir} value={value} onChange={onChange} step={step} min={min} max={max} thumbLabel="Size" />
    </Input.Wrapper>
  );
}
