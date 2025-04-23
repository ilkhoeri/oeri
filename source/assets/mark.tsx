import * as React from "react";
import { cn, cvx, cvxProps } from "cretex";

const classes = cvx({
  assign: "pointer-events-none w-max select-none rounded-md px-1 py-0.5 text-center font-mono text-[10px] font-semibold leading-[16px] text-white",
  variants: {
    variant: {
      new: "bg-green-500 tracking-wide",
      updated: "bg-blue-500 tracking-wide",
      error: "bg-red-500 tracking-[0]"
    }
  }
});

export interface MarkProps extends Omit<React.ComponentProps<"mark">, "children">, cvxProps<typeof classes> {
  children?: React.ReactNode | ((state: boolean) => React.ReactNode);
  active?: boolean;
  label?: string | null | undefined;
}

export const Mark = React.forwardRef<HTMLElement, MarkProps>((_props, ref) => {
  const { className, active, label, children, variant, tabIndex = -1, ...props } = _props;

  if (!active) return null;

  return (
    <mark {...props} ref={ref} tabIndex={tabIndex} className={cn(classes({ variant }), className)}>
      {(typeof children === "function" ? children(active) : children) ?? label}
    </mark>
  );
});
Mark.displayName = "Mark";
