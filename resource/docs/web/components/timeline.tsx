"use client";
import * as React from "react";
import { cn, cvx, rem, inferType, type cvxProps } from "cretex";
const classes = cvx({
  variants: {
    selector: {
      list: "group/tl timeline pl-[--pl] pr-[--pr] data-[align=left]:[--pl:--tl-safearea-x,0] data-[align=right]:[--pr:--tl-safearea-x,0]",
      item: "group/tli timeline-item relative text-[#c9c9c9] pb-4",
      body: "",
      bullet: "bg-background timeline-item-bullet",
      title: "font-medium leading-none mb-1.5 text-color",
      content: "text-muted-foreground"
    }
  }
});

type __Align = "left" | "right";
type __Selector = NonNullable<cvxProps<typeof classes>["selector"]>;
type Options = StylesNames<__Selector> & {};
type CSSProperties = React.CSSProperties & { [key: string]: any };
type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type Styles = ["unstyled", boolean] | ["classNames", string] | ["styles", CSSProperties];
type StylesNames<T extends string, Exclude extends string = never> = Omit<
  NestedRecord<Styles, T> & { className?: string; style?: CSSProperties; align?: __Align },
  Exclude
>;
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = StylesNames<__Selector> &
  React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | Exclude>>;
type CtxProps = {
  align: __Align;
  getStyles(selector: __Selector, options?: Options): inferType<typeof getStyles>;
};

function getStyles(selector: __Selector, options?: Options) {
  return {
    "data-tl": cn(selector),
    "data-align": options?.align,
    className: cn(!options?.unstyled?.[selector] && classes({ selector }), options?.classNames?.[selector], options?.className),
    style: { ...options?.styles?.[selector], ...options?.style }
  };
}

const ctx = React.createContext<CtxProps | undefined>(undefined);
const useTimeLine = () => React.useContext(ctx)!;

type Colors = React.CSSProperties["color"] | (string & NonNullable<unknown>);
type LineVariant = React.CSSProperties["borderStyle"];

export interface TimelineListProps extends ComponentProps<"div"> {
  align?: __Align;
  bulletStyle?: {
    size?: number;
    round?: number;
    ring?: Colors;
    variant?: LineVariant;
  };
  lineStyle?: {
    clr?: Colors;
    width?: number;
    variant?: LineVariant;
  };
}
export const TimelineList = React.forwardRef<HTMLDivElement, TimelineListProps>((_props, ref) => {
  const { unstyled, className, classNames, style, styles, role = "list", align = "left", lineStyle = {}, bulletStyle = {}, ...props } = _props;
  const { width = 2, variant = "solid", clr = "hsl(var(--muted))" } = lineStyle;
  const { ring = "var(--tl-line-clr)", round = 9999, size = 24, variant: bulletVarian = "solid" } = bulletStyle;
  return (
    <ctx.Provider value={{ getStyles, align }}>
      <Component
        {...{
          selector: "list",
          ref,
          role,
          unstyled,
          className,
          classNames,
          style: {
            "--tl-bullet-size": rem(size),
            "--tl-bullet-round": rem(round),
            "--tl-bullet-ring": ring,
            "--tl-bullet-style": bulletVarian,
            "--tl-line-clr": clr,
            "--tl-line-width": rem(width),
            "--tl-line-style": variant,
            "--tl-safearea-x": "calc((var(--tl-bullet-size) / 2) + var(--tl-line-width))",
            ...style
          } as React.CSSProperties,
          styles,
          ...props
        }}
      />
    </ctx.Provider>
  );
});

export interface TimelineItemProps extends ComponentProps<"div", "title" | "content"> {
  active?: boolean;
  activeStyle?: {
    bg?: Colors;
    clr?: Colors;
    line?: Colors;
    ring?: Colors;
  };
  notice?: boolean;
  noticeStyle?: {
    clr?: Colors;
    ring?: Colors;
  };
  lineStyle?: {
    clr?: Colors;
    width?: number;
    variant?: LineVariant;
  };
  title?: React.ReactNode;
  bullet?: React.ReactNode;
  content?: React.ReactNode;
}
export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>((_props, ref) => {
  const {
    children,
    bullet,
    title,
    content,
    unstyled,
    className,
    classNames,
    style,
    styles,
    lineStyle,
    active,
    notice,
    role = "listbox",
    activeStyle = {},
    noticeStyle = {},
    ...props
  } = _props;
  const { bg = "hsl(var(--pure-white))", clr = "hsl(var(--pure-black))", line = "hsl(var(--constructive))", ring = "var(--tli-active-line)" } = activeStyle;
  const { clr: noticeClr = "hsl(42deg 100% 50%)", ring:noticeRing = "hsl(var(--background))" } = noticeStyle;
  const stylesApi = { unstyled, classNames, styles };
  return (
    <Component
      {...{
        selector: "item",
        ref,
        role,
        className,
        "data-active": active || undefined,
        style: {
          "--tli-line-clr": lineStyle?.clr,
          "--tli-line-style": lineStyle?.variant,
          "--tli-line-width": lineStyle?.width ? rem(lineStyle?.width) : undefined,
          "--tli-active-bg": active ? bg : undefined,
          "--tli-active-clr": active ? clr : undefined,
          "--tli-active-line": active ? line : undefined,
          "--tli-notice-clr": notice ? noticeClr : undefined,
          "--tli-notice-ring": notice ? noticeRing : undefined,
          "--bullet-active-ring": active? ring :undefined,
          ...style
        } as React.CSSProperties,
        ...stylesApi,
        ...props
      }}
    >
      <Component
        {...{
          selector: "bullet",
          "data-active": active ? "true" : undefined,
          "data-bullet": bullet ? "true" : undefined,
          "data-notice": notice ? "true" : undefined,
          ...stylesApi
        }}
      >
        {bullet}
      </Component>

      <Component {...{ selector: "body", ...stylesApi }}>
        {title && <Component {...{ selector: "title", role: "heading", ...stylesApi }}>{title}</Component>}
        {!children && content ? <Component {...{ selector: "content", ...stylesApi }}>{content}</Component> : children}
      </Component>
    </Component>
  );
});

const Component = React.forwardRef<HTMLDivElement, ComponentProps<"div"> & { selector: __Selector }>((_props, ref) => {
  const { unstyled, className, classNames, style, styles, selector, ...props } = _props;
  const ctx = useTimeLine();
  const Cmp: React.ElementType = selector === "title" ? "h4" : "div";
  return <Cmp {...{ ref, ...ctx.getStyles(selector, { align: ctx.align, unstyled, className, classNames, style, styles }), ...props }} />;
});
Component.displayName = "Timeline/Component";

export interface TimelineProps extends TimelineListProps {
  items?: TimelineItemProps[];
}
export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>((_props, ref) => {
  const { unstyled, classNames, styles, children, items, ...props } = _props;
  const item = items?.map((i, __i) => {
    return <TimelineItem key={__i} {...{ unstyled, classNames, styles, ...i }} />;
  });
  return <TimelineList {...{ ref, unstyled, classNames, styles, ...props }}>{children || (items && item)}</TimelineList>;
}) as TimelineComponent;
Timeline.displayName = "Timeline";

// Export Timeline as a composite component
type TimelineComponent = React.ForwardRefExoticComponent<TimelineProps> & {
  List: typeof TimelineList;
  Item: typeof TimelineItem;
};
// Attach sub-components
Timeline.List = TimelineList;
Timeline.Item = TimelineItem;
