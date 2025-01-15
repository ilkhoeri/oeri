"use client";

import React, { useState, createContext, useEffect, useRef, useContext, useCallback } from "react";

import { mergeRefs } from "@/hooks/use-merged-ref";
import { merge } from "str-merge";

/**
```js
// usage
<Accordion>
  {data.map((item, index) => (
    <AccordionItem key={index} id={String(item.title.toLowerCase().replace(/\s/g, "-"))}>
      <AccordionTrigger>{item.title}</AccordionTrigger>
      <AccordionContent>{item.description}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```
 */

interface AccordionContextProps {
  openId: string | null;
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
  defaultOpen?: string | null;
}

type ElementType<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & { unstyled?: boolean };

export const AccordionContext = createContext<AccordionContextProps | undefined>(undefined);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordionContext must be used within an Accordion");
  }
  return context;
};

export interface AccordionProps extends ElementType<"div"> {
  defaultOpen?: string | null;
}
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(({ defaultOpen = null, ...props }, ref) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpen);
  return (
    <AccordionContext.Provider value={{ openId, setOpenId, defaultOpen }}>
      <div ref={ref} {...props} />
    </AccordionContext.Provider>
  );
}) as AccordionComponent;
Accordion.displayName = "Accordion";

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, ElementType<"button">>((_props, ref) => {
  const { unstyled, ...props } = _props;
  const { triggerRef } = useAccordionItemContext();
  return <button ref={mergeRefs(triggerRef, ref)} {...classes("trigger", { unstyled, ...props })} {...props} />;
});
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionItemContextProps {
  isOpen: boolean;
  itemRef: React.RefObject<HTMLDivElement>;
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  contentHeight: number;
  value: string | undefined;
}

const AccordionItemContext = createContext<AccordionItemContextProps | undefined>(undefined);

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("useAccordionItemContext must be used within an AccordionItem");
  }
  return context;
};

export interface AccordionItemProps extends ElementType<"div"> {
  value?: string;
}
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>((_props, ref) => {
  const { unstyled, value, ...props } = _props;
  const { openId, setOpenId } = useAccordionContext();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const [contentHeight, setContentHeight] = useState(0);
  const isOpen = openId === value;

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const toggle = useCallback(() => {
    value && setOpenId(isOpen ? null : value);
  }, [isOpen, setOpenId]);

  useEffect(() => {
    const el = triggerRef.current;

    if (el) {
      el.addEventListener("click", toggle);

      return () => {
        el.removeEventListener("click", toggle);
      };
    }
  }, [toggle]);

  return (
    <AccordionItemContext.Provider value={{ isOpen, itemRef, triggerRef, contentRef, contentHeight, value }}>
      <div ref={mergeRefs(itemRef, ref)} {...classes("item", { unstyled, ...props })} {...props} />
    </AccordionItemContext.Provider>
  );
});
AccordionItem.displayName = "AccordionItem";

export const AccordionContent = React.forwardRef<HTMLDivElement, ElementType<"div">>((_props, ref) => {
  const { unstyled, ...props } = _props;
  const { contentRef, contentHeight, isOpen, value } = useAccordionItemContext();
  return (
    <div
      ref={mergeRefs(contentRef, ref)}
      {...{
        ...classes("content", { unstyled, ...props }),
        role: props?.role || "region",
        "aria-labelledby": props["aria-labelledby"] || value,
        style: {
          ...props?.style,
          height: isOpen ? contentHeight : 0,
          overflow: "hidden",
          transition: "height 0.3s ease"
        }
      }}
      {...props}
    />
  );
});
AccordionContent.displayName = "AccordionContent";

// Export as a composite component
type AccordionComponent = React.ForwardRefExoticComponent<AccordionProps> & {
  Root: typeof Accordion;
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
};
// Attach sub-components
Accordion.Root = Accordion;
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

enum Selector {
  Root = "root",
  Trigger = "trigger",
  Item = "item",
  Content = "content"
}

interface ClassesProps {
  unstyled?: boolean;
  className?: string;
}

export default function classes(selector: `${Selector}`, options: ClassesProps) {
  const { unstyled, className } = options;

  switch (selector) {
    case "trigger":
      return {
        className: merge(
          !unstyled &&
            "relative z-9 w-full flex flex-row items-center justify-between flex-1 py-4 rounded-none font-medium hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )
      };

    case "content":
      return {
        className: merge(!unstyled && "overflow-hidden transition-[height] bg-transparent m-0 p-0 w-full text-left", className)
      };

    case "item":
      return {
        className: merge(!unstyled && "group relative flex flex-col h-auto select-none border-b", className)
      };

    default:
      return { className };
  }
}

type UseOpenStateOptions<T = boolean | (string | null)> = {
  open?: T;
  onOpenChange?: (value: T) => void;
  defaultOpen?: T;
};

export function useOpenStateNEW<T extends boolean | (string | null)>(options: UseOpenStateOptions<T> = {}) {
  const { defaultOpen, onOpenChange: extChange, open: extOpen } = options;

  // Internal state
  const [intOpen, setIntOpen] = React.useState<T>(defaultOpen as T);

  // Derived state
  const open = extOpen !== undefined ? extOpen : intOpen;
  const setOpen = extChange !== undefined ? extChange : setIntOpen;

  // Render state
  const [render, setRender] = React.useState<T>(defaultOpen as T);

  // Handle close based on type
  const handleClose = () => {
    setOpen((typeof open === "boolean" ? false : null) as T);
    setTimeout(() => {
      setRender((typeof open === "boolean" ? false : null) as T);
    }, 150);
  };

  return { open, setOpen, render, handleClose };
}

/**
"use client";

import React, { useState, createContext, useEffect, useRef, useContext, useCallback } from "react";
import classes from "./sheets-style";

interface AccordionContextProps {
  openId: string | null;
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AccordionContext = createContext<AccordionContextProps>({
  openId: null,
  setOpenId: () => {},
});

interface AccordionProps {
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ openId, setOpenId }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ id, title, children }) => {
  const { openId, setOpenId } = useContext(AccordionContext);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpen = openId === triggerRef.current?.id;
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const handleClick = useCallback(() => {
    setOpenId(isOpen ? null : id);
  }, [id, isOpen, setOpenId]);

  useEffect(() => {
    const el = triggerRef.current;

    if (el) {
      el.addEventListener("click", handleClick);

      return () => {
        el.removeEventListener("click", handleClick);
      };
    }
  }, [handleClick]);

  return (
    <div {...classes("root", { variant: "accordion" })}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        {...classes("trigger", { variant: "accordion" })}
        // onClick={handleClick}
      >
        {title}
      </button>

      <div
        {...classes("content", { variant: "accordion" })}
        style={{
          height: isOpen ? contentHeight : 0,
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
        ref={contentRef}
      >
        {triggerRef.current?.id}
        {children}
      </div>
    </div>
  );
};

*/

/**
const Sheets = React.forwardRef<React.ElementRef<"div">, SheetsProps>(
  (
    {
      align,
      side: changeSide,
      modal: changeModal,
      open,
      onOpenChange,
      sideOffset,
      clickOutsideToClose,
      defaultOpen,
      variant = "accordion",
      children,
      multipleOpen,
      delay,
      hotKeys,
      popstate,
      ...props
    },
    ref,
  ) => {
    const side = changeSide || (variant === "dropdown" ? "bottom" : "right");
    const modal = changeModal || ["dialog", "drawer"].includes(variant);
    const rest = {
      // align,
      side,
      modal,
      // open,
      onOpenChange,
      sideOffset,
      clickOutsideToClose,
      defaultOpen,
      variant,
      children,
      multipleOpen,
      delay,
      hotKeys,
      popstate,
    };

    const ctx = useOpenState({
      align,
      open,
      observe: {
        align: variant === "dropdown",
        side: ["dropdown", "drawer"].includes(variant),
        offset: variant === "dropdown",
        sideswipe: variant === "dropdown",
        orientation: variant === "accordion",
        multipleOpen: variant !== "accordion",
        measureSize: ["accordion", "collapsible"].includes(variant),
        contentRect: ["collapsible", "dropdown"].includes(variant),
      },
      trigger: "click",
      ...rest,
    });

    const { side: _, ...acc } = ctx;

    switch (variant) {
      case "accordion":
        return (
          <Provider value={{ ...acc, ...rest }}>
            <SheetsRoot ref={ref} {...props}>
              {children}
            </SheetsRoot>
          </Provider>
        );

      case "collapsible":
        return (
          <Provider value={{ ...acc, ...rest }}>
            <SheetsContent ref={ref} {...props}>
              {children}
            </SheetsContent>
          </Provider>
        );

      default:
        return <Provider value={{ ...acc, ...rest }}>{children}</Provider>;
    }
  },
);
Sheets.displayName = "Sheets";
 */
