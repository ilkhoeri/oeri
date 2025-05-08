import { cvx, ocx, type cvxVariants, type cnxValues } from "xuxi";
import { cn } from "@/utils/cn";

export const classes = cvx({
  variants: {
    selector: {
      control: "flex-col items-start rounded-md border border-primitive-foreground bg-primitive p-1 pt-0",
      button:
        "inline-flex h-[--sz] min-h-[--sz,var(--min-sz)] w-[--sz] min-w-[--sz,var(--min-sz)] max-w-full flex-[1_1_68.25%] cursor-pointer items-center justify-center rounded-md border border-primitive-foreground bg-background p-1 text-sm ring-offset-constructive/35 transition-colors [--sz:2rem] [-moz-appearance:none] [-webkit-appearance:none] focus-visible:border-constructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      label: "pl-0.5 text-sm font-medium text-muted-foreground rtl:text-right",
      input: "border-primitive-foreground rounded-sm",
      select:
        "inline-flex max-h-40 w-auto min-w-full max-w-full flex-1 grow cursor-pointer items-center justify-start rounded-md border border-primitive-foreground bg-background px-2 py-1 font-inter text-sm ring-offset-constructive/35 transition-colors scrollbar [-moz-appearance:none] [-webkit-appearance:none] focus-visible:border-constructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      div: "",
      option: "h-4 cursor-pointer",
      unstyled: ""
    },
    size: {
      "26": "min-w-26",
      "36": "min-w-36",
      icon: "h-[--sz] w-[--sz] min-h-[--sz,var(--min-sz)] min-w-[--sz,var(--min-sz)] [--sz:2rem] py-1 px-1 border"
    }
  }
});

type Selector = NonNullable<cvxVariants<typeof classes>["selector"]>;
type Options = {
  className?: string;
  style?: React.CSSProperties & Record<string, any>;
};
export const __cn = (s: Selector, ...c: cnxValues[]) => cn(classes({ selector: s }), ...c);
export const __cs = (o: Options["style"] = {}) => ocx(o);
