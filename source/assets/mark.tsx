import { forwardRef } from "react";
import { cn } from "str-merge";

export type MarkProps = {
  className?: string;
  childTrue?: React.ReactNode;
  childFalse?: React.ReactNode;
  mark: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const Mark = forwardRef<HTMLElement, MarkProps>(function Mark({ childTrue, childFalse, className, mark, ...props }, ref) {
  return (
    <mark
      ref={ref}
      className={cn(
        "h-4 w-max select-none rounded px-1 text-center font-mono text-[10px] font-semibold uppercase leading-[16px] text-white",
        mark === true ? "bg-[#2ea043] tracking-wide" : "bg-[#e54b4b] tracking-[0]",
        className
      )}
      {...props}
    >
      {mark === true ? (childTrue ?? "True") : (childFalse ?? "False")}
    </mark>
  );
});
Mark.displayName = "Mark";
