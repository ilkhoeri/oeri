"use client";
import * as React from "react";
import { useId } from "@/hooks/use-id";
import { clamp } from "@/hooks/use-move";
import { useMergedRef } from "@/hooks/use-merged-ref";
import { useUncontrolled } from "@/hooks/use-uncontrolled";
import { cn, cvx, rem, type inferType, type cvxProps } from "str-merge";

const classes = cvx({
  variants: {
    selector: {
      root: "flex w-max [&:where(:has(input:disabled))]:pointer-events-none [--rating-base-color:#666]",
      symbolGroup: "relative [transition:transform_100ms_ease] [&:where([data-active])]:z-1 [&:where([data-active])]:scale-110",
      input: "sr-only [-webkit-tap-highlight-color:transparent] [&:focus-visible+label]:outline-2 [&:focus-visible+label]:outline-offset-2 [&:focus-visible+label]:outline-[--rating-color]",
      label: "absolute left-0 top-0 z-[--rating-item-z-index,0] block cursor-pointer [-webkit-tap-highlight-color:transparent] [&:where(:last-of-type)]:relative [&:where([data-read-only])]:cursor-default",
      symbolBody: "[clip-path:--rating-symbol-clip-path]",
      starSymbol: "block size-[--rating-sz,var(--rating-size)] fill-[--rating-base-color] stroke-[--rating-base-color] [&:where([data-filled])]:fill-[--rating-color] [&:where([data-filled])]:stroke-[--rating-color]"
    }
  }
});

type __Selector = NonNullable<cvxProps<typeof classes>["selector"]>;
type Options = StylesNames<__Selector> & {};
type CSSProperties = React.CSSProperties & { [key: string]: any };
type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type Styles = ["unstyled", boolean] | ["classNames", string] | ["styles", CSSProperties];
type StylesNames<T extends string, Exclude extends string = never> = Omit<
  NestedRecord<Styles, T> & {
    dir?: "ltr" | "rtl";
    className?: string;
    style?: CSSProperties;
  },
  Exclude
>;
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = StylesNames<__Selector> &
  React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | Exclude>>;
type CtxProps = {
  getStyles(selector: __Selector, options?: Options): inferType<typeof getStyles>;
  dir?: "ltr" | "rtl";
};

const defaultDir: "ltr" | "rtl" = "ltr";
function getStyles(selector: __Selector, options: Options = {}) {
  return {
    "data-rt": cn(selector),
    dir: options?.dir,
    className: cn(!options?.unstyled?.[selector] && classes({ selector }), options?.classNames?.[selector], options?.className),
    style: { ...options?.styles?.[selector], ...options?.style }
  };
}

const ctx = React.createContext<CtxProps | undefined>(undefined);
const useRating = () => React.useContext(ctx)!;

export interface __RatingProps {
  defaultValue?: number;
  value?: number;
  fractions?: number;
  count?: number;
  name?: string;
  readOnly?: boolean;
  highlightSelectedOnly?: boolean;
  color?: React.CSSProperties["color"];
  size?: string | number;
  onChange?: (value: number) => void;
  onHover?: (value: number) => void;
  getSymbolLabel?: (index: number) => string;
  emptySymbol?: React.ReactNode | ((value: number) => React.ReactNode);
  fullSymbol?: React.ReactNode | ((value: number) => React.ReactNode);
}

export interface RatingProps extends __RatingProps, ComponentProps<"div", "onChange" | "children" | "color" | "dir" | "defaultValue"> {
  dir?: "ltr" | "rtl";
};
export const Rating = React.forwardRef<HTMLDivElement, RatingProps>((_props, ref) => {
  const {
    className, classNames, style, styles, unstyled, name, id, value, defaultValue, onChange,
    count = 5, fractions = 1, getSymbolLabel = value => `${value}`, onMouseEnter, readOnly,
    onMouseMove, onHover, onMouseLeave, onTouchStart, onTouchEnd, emptySymbol, fullSymbol,
    highlightSelectedOnly, dir = defaultDir, ...props
  } = _props;
  const stylesApi = { dir, unstyled, classNames, styles };

  const _name = useId(name);
  const _id = useId(id);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 0,
    onChange
  });

  const [hovered, setHovered] = React.useState(-1);
  const [isOutside, setOutside] = React.useState(true);

  const _fractions = Math.floor(fractions!);
  const _count = Math.floor(count!);
  const decimalUnit = 1 / _fractions;
  const stableValueRounded = roundValueTo(_value, decimalUnit);
  const finalValue = hovered !== -1 ? hovered : stableValueRounded;

  const getRatingFromCoordinates = (x: number) => {
    const { left, right, width } = rootRef.current!.getBoundingClientRect();
    const symbolWidth = width / _count;
    const hoverPosition = dir === "rtl" ? right - x : x - left;
    const hoverValue = hoverPosition / symbolWidth;
    return clamp(roundValueTo(hoverValue + decimalUnit / 2, decimalUnit), decimalUnit, _count);
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseEnter?.(event);
    if (!readOnly) setOutside(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(event);
    if (readOnly) return;
    const rounded = getRatingFromCoordinates(event.clientX);
    setHovered(rounded);
    if (rounded !== hovered) onHover?.(rounded);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event);
    if (readOnly) return;
    setHovered(-1);
    setOutside(true);
    if (hovered !== -1) onHover?.(-1);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { touches } = event;
    if (touches.length !== 1) return;
    const touch = touches[0];
    setValue(getRatingFromCoordinates(touch.clientX));
    onTouchStart?.(event);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    onTouchEnd?.(event);
  };

  const handleItemBlur = () => isOutside && setHovered(-1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | number) => {
    if (!readOnly) {
      setValue(typeof event === "number" ? event : parseFloat(event.target.value));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | number) => {
    const itemValue = typeof event === "number" ? event : parseFloat(event.target.value);
    // const newRating = itemValue === _value ? itemValue - 1 : itemValue;
    if (!readOnly) {
      setValue(itemValue);
    }
  };

  const items = Array(_count)
    .fill(0)
    .map((_, index) => {
      const integerValue = index + 1;
      const fractionItems = Array.from(new Array(index === 0 ? _fractions + 1 : _fractions));
      const isGroupActive = !readOnly && Math.ceil(hovered) === integerValue;

      return (
        <div
          key={integerValue}
          {...{ "data-active": isGroupActive || undefined, ...getStyles("symbolGroup", stylesApi) }}
        >
          {fractionItems.map((__, fractionIndex) => {
            const fractionValue = decimalUnit * (index === 0 ? fractionIndex : fractionIndex + 1);
            const symbolValue = roundValueTo(integerValue - 1 + fractionValue, decimalUnit);
            return (
              <RatingItem
                key={`${integerValue}-${symbolValue}`}
                {...{
                  id: `${_id}-${index}-${fractionIndex}`,
                  name: _name,
                  value: symbolValue,
                  getSymbolLabel: getSymbolLabel,
                  emptyIcon: emptySymbol,
                  fullIcon: fullSymbol,
                  full: highlightSelectedOnly ? symbolValue === finalValue : symbolValue <= finalValue,
                  active: symbolValue === finalValue,
                  checked: symbolValue === stableValueRounded,
                  readOnly: readOnly,
                  fractionValue: fractionValue,
                  onChange: handleChange,
                  onBlur: handleItemBlur,
                  onInputChange: handleInputChange,
                  ...stylesApi
                }}
              />
            );
          })}
        </div>
      );
    });

  return (
    <ctx.Provider value={{ getStyles, dir }}>
      <RatingRoot
        {...{
          ref: useMergedRef(rootRef, ref),
          id: _id,
          onMouseMove: handleMouseMove,
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onTouchStart: handleTouchStart,
          onTouchEnd: handleTouchEnd,
          ...getStyles("root", { className, style, ...stylesApi }),
          ...props
        }}
      >
        {items}
      </RatingRoot>
    </ctx.Provider>
  );
});
Rating.displayName = "Rating";

const RatingRoot = React.forwardRef<HTMLDivElement, ComponentProps<"div"> & { size?: string | number }>((_props, ref) => {
  const { unstyled, className, classNames, style, styles, size = 20, color = "#f08c00", ...props } = _props;
  const ctx = useRating();
  return (
    <div
      {...{
        ref,
        ...ctx.getStyles("root", {
          unstyled,
          className,
          classNames,
          styles,
          dir: ctx?.dir ?? props.dir,
          style: {
            "--rating-size": rem(size),
            "--rating-color": String(color),
            ...style
          }
        }),
        ...props
      }}
    />
  );
});
RatingRoot.displayName = "Rating/RatingRoot";

export interface RatingItemProps extends ComponentProps<"input", "value" | "size" | "color"> {
  getSymbolLabel: ((value: number) => string) | undefined;
  emptyIcon?: React.ReactNode | ((value: number) => React.ReactNode);
  fullIcon?: React.ReactNode | ((value: number) => React.ReactNode);
  full: boolean;
  active: boolean;
  fractionValue: number;
  value: number;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement> | number) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement> | number) => void;
}
const RatingItem = React.forwardRef<HTMLInputElement, RatingItemProps>((_props, ref) => {
  const {
    getSymbolLabel, emptyIcon, fullIcon, full, active, value, readOnly, fractionValue,
    id, onBlur, onChange, onInputChange, unstyled, className, classNames, style, styles,
    ...props
  } = _props;

  const ctx = useRating();
  const _fullIcon = typeof fullIcon === "function" ? fullIcon(value) : fullIcon;
  const _emptyIcon = typeof emptyIcon === "function" ? emptyIcon(value) : emptyIcon;
  const currentDir = ctx?.dir ?? props.dir;
  const stylesApi = { dir: currentDir, unstyled, classNames, styles };
  const Label: React.ElementType = readOnly ? "div" : "label";

  return (
    <>
      {!readOnly && (
        <input
          {...{
            ref,
            id,
            type: "radio",
            ...ctx.getStyles("input", stylesApi),
            "data-active": active || undefined,
            "aria-label": getSymbolLabel?.(value),
            value: value,
            onBlur: onBlur,
            onChange: onInputChange,
            onKeyDown: event => event.key === " " && onChange(value),
            ...props
          }}
        />
      )}

      <Label
        {...{
          htmlFor: id,
          "data-read-only": readOnly || undefined,
          onClick: () => onChange(value),
          ...ctx.getStyles("label", {
            className,
            ...stylesApi,
            style: {
              "--rating-item-z-index": (fractionValue === 1 ? undefined : active ? 2 : 0)?.toString(),
              ...style
            }
          })
        }}
      >
        <div
          {...{
            ...ctx.getStyles("symbolBody", {
              ...stylesApi,
              style: {
                "--rating-symbol-clip-path":
                  fractionValue === 1
                    ? undefined
                    : currentDir === "ltr"
                      ? `inset(0 ${active ? 100 - fractionValue * 100 : 100}% 0 0)`
                      : `inset(0 0 0 ${active ? 100 - fractionValue * 100 : 100}% )`
              }
            })
          }}
        >
          {full ? _fullIcon || <RatingSymbol type="full" {...stylesApi} /> : _emptyIcon || <RatingSymbol type="empty" {...stylesApi} />}
        </div>
      </Label>
    </>
  );
});
RatingItem.displayName = "Rating/RatingItem";

const RatingSymbol = React.forwardRef<SVGSVGElement, ComponentProps<"svg"> & { type: "empty" | "full" }>((_props, ref) => {
  const { unstyled, className, classNames, style, styles, type, ...props } = _props;
  const ctx = useRating();
  return (
    <RatingIcon
      {...{
        ref,
        "data-filled": type === "full" || undefined,
        ...ctx.getStyles("starSymbol", { dir: ctx?.dir ?? props.dir, unstyled, className, classNames, style, styles }),
        ...props
      }}
    />
  );
});
RatingSymbol.displayName = "Rating/RatingSymbol";

const RatingIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((_props, ref) => {
  const { style, width, height, ...props } = _props;
  return (
    <svg
      {...{
        ref,
        width,
        height,
        viewBox: "0 0 24 24",
        strokeWidth: "round",
        strokeLinejoin: "round",
        xmlns: "http://www.w3.org/2000/svg",
        style: { width, height, ...style },
        ...props
      }}
    >
      <path d="m22.94,9.39c-.15-.48-.57-.83-1.07-.9l-5.98-.88-2.68-5.49c-.22-.46-.69-.75-1.2-.75,0,0,0,0,0,0s0,0,0,0c-.51,0-.97.29-1.2.75l-2.68,5.49-5.98.88c-.5.07-.92.42-1.07.9-.15.48-.03,1,.33,1.36l4.34,4.28-1.02,6.05c-.08.5.12,1,.54,1.3.41.29.96.33,1.41.1l5.34-2.84,5.34,2.84c.45.24,1,.2,1.41-.1.41-.29.62-.8.54-1.3l-1.02-6.05,4.34-4.28c.36-.35.48-.88.33-1.36Z" />
    </svg>
  );
});
RatingIcon.displayName = "Rating/RatingIcon";

function roundValueTo(value: number, to: number) {
  const rounded = Math.round(value / to) * to;
  const precision = `${to}`.split(".")[1]?.length || 0;
  return Number(rounded.toFixed(precision));
}
