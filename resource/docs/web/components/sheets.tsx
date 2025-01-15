"use client";
import * as React from "react";
import { XIcon } from "@/icons/*";
import { cn, cvx, inferType } from "str-merge";
import { mergeRefs } from "@/hooks/use-merged-ref";
import { ClickOpenOptions, Selector, DataSide, useOpenState } from "@/hooks/use-open-state";

export enum SheetsVariant {
  Accordion = "accordion",
  Collapsible = "collapsible",
  Dropdown = "dropdown",
  Dialog = "dialog",
  Drawer = "drawer"
}
type SharedType = {
  unstyled?: boolean;
  className?: string;
  style?: React.CSSProperties & { [key: string]: any };
};
type SheetsValuesType = Omit<ClickOpenOptions, "defaultOpen"> & {
  children: React.ReactNode;
  variant?: `${SheetsVariant}`;
  multipleOpen?: boolean;
  openId?: string | null;
  setOpenId?: React.Dispatch<React.SetStateAction<string | null>>;
  defaultOpen?: boolean | (string | null);
  value?: string;
};
type SheetsValue = inferType<typeof useOpenState> &
  Omit<SheetsValuesType, "children"> & {
    controlId?: string;
  };
type SheetsSharedType<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & SharedType;
type Components = (string | false | React.JSXElementConstructor<any>)[];
export type SheetsProps = React.ComponentPropsWithoutRef<"div"> & SheetsValuesType;

interface DedicatedCtxProps {
  openId: string | null;
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
  defaultOpen: string | null;
}
const DedicatedCtx = React.createContext<DedicatedCtxProps>({
  openId: null,
  defaultOpen: null,
  setOpenId: () => {}
});
const useDedicatedCtx = () => React.useContext(DedicatedCtx);
export function DedicatedProvider({ children, defaultOpen = null }: { children: React.ReactNode; defaultOpen?: string | null }) {
  const [openId, setOpenId] = React.useState<string | null>(defaultOpen);
  return <DedicatedCtx.Provider value={{ openId, setOpenId, defaultOpen }}>{children}</DedicatedCtx.Provider>;
}

const ctx = React.createContext<SheetsValue | null>(null);
const useSheetsCtx = () => React.useContext(ctx)!;
export function SheetsProvider(_props: SheetsValuesType) {
  const { variant = "accordion", side, modal, multipleOpen, children, defaultOpen, ...rest } = _props;
  const isDropdown = variant === SheetsVariant.Dropdown;
  const isAccordion = variant === SheetsVariant.Accordion;
  const _ctx = useOpenState({
    trigger: "click",
    modal: modal || ["dialog", "drawer"].includes(variant),
    side: side || (isDropdown ? "bottom" : "right"),
    defaultOpen: typeof defaultOpen === "boolean" ? defaultOpen : undefined,
    observe: {
      align: isDropdown,
      side: ["dropdown", "drawer"].includes(variant),
      offset: isDropdown,
      sideswipe: isDropdown,
      alignswipe: isDropdown,
      orientation: isAccordion,
      multipleOpen: multipleOpen || !isAccordion,
      measureSize: ["accordion", "collapsible", "dropdown"].includes(variant),
      contentRect: ["collapsible", "dropdown"].includes(variant)
    },
    ...rest
  });

  const controlId = _ctx.refs.trigger.current?.id || _ctx.refs.item.current?.getAttribute("data-controls") || undefined;

  return <ctx.Provider value={{ variant, multipleOpen, defaultOpen, controlId, ..._ctx, ...rest }}>{children}</ctx.Provider>;
}

export function SheetsDedicatedProvider(_props: Omit<SheetsValuesType, "openId" | "setOpenId">) {
  const { variant = "accordion", children, value, ...props } = _props;
  const { openId, setOpenId, defaultOpen } = useDedicatedCtx();
  if (variant !== SheetsVariant.Accordion) return null;
  return (
    <SheetsProvider variant="accordion" {...{ openId, setOpenId, defaultOpen, value, ...props }}>
      {children}
    </SheetsProvider>
  );
}

const hasSpecificChildren = (children: React.ReactNode, components: Components): boolean => {
  return React.Children.toArray(children).some(child => {
    const isChild = React.isValidElement(child) && child.type;
    return components.includes(isChild);
  });
};
export const Sheets = React.forwardRef<React.ElementRef<"div">, SheetsProps>((_props, ref) => {
  const {
    align,
    side,
    open,
    onOpenChange,
    sideOffset,
    clickOutsideToClose,
    defaultOpen,
    children,
    openId,
    setOpenId,
    delay,
    multipleOpen,
    hotKeys,
    modal,
    popstate,
    variant = "accordion",
    ...props
  } = _props;
  const rest = {
    align,
    side,
    open,
    onOpenChange,
    sideOffset,
    clickOutsideToClose,
    defaultOpen,
    variant,
    openId,
    setOpenId,
    delay,
    multipleOpen,
    hotKeys,
    modal,
    popstate
  };

  const hasSheetsChild = hasSpecificChildren(children, [SheetsTrigger, SheetsContent]);

  const defaultOpenDedicated = typeof defaultOpen === "boolean" ? undefined : defaultOpen;

  const renderContent = (content: React.ReactNode) => (
    <SheetsProvider {...rest}>
      <SheetsRoot ref={ref} {...props}>
        {content}
      </SheetsRoot>
    </SheetsProvider>
  );

  switch (variant) {
    case SheetsVariant.Accordion:
      return multipleOpen ? renderContent(children) : renderContent(<DedicatedProvider defaultOpen={defaultOpenDedicated}>{children}</DedicatedProvider>);

    case SheetsVariant.Collapsible:
      return hasSheetsChild ? (
        renderContent(children)
      ) : (
        <SheetsProvider {...rest}>
          <SheetsContent ref={ref} {...props}>
            {children}
          </SheetsContent>
        </SheetsProvider>
      );

    default:
      return <SheetsProvider {...rest}>{children}</SheetsProvider>;
  }
}) as SheetsComponent;
Sheets.displayName = "Sheets";

export const SheetsRoot = React.forwardRef<React.ElementRef<"div">, SheetsSharedType<"div">>((_props, ref) => {
  const { className, unstyled, style, ...props } = _props;
  const { variant, ...ctx } = useSheetsCtx();
  return <div ref={mergeRefs(ctx.refs.root, ref)} {...classes("root", { variant, className, unstyled })} {...ctx.attrStyles("root", { style })} {...props} />;
});
SheetsRoot.displayName = "SheetsRoot";

export interface SheetsItemProps extends SheetsSharedType<"div"> {
  value?: string;
}
export const SheetsItem = React.forwardRef<React.ElementRef<"div">, SheetsItemProps>((_props, ref) => {
  const { className, unstyled, style, value, "aria-expanded": arExp, ...props } = _props;
  const { variant, multipleOpen, ...ctx } = useSheetsCtx();
  const isAccordion = variant === SheetsVariant.Accordion;

  const item = (
    <div
      ref={mergeRefs(ctx.refs.item, ref)}
      {...{
        ...classes("item", { variant, className, unstyled }),
        ...ctx.attrStyles("item", { style }),
        ...props,
        "data-controls": value,
        "aria-expanded": arExp || (isAccordion ? ctx.render : undefined)
      }}
    />
  );

  if (isAccordion) {
    return multipleOpen ? <SheetsProvider multipleOpen>{item}</SheetsProvider> : <SheetsDedicatedProvider value={value}>{item}</SheetsDedicatedProvider>;
  }

  return item;
});
SheetsItem.displayName = "SheetsItem";

export const SheetsTrigger = React.forwardRef<React.ElementRef<"button">, SheetsSharedType<"button">>((_props, ref) => {
  const { type = "button", className, unstyled, style, onClick, "aria-controls": arCont, ...props } = _props;
  const { variant, ...ctx } = useSheetsCtx();
  const isAccordion = variant === SheetsVariant.Accordion;
  return (
    <button
      {...{
        ref: mergeRefs(ctx.refs.trigger, ref),
        type,
        ...classes("trigger", { variant, className, unstyled }),
        ...ctx.attrStyles("trigger", { style }),
        "aria-controls": isAccordion ? ctx.controlId : arCont,
        ...props
      }}
    />
  );
});
SheetsTrigger.displayName = "SheetsTrigger";

export const SheetsClosed = React.forwardRef<React.ElementRef<"button">, SheetsSharedType<"button">>((_props, ref) => {
  const { type = "button", className, unstyled, onClick, children, ...props } = _props;
  const ctx = useSheetsCtx();
  return (
    <button
      {...{
        ref,
        type,
        onClick: e => {
          onClick?.(e);
          ctx.toggle();
        },
        className: cn(!unstyled && "size-4 absolute right-4 top-4 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50", className),
        ...props
      }}
    >
      {children || <XIcon />}
    </button>
  );
});
SheetsClosed.displayName = "SheetsClosed";

export const SheetsContent = React.forwardRef<React.ElementRef<"div">, SheetsSharedType<"div">>(
  ({ className, unstyled, "aria-disabled": arDsb, style, children, ...props }, ref) => {
    const { variant = "accordion", side, ...ctx } = useSheetsCtx();
    const omitVariants = ["accordion", "collapsible"].includes(variant);

    if (!ctx.render && !omitVariants) return null;

    const content = (
      <div
        {...{
          ref: mergeRefs(ctx.refs.content, ref),
          role: omitVariants ? "region" : undefined,
          hidden: !ctx.render,
          "aria-disabled": arDsb || !ctx.render,
          "aria-labelledby": `${ctx.refs.trigger.current?.id ?? undefined}`,
          ...classes("content", { variant, side, className, unstyled }),
          ...ctx.attrStyles("content", { style }),
          ...props
        }}
      >
        {/* {omitVariants ? (ctx.render ? children : null) : children} */}
        {children}
      </div>
    );

    if (omitVariants) return content;

    return (
      <ctx.Portal render={ctx.render}>
        {variant !== SheetsVariant.Dropdown && <SheetsOverlay />}
        {content}
      </ctx.Portal>
    );
  }
);
SheetsContent.displayName = "SheetsContent";

export const SheetsOverlay = React.forwardRef<React.ElementRef<"div">, SheetsSharedType<"div">>((_props, ref) => {
  const { className, unstyled, style, onClick, ...props } = _props;
  const { variant, ...ctx } = useSheetsCtx();

  return (
    <div
      {...{
        ref: mergeRefs(ctx.refs.overlay, ref),
        ...ctx.attrStyles("overlay", { style }),
        ...classes("overlay", { variant, className, unstyled }),
        onClick: e => {
          onClick?.(e);
          ctx.toggle();
        },
        ...props
      }}
    />
  );
});
SheetsOverlay.displayName = "SheetsOverlay";

// Export as a composite component
type SheetsComponent = React.ForwardRefExoticComponent<SheetsProps> & {
  Root: typeof SheetsRoot;
  Item: typeof SheetsItem;
  Trigger: typeof SheetsTrigger;
  Closed: typeof SheetsClosed;
  Content: typeof SheetsContent;
  Overlay: typeof SheetsOverlay;
};
// Attach sub-components
Sheets.Root = SheetsRoot;
Sheets.Item = SheetsItem;
Sheets.Trigger = SheetsTrigger;
Sheets.Closed = SheetsClosed;
Sheets.Content = SheetsContent;
Sheets.Overlay = SheetsOverlay;

export const sheetsVariants = cvx({
  assign:
    "fixed z-[111] gap-4 bg-background p-6 shadow-lg transition ease-linear data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:duration-200 data-[state=closed]:duration-200",
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
    }
  }
});

const contentClasses = (side: `${DataSide}`) =>
  cvx({
    variants: {
      variant: {
        accordion:
          "overflow-hidden transition-all data-[state=open]:animate-collapse-open data-[state=closed]:animate-collapse-closed data-[state=closed]:duration-200 bg-transparent m-0 p-0 w-full text-left",
        collapsible:
          "overflow-hidden transition-all data-[state=open]:animate-collapse-open data-[state=closed]:animate-collapse-closed bg-transparent m-0 p-0 w-full text-left",
        dropdown:
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2 absolute z-[111] left-[--left] top-[--top] overflow-hidden bg-background rounded-md border",
        dialog:
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2 fixed left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[60%] data-[state=closed]:slide-out-to-top-[60%] rounded-lg",
        drawer: sheetsVariants({ side })
      }
    }
  });

interface ClassesProps {
  variant?: `${SheetsVariant}`;
  unstyled?: boolean;
  className?: string;
  side?: `${DataSide}`;
}
function classes(selector: `${Selector}`, options: ClassesProps) {
  const { variant, side = "right", unstyled, className } = options;
  switch (selector) {
    case "trigger":
      if (variant === "accordion") {
        return {
          className: cn(
            !unstyled &&
              "relative z-9 w-full flex flex-row items-center justify-between flex-1 py-4 rounded-none font-medium transition-all hover:underline [&>svg]:data-[state=open]:rotate-180",
            className
          )
        };
      }
      return {
        className: cn(!unstyled && "relative rounded-md font-medium group min-w-24 z-50 bg-color text-background h-9 px-2 text-center", className)
      };

    case "content":
      return {
        className: cn(!unstyled && contentClasses(side)({ variant }), className)
      };

    case "overlay":
      return {
        className: cn(
          !unstyled &&
            "fixed inset-0 size-full z-[100] bg-background/50 supports-[backdrop-filter]:bg-background/50 cursor-default data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          className
        )
      };

    case "item":
      if (variant === "accordion") {
        return {
          className: cn(
            !unstyled &&
              "group relative flex flex-col h-auto border-0 select-none gap-[--offset] data-[side=top]:flex-col-reverse data-[side=right]:flex-row data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse data-[align=start]:items-start data-[align=center]:items-center data-[align=end]:items-end border-b",
            className
          )
        };
      }
      return { className };

    default:
      return { className };
  }
}
