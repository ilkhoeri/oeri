import { getControlLabel } from "./get-control-label";
import { ConfiguratorControl } from "./types.control";
import { Checker, type CheckerProps } from "@/ui/checker";

export type ConfiguratorBooleanControlOptions = ConfiguratorControl<"boolean", { initialValue: boolean }>;

export interface ConfiguratorBooleanControlProps extends Omit<CheckerProps, "value" | "onChange"> {
  value: boolean;
  onChange: (value: boolean) => void;
  prop: string;
}

export function ConfiguratorBooleanControl({ value, onChange, prop, type, ...others }: ConfiguratorBooleanControlProps) {
  return <Checker {...others} type="switch" checked={value} onCheckedChange={event => onChange(event.currentTarget.checked)} label={getControlLabel(prop)} />;
}
