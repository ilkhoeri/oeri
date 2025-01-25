"use client";
import * as React from "react";
import { useId } from "@/hooks/use-id";
import { useUncontrolled } from "@/hooks/use-uncontrolled";
import { cn, cvx, rem, type inferType, type cvxProps, ocx } from "cretex";

const classes = cvx({
  variants: {
    selector: {
      root: "stylelayer-tabs",
      tab: "tabs-tab data-[active]:text-color",
      tabLabel: "tabs-tab-label",
      tabSection: "tabs-tab-section",
      panel: "tabs-panel",
      list: "tabs-list flex flex-wrap [justify-content:--tabs-justify,flex-start] [gap:--tabs-list-gap] [--tab-grow:unset] flex-row data-[orientation=vertical]:flex-col"
    },
    variant: { default: "default", outline: "outline", pills: "pills" }
  }
});

type Variant = NonNullable<cvxProps<typeof classes>["variant"]>;
type __TabsSelector = NonNullable<cvxProps<typeof classes>["selector"]>;
type Options = StylesNames<__TabsSelector> & __TabsProps & {};
type CSSProperties = React.CSSProperties & { [key: string]: any };
type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type Styles = ["classNames", string] | ["styles", CSSProperties];
type StylesRecord = NestedRecord<Styles, __TabsSelector> & {
  unstyled?: boolean | Partial<Record<__TabsSelector, boolean>>;
};
type StylesNames<Exclude extends string = never> = Omit<StylesRecord & { className?: string; style?: CSSProperties; color?: TabsProps["color"] }, Exclude>;
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = StylesNames &
  React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | "color" | Exclude>>;
type CtxProps = __CtxProps & {
  getTabId: (value: string) => string;
  getPanelId: (value: string) => string;
  getStyles(selector: __TabsSelector, options?: Options): inferType<typeof getStyles>;
} & StylesRecord;

const ctx = React.createContext<CtxProps | undefined>(undefined);
const useTabs = () => React.useContext(ctx)!;

const VALUE_ERROR = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value";

interface __CtxProps {
  placement: "left" | "right";
  value: string | null;
  orientation: "vertical" | "horizontal";
  loop: boolean;
  activateTabWithKeyboard: boolean;
  allowTabDeactivation: boolean;
  color: CSSProperties["color"] | { bg?: CSSProperties["color"]; text?: CSSProperties["color"] };
  round: (string & {}) | number;
  inverted: boolean;
  keepMounted: boolean;
  id: string;
  onChange: (value: string | null) => void;
  variant: Variant;
  dir: "ltr" | "rtl";
}

type __TabsProps = Partial<__CtxProps>;

export interface TabsProps extends __TabsProps, ComponentProps<"div", "defaultValue" | "onChange" | "dir"> {
  defaultValue?: string | null;
  children?: React.ReactNode;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((_props, ref) => {
  const {
    defaultValue,
    value,
    onChange,
    children,
    id,
    classNames,
    styles,
    unstyled,
    round = 6,
    loop = true,
    inverted = false,
    keepMounted = true,
    activateTabWithKeyboard = true,
    allowTabDeactivation = false,
    orientation = "horizontal",
    color = "hsl(var(--color))",
    variant = "default",
    placement = "left",
    dir = "ltr",
    ...props
  } = _props;

  const uid = useId(id);
  const [currentTab, setCurrentTab] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });
  const stylesApi = { dir, unstyled, classNames, styles };

  return (
    <ctx.Provider
      value={{
        placement,
        value: currentTab,
        orientation,
        id: uid,
        loop,
        activateTabWithKeyboard,
        getTabId: getSafeId(`${uid}-tab`, VALUE_ERROR),
        getPanelId: getSafeId(`${uid}-panel`, VALUE_ERROR),
        onChange: setCurrentTab,
        allowTabDeactivation,
        variant,
        round,
        inverted,
        keepMounted,
        getStyles,
        color,
        ...stylesApi
      }}
    >
      <Root
        {...{
          ref,
          id: uid,
          color: typeof color === "object" ? undefined : color,
          ...stylesApi,
          ...props
        }}
      >
        {children}
      </Root>
    </ctx.Provider>
  );
}) as TabsComponent;
Tabs.displayName = "Tabs";

interface Root extends ComponentProps<"div", "color"> {
  color?: CSSProperties["color"];
}
const Root = React.forwardRef<HTMLDivElement, TabsListProps>((_props, ref) => {
  const { unstyled, className, classNames, style, styles, dir, ...props } = _props;
  const { unstyled: _unstyled, classNames: _classNames, styles: _styles, ...ctx } = useTabs();
  const stylesApi = { className, style, unstyled: unstyled || _unstyled, classNames: classNames || _classNames, styles: styles || _styles, ...ctx };
  return <div {...{ ref, dir: dir || ctx?.dir, ...ctx.getStyles("root", stylesApi), ...props }} />;
});
Root.displayName = "Tabs/Root";

export interface TabsListProps extends ComponentProps<"div", "color"> {
  /** Determines whether tabs should take all available space, `false` by default */
  grow?: boolean;
  /** Tabs alignment, `flex-start` by default */
  justify?: CSSProperties["justifyContent"];
  color?: CSSProperties["color"];
}
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>((_props, ref) => {
  const { role = "tablist", unstyled, className, classNames, style, styles, dir, grow, justify, ...props } = _props;
  const { unstyled: _unstyled, classNames: _classNames, styles: _styles, ...ctx } = useTabs();
  const stylesApi = {
    className,
    style: { "--tabs-justify": justify, ...style },
    unstyled: unstyled || _unstyled,
    classNames: classNames || _classNames,
    styles: styles || _styles,
    ...ctx
  };
  return (
    <div
      {...{
        ref,
        role,
        "data-grow": grow ? "true" : undefined,
        dir: dir || ctx?.dir,
        // "data-active": "" ? "true" : undefined,
        ...ctx.getStyles("list", stylesApi),
        ...props
      }}
    />
  );
});
TabsList.displayName = "Tabs/TabsList";

interface TabsTabProps extends ComponentProps<"button"> {
  value: string;
  /** Content displayed on the right side of the label, for example, icon */
  rightSection?: React.ReactNode;
  /** Content displayed on the left side of the label, for example, icon */
  leftSection?: React.ReactNode;
}
export const TabsTab = React.forwardRef<HTMLButtonElement, TabsTabProps>((_props, ref) => {
  const {
    role = "tab",
    type = "button",
    tabIndex,
    "aria-selected": arsel,
    "aria-controls": arcon,
    "aria-disabled": ardis,
    children,
    rightSection,
    leftSection,
    value,
    onClick,
    onKeyDown,
    disabled,
    color,
    unstyled,
    className,
    classNames,
    style,
    styles,
    dir,
    id,
    ...props
  } = _props;
  const { unstyled: _unstyled, classNames: _classNames, styles: _styles, ...ctx } = useTabs();

  const active = value === ctx.value;
  const activateTab = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ctx.onChange(ctx.allowTabDeactivation ? (value === ctx.value ? null : value) : value);
    onClick?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    const elements = Array.from(findElementAncestor(event.currentTarget, '[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]') || []).filter(
      node => onSameLevel(event.currentTarget, node, '[role="tablist"]')
    );

    const current = elements.findIndex(el => event.currentTarget === el);
    const _nextIndex = getNextIndex(current, elements, ctx.loop);
    const _previousIndex = getPreviousIndex(current, elements, ctx.loop);
    const nextIndex = dir === "rtl" ? _previousIndex : _nextIndex;
    const previousIndex = dir === "rtl" ? _nextIndex : _previousIndex;
    const orientation = ctx.orientation || "horizontal";

    switch (event.key) {
      case "ArrowRight": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[nextIndex].focus();
          ctx.activateTabWithKeyboard && elements[nextIndex].click();
        }
        break;
      }
      case "ArrowLeft": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[previousIndex].focus();
          ctx.activateTabWithKeyboard && elements[previousIndex].click();
        }
        break;
      }
      case "ArrowUp": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_previousIndex].focus();
          ctx.activateTabWithKeyboard && elements[_previousIndex].click();
        }
        break;
      }
      case "ArrowDown": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_nextIndex].focus();
          ctx.activateTabWithKeyboard && elements[_nextIndex].click();
        }
        break;
      }
      case "Home": {
        event.stopPropagation();
        event.preventDefault();
        !elements[0].disabled && elements[0].focus();
        break;
      }
      case "End": {
        event.stopPropagation();
        event.preventDefault();
        const last = elements.length - 1;
        !elements[last].disabled && elements[last].focus();
        break;
      }
    }
  };

  const stylesApi = {
    unstyled: unstyled || _unstyled,
    classNames: classNames || _classNames,
    styles: styles || _styles,
    ...ctx
  };

  return (
    <button
      {...{
        ref,
        role,
        type,
        disabled,
        id: id || ctx.getTabId(value),
        dir: dir || ctx?.dir,
        "aria-disabled": ardis || disabled,
        "aria-selected": arsel || active,
        "aria-controls": arcon || ctx.getPanelId(value),
        "data-active": active ? "true" : undefined,
        "data-disabled": disabled ? "true" : undefined,
        tabIndex: tabIndex || active || ctx.value === null ? 0 : -1,
        onClick: activateTab,
        onKeyDown: handleKeyDown,
        ...ctx.getStyles("tab", { className, style: { "--tabs-color": color, ...style }, ...stylesApi }),
        ...props
      }}
    >
      {leftSection && (
        <span {...ctx.getStyles("tabSection", stylesApi)} data-position="left">
          {leftSection}
        </span>
      )}
      {children && <span {...ctx.getStyles("tabLabel", stylesApi)}>{children}</span>}
      {rightSection && (
        <span {...ctx.getStyles("tabSection", stylesApi)} data-position="right">
          {rightSection}
        </span>
      )}
    </button>
  );
});
TabsTab.displayName = "Tabs/TabsTab";

interface TabsPanelProps extends ComponentProps<"div", " color"> {
  /** If set to `true`, the content will be kept mounted, even if `keepMounted` is set `false` in the parent `Tabs` component */
  keepMounted?: boolean;
  /** Value of associated control */
  value: string;
  color?: CSSProperties["color"];
}
export const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>((_props, ref) => {
  const {
    role = "tabpanel",
    "aria-labelledby": arlab,
    unstyled,
    className,
    classNames,
    style,
    styles,
    dir,
    value,
    keepMounted,
    children,
    id,
    ...props
  } = _props;
  const { unstyled: _unstyled, classNames: _classNames, styles: _styles, ...ctx } = useTabs();
  const active = ctx.value === value;
  const content = ctx.keepMounted || keepMounted ? children : active ? children : null;
  const stylesApi = {
    className,
    style: ocx<CSSProperties>([style, !active && { display: "none" }]),
    unstyled: unstyled || _unstyled,
    classNames: classNames || _classNames,
    styles: styles || _styles,
    ...ctx
  };
  return (
    <div
      {...{
        ref,
        role,
        dir: dir || ctx?.dir,
        id: id || ctx.getPanelId(value),
        "aria-labelledby": arlab || ctx.getTabId(value),
        ...ctx.getStyles("panel", stylesApi),
        ...props,
        hidden: !active
      }}
    >
      {content}
    </div>
  );
});
TabsPanel.displayName = "Tabs/TabsPanel";

// styles
function getStyles(selector: __TabsSelector, options: Options = {}) {
  const { className, classNames, color, style, styles, unstyled, round, orientation, inverted, placement, variant } = options;
  function selected<T>(select: __TabsSelector, state: T) {
    return selector === select ? (state as T) : undefined;
  }
  const dataShared = { "data-placement": orientation === "vertical" && placement ? placement : undefined };
  const unstyle = typeof unstyled === "object" ? unstyled?.[selector] : unstyled;
  return {
    "data-tabs": cn(selector),
    "data-orientation": orientation,
    "data-variant": variant,
    ...selected("root", {
      "data-inverted": orientation === "horizontal" && inverted ? "true" : undefined,
      ...dataShared
    }),
    ...selected("list", { "data-inverted": inverted ? "true" : undefined, ...dataShared }),
    ...selected("tab", { "data-inverted": inverted ? "true" : undefined, ...dataShared }),
    className: cn(!unstyle && classes({ selector }), classNames?.[selector], className),
    style: {
      ...selected("root", {
        "--tabs-round": rem(round),
        ...(typeof color === "object"
          ? { "--tabs-color": color.bg, "--tabs-text-color": color.text }
          : { "--tabs-color": color, "--tabs-text-color": "hsl(var(--background))" })
      }),
      ...styles?.[selector],
      ...style
    }
  };
}

export function getSafeId(uid: string, errorMessage: string) {
  return (value: string) => {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(errorMessage);
    }
    return `${uid}-${value}`;
  };
}
function onSameLevel(target: HTMLButtonElement, sibling: HTMLButtonElement, parentSelector: string) {
  return findElementAncestor(target, parentSelector) === findElementAncestor(sibling, parentSelector);
}
function findElementAncestor(element: HTMLElement, selector: string) {
  let _element: HTMLElement | null = element;
  while ((_element = _element.parentElement) && !_element.matches(selector)) {}
  return _element;
}
function getPreviousIndex(current: number, elements: HTMLButtonElement[], loop: boolean) {
  for (let i = current - 1; i >= 0; i -= 1) {
    if (!elements[i].disabled) return i;
  }
  if (loop) {
    for (let i = elements.length - 1; i > -1; i -= 1) {
      if (!elements[i].disabled) return i;
    }
  }
  return current;
}
function getNextIndex(current: number, elements: HTMLButtonElement[], loop: boolean) {
  for (let i = current + 1; i < elements.length; i += 1) {
    if (!elements[i].disabled) return i;
  }
  if (loop) {
    for (let i = 0; i < elements.length; i += 1) {
      if (!elements[i].disabled) return i;
    }
  }
  return current;
}

// Export Card as a composite component
type TabsComponent = React.ForwardRefExoticComponent<TabsProps> & {
  List: typeof TabsList;
  Tab: typeof TabsTab;
  Panel: typeof TabsPanel;
};
// Attach sub-components
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
