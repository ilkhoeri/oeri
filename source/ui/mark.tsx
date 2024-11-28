import { forwardRef } from "react";
import { twMerge } from "str-merge";

export type MarkProps = {
  className?: string;
  childTrue?: React.ReactNode;
  childFalse?: React.ReactNode;
  mark: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const Mark = forwardRef<HTMLElement, MarkProps>(function Mark(
  { childTrue, childFalse, className, mark, ...props },
  ref
) {
  return (
    <mark
      ref={ref}
      className={twMerge(
        "px-1 h-4 text-[10px] leading-[16px] font-mono font-semibold text-center uppercase rounded text-white w-max select-none",
        mark === true
          ? "bg-[#2ea043] tracking-wide"
          : "bg-[#e54b4b] tracking-[0]",
        className
      )}
      {...props}>
      {mark === true ? (childTrue ?? "True") : (childFalse ?? "False")}
    </mark>
  );
});
Mark.displayName = "Mark";
