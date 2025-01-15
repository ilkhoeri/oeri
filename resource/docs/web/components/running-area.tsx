"use client";
import * as React from "react";
import { cn } from "str-merge";
import { mergeRefs } from "@/hooks/use-merged-ref";

type __Selector = "container" | "content";
type CSSProperties = React.CSSProperties & { [key: string]: any };
type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type U = ["el", React.ElementType] | ["styles", CSSProperties] | ["classNames", string];

type UseRunningArea = {
  direction?: "right-to-left" | "left-to-right" | "top-to-bottom" | "bottom-to-top";
  duration?: number;
};

export function useRunningArea({ duration = 25, direction }: UseRunningArea) {
  const containerRef = React.useRef<HTMLElement>(null);
  const contentRef = React.useRef<HTMLElement>(null);
  const animationFrameId = React.useRef<number | null>(null);
  const currentPosition = React.useRef<number>(0);
  const lastTimeRef = React.useRef<number>(0);

  React.useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const containerWidth = container.offsetWidth;
    const contentWidth = content.offsetWidth;
    const containerHeight = container.offsetHeight;
    const contentHeight = content.offsetHeight;

    if ((direction === "right-to-left" || direction === "left-to-right") && containerWidth >= contentWidth) return;
    if ((direction === "bottom-to-top" || direction === "top-to-bottom") && containerHeight >= contentHeight) return;

    let isDragging = false;
    let initialX = 0;
    let deltaX = 0;

    const handleStart = (clientX: number) => {
      isDragging = true;
      initialX = clientX;
      deltaX = 0;
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };

    const handleMove = (clientX: number) => {
      if (!isDragging) return;
      deltaX = clientX - initialX;
      const newPosition = currentPosition.current + deltaX;
      content.style.transform = `translateX(${newPosition}px)`;
    };

    const handleEnd = () => {
      isDragging = false;
      currentPosition.current += deltaX;
      requestAnimationFrame(animate);
    };

    const handleTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const handleMouseDown = (e: MouseEvent) => handleStart(e.clientX);
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const elapsed = timestamp - lastTimeRef.current;

      if (elapsed >= duration) {
        lastTimeRef.current = timestamp - (elapsed % duration);

        if (!isDragging) {
          if (direction === "right-to-left") {
            currentPosition.current -= Math.floor(elapsed / duration);
            if (currentPosition.current <= -contentWidth) {
              currentPosition.current = containerWidth;
            }
          }
          if (direction === "bottom-to-top") {
            currentPosition.current -= Math.floor(elapsed / duration);
            if (currentPosition.current <= -contentHeight) {
              currentPosition.current = containerHeight;
            }
          }
          if (direction === "left-to-right") {
            currentPosition.current += Math.floor(elapsed / duration);
            if (currentPosition.current >= containerWidth) {
              currentPosition.current = -contentWidth;
            }
          }
          if (direction === "top-to-bottom") {
            currentPosition.current += Math.floor(elapsed / duration);
            if (currentPosition.current >= containerHeight) {
              currentPosition.current = -contentHeight;
            }
          }

          if (direction === "top-to-bottom" || direction === "bottom-to-top") {
            content.style.transform = `translateY(${currentPosition.current}px)`;
          } else {
            content.style.transform = `translateX(${currentPosition.current}px)`;
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    content.addEventListener("touchstart", handleTouchStart);
    content.addEventListener("touchmove", handleTouchMove);
    content.addEventListener("touchend", handleEnd);
    content.addEventListener("mousedown", handleMouseDown);
    content.addEventListener("mousemove", handleMouseMove);
    content.addEventListener("mouseup", handleEnd);

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      content.removeEventListener("touchstart", handleTouchStart);
      content.removeEventListener("touchmove", handleTouchMove);
      content.removeEventListener("touchend", handleEnd);
      content.removeEventListener("mousedown", handleMouseDown);
      content.removeEventListener("mousemove", handleMouseMove);
      content.removeEventListener("mouseup", handleEnd);

      document.removeEventListener("mouseup", () => {
        isDragging = false;
      });
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [duration, direction]);

  return { containerRef, contentRef };
}

type Options = UseRunningArea & {
  className?: string;
  style?: CSSProperties;
  classNames?: Partial<Record<__Selector, string>>;
  styles?: Partial<Record<__Selector, CSSProperties>>;
};
function getStyles(selector: __Selector, opts: Options) {
  const container = selector === "container";
  const content = selector === "content";
  const runningY = opts.direction === "bottom-to-top" || opts.direction === "top-to-bottom";
  const running = runningY ? "y" : "x";
  return {
    "data-direction": container ? opts.direction : undefined,
    "data-running": running,
    className: cn(
      opts.classNames?.[selector],
      opts.className,
      container && ["group overflow-hidden"],
      content && ["min-w-max min-h-max whitespace-nowrap select-none flex items-center justify-center", runningY ? "flex-col" : "flex-row"]
    ),
    style: { ...opts?.styles?.[selector], ...opts?.style }
  };
}

export interface RunningAreaProps
  extends Options,
    NestedRecord<U, __Selector>,
    Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, "style"> {
  style?: CSSProperties;
}

export const RunningArea = React.forwardRef<HTMLElement, RunningAreaProps>((_props, ref) => {
  const {
    el = { container: "div", content: "div" },
    direction = "right-to-left",
    duration = 25,
    children,
    className,
    style,
    classNames,
    styles,
    ...rest
  } = _props;
  const refs = useRunningArea({ direction, duration });
  const Container = el.container as React.ElementType;
  const Content = el.content as React.ElementType;
  const stylesApi = { classNames, styles, direction };
  return (
    <Container
      {...{
        ref: mergeRefs(refs.containerRef, ref),
        "data-animation": "RunningArea",
        ...getStyles("container", { className, style, ...stylesApi }),
        ...rest
      }}
    >
      <Content {...{ ref: refs.contentRef, ...getStyles("content", stylesApi) }}>{children}</Content>
    </Container>
  );
});
RunningArea.displayName = "RunningArea";
