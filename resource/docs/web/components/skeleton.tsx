import * as React from "react";
import { rem } from "xuxi";
import { cn } from "@/utils/cn";
import { PolymorphicSlot } from "@/ui/polymorphic-slot";

type CSSProperties = React.CSSProperties & { [key: string]: any };
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | "color" | Exclude>>;

interface __SkeletonProps {
  visible?: boolean;
  size?:
    | ((string & {}) | number)
    | {
        h?: CSSProperties["height"];
        w?: CSSProperties["width"];
      };
  circle?: boolean;
  round?: CSSProperties["borderRadius"];
  animate?: boolean;
  color?: React.CSSProperties["color"];
  unstyled?: boolean;
  className?: string;
  style?: CSSProperties;
  asChild?: boolean;
}
export interface SkeletonProps extends ComponentProps<"div">, __SkeletonProps {
  asChild?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>((_props, ref) => {
  const { visible, size, circle, round, animate = true, color, className, style, unstyled, role = "status", asChild, ...props } = _props;
  const Component = asChild ? PolymorphicSlot : "div";
  return <Component {...{ ref, role, ...getStyles({ visible, size, circle, round, animate, color, className, style, unstyled, asChild }), ...props }} />;
});
Skeleton.displayName = "Skeleton";

type Options = __SkeletonProps;
function getStyles(options: Options = {}) {
  const { visible, size, circle, round = 8, animate, color, className, style, unstyled, asChild } = options;

  return {
    className: cn(
      !unstyled && [
        "relative flex items-center justify-center rounded-[--skeleton-round]",
        circle || typeof size === "object" ? "size-[--skeleton-size,auto] min-h-[--skeleton-size,auto] min-w-[--skeleton-size,auto]" : "h-[var(--skeleton-size,var(--skeleton-h,auto))] w-[var(--skeleton-size,var(--skeleton-w,100%))]",
        visible ? "pointer-events-none overflow-hidden before:absolute before:inset-0 before:z-[19] before:content-[''] after:absolute after:inset-0 after:z-[21] after:bg-muted after:content-['']" : "before:transition-colors after:transition-colors",
        { "before:bg-[--skeleton-color,hsl(var(--background))] after:animate-pulse": animate && visible },
        { "min-w-[var(--skeleton-size,var(--skeleton-h,auto))] min-h-[var(--skeleton-size,var(--skeleton-h,auto))]": asChild }
      ],
      className
    ),
    style: {
      ...(typeof size === "object" ? { "--skeleton-h": rem(size.h), "--skeleton-w": rem(size.w) } : { "--skeleton-size": rem(size) }),
      "--skeleton-color": color,
      "--skeleton-round": circle ? "9999px" : round === undefined ? undefined : rem(round),
      transform: "translateZ(0)",
      WebkitTransform: "translateZ(0)",
      ...style
    }
  };
}
