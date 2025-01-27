import { Input } from "@/ui/input";
import { ComponentProps } from "../assets/types/component";
import { getControlLabel } from "./get-control-label";
import { ConfiguratorControl } from "./types.control";
import { UnstyledButton } from "@/ui/button";
import { transform } from "@/utility/text-parser";
import { merge } from "cretex";
import { SelectData, transformSelectData } from "./transform-select-data";
import { __cn } from "./classes.control";

export type ConfiguratorSegmentedControlOptions = ConfiguratorControl<"segmented", { data: SelectData; initialValue: string }>;

interface SelectDataItem {
  label: string;
  value: string;
}
export interface ConfiguratorSegmentedControlProps extends ComponentProps<"div", "onChange"> {
  data: SelectData;
  value: string;
  onChange: (value: string) => void;
  prop: string;
  transformLabel?: boolean;
}

export function ConfiguratorSegmentedControl({ data, value, onChange, prop, transformLabel = true, ...props }: ConfiguratorSegmentedControlProps) {
  function TriggerControl({ label, value }: SelectDataItem) {
    return (
      <UnstyledButton
        onClick={() => onChange(value)}
        className={merge(
          "inline-flex w-full min-w-16 max-w-full flex-1 grow cursor-pointer items-center justify-start rounded-md border border-primitive-foreground bg-background px-2 py-1 text-center text-sm ring-offset-constructive/35 transition-colors [-moz-appearance:none] [-webkit-appearance:none] focus-visible:border-constructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          value === value && "border-constructive bg-constructive/20"
        )}
      >
        {transform.capitalizeFirst(label)}
      </UnstyledButton>
    );
  }
  return (
    <Input.Wrapper labelElement="div" label={getControlLabel(prop)} {...props} unstyled={{ label: true }} classNames={{ label: __cn("label") }}>
      {/* <SegmentedControl
        data={transformLabel ? transformSelectData(data) : data}
        value={value}
        onChange={onChange}
        fullWidth
        transitionDuration={150}
      /> */}
      <div data-selects="button" className="grid w-full grid-cols-2 gap-1">
        {transformLabel
          ? transformSelectData(data).map(item => {
              const i = item as SelectDataItem;
              return <TriggerControl key={i.value} value={i.value} label={i.label} />;
            })
          : data.map(item => {
              const i = item as string;
              return <TriggerControl key={i} value={i} label={i} />;
            })}
      </div>
    </Input.Wrapper>
  );
}
