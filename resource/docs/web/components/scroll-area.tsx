"use client";
import * as React from "react";
import * as Primitive from "@radix-ui/react-scroll-area";
import { cn, cvx, ocx, rem, type cvxProps } from "str-merge";

const classes = cvx({
  variants: {
    selector: {
      root: "h-full w-full overflow-hidden",
      viewport: "group/sa !flex flex-nowrap size-full",
      scrollbar: "flex touch-none select-none p-0.5 bg-[--bg] ease-out transition-colors [transition-duration:160ms]",
      thumb:
        "relative flex-1 rounded-full bg-[--sa-thumb-color] cursor-grab active:cursor-grabbing before:absolute before:size-full before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:min-h-11 before:min-w-11",
      corner: "bg-[--sa-track-color,transparent]"
    },
    viewport: {
      vertical: "flex-col",
      horizontal: "flex-row"
    },
    scrollbar: {
      vertical: "w-[--sa-thumb-size]",
      horizontal: "flex-col h-[--sa-thumb-size]"
    }
  }
});

export type Orientation = "vertical" | "horizontal";
type __Selector = NonNullable<cvxProps<typeof classes>["selector"]>;
type CSSProperties = React.CSSProperties & { [key: string]: any };
type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type Styles = ["unstyled", boolean] | ["classNames", string] | ["styles", CSSProperties];
type StylesNames<T extends string, Exclude extends string = never> = Omit<
  NestedRecord<Styles, T> & {
    className?: string;
    style?: CSSProperties;
  },
  Exclude
>;
type Options = StylesNames<__Selector> & __ScrollAreaProps;
type PropsOf<T, K extends string = never> = Omit<T, "style" | K> & {
  className?: string;
  style?: CSSProperties;
};

function getStyles(selector: __Selector, options: Options = {}) {
  const { className, classNames, color = "hsl(var(--muted))", orientation, style, styles, type, unstyled, size = 10 } = options;
  const isUnstyled = typeof unstyled === "object" ? unstyled?.[selector] : unstyled;
  const root = selector === "root";
  const scrollbar = selector === "scrollbar";
  const viewport = selector === "viewport";
  const isOrient = (select: boolean) => (select ? orientation : undefined);
  return {
    "data-orientation": orientation,
    className: cn(
      !isUnstyled &&
        classes({
          selector,
          scrollbar: isOrient(scrollbar),
          viewport: isOrient(viewport)
        }),
      scrollbar && !isUnstyled && ["[&:not(:empty)]:[--bg:--sa-track-color,transparent]"],
      classNames?.[selector],
      className
    ),
    style: ocx(
      styles?.[selector],
      style,
      root && [
        typeof color === "object" ? { "--sa-track-color": color.track, "--sa-thumb-color": color.thumb } : { "--sa-thumb-color": color },
        { "--sa-thumb-size": rem(size) }
      ],
      type === "never" && scrollbar && { display: "none", visibility: "hidden" }
    )
  };
}

export interface __ScrollAreaProps extends StylesNames<__Selector> {
  orientation?: Orientation;
  size?: number | string;
  type?: Primitive.ScrollAreaProps["type"] | "never";
  color?: CSSProperties["color"] | { thumb?: CSSProperties["color"]; track?: CSSProperties["color"] };
}
export interface ScrollAreaProps extends PropsOf<Primitive.ScrollAreaProps, "color" | "type">, __ScrollAreaProps {
  viewportProps?: PropsOf<Primitive.ScrollAreaViewportProps & React.ComponentProps<"div"> & Record<string, string>>;
}
export const ScrollArea = React.forwardRef<React.ElementRef<typeof Primitive.Root>, ScrollAreaProps>((_props, ref) => {
  const { orientation = "vertical", className, type, classNames, color, style, styles, unstyled, children, asChild = true, size, dangerouslySetInnerHTML, viewportProps, ...props } = _props;
  const stylesApi = { classNames, styles, unstyled };
  const stylesRest = { orientation, ...stylesApi };

  return (
    <Primitive.Root {...{ ref, type: type === "never" ? undefined : type, ...getStyles("root", { className, style, color, size, ...stylesRest }), ...props }}>
      <Primitive.Viewport {...{ asChild, dangerouslySetInnerHTML, ...getStyles("viewport", stylesRest), ...viewportProps }}>{children}</Primitive.Viewport>
      <Primitive.Scrollbar {...{ orientation: "vertical", ...getStyles("scrollbar", { orientation: "vertical", ...stylesApi }) }}>
        <Primitive.Thumb {...getStyles("thumb", stylesRest)} />
      </Primitive.Scrollbar>
      <Primitive.Scrollbar {...{ orientation: "horizontal", ...getStyles("scrollbar", { orientation: "horizontal", ...stylesApi }) }}>
        <Primitive.Thumb {...getStyles("thumb", stylesRest)} />
      </Primitive.Scrollbar>
      <Primitive.Corner {...getStyles("corner", stylesApi)} />
    </Primitive.Root>
  );
});
ScrollArea.displayName = "ScrollArea";
