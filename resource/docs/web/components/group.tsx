import * as React from "react";
import { cn, rem } from "cretex";

export interface GroupProps extends React.ComponentProps<"div"> {
  grow?: boolean;
  unstyled?: string;
  gap?: string | number;
  preventGrowOverflow?: boolean;
  wrap?: React.CSSProperties["flexWrap"];
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  style?: React.CSSProperties & { [key: string]: any };
}

export const Group = React.forwardRef<HTMLDivElement, GroupProps>((_props, ref) => {
  const { unstyled, className, style, grow, children, gap = "12", wrap = "wrap", align = "stretch", justify = "center", preventGrowOverflow = true, ...props } = _props;
  const filteredChildren = filterFalsyChildren(children);
  const childrenCount = filteredChildren.length;
  const isGrow = grow && preventGrowOverflow;
  const resolvedGap = rem(gap);
  const childWidth = `calc(${100 / childrenCount}% - (${resolvedGap} - ${resolvedGap} / ${childrenCount}))`;

  return (
    <div
      {...{
        ref,
        "data-grow": isGrow || undefined,
        className: cn([{ "flex flex-row w-full h-full": !unstyled }, { "[&:where([data-grow])>*]:grow [&:where([data-grow])>*]:max-w-[--group-child-width]": isGrow }], className),
        style: {
          flexWrap: wrap,
          gap: resolvedGap,
          alignItems: align,
          justifyContent: justify,
          "--group-child-width": isGrow ? childWidth : undefined,
          ...style
        } as React.CSSProperties,
        ...props
      }}
    >
      {filteredChildren}
    </div>
  );
});
Group.displayName = "Group";

export function filterFalsyChildren(children: React.ReactNode) {
  return (React.Children.toArray(children) as React.ReactElement[]).filter(Boolean);
}
