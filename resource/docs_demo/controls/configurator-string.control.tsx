import { Input } from "@/ui/input";
import { ComponentProps } from "../assets/types/component";
import { getControlLabel } from "./get-control-label";
import { ConfiguratorControl } from "./types.control";
import { __cn } from "./classes.control";
import { SelectData, transformSelectData } from "./transform-select-data";
import { cn } from "@/utils/cn";
import { purify } from "@/source/libs/dom-purify";

export type ConfiguratorStringControlOptions = ConfiguratorControl<"string", { initialValue: string | null; data?: SelectData; inputType?: ComponentProps<"input">["type"] }>;

export interface ConfiguratorStringControlProps extends ComponentProps<"input", "onChange" | "value" | "size" | "type"> {
  value: string;
  onChange: (value: string) => void;
  prop: string;
  data?: SelectData;
  inputType?: ComponentProps<"input">["type"];
}

const validString = (value: string) =>
  String(value)
    .replace(/\n{0,}/g, "")
    .replace("undefined", "")
    .replace("null", "");

export function ConfiguratorStringControl(_props: ConfiguratorStringControlProps) {
  const { data, value, onChange, prop, className, inputType = "text", ...others } = _props;
  const transformData = data && transformSelectData(data);
  return (
    <Input.Wrapper label={getControlLabel(prop)} unstyled classNames={{ root: __cn("control"), label: __cn("label") }}>
      <Input {...others} type={inputType} value={purify(validString(value))} onChange={event => onChange(event.currentTarget.value)} placeholder="Enter prop value" className={cn(__cn("input"), className)} list={`${prop}-list`} />

      {data && (
        <datalist id={`${prop}-list`}>
          {transformData?.map(i => (
            <option key={i.value} value={i.value} className="h-4 cursor-pointer">
              {i.label}
            </option>
          ))}
        </datalist>
      )}
    </Input.Wrapper>
  );
}
ConfiguratorStringControl.displayName = "ConfiguratorStringControl";
