import * as React from "react";
import { cvx, cvxVariants } from "xuxi";
import { cn } from "@/utils/cn";

const classes = cvx({
  assign: "pointer-events-none w-max select-none rounded-md px-1 py-0.5 text-center font-mono text-[10px] font-semibold leading-[16px]",
  variants: {
    variant: {
      hidden: "sr-only hidden",
      new: "bg-green-500 text-black tracking-wide",
      updated: "bg-blue-500 text-white tracking-wide",
      error: "bg-red-500 text-white tracking-[0]"
    }
  }
});

type Variants = NonNullable<cvxVariants<typeof classes>["variant"]>;
interface ReverseState {
  isActive(): boolean;
  variant(): Variants;
}

export interface MarkProps extends Omit<React.ComponentProps<"mark">, "children">, cvxVariants<typeof classes> {
  children?: React.ReactNode | ((state: ReverseState) => React.ReactNode);
  active?: boolean;
  label?: string | null | undefined;
}

export const Mark = React.forwardRef<HTMLElement, MarkProps>((_props, ref) => {
  const { className, active, label, children, variant = "hidden", tabIndex = -1, ...props } = _props;

  if (!active) return null;

  return (
    <mark {...props} ref={ref} tabIndex={tabIndex} className={cn(classes({ variant }), className)}>
      {(typeof children === "function" ? children({ isActive: () => active, variant: () => variant }) : children) ?? label}
    </mark>
  );
});
Mark.displayName = "Mark";
