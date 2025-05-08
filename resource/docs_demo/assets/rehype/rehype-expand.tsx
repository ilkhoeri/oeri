import React from "react";
import { useExpand } from "@/source/assets/playtabs";
import { cn } from "@/utils/cn";

export const Expand = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>((_props, ref) => {
  const { children, className, ...props } = _props;
  const use = useExpand();

  return (
    <div
      {...{
        ref,
        className: cn(use.classes({ statecard: use.expand, card: "resize" }), "[&_pre>code[data-language]]:min-w-max [&_pre>code[data-language]]:border-0 [&_pre[data-language]]:my-0", className),
        ...props
      }}
    >
      <div data-code-fragment className="scrollbar">
        {children}
      </div>
      <use.Resizer />
    </div>
  );
});
Expand.displayName = "Expand";
