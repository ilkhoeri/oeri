import React from "react";
import { getControlLabel } from "./get-control-label";
import { SelectData, SelectDataItem, transformSelectData } from "./transform-select-data";
import { ConfiguratorControl } from "./types.control";
import { ComponentProps, ComponentPropsWithRef } from "../assets/types/component";
import { merge } from "cretex";
import { __cn } from "./classes.control";

export type ConfiguratorSelectControlOptions = ConfiguratorControl<"select", { data: SelectData; initialValue: string }>;

export interface ConfiguratorSelectControlProps extends ComponentProps<"select", "onChange" | "value" | "size"> {
  value: string;
  data: SelectData;
  onChange: (value: string) => void;
  prop: string;
}

export function ConfiguratorSelectControl({ value, onChange, prop, data, ...others }: ConfiguratorSelectControlProps) {
  return <NativeSelect value={value} onChange={event => onChange(event.currentTarget.value)} label={getControlLabel(prop)} data={transformSelectData(data)} {...others} />;
}

interface NativeSelectProps extends ComponentProps<"select"> {
  label?: string;
  data?: SelectDataItem[];
  rootProps?: ComponentPropsWithRef<"div">;
  labelProps?: ComponentPropsWithRef<"label">;
  optionsProps?: ComponentPropsWithRef<"label">;
}
const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>((_props, ref) => {
  const { data, label, className, rootProps, labelProps, optionsProps, ...props } = _props;
  const _v = (v: string) => (v !== "" ? v : "undefined");
  return (
    <div dir="ltr" className={merge(__cn("control"))} {...rootProps}>
      <label aria-label={label} className={merge(__cn("label"))} htmlFor={label} {...labelProps}>
        {label}
      </label>

      {data && (
        <select ref={ref} id={label} name={label} title={label} aria-label={label} className={merge(__cn("select"), className)} {...props}>
          {data?.map(i => (
            <option key={_v(i.value)} value={_v(i.value)} className="h-4 cursor-pointer">
              {_v(i.label)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
});
NativeSelect.displayName = "NativeSelect";
