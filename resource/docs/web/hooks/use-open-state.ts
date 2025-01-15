"use client";
import { createPortal } from "react-dom";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { useMeasureScrollbar } from "@/hooks/use-measure-scrollbar";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export enum Selector {
  Trigger = "trigger",
  Content = "content",
  Overlay = "overlay",
  Root = "root",
  Item = "item"
}
export enum DataAlign {
  start = "start",
  center = "center",
  end = "end"
}
export enum DataSide {
  top = "top",
  right = "right",
  bottom = "bottom",
  left = "left"
}
export enum DataState {
  open = "open",
  opened = "opened",
  closed = "closed"
}
export enum DataTrigger {
  hover = "hover",
  click = "click"
}
export enum DataOrientation {
  vertical = "vertical",
  horizontal = "horizontal"
}
export type RectInfo = "x" | "y" | "width" | "height" | "top" | "right" | "bottom" | "left" | "scrollX" | "scrollY";
type Observes =
  | "side"
  | "align"
  | "touch"
  | "offset"
  | "sideswipe"
  | "alignswipe"
  | "orientation"
  | "triggerRect"
  | "contentRect"
  | "multipleOpen"
  | "measureSize";
export type MeasureSize = { h: number | "auto"; w: number | "auto" };
export type RectElement = Record<RectInfo, number>;
interface ObserveOptions {
  observe?: Partial<Record<Observes, boolean>>;
}
interface StateSharedOptions {
  align?: `${DataAlign}`;
  side?: `${DataSide}`;
  sideOffset?: number;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  delay?: { open?: number; closed?: number };
}
export interface HoverOpenOptions extends StateSharedOptions {}
export interface ClickOpenOptions extends StateSharedOptions {
  modal?: boolean;
  popstate?: boolean;
  defaultOpen?: boolean;
  clickOutsideToClose?: boolean;
  hotKeys?: "/" | "M" | "ctrl+J" | "ctrl+K" | "alt+mod+shift+X" | (string & {});
}

export interface OpenStateOptions extends HoverOpenOptions, ClickOpenOptions, ObserveOptions {
  orientation?: `${DataOrientation}`;
  trigger?: `${DataTrigger}`;
  openId?: string | null;
  setOpenId?: React.Dispatch<React.SetStateAction<string | null>>;
}

const DEFAULTEVENTS = ["mousedown", "touchstart"];
const BUFFER_OFFSET = 2;

const round = (num: number) => Math.round(num * 100) / 100;
const safeValue = (value: number) => (isNaN(value) ? 0 : round(value));

function nextValue<T>(currentValue: T, values: T[]): T {
  const currentIndex = values.indexOf(currentValue);
  const nextIndex = (currentIndex + 1) % values.length;
  if (currentIndex === values.length - 1) return values[currentIndex];
  return values[nextIndex];
}

function setValues<T>(state: boolean | undefined | string | number, attr: T): T | Record<string, never> {
  return state ? (attr as T) : {};
}

function setVars(selector: `${Selector}`, info?: RectElement): Record<string, string> | undefined {
  if (!info) return;
  const properties = ["height", "width", "x", "y", "right", "bottom"] as const;
  return properties.reduce(
    (acc, key) => {
      if (info[key] !== undefined) {
        acc[`--${selector}-${key[0]}`] = `${info[key]}px`;
      }
      return acc;
    },
    {} as Record<string, string>
  );
}

function debounce<T>(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: T[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function useClientRect<T extends HTMLElement | null>(el: T | null, measureSize: boolean = false, debounceDelay: number = 100) {
  const [rect, setRect] = useState<RectElement>({ ...{} } as RectElement);
  const [size, setSize] = useState<MeasureSize>({ h: 0, w: 0 });

  const updateRectElement = useCallback(() => {
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (!rect) return;

    setRect({
      top: safeValue(rect.top),
      left: safeValue(rect.left),
      right: safeValue(rect.right),
      bottom: safeValue(rect.bottom),
      width: safeValue(rect.width),
      height: safeValue(rect.height),
      scrollY: safeValue(window.scrollY),
      scrollX: safeValue(window.scrollX),
      y: safeValue(rect.top + window.scrollY),
      x: safeValue(rect.left + window.scrollX)
    });

    if (measureSize) {
      setSize({ h: safeValue(el.scrollHeight), w: safeValue(el.scrollWidth) });
    }
  }, [el, measureSize]);

  const handleScroll = useCallback(debounce(updateRectElement, debounceDelay), [updateRectElement, debounceDelay]);
  const handleResize = useCallback(debounce(updateRectElement, debounceDelay), [updateRectElement, debounceDelay]);

  useLayoutEffect(() => {
    if (!el) return;

    const resizeObserver = new ResizeObserver(() => updateRectElement());
    const mutationObserver = new MutationObserver(() => updateRectElement());

    resizeObserver.observe(el);
    mutationObserver.observe(el, { attributes: true, childList: true, subtree: true });

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    updateRectElement();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [el, handleScroll, handleResize, updateRectElement]);

  return { rect, size };
}

function getInset(
  align: `${DataAlign}`,
  side: `${DataSide}`,
  sideOffset: number,
  triggerRect: RectElement,
  contentRect: RectElement
): readonly [number, number] {
  let top: number = 0;
  let left: number = 0;

  const calcAlign = (triggerStart: number, triggerSize: number, contentSize: number): number => {
    switch (align) {
      case DataAlign.start:
        return triggerStart;
      case DataAlign.center:
        return triggerStart + (triggerSize - contentSize) / 2;
      case DataAlign.end:
        return triggerStart + triggerSize - contentSize;
      default:
        return triggerStart;
    }
  };

  switch (side) {
    case DataSide.top:
      top = triggerRect.top - contentRect.height - sideOffset;
      left = calcAlign(triggerRect.left, triggerRect.width, contentRect.width);
      break;
    case DataSide.right:
      top = calcAlign(triggerRect.top, triggerRect.height, contentRect.height);
      left = triggerRect.right + sideOffset;
      break;
    case DataSide.bottom:
      top = triggerRect.bottom + sideOffset;
      left = calcAlign(triggerRect.left, triggerRect.width, contentRect.width);
      break;
    case DataSide.left:
      top = calcAlign(triggerRect.top, triggerRect.height, contentRect.height);
      left = triggerRect.left - contentRect.width - sideOffset;
      break;
  }

  if (typeof window !== "undefined") {
    const viewportWidth = window.innerWidth;
    // if (left < BUFFER_OFFSET) {
    //   left = BUFFER_OFFSET;
    // } else if (left + contentRect.width > viewportWidth - BUFFER_OFFSET) {
    //   left = viewportWidth - contentRect.width - BUFFER_OFFSET;
    // }
    // const viewportHeight = window.innerHeight;
    // if (top < BUFFER_OFFSET) {
    //   top = BUFFER_OFFSET;
    // } else if (top + contentRect.height > viewportHeight - BUFFER_OFFSET) {
    //   top = viewportHeight - contentRect.height - BUFFER_OFFSET;
    // }

    if (left < BUFFER_OFFSET) {
      if (side === DataSide.left) {
        left = triggerRect.right + sideOffset; // ltr
      } else {
        left = BUFFER_OFFSET;
      }
    } else if (left + contentRect.width > viewportWidth - BUFFER_OFFSET) {
      if (side === DataSide.right) {
        left = triggerRect.left - contentRect.width - sideOffset; // rtl
      } else {
        left = viewportWidth - contentRect.width - BUFFER_OFFSET;
      }
    }
  }

  return [top, left] as const;
}

const getAttributes = (
  state: `${DataState}`,
  align?: `${DataAlign}`,
  side?: `${DataSide}`,
  orientation?: `${DataOrientation}`,
  { observe }: ObserveOptions = {}
) => {
  return {
    "data-state": state,
    ...setValues(observe?.align && align, { "data-align": align }),
    ...setValues(observe?.side && side, { "data-side": side }),
    ...setValues(observe?.orientation && orientation, { "data-orientation": orientation })
  };
};

function getStyles(
  selector: `${Selector}`,
  sideOffset: number,
  align: `${DataAlign}`,
  side: `${DataSide}`,
  triggerRect: RectElement,
  contentRect: RectElement,
  measure: MeasureSize,
  { observe }: ObserveOptions = {}
): Record<string, string> {
  const [top, left] = getInset(align, side, sideOffset, triggerRect, contentRect);
  return {
    ...setValues(selector === "trigger" && observe?.triggerRect, setVars(selector, triggerRect)),
    ...setValues(selector === "content", {
      ...setValues(observe?.offset, { "--offset": `${sideOffset}px` }),
      ...setValues(observe?.sideswipe, { "--top": `${top + triggerRect.scrollY}px`, "--left": `${left + triggerRect.scrollX}px` }),
      ...setValues(observe?.measureSize, {
        "--measure-available-h": `${measure.h}px`,
        "--measure-available-w": `${measure.w}px`,
        "--measure-trigger-h": `${triggerRect.height}px`,
        "--measure-trigger-w": `${triggerRect.width}px`
      }),
      ...setValues(observe?.contentRect, setVars("content", contentRect))
    })
  };
}

export interface PortalProps {
  render: boolean;
  portal?: boolean;
  children: React.ReactNode;
  container?: Element | DocumentFragment | null;
  key?: null | string;
}
export function Portal(_props: PortalProps) {
  const { portal = true, render, children, container, key } = _props;
  if (typeof document === "undefined" || !render) return null;
  return portal ? createPortal(children, container || document.body, key) : children;
}

export function useOpenState(options: OpenStateOptions = {}) {
  const {
    hotKeys = "",
    side = "bottom",
    align = "center",
    trigger = "click",
    onOpenChange,
    sideOffset = 0,
    open: openChange,
    popstate = false,
    defaultOpen = false,
    clickOutsideToClose = false,
    orientation = "vertical",
    modal = false,
    observe = { multipleOpen: true },
    // delay = { open: 0, closed: 0 },
    openId,
    setOpenId
  } = options;

  const refs = {
    trigger: useRef<HTMLButtonElement>(null),
    content: useRef<HTMLDivElement>(null),
    overlay: useRef<HTMLDivElement>(null),
    root: useRef<HTMLDivElement>(null),
    item: useRef<HTMLDivElement>(null)
  };

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const open = openChange !== undefined ? openChange : isOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setIsOpen;

  const [render, setRender] = useState(open);
  const [initialOpen, setInitialOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [updatedSide, setUpdatedSide] = useState(side);
  const [updatedAlign, setUpdatedAlign] = useState(align);

  useHotkeys([[hotKeys, () => trigger === "click" && setOpen(!open)]]);
  useMeasureScrollbar(!open ? render : open, { modal });

  const bounding = {
    trigger: useClientRect<HTMLButtonElement>(refs?.trigger?.current),
    content: useClientRect<HTMLDivElement>(refs?.content?.current, render)
  };

  const toggle = useCallback(() => {
    const controlId = refs.trigger.current?.id || refs.item.current?.getAttribute("data-controls") || undefined;
    if (!observe.multipleOpen && controlId) {
      setOpenId?.(openId === controlId ? null : controlId);
    } else {
      if (!open) {
        if (trigger === "click" && popstate) {
          window.history.pushState({ open: true }, "");
        }
        setOpen(true);
      } else {
        if (trigger === "click" && popstate) {
          window.history.back();
        }
        setOpen(false);
      }
    }
  }, [trigger, popstate, open, setOpen, observe.multipleOpen, openId, setOpenId, refs.trigger, refs.item]);

  useLayoutEffect(() => {
    if (open !== defaultOpen) setInitialOpen(true);
  }, [open, defaultOpen]);

  useEffect(() => {
    const controlId = refs.trigger.current?.id || refs.item.current?.getAttribute("data-controls") || undefined;
    if (!observe.multipleOpen && controlId) {
      if (openId === controlId) setOpen(true);
      if (openId !== controlId) setOpen(false);
    }
  }, [observe.multipleOpen, openId, setOpen, refs.trigger, refs.item]);

  useEffect(() => {
    const historyPopState = () => {
      if (open) setOpen(false);
    };
    if (popstate) {
      window.addEventListener("popstate", historyPopState, { passive: true });
      return () => {
        window.removeEventListener("popstate", historyPopState);
      };
    }
  }, [popstate, open, setOpen]);

  useEffect(() => {
    const onMouseEnter = () => {
      if (!isTouchDevice) setOpen(true);
    };
    const onMouseLeave = () => {
      if (!isTouchDevice) setOpen(false);
    };
    const onMouseMove = () => {
      if (isTouchDevice) setIsTouchDevice(false);
    };
    const onTouchStart = () => {
      if (!isTouchDevice) setIsTouchDevice(true);
      setOpen(true);
    };
    const onTouchEnd = () => setOpen(false);
    const windowTouchStart = () => {
      if (!isTouchDevice) setIsTouchDevice(true);
    };

    const attachListeners = (el: HTMLButtonElement | null) => {
      if (el) {
        if (trigger === "click") {
          el.addEventListener("click", toggle);
        }
        if (trigger === "hover") {
          if (observe?.touch) {
            el.addEventListener("touchstart", onTouchStart);
            el.addEventListener("touchend", onTouchEnd);
          }
          window.addEventListener("touchstart", windowTouchStart, { passive: true });
          window.addEventListener("mousemove", onMouseMove, { passive: true });
          el.addEventListener("mouseenter", onMouseEnter);
          el.addEventListener("mouseleave", onMouseLeave);
          el.addEventListener("mousemove", onMouseMove);
        }
      }
    };
    const detachListeners = (el: HTMLButtonElement | null) => {
      if (el) {
        if (trigger === "click") {
          el.removeEventListener("click", toggle);
        }
        if (trigger === "hover") {
          if (observe?.touch) {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchend", onTouchEnd);
          }
          window.removeEventListener("touchstart", windowTouchStart);
          window.removeEventListener("mousemove", onMouseMove);
          el.removeEventListener("mouseenter", onMouseEnter);
          el.removeEventListener("mouseleave", onMouseLeave);
          el.removeEventListener("mousemove", onMouseMove);
        }
      }
    };
    attachListeners(refs.trigger.current);
    return () => {
      detachListeners(refs.trigger.current);
    };
  }, [trigger, toggle, refs.trigger, isTouchDevice, setIsTouchDevice, observe?.touch]);

  useEffect(() => {
    const everyRefs = [refs.trigger, refs.content];
    const handler = () => trigger === "click" && clickOutsideToClose && setOpen(false);
    const events = DEFAULTEVENTS;
    const listener = (event: MouseEvent | TouchEvent) => {
      const { target } = event;
      const shouldIgnore =
        target instanceof HTMLElement && (target.hasAttribute("data-ignore-clickoutside") || (!document.body.contains(target) && target.tagName !== "HTML"));
      const shouldTrigger = everyRefs.every(ref => ref.current && !ref.current.contains(target as Node));
      if (!shouldIgnore && shouldTrigger) handler();
    };
    // @ts-ignore
    events.forEach(event => document.addEventListener(event, listener));
    return () => {
      // @ts-ignore
      events.forEach(event => document.removeEventListener(event, listener));
    };
  }, [clickOutsideToClose, setOpen, trigger, refs.content, refs.trigger]);

  const updateSide = useCallback(() => {
    const triggerRect = bounding.trigger.rect;
    const contentRect = bounding.content.rect;
    const dataAlign: `${DataAlign}`[] = ["start", "center", "end"];
    if (triggerRect && contentRect) {
      const [top, left] = getInset(align, side, sideOffset, triggerRect, contentRect);
      const rect = { top, left, bottom: top + contentRect.height, right: left + contentRect.width, width: contentRect.width, height: contentRect.height };
      const isOutOfLeftViewport = rect.left < BUFFER_OFFSET;
      const isOutOfRightViewport = rect.right > window.innerWidth - BUFFER_OFFSET;
      const isOutOfTopViewport = rect.top < BUFFER_OFFSET;
      const isOutOfBottomViewport = rect.bottom > window.innerHeight - BUFFER_OFFSET;

      if (isOutOfLeftViewport) {
        if (side === DataSide.left) setUpdatedSide(DataSide.right);
      } else if (isOutOfRightViewport) {
        if (side === DataSide.right) setUpdatedSide(DataSide.left);
      } else if (isOutOfTopViewport) {
        if (side === DataSide.top) setUpdatedSide(DataSide.bottom);
        if (updatedSide === DataSide.left || updatedSide === DataSide.right) setUpdatedAlign(nextValue(updatedAlign, dataAlign.toReversed()));
      } else if (isOutOfBottomViewport) {
        if (side === DataSide.bottom) setUpdatedSide(DataSide.top);
        if (updatedSide === DataSide.left || updatedSide === DataSide.right) setUpdatedAlign(nextValue(updatedAlign, dataAlign));
      } else {
        setUpdatedSide(side);
        setUpdatedAlign(align);
      }
    }
  }, [align, side, sideOffset, bounding.trigger.rect, bounding.content.rect]);

  useEffect(() => {
    updateSide();
    window.addEventListener("scroll", updateSide, { passive: true });
    window.addEventListener("resize", updateSide, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateSide);
      window.removeEventListener("resize", updateSide);
    };
  }, [updateSide]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (open) setRender(true);
    else timeoutId = setTimeout(() => setRender(false), 150);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [trigger, open]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => e.key === "Enter" && toggle(), [toggle]);

  const dataState = open ? (initialOpen ? "open" : "opened") : "closed";
  const dataSide = trigger === "hover" || observe?.sideswipe ? updatedSide : side;
  const dataAlign = trigger === "hover" || observe?.alignswipe ? updatedAlign : align;

  const attr = getAttributes(dataState, dataAlign, dataSide, orientation, { observe });
  const attrStyles = (selector: `${Selector}`, { style }: { style?: React.CSSProperties & Record<string, any> } = {}) => ({
    ...attr,
    style: {
      ...style,
      ...getStyles(selector, sideOffset, dataAlign, dataSide, bounding.trigger.rect, bounding.content.rect, bounding.content.size, {
        observe
      })
    }
  });

  return { refs, render, open, setOpen, Portal, toggle, onKeyDown, bounding, attr, attrStyles, align, dataState, side: dataSide };
}
