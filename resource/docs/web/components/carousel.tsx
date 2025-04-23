"use client";
import * as React from "react";
import Svg from "./svg";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import { cn, cvx, rem, type inferType, type cvxProps } from "cretex";

const buttonStyles = cn(
  "absolute inline-flex h-8 w-8 items-center justify-center gap-2 whitespace-nowrap rounded-full border bg-transparent shadow-sm transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-constructive active:scale-[.985] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0"
);
const classes = cvx({
  variants: {
    selector: {
      root: "relative overflow-hidden max-h-[--carousel-h,100%] max-w-full",
      content: "flex touch-pinch-zoom items-center",
      item: "relative shrink-0 grow-0 select-none flex items-center justify-center",
      previous: buttonStyles,
      next: buttonStyles,
      indicators: "absolute grid items-center justify-center content-center gap-4",
      indicator: "rounded-full bg-transparent outline outline-2 outline-muted-foreground/50 data-[state]:outline-muted-foreground shadow-sm shadow-background"
    },
    content: {
      horizontal: "ml-[calc(var(--carousel-gap)*-1)] flex-row [--tw-pan-y:pan-y]",
      vertical: "mt-[calc(var(--carousel-gap)*-1)] flex-col h-[calc(var(--carousel-h,100%)+var(--carousel-gap))] [--tw-pan-x:pan-x]"
    },
    item: {
      horizontal: "pl-[--carousel-gap]",
      vertical: "pt-[--carousel-gap]"
    },
    previous: {
      horizontal: "left-4 top-1/2 -translate-y-1/2",
      vertical: "top-4 left-1/2 -translate-x-1/2 [--tw-rotate:90deg]"
    },
    next: {
      horizontal: "right-4 top-1/2 -translate-y-1/2",
      vertical: "bottom-4 left-1/2 -translate-x-1/2 [--tw-rotate:90deg]"
    },
    indicators: {
      horizontal: "grid-flow-col bottom-2 left-1/2 -translate-x-1/2",
      vertical: "grid-flow-row right-2 top-1/2 -translate-y-1/2"
    },
    indicator: {
      horizontal: "h-1 w-6",
      vertical: "w-1 h-6"
    }
  }
});

export type CarouselApi = UseEmblaCarouselType[1];
export type __CarouselSelector = NonNullable<cvxProps<typeof classes>["selector"]>;
type Options = StylesNames<__CarouselSelector> &
  __CarouselProps & {
    direction?: "next" | "previous";
  };
type CSSProperties = React.CSSProperties & { [key: string]: any };
type StylesNames<T extends string, Exclude extends string = never> = Omit<
  {
    unstyled?: Partial<Record<T, boolean>>;
    className?: string;
    style?: CSSProperties;
    classNames?: Partial<Record<T, string>>;
    styles?: Partial<Record<T, CSSProperties>>;
    color?: CSSProperties["color"];
  },
  Exclude
>;
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = StylesNames<__CarouselSelector, Exclude> & React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | "color" | Exclude>>;
type CtxProps = inferType<typeof useCarousel> & {
  getStyles(selector: __CarouselSelector, options?: Options): inferType<typeof getStyles>;
} & __CarouselProps;

function clamp(value: number, min?: number, max?: number) {
  if (min === undefined && max === undefined) return value;
  if (min !== undefined && max === undefined) return Math.max(value, min);
  if (min === undefined && max !== undefined) return Math.min(value, max);
  return Math.min(Math.max(value, min!), max!);
}
function getRotation({ dir, orientation, direction }: Options) {
  if (direction === "previous") {
    return orientation === "horizontal" ? 90 * (dir === "ltr" ? 1 : -1) : -180;
  }
  return orientation === "horizontal" ? 90 * (dir === "ltr" ? -1 : 1) : 0;
}
function getStyles(selector: __CarouselSelector, options: Options = {}) {
  const { unstyled, className, classNames, style, styles, orientation, spacing = 16, height, controlSize, controlsOffset, dir } = options;
  const selected = (select: __CarouselSelector) => (selector === select ? orientation : undefined);
  return {
    "data-cr": cn(selector),
    className: cn(
      !unstyled?.[selector] &&
        classes({
          selector,
          item: selected("item"),
          next: selected("next"),
          content: selected("content"),
          previous: selected("previous"),
          indicator: selected("indicator"),
          indicators: selected("indicators")
        }),
      classNames?.[selector],
      className
    ),
    style: {
      ...(selector === "root"
        ? {
            "--carousel-gap": rem(spacing),
            "--carousel-h": rem(height),
            "--carousel-control-sz": rem(controlSize),
            "--carousel-controls-offset": rem(controlsOffset)
          }
        : undefined),
      ...(selector === "previous" || selector === "next"
        ? {
            "--rotate": `rotate(${getRotation({
              dir,
              orientation,
              direction: selector
            })}deg)`
          }
        : undefined),
      ...styles?.[selector],
      ...style
    }
  };
}

const ctx = React.createContext<CtxProps | undefined>(undefined);
const useCarouselCtx = () => React.useContext(ctx)!;

interface CarouselSharedProps {
  dir?: EmblaOptionsType["direction"];
  orientation?: "horizontal" | "vertical";
  onPreviousSlide?: () => void;
  onNextSlide?: () => void;
  onItemChange?: (index: number) => void;
  setApi?: (api: CarouselApi) => void;
}
type CarouselOptions = Omit<EmblaOptionsType, "axis" | "direction"> & CarouselSharedProps;
export interface __CarouselProps extends CarouselSharedProps {
  plugins?: EmblaPluginType[];
  spacing?: number | string;
  withControls?: boolean;
  withIndicators?: boolean;
  opts?: CarouselOptions;
  controlsOffset?: number | string;
  height?: CSSProperties["height"];
  controlSize?: CSSProperties["width"];
}

type UseCarouselOptions = CarouselOptions &
  CarouselSharedProps & {
    withKeyboardEvents?: boolean;
  };

export function useAnimationOffsetEffect(embla: EmblaCarouselType | null | undefined, transitionDuration: number) {
  React.useEffect(() => {
    if (embla) {
      window.setTimeout(() => {
        embla.reInit();
      }, transitionDuration);
    }
  }, [embla, transitionDuration]);
}

export function useCarousel(options: UseCarouselOptions = {}, plugins?: EmblaPluginType[]) {
  const { dragFree = true, loop = true, setApi, dir = "ltr", orientation = "horizontal", withKeyboardEvents = true, onItemChange, onNextSlide, onPreviousSlide, slidesToScroll = 1, ...opts } = options;
  const [carouselRef, embla] = useEmblaCarousel(
    {
      loop,
      dragFree,
      slidesToScroll,
      axis: orientation === "horizontal" ? "x" : "y",
      direction: orientation === "horizontal" ? dir : undefined,
      ...opts
    },
    plugins
  );
  const [selected, setSelected] = React.useState(0);
  const [slidesCount, setSlidesCount] = React.useState(0);

  const handleScroll = React.useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

  const handleSelect = React.useCallback(() => {
    if (!embla) {
      return;
    }
    const slide = embla.selectedScrollSnap();
    setSelected(slide);
    if (slide !== selected) onItemChange?.(slide);
  }, [embla, setSelected, onItemChange, selected]);

  const handlePrev = React.useCallback(() => {
    embla?.scrollPrev();
    onPreviousSlide?.();
  }, [embla]);

  const handleNext = React.useCallback(() => {
    embla?.scrollNext();
    onNextSlide?.();
  }, [embla]);

  const handleKeydown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (withKeyboardEvents) {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          handleNext();
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          handlePrev();
        }
      }
    },
    [embla]
  );

  React.useEffect(() => {
    if (embla) {
      setApi?.(embla);
      handleSelect();
      setSlidesCount(embla.scrollSnapList().length);
      embla.on("select", handleSelect);

      return () => {
        embla.off("select", handleSelect);
      };
    }

    return undefined;
  }, [embla, slidesToScroll, handleSelect]);

  const canScrollPrev = embla?.canScrollPrev() || false;
  const canScrollNext = embla?.canScrollNext() || false;

  // like a carousel for logo's, stop when hover
  const [isPlaying, setIsPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!embla) return;
    const autoScroll = embla?.plugins()?.autoScroll;
    if (!autoScroll) return;

    if (isPlaying) {
      autoScroll.play();
    } else {
      autoScroll.stop();
    }

    setIsPlaying(autoScroll.isPlaying());
    embla
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
  }, [embla, isPlaying]);

  const stopCarousel = () => setIsPlaying(false);
  const startCarousel = () => setIsPlaying(true);

  const stopOnHover = {
    onMouseEnter: stopCarousel,
    onMouseLeave: startCarousel,
    onTouchStart: stopCarousel,
    onTouchEnd: startCarousel
  };

  return {
    dir,
    carouselRef,
    embla,
    handlePrev,
    handleNext,
    canScrollPrev,
    canScrollNext,
    handleKeydown,
    stopCarousel,
    startCarousel,
    stopOnHover,
    setSlidesCount,
    selected,
    setSelected,
    orientation,
    handleScroll,
    slidesCount,
    opts: {
      dragFree,
      loop,
      setApi,
      dir,
      slidesToScroll,
      orientation,
      ...opts
    }
  };
}

export interface CarouselProps extends __CarouselProps, ComponentProps<"div", "dir"> {
  withKeyboardEvents?: boolean;
  previousControlProps?: React.ComponentPropsWithoutRef<"button">;
  nextControlProps?: React.ComponentPropsWithoutRef<"button">;
  icons?: {
    previous?: React.ReactNode;
    next?: React.ReactNode;
  };
}
export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(function Carousel(_props, ref) {
  const {
    opts,
    setApi,
    plugins,
    children,
    unstyled,
    className,
    style,
    classNames,
    styles,
    spacing,
    height,
    controlSize,
    onPreviousSlide,
    onNextSlide,
    onItemChange,
    previousControlProps,
    nextControlProps,
    controlsOffset,
    withControls,
    withIndicators,
    withKeyboardEvents,
    icons,
    dir = "ltr",
    orientation = "horizontal",
    ...props
  } = _props;
  const use = useCarousel({ dir, setApi, orientation, onPreviousSlide, onNextSlide, onItemChange, withKeyboardEvents, ...opts }, plugins);
  const stylesApi = { unstyled, classNames, styles };

  React.useEffect(() => {
    if (use.embla) {
      use.embla.reInit();
      use.setSlidesCount(use.embla.scrollSnapList().length);
      use.setSelected(currentSelected => clamp(currentSelected, 0, React.Children.toArray(children).length - 1));
    }
  }, [React.Children.toArray(children).length, use.opts?.slidesToScroll]);

  function specificChildren(components: (string | false | React.JSXElementConstructor<any>)[]) {
    return React.Children.toArray(children).some(child => {
      const isChild = React.isValidElement(child) && child.type;
      return components.includes(isChild);
    });
  }

  const hasCarouselContent = specificChildren([CarouselContent]);

  const controls = withControls ? (
    <>
      <CarouselPrevious {...{ icon: icons?.previous, ...stylesApi, ...previousControlProps }} />
      <CarouselNext {...{ icon: icons?.next, ...stylesApi, ...nextControlProps }} />
    </>
  ) : null;

  const indicators = withIndicators ? <CarouselIndicators {...{ ...stylesApi }} /> : null;

  const content = hasCarouselContent ? (
    <>
      {children}
      {controls}
      {indicators}
    </>
  ) : (
    <>
      <CarouselContent {...{ ref, ...stylesApi, ...props }}>{children}</CarouselContent>
      {controls}
      {indicators}
    </>
  );

  return (
    <ctx.Provider value={{ getStyles, spacing, height, controlSize, onPreviousSlide, onNextSlide, onItemChange, controlsOffset, plugins, ...use }}>
      <Edge
        {...{
          el: "div",
          selector: "root",
          role: "region",
          "aria-roledescription": "carousel",
          onKeyDownCapture: use.handleKeydown,
          className,
          style,
          ...stylesApi
        }}
      >
        {content}
      </Edge>
    </ctx.Provider>
  );
}) as CarouselComponent;
Carousel.displayName = "Carousel";

export interface CarouselContentProps extends ComponentProps<"div"> {
  title?: string;
}
export const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>((_props, ref) => <Edge {...{ el: "div", selector: "content", ref, ..._props }} />);
CarouselContent.displayName = "CarouselContent";

export interface CarouselItemProps extends ComponentProps<"div"> {
  title?: string;
}
export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>((_props, ref) => {
  const { role = "group", "aria-roledescription": roleDesc = "slide", ...props } = _props;
  return (
    <Edge
      {...{
        el: "div",
        selector: "item",
        ref,
        role,
        "aria-roledescription": roleDesc,
        ...props
      }}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

export interface CarouselPreviousProps extends ComponentProps<"button"> {
  icon?: React.ReactNode;
}
export const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>((_props, ref) => {
  const { icon, children, type = "button", title = "Previous slide", "aria-label": al = "Previous slide", "aria-disabled": ad, ...props } = _props;
  const { handlePrev, canScrollPrev } = useCarouselCtx();
  return (
    <Edge
      {...{
        el: "button",
        selector: "previous",
        ref,
        type,
        title,
        "aria-label": al,
        tabIndex: canScrollPrev ? 0 : -1,
        disabled: props.disabled || !canScrollPrev,
        "data-inactive": !canScrollPrev || undefined,
        "aria-disabled": ad || props.disabled || !canScrollPrev,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          props.onClick?.(e);
          handlePrev();
        },
        ...props
      }}
    >
      {children || icon || (
        <Svg>
          <path d="m14 18-6-6 6-6" />
        </Svg>
      )}
    </Edge>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

export interface CarouselNextProps extends ComponentProps<"button"> {
  icon?: React.ReactNode;
}
export const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>((_props, ref) => {
  const { icon, children, type = "button", title = "Next slide", "aria-label": al = "Next slide", "aria-disabled": ad, ...props } = _props;
  const { handleNext, canScrollNext } = useCarouselCtx();
  return (
    <Edge
      {...{
        el: "button",
        selector: "next",
        ref,
        type,
        title,
        "aria-label": al,
        tabIndex: canScrollNext ? 0 : -1,
        disabled: props.disabled || !canScrollNext,
        "data-inactive": !canScrollNext || undefined,
        "aria-disabled": ad || props.disabled || !canScrollNext,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          props.onClick?.(e);
          handleNext();
        },
        ...props
      }}
    >
      {children || icon || (
        <Svg>
          <path d="m10 18 6-6-6-6" />
        </Svg>
      )}
    </Edge>
  );
});
CarouselNext.displayName = "CarouselNext";

export interface CarouselIndicatorsProps extends ComponentProps<"button"> {
  title?: string;
}
export const CarouselIndicators = React.forwardRef<HTMLButtonElement, CarouselIndicatorsProps>((_props, ref) => {
  const { role = "button", type = "button", "aria-label": al, unstyled, classNames, styles, ...props } = _props;
  const ctx = useCarouselCtx();
  const stylesApi = { unstyled, classNames, styles };
  return (
    <Edge {...{ el: "div", selector: "indicators", role: "group", ...stylesApi }}>
      {Array(ctx.slidesCount)
        .fill(0)
        .map((_, index) => (
          <Edge
            key={index}
            {...{
              el: "button",
              selector: "indicator",
              ref,
              type,
              role,
              tabIndex: -1,
              "data-orientation": ctx.orientation,
              "aria-label": `slide:${index + 1}`,
              "data-state": index === ctx.selected ? "active" : undefined,
              onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                ctx.handleScroll(index);
                props.onClick?.(e);
              },
              ...stylesApi,
              ...props
            }}
          />
        ))}
    </Edge>
  );
});
CarouselIndicators.displayName = "CarouselIndicators";

export type IconType = React.FC<React.ComponentPropsWithoutRef<"svg">>;
interface CarouselLazyLoadProps extends ComponentProps<"img", "styles" | "classNames" | "unstyled">, StylesNames<"wrap" | "img"> {
  inView: boolean;
  index: number;
  icon?: IconType;
}
export const CarouselLazyLoad = React.forwardRef<HTMLImageElement, CarouselLazyLoadProps>((_props, ref) => {
  const { src, inView, icon: Icon, unstyled, className, classNames, style, styles, alt = "Carousel image load", ...props } = _props;
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const setLoaded = React.useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);

  return (
    <div
      {...{
        className: cn({ "relative flex min-w-0 items-center justify-center [flex:0_0_100%]": !unstyled?.wrap }, className, classNames?.wrap),
        style: { ...styles?.wrap, ...style }
      }}
    >
      {!hasLoaded && Icon && <Icon className="absolute m-auto" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...{
          ref,
          className: cn(!unstyled?.img && ["h-full w-full", hasLoaded ? " opacity-100" : "opacity-0"], classNames?.img),
          onLoad: setLoaded,
          src: inView ? src : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D",
          alt,
          "data-src": src,
          style: styles?.img,
          ...props
        }}
      />
    </div>
  );
});
CarouselLazyLoad.displayName = "CarouselLazyLoad";

type EdgeType<T extends React.ElementType> = {
  el?: T;
  selector?: __CarouselSelector;
  ref?: React.ComponentPropsWithRef<T>["ref"];
} & ComponentProps<T>;
type EdgeElement = <T extends React.ElementType>(_props: EdgeType<T>) => React.ReactElement;
const Edge = React.forwardRef(function Edge<T extends React.ElementType>(_props: Omit<EdgeType<T>, "ref">, ref: React.ComponentPropsWithRef<T>["ref"]) {
  const { el, unstyled, className, classNames, style, styles, selector, ...props } = _props;
  const ctx = useCarouselCtx();
  const Components = (el || "div") as React.ElementType;
  return (
    <Components
      {...{
        ref: selector === "root" ? ctx.carouselRef : ref,
        ...ctx.getStyles(selector as __CarouselSelector, {
          unstyled,
          className,
          classNames,
          style,
          styles,
          ...ctx
        }),
        ...props
      }}
    />
  );
}) as EdgeElement;

// Export as a composite component
type CarouselComponent = React.ForwardRefExoticComponent<CarouselProps> & {
  Content: typeof CarouselContent;
  Item: typeof CarouselItem;
  Previous: typeof CarouselPrevious;
  Next: typeof CarouselNext;
  Indicators: typeof CarouselIndicators;
  LazyLoad: typeof CarouselLazyLoad;
};
// Attach sub-components
Carousel.Content = CarouselContent;
Carousel.Item = CarouselItem;
Carousel.Previous = CarouselPrevious;
Carousel.Next = CarouselNext;
Carousel.Indicators = CarouselIndicators;
Carousel.LazyLoad = CarouselLazyLoad;
