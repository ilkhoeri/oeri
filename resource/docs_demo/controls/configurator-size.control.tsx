"use client";
import { useApp } from "@/config/app-context";
import { Slider } from "@/ui/slider";
import { ComponentProps } from "../assets/types/component";
import { getControlLabel } from "./get-control-label";
import { ConfiguratorControl } from "./types.control";
import { Input } from "@/ui/input";
import { __cn } from "./classes.control";

const MARKSIZE = [
  { value: 0, label: "xs" },
  { value: 25, label: "sm" },
  { value: 50, label: "md" },
  { value: 75, label: "lg" },
  { value: 100, label: "xl" }
];

export type ConfiguratorSizeControlOptions = ConfiguratorControl<"size", { initialValue: string }>;

export interface ConfiguratorSizeControlProps extends ComponentProps<"div", "onChange"> {
  value: string;
  onChange: (value: string) => void;
  prop: string;
}

export function ConfiguratorSizeControl(_props: ConfiguratorSizeControlProps) {
  const { value, onChange, prop, ...others } = _props;
  const ctx = useApp();

  const _value = MARKSIZE.find(mark => mark.label === value)?.value || 0;
  const handleChange = (val: number) => onChange(MARKSIZE.find(mark => mark.value === val)?.label || value);

  return (
    <Input.Wrapper dir={ctx.dir} labelElement="div" label={getControlLabel(prop)} {...others} unstyled={{ label: true }} classNames={{ label: __cn("label") }}>
      <Slider dir={ctx.dir} thumbLabel="Size" value={_value} onChange={handleChange} styles={{ markLabel: { display: "none" } }} step={25} label={val => MARKSIZE.find(mark => mark.value === val)!.label} marks={MARKSIZE} />
    </Input.Wrapper>
  );
}
