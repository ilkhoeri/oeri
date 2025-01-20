"use client";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type RectInfo = "x" | "y" | "width" | "height" | "top" | "right" | "bottom" | "left" | "scrollX" | "scrollY";
export type RectElement = Record<RectInfo, number>;
export type SizeElement = { h: number | "auto"; w: number | "auto" };
export type InitialInfo = { initial?: Partial<RectElement> };

const round = (num: number) => Math.round(num * 100) / 100;
const safeValue = (value: number) => (isNaN(value) ? 0 : round(value));

function debounce<T>(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: T[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function useElementRect<T extends HTMLElement | null>(el: T | null, withSizeElement: boolean = false, debounceDelay: number = 100) {
  const [rect, setRect] = useState<RectElement>({ ...{} } as RectElement);
  const [size, setSize] = useState<SizeElement>({ h: 0, w: 0 });

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

    if (withSizeElement) {
      setSize({ h: safeValue(el.scrollHeight), w: safeValue(el.scrollWidth) });
    }
  }, [el, withSizeElement]);

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

export function useElementInfo<T extends HTMLElement | null>(element?: T | null) {
  const [hovered, setHovered] = useState<DOMRect | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollBody, setScrollBody] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [elementName, setElementName] = useState<string>("");

  const ref = useRef<T | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  const el = element !== undefined ? element : ref.current;

  const { rect, size } = useElementRect<T>(el, true);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const el = element !== undefined ? element : ref.current;
      setScrollPosition(el?.scrollTop || 0);
    };

    const handleScrollBody = () => {
      setScrollBody(document.documentElement.scrollTop);
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const observeElement = () => {
      const el = element !== undefined ? element : ref.current;
      if (el) {
        setElementName(el.tagName.toLowerCase());
        const attrs: { [key: string]: string } = {};
        for (const attr of el.attributes) {
          attrs[attr.name] = attr.value;
        }
        setAttributes(attrs);
      }
    };

    const disconnectObservers = () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
        mutationObserverRef.current = null;
      }
    };

    handleResize();
    observeElement();

    window.addEventListener("scroll", handleScrollBody);
    window.addEventListener("resize", handleResize);
    const el = element !== undefined ? element : ref.current;
    el?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScrollBody);
      window.removeEventListener("resize", handleResize);
      if (el) {
        el.removeEventListener("scroll", handleScroll);
        disconnectObservers();
      }
    };
  }, [element]);

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setHovered(event.currentTarget.getBoundingClientRect());
  };

  const onMouseLeave = () => setHovered(null);

  return {
    ref,
    rect,
    size,
    windowSize,
    scrollBody,
    scrollPosition,
    attributes,
    elementName,
    onMouseEnter,
    onMouseLeave,
    hovered
  };
}
