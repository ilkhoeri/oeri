"use client";
import * as React from "react";
import { cn } from "cretex";
//import { mergeRefs } from "@/hooks/use-merged-ref";

// import "./scroll-area.css";

type __Selector = "root" | "content" | "thumb";
export type UseScrollAreaType = { overflow?: "y" | "x" };
type CSSProperties = React.CSSProperties & { [key: string]: any };
type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type Styles = ["unstyled", boolean] | ["classNames", string] | ["styles", CSSProperties];
type StylesNames<T extends string, Exclude extends string = never> = Omit<NestedRecord<Styles, T> & { className?: string; style?: CSSProperties }, Exclude>;
export interface ScrollAreaProps
  extends UseScrollAreaType,
    StylesNames<__Selector>,
    React.DetailedHTMLProps<Omit<React.HTMLAttributes<HTMLDivElement>, "style">, HTMLDivElement> {
  el?: React.ElementType;
}

/**
export function useScrollArea({ overflow = "y" }: UseScrollAreaType = {}) {
  const scrollContentRef = React.useRef<HTMLDivElement>(null);
  const thumbRef = React.useRef<HTMLElement>(null);
  const [thumbSize, setThumbSize] = React.useState<number>(0);
  const [thumbPosition, setThumbPosition] = React.useState<number>(0);
  const [scrollable, setScrollable] = React.useState<boolean>(false);

  React.useEffect(() => {
    const Y = overflow === "y";

    const handleScroll = () => {
      if (scrollContentRef.current) {
        const scrollContent = scrollContentRef.current;
        const clientSize = Y
          ? scrollContent.clientHeight
          : scrollContent.clientWidth;
        const scrollSize = Y
          ? scrollContent.scrollHeight
          : scrollContent.scrollWidth;
        const scrollPos = Y
          ? scrollContent.scrollTop
          : scrollContent.scrollLeft;
        const thumbSize = (clientSize / scrollSize) * clientSize;
        const thumbPosition = (scrollPos / scrollSize) * clientSize;

        setThumbSize(thumbSize);
        setThumbPosition(thumbPosition);
        setScrollable(scrollSize > clientSize);
      }
    };

    const scrollContent = scrollContentRef.current;
    if (scrollContent) {
      scrollContent.classList.add("scroll-area-content");
      scrollContent.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    const resizeObserver = new ResizeObserver(handleScroll);
    if (scrollContent) {
      resizeObserver.observe(scrollContent);
    }

    return () => {
      if (scrollContent) {
        scrollContent.classList.remove("scroll-area-content");
        scrollContent.removeEventListener("scroll", handleScroll);
        resizeObserver.unobserve(scrollContent);
      }
    };
  }, [overflow]);

  React.useEffect(() => {
    const Y = overflow === "y";
    const body = document.body;
    const thumbElement = thumbRef.current;
    if (!thumbElement) return;

    const handleDragStart = (startPos: number, e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const startThumbPosition = thumbPosition;

      const handleDragMove = (moveEvent: MouseEvent | TouchEvent) => {
        moveEvent.preventDefault();
        body.setAttribute("data-scroll", "active");
        thumbElement.setAttribute("data-scroll", "active");
        const clientX =
          "clientX" in moveEvent
            ? moveEvent.clientX
            : moveEvent.touches[0].clientX;
        const clientY =
          "clientY" in moveEvent
            ? moveEvent.clientY
            : moveEvent.touches[0].clientY;
        const delta = Y ? clientY - startPos : clientX - startPos;
        const newThumbPosition = startThumbPosition + delta;
        const maxThumbPosition = Y
          ? scrollContentRef.current!.clientHeight - thumbSize
          : scrollContentRef.current!.clientWidth - thumbSize;
        const boundedThumbPosition = Math.max(
          0,
          Math.min(newThumbPosition, maxThumbPosition)
        );

        const scrollFraction =
          boundedThumbPosition /
          (Y
            ? scrollContentRef.current!.clientHeight
            : scrollContentRef.current!.clientWidth);
        if (Y) {
          scrollContentRef.current!.scrollTop =
            scrollFraction * scrollContentRef.current!.scrollHeight;
        } else {
          scrollContentRef.current!.scrollLeft =
            scrollFraction * scrollContentRef.current!.scrollWidth;
        }

        requestAnimationFrame(() => {
          setThumbPosition(boundedThumbPosition);
        });
      };

      const handleDragEnd = () => {
        body.removeAttribute("data-scroll");
        thumbElement.removeAttribute("data-scroll");
        document.removeEventListener("mousemove", handleDragMove);
        document.removeEventListener("mouseup", handleDragEnd);
        document.removeEventListener("touchmove", handleDragMove);
        document.removeEventListener("touchend", handleDragEnd);
      };

      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleDragMove, {
        passive: false
      });
      document.addEventListener("touchend", handleDragEnd);
    };

    const handleMouseDown = (e: MouseEvent) => {
      handleDragStart(Y ? e.clientY : e.clientX, e);
    };

    const handleTouchStart = (e: TouchEvent) => {
      handleDragStart(Y ? e.touches[0].clientY : e.touches[0].clientX, e);
    };

    if (scrollable) {
      thumbElement.classList.add("thumb");
      thumbElement.setAttribute("data-overflow", overflow);
      thumbElement.style.setProperty(Y ? "top" : "left", `${thumbPosition}px`);
      thumbElement.style.setProperty(Y ? "height" : "width", `${thumbSize}px`);
      thumbElement.addEventListener("mousedown", handleMouseDown);
      thumbElement.addEventListener("touchstart", handleTouchStart);
    }

    return () => {
      if (scrollable) {
        thumbElement.classList.remove("thumb");
        thumbElement.removeAttribute("data-overflow");
        thumbElement.style.removeProperty(Y ? "top" : "left");
        thumbElement.style.removeProperty(Y ? "height" : "width");
        thumbElement.removeEventListener("mousedown", handleMouseDown);
        thumbElement.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, [thumbSize, thumbPosition, overflow, scrollable]);

  return {
    scrollContentRef,
    thumbRef,
    thumbSize,
    thumbPosition,
    scrollable,
    overflow
  };
}
 */
export function useScrollArea({ overflow = "y" }: UseScrollAreaType = {}) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const scrollTrackRef = React.useRef<HTMLDivElement>(null);
  const scrollThumbRef = React.useRef<HTMLDivElement>(null);
  const observer = React.useRef<ResizeObserver | null>(null);

  const [thumbHeight, setThumbHeight] = React.useState(20);
  const [isDragging, setIsDragging] = React.useState(false);
  const [scrollStartPosition, setScrollStartPosition] = React.useState<number>(0);
  const [initialContentScrollTop, setInitialContentScrollTop] = React.useState<number>(0);

  function handleResize() {
    if (scrollTrackRef.current && contentRef.current) {
      const { clientHeight: trackSize } = scrollTrackRef.current;
      const { clientHeight: contentVisible, scrollHeight: contentTotalHeight } = contentRef.current;
      setThumbHeight(Math.max((contentVisible / contentTotalHeight) * trackSize, 20));
    }
  }

  function handleThumbPosition() {
    if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) {
      return;
    }

    const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;

    let newTop = (contentTop / contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);

    const thumb = scrollThumbRef.current;
    requestAnimationFrame(() => {
      thumb.style.top = `${newTop}px`;
    });
  }

  React.useEffect(() => {
    if (contentRef.current) {
      const content = contentRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize();
      });
      observer.current.observe(content);
      content.addEventListener("scroll", handleThumbPosition);
      return () => {
        observer.current?.unobserve(content);
        content.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, []);

  function handleThumbMousedown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientY);
    if (contentRef.current) setInitialContentScrollTop(contentRef.current.scrollTop);
    setIsDragging(true);
  }

  function handleThumbMouseup(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isDragging) {
      setIsDragging(false);
    }
  }

  function handleThumbMousemove(e: MouseEvent) {
    if (contentRef.current) {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        const { scrollHeight: contentScrollHeight, clientHeight: contentClientHeight } = contentRef.current;

        const deltaY = (e.clientY - scrollStartPosition) * (contentClientHeight / thumbHeight);

        const newScrollTop = Math.min(initialContentScrollTop + deltaY, contentScrollHeight - contentClientHeight);

        contentRef.current.scrollTop = newScrollTop;
      }
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousemove", handleThumbMousemove);
    document.addEventListener("mouseup", handleThumbMouseup);
    return () => {
      document.removeEventListener("mousemove", handleThumbMousemove);
      document.removeEventListener("mouseup", handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    const { current: track } = scrollTrackRef;
    const { current: content } = contentRef;
    if (track && content) {
      const { clientY } = e;
      const target = e.target as HTMLDivElement;
      const rect = target.getBoundingClientRect();
      const trackTop = rect.top;
      const thumbOffset = -(thumbHeight / 2);
      const clickRatio = (clientY - trackTop + thumbOffset) / track.clientHeight;
      const scrollAmount = Math.floor(clickRatio * content.scrollHeight);
      content.scrollTo({
        top: scrollAmount,
        behavior: "smooth"
      });
    }
  }

  function handleScrollButton(direction: "up" | "down") {
    const { current: content } = contentRef;
    if (content) {
      const scrollAmount = direction === "down" ? 200 : -200;
      content.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  }

  return {
    contentRef,
    handleScrollButton,
    scrollTrackRef,
    handleTrackClick,
    isDragging,
    scrollThumbRef,
    handleThumbMousedown,
    thumbHeight,
    overflow
  };
}

export const ScrollArea = React.forwardRef<React.ElementRef<"div">, ScrollAreaProps>((_props, ref) => {
  const { el = "div", overflow = "y", className, classNames, style, styles, children, ...props } = _props;
  const { contentRef, scrollThumbRef, handleScrollButton, scrollTrackRef, handleTrackClick, isDragging, handleThumbMousedown, thumbHeight } = useScrollArea({
    overflow
  });
  const Component = el as React.ElementType;
  const Span = "span" as React.ElementType;

  return (
    <>
      <Component
        {...{
          ref,
          "data-overflow": overflow,
          "data-state": "acroll-area",
          className: cn(
            "peer will-change-scroll",
            overflow === "y" && "overflow-y-auto overflow-x-hidden",
            overflow === "x" && "overflow-x-auto overflow-y-hidden",
            className,
            classNames?.content
          ),
          style: { ...style, ...styles?.content },
          ...props
        }}
      />

      <Span
        {...{
          ref: scrollThumbRef,
          "data-overflow": overflow,
          "data-state": "thumb",
          "aria-label": "thumb",
          className: cn(
            "thumb rounded-full hover:bg-muted peer-hover:bg-muted data-[scroll=active]:bg-muted-foreground peer-hover:data-[scroll=active]:bg-muted-foreground absolute z-2 will-change-scroll",
            overflow === "y" && "right-8 w-1.5 min-w-1.5",
            overflow === "x" && "bottom-8 h-1.5 min-h-1.5",
            classNames?.thumb
          ),
          style: styles?.thumb
        }}
      />
      {/*  */}
      <div ref={ref} className={cn("root", classNames?.root)}>
        <div className="content" id="custom-scrollbars-content" ref={contentRef}>
          {children}
        </div>
        <div className="scrollbar">
          <button className="button button--up" onClick={() => handleScrollButton("up")}>
            ↑
          </button>

          <div
            className="track-and-thumb"
            // role="scrollbar"
            aria-controls="custom-scrollbars-content"
          >
            <div className="track" ref={scrollTrackRef} onClick={handleTrackClick} style={{ cursor: isDragging ? "grabbing" : undefined }}></div>
            <div
              className="thumb"
              ref={scrollThumbRef}
              onMouseDown={handleThumbMousedown}
              style={{
                height: `${thumbHeight}px`,
                cursor: isDragging ? "grabbing" : "grab"
              }}
            ></div>
          </div>

          <button className="button button--down" onClick={() => handleScrollButton("down")}>
            ↓
          </button>
        </div>
      </div>
    </>
  );
});
ScrollArea.displayName = "ScrollArea";

/**
body[data-scroll="active"] * *,
[data-state="thumb"]:active {
  cursor: grabbing;
  user-select: none;
}
[data-state="acroll-area"]::-webkit-scrollbar {
  display: none;
}
[data-state="acroll-area"]::-webkit-scrollbar-track {
  background: #0000;
  display: none;
}
[data-state="acroll-area"]::-webkit-scrollbar-thumb {
  background: #0000;
  display: none;
}
// For browsers that support `scrollbar-*` properties
@supports (scrollbar-color: auto) {
  [data-state="acroll-area"] {
    scrollbar-color: #0000 #0000;
  }
  [data-state="acroll-area"]::-webkit-scrollbar {
    display: none;
  }
  [data-state="acroll-area"]::-webkit-scrollbar-track {
    background: #0000;
    display: none;
  }
  [data-state="acroll-area"]::-webkit-scrollbar-thumb {
    background: #0000;
    display: none;
  }
}
// Otherwise, use `::-webkit-scrollbar-*` pseudo-elements
@supports selector(::-webkit-scrollbar) {
  [data-state="acroll-area"]::-webkit-scrollbar {
    display: none;
  }
  [data-state="acroll-area"]::-webkit-scrollbar-track {
    background: #0000;
    display: none;
  }
  [data-state="acroll-area"]::-webkit-scrollbar-thumb {
    background: #0000;
    display: none;
  }
}
.container {
	display: grid;
	height: 100%;
	grid-template: auto / 1fr 50px;
	overflow: hidden;
	position: relative;
}

.content {
	// Essential
	-ms-overflow-style: none;
	overflow: auto;
	scrollbar-width: none;
	// Presentational
	height: 90vh;
	padding: 0 1rem;
}

.content::-webkit-scrollbar {
	display: none;
}

.scrollbar {
	display: grid;
	gap: 1rem;
	grid-auto-flow: row;
	grid-template: auto 1fr auto / 1fr;
	padding: 1rem;
	place-items: center;
}

.track-and-thumb {
	display: block;
	height: 100%;
	position: relative;
	width: 16px;
}

.track {
	bottom: 0;
	cursor: pointer;
	position: absolute;
	top: 0;
}

.thumb {
	position: absolute;
}
:root {
	--track-gradient: linear-gradient(
		to bottom,
		rgba(175, 48, 41, 1),
		rgba(188, 82, 21, 1),
		rgba(173, 131, 1, 1),
		rgba(102, 128, 11, 1),
		rgba(36, 131, 123, 1),
		rgba(32, 94, 166, 1),
		rgba(94, 64, 157, 1),
		rgba(160, 47, 111, 1)
	);

	--bg: #100f0f;
	--bg-2: #1c1b1a;
	--ui: #282726;
	--ui-2: #343331;
	--tx: #cecdc3;
}

.container {
	background-color: var(--bg);
	border: 3px solid var(--ui);
	border-radius: 12px;
}

.content {
	height: 90vh;
	padding: 0 1rem;
}

.track {
	background: var(--track-gradient);
	border-radius: 12px;
	width: 16px;
}

.thumb {
	border-radius: 12px;
	background-color: rgba(255, 255, 255, 0.7);
	mix-blend-mode: overlay;
	width: 16px;
}

.button {
	background-color: var(--ui-2);
	border: none;
	border-radius: 50%;
	color: #cecdc3;
	cursor: pointer;
}

.button--up {
	background-color: #af3029;
}
.button--up:hover {
	background-color: #d14d41;
}

.button--down {
	background-color: #a02f6f;
}
.button--down:hover {
	background-color: #ce5d97;
}
 */

/**
.root {
  padding-right: 18px;
  position: relative;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
}

.content {
  -ms-overflow-style: none;
  overflow: auto;
  scrollbar-width: none;
  height: 100%;
  max-height: 100%;
  min-height: 100%;
}

.content::-webkit-scrollbar {
  display: none;
}

.scrollbar {
  padding-left: 0.5rem;
  place-items: center;
  height: calc(100% - (1rem * 2));
  max-height: calc(100% - (1rem * 2));
  min-height: calc(100% - (1rem * 2));
  position: absolute;
  right: 2px;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.track-and-thumb {
  width: 6px;
  height: 100%;
  max-height: 100%;
  min-height: 100%;
  position: relative;
}

.track {
  bottom: 0;
  position: absolute;
  cursor: pointer;
  top: 0;
}

.track {
  background: hsl(var(--muted));
  border-radius: 999px;
  width: 100%;
}

.thumb {
  position: absolute;
  border-radius: 999px;
  background-color: hsl(var(--muted-foreground));
  width: 100%;
}

.button {
  border: none;
  border-radius: 999px;
  color: hsl(var(--color));
  cursor: pointer;
  width: 1rem;
  height: 1rem;
}

.button--up {
  background: hsl(var(--muted-foreground));
}
.button--up:hover {
  background: hsl(var(--muted-emphasis));
}
.button--down {
  background: hsl(var(--muted-foreground));
}
.button--down:hover {
  background: hsl(var(--muted-emphasis));
}
 */
