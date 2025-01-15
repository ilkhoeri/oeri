"use client";
import * as React from "react";
import { cn, cvx, rem, type inferType, type cvxProps } from "str-merge";

const classes = cvx({
  variants: {
    selector: {
      root: "flex items-center gap-[--bc-gap] break-words text-sm text-[--bc-color,inherit]",
      breadcrumb: "",
      separator: "whitespace-nowrap rtl:-scale-x-100",
      wrap: "",
      ellipsis: "inline-flex cursor-pointer appearance-none items-center justify-center rounded-md text-[clamp(0.75rem,0.65rem+0.65vw,0.9rem)] font-medium leading-tight transition-[transform,color,background-color,border-color,text-decoration-color,fill,stroke] duration-75 [-moz-appearance:none] [-webkit-appearance:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background active:scale-[.985] disabled:pointer-events-none disabled:gap-2 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primitive-foreground/35 text-muted-foreground border-primitive-emphasis hover:text-color focus-visible:ring-primitive-emphasis/35 [@media(hover:hover)]:hover:bg-accent h-[--sz] w-[--sz] min-h-[--sz,var(--min-sz)] min-w-[--sz,var(--min-sz)] [--sz:2rem] py-1 px-1 border"
    },
    overflow: {
      root: "max-w-full overflow-hidden gap-0",
      wrap: "w-max min-w-full overflow-auto gap-[--bc-gap] inline-flex items-center flex-row flex-nowrap [&_*]:whitespace-nowrap"
    }
  }
});

type __BreadcrumbSelector = NonNullable<cvxProps<typeof classes>["selector"]>;
type CSSProperties = React.CSSProperties & { [key: string]: any };
type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type Styles = ["unstyled", boolean] | ["classNames", string] | ["styles", CSSProperties];
type StylesNames<T extends string, Exclude extends string = never> = Omit<NestedRecord<Styles, T> & { className?: string; style?: CSSProperties }, Exclude>;
type Options = StylesNames<__BreadcrumbSelector> & {
  al?: string;
  gap?: number | string;
  overflowWrap?: boolean;
  color?: React.CSSProperties["color"];
};
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = StylesNames<__BreadcrumbSelector> & {
  color?: React.CSSProperties["color"];
} & React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | "color" | Exclude>>;
type CtxProps = {
  getStyles(selector: __BreadcrumbSelector, options?: Options): inferType<typeof getStyles>;
  separator?: React.ReactNode | ((index: number) => React.ReactNode);
};

function getStyles(selector: __BreadcrumbSelector, options: Options = {}) {
  const { al, className, classNames, gap, overflowWrap, style, styles, unstyled, color } = options;
  const rootWrap = selector === "root" || selector === "wrap";
  return {
    "aria-label": al || cn(selector),
    className: cn(
      !unstyled?.[selector] &&
        classes({
          selector,
          overflow: rootWrap && overflowWrap ? selector : undefined
        }),
      classNames?.[selector],
      className
    ),
    style: {
      "--bc-gap": selector === "root" ? rem(gap) : undefined,
      "--bc-color": selector === "root" ? color : undefined,
      ...styles?.[selector],
      ...style
    }
  };
}

const ctx = React.createContext<CtxProps | undefined>(undefined);
const useBreadcrumbs = () => React.useContext(ctx)!;

interface __BreadcrumbProps {
  separator?: React.ReactNode | ((index: number) => React.ReactNode);
  gap?: number | string;
  disabled?: boolean | ((index: number) => boolean);
}

export interface BreadcrumbProps extends __BreadcrumbProps, ComponentProps<"nav"> {
  items?: React.ReactNode[];
  overflowWrap?: boolean;
}
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>((_props, ref) => {
  const {
    items,
    styles,
    unstyled,
    disabled,
    children,
    classNames,
    overflowWrap = false,
    separator = <BreadcrumbIcons />,
    color = "hsl(var(--muted-foreground))",
    ...props
  } = _props;

  const stylesApi = { unstyled, classNames, styles };

  const content = items?.reduce<React.ReactNode[]>((acc, child, index, array) => {
    const item = isElement(child) ? (
      React.cloneElement(child, {
        ...getStyles("breadcrumb", {
          className: (child.props as any)?.className,
          ...stylesApi
        }),
        key: index
      })
    ) : (
      <BreadcrumbItem key={index} {...{ disabled: typeof disabled === "function" ? disabled?.(index) : disabled, ...stylesApi }}>
        {child}
      </BreadcrumbItem>
    );

    acc.push(item);

    if (index !== array.length - 1) {
      acc.push(
        <BreadcrumbSeparator
          key={`separator-${index}`}
          {...{
            index,
            "data-separator": `${index + 1}`,
            separator: typeof separator === "function" ? separator?.(index) : separator,
            ...stylesApi
          }}
        />
      );
    }
    return acc;
  }, []);

  return (
    <ctx.Provider value={{ getStyles, separator }}>
      <BreadcrumbRoot {...{ ref, overflowWrap, color, ...stylesApi, ...props }}>{children || content}</BreadcrumbRoot>
    </ctx.Provider>
  );
}) as BreadcrumbComponent;
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbRootProps extends ComponentProps<"nav"> {
  gap?: number | string;
  overflowWrap?: boolean;
}
const BreadcrumbRoot = React.forwardRef<HTMLElement, BreadcrumbRootProps>((_props, ref) => {
  const { unstyled, className, classNames, style, styles, overflowWrap, children, color, gap = 12, "aria-label": al, ...props } = _props;
  const ctx = useBreadcrumbs();
  const stylesApi = { unstyled, classNames, styles, overflowWrap };
  return (
    <nav {...{ ref, ...ctx.getStyles("root", { className, style, gap, color, al, ...stylesApi }), ...props }}>
      {overflowWrap ? <div {...{ ...ctx.getStyles("wrap", { ...stylesApi }), ...props }}>{children}</div> : children}
    </nav>
  );
});
BreadcrumbRoot.displayName = "Breadcrumb/BreadcrumbRoot";

export interface BreadcrumbItemProps extends ComponentProps<"div"> {
  disabled?: boolean;
}
export const BreadcrumbItem = React.forwardRef<HTMLDivElement, BreadcrumbItemProps>((_props, ref) => {
  const { unstyled, className, classNames, style, styles, disabled, "aria-label": al, "aria-disabled": ad, ...props } = _props;
  const ctx = useBreadcrumbs();
  return (
    <div
      {...{
        ref,
        "aria-disabled": ad || disabled ? "true" : undefined,
        ...ctx.getStyles("breadcrumb", { unstyled, className, classNames, style, styles, al }),
        ...props
      }}
    />
  );
});
BreadcrumbItem.displayName = "Breadcrumb/BreadcrumbItem";

export interface BreadcrumbSeparatorProps extends ComponentProps<"div"> {
  separator?: React.ReactNode;
  index?: number;
}
export const BreadcrumbSeparator = React.forwardRef<HTMLDivElement, BreadcrumbSeparatorProps>((_props, ref) => {
  const { unstyled, className, classNames, separator = "/", style, styles, children, index, "aria-label": al, ...props } = _props;
  const ctx = useBreadcrumbs();
  const ctxseparator = typeof ctx.separator === "function" ? index && ctx.separator?.(index) : ctx.separator;
  return (
    <div {...{ ref, ...ctx.getStyles("separator", { unstyled, className, classNames, style, styles, al }), ...props }}>
      {children || separator || ctxseparator}
    </div>
  );
});
BreadcrumbSeparator.displayName = "Breadcrumb/BreadcrumbSeparator";

export function BreadcrumbIcons({ icon = "slash" }: { icon?: "slash" | "chevron" | "ellipsis" }) {
  let paths;
  switch (icon) {
    case "slash":
      paths = <path d="M17 4l-9 17" />;
      break;
    case "chevron":
      paths = <path d="M9 6l6 6l-6 6" />;
      break;
    case "ellipsis":
      paths = (
        <>
          <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        </>
      );
      break;
  }

  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
    >
      {paths}
    </svg>
  );
}

export interface BreadcrumbEllipsisProps extends ComponentProps<"button"> {
  title?: string;
}
export const BreadcrumbEllipsis = React.forwardRef<HTMLButtonElement, BreadcrumbEllipsisProps>((_props, ref) => {
  const { unstyled, className, classNames, style, styles, children, role = "presentation", "aria-label": al = "More", ...props } = _props;
  const ctx = useBreadcrumbs();
  return (
    <button {...{ ref, role, ...ctx.getStyles("ellipsis", { unstyled, className, classNames, style, styles, al }), ...props }}>
      {children || <BreadcrumbIcons icon="ellipsis" />}
    </button>
  );
});
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export function isElement(value: any): value is React.ReactElement {
  if (Array.isArray(value) || value === null) return false;
  if (typeof value === "object") {
    if (value.type === React.Fragment) return false;
    return true;
  }
  return false;
}

// Export as a composite component
type BreadcrumbComponent = React.ForwardRefExoticComponent<BreadcrumbProps> & {
  Item: typeof BreadcrumbItem;
  Separator: typeof BreadcrumbSeparator;
  Ellipsis: typeof BreadcrumbEllipsis;
  Icons: typeof BreadcrumbIcons;
};
// Attach sub-components
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;
Breadcrumb.Ellipsis = BreadcrumbEllipsis;
Breadcrumb.Icons = BreadcrumbIcons;
