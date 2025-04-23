"use client";
import * as React from "react";
import { clamp, useMove } from "@/hooks/use-move";
import { Transition, TransitionOverride } from "@/hooks/use-dialog";
import { useUncontrolled } from "@/hooks/use-uncontrolled";
import { cn, cvx, rem, type inferType, type cvxProps } from "cretex";
import { useMergedRef } from "@/hooks/use-merged-ref";

const classes = cvx({
  variants: {
    selector: {
      root: "stylelayer-slider",
      label: "slider-label",
      thumb: "slider-thumb",
      trackContainer: "slider-track-container",
      track: "slider-track",
      bar: "slider-bar",
      markWrapper: "slider-mark-wrapper",
      mark: "slider-mark",
      markLabel: "slider-mark-label"
    }
  }
});

type __Selector = NonNullable<cvxProps<typeof classes>["selector"]>;
type Options = StylesNames<__Selector> &
  __SliderProps & {
    // variant?: string;
  };
type CSSProperties = React.CSSProperties & { [key: string]: any };
type NestedRecord<U extends [string, unknown], T extends string> = {
  [K in U as K[0]]?: Partial<Record<T, K[1]>>;
};
type Styles = ["unstyled", boolean] | ["classNames", string] | ["styles", CSSProperties];
type StylesNames<T extends string, Exclude extends string = never> = Omit<NestedRecord<Styles, T> & { className?: string; style?: CSSProperties }, Exclude>;
type ComponentProps<T extends React.ElementType, Exclude extends string = never> = StylesNames<__Selector> & React.PropsWithoutRef<Omit<React.ComponentProps<T>, "style" | "color" | Exclude>> & { color?: CSSProperties["color"] };

type CtxProps = {
  dir: "ltr" | "rtl";
  getStyles(selector: __Selector, options?: Options): inferType<typeof getStyles>;
};

function getStyles(selector: __Selector, options: Options = {}) {
  const { size = 8, color = "hsl(var(--constructive))", thumbSize, round = 999, unstyled, className, classNames, style, styles, disabled, inverted } = options;
  return {
    "aria-disabled": disabled ? "true" : undefined,
    "data-disabled": disabled ? "true" : undefined,
    "data-inverted": inverted ? "true" : undefined,
    className: cn(!unstyled?.[selector] && classes({ selector }), classNames?.[selector], className),
    style: {
      ...(selector === "root"
        ? {
            "--slider-size": rem(size),
            "--slider-label-fz": "0.8125rem",
            "--slider-color": color,
            "--slider-thumb-size": thumbSize !== undefined ? rem(thumbSize) : "calc(var(--slider-size) * 2)",
            "--slider-round": rem(round),
            "--slider-track-bg": "hsl(var(--muted-foreground))",
            "--slider-track-disabled-bg": "hsl(var(--muted))"
          }
        : undefined),
      pointerEvents: disabled ? "none" : undefined,
      ...styles?.[selector],
      ...style
    } as CSSProperties
  };
}

const ctx = React.createContext<CtxProps | undefined>(undefined);
const useSlider = () => React.useContext(ctx)!;

export interface __SliderProps {
  inverted?: boolean;
  disabled?: boolean;
  size?: (string & {}) | number;
  round?: (string & {}) | number;
  thumbSize?: string | number;
  color?: CSSProperties["color"];
}

export interface SliderProps extends __SliderProps, ComponentProps<"div", "value" | "onChange"> {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  name?: string;
  marks?: { value: number; label?: React.ReactNode }[];
  label?: React.ReactNode | ((value: number) => React.ReactNode);
  labelTransitionProps?: TransitionOverride;
  labelAlwaysOn?: boolean;
  thumbLabel?: string;
  showLabelOnHover?: boolean;
  thumbChildren?: React.ReactNode;
  hiddenInputProps?: React.ComponentPropsWithoutRef<"input">;
  restrictToMarks?: boolean;
  thumbProps?: React.ComponentPropsWithoutRef<"div">;
  dir?: "ltr" | "rtl";
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  scale?: (value: number) => number;
  onChangeEnd?: (value: number) => void;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>((_props, ref) => {
  const {
    classNames,
    styles,
    value,
    onChange,
    onChangeEnd,
    size,
    defaultValue,
    name,
    thumbChildren,
    unstyled,
    inverted,
    hiddenInputProps,
    restrictToMarks,
    thumbProps,
    round,
    min = 0,
    max = 100,
    step = 1,
    marks = [],
    label = f => f,
    precision: _precision,
    dir = "ltr",
    labelTransitionProps = { transition: "fade", duration: 0 },
    labelAlwaysOn = false,
    thumbLabel = "",
    showLabelOnHover = true,
    disabled = false,
    scale = v => v,
    ...props
  } = _props;

  const [hovered, setHovered] = React.useState(false);
  const [_value, setValue] = useUncontrolled({
    value: typeof value === "number" ? clamp(value, min!, max!) : value,
    defaultValue: typeof defaultValue === "number" ? clamp(defaultValue, min!, max!) : defaultValue,
    finalValue: clamp(0, min!, max!),
    onChange
  });

  const valueRef = React.useRef(_value);
  const root = React.useRef<HTMLDivElement>(null);
  const thumb = React.useRef<HTMLDivElement>(null);
  const position = getPosition({ value: _value, min: min!, max: max! });
  const scaledValue = scale!(_value);
  const _label = typeof label === "function" ? label(scaledValue) : label;
  const precision = _precision ?? getPrecision(step!);

  const handleChange = React.useCallback(
    ({ x }: { x: number }) => {
      if (!disabled) {
        const nextValue = getChangeValue({
          value: x,
          min: min!,
          max: max!,
          step: step!,
          precision
        });
        setValue(
          restrictToMarks && marks?.length
            ? findClosestNumber(
                nextValue,
                marks.map(mark => mark.value)
              )
            : nextValue
        );
        valueRef.current = nextValue;
      }
    },
    [disabled, min, max, step, precision, setValue, marks, restrictToMarks]
  );

  const { ref: container, active } = useMove(
    handleChange,
    {
      onScrubEnd: () =>
        onChangeEnd?.(
          restrictToMarks && marks?.length
            ? findClosestNumber(
                valueRef.current,
                marks.map(mark => mark.value)
              )
            : valueRef.current
        )
    },
    dir
  );

  const handleTrackKeydownCapture = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!disabled) {
      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault();
          thumb.current?.focus();
          if (restrictToMarks && marks) {
            const nextValue = getNextMarkValue(_value, marks);
            setValue(nextValue);
            onChangeEnd?.(nextValue);
            break;
          }
          const nextValue = getFloatingValue(Math.min(Math.max(_value + step!, min!), max!), precision);
          setValue(nextValue);
          onChangeEnd?.(nextValue);
          break;
        }
        case "ArrowRight": {
          event.preventDefault();
          thumb.current?.focus();
          if (restrictToMarks && marks) {
            const nextValue = dir === "rtl" ? getPreviousMarkValue(_value, marks) : getNextMarkValue(_value, marks);
            setValue(nextValue);
            onChangeEnd?.(nextValue);
            break;
          }
          const nextValue = getFloatingValue(Math.min(Math.max(dir === "rtl" ? _value - step! : _value + step!, min!), max!), precision);
          setValue(nextValue);
          onChangeEnd?.(nextValue);
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          thumb.current?.focus();

          if (restrictToMarks && marks) {
            const nextValue = getPreviousMarkValue(_value, marks);
            setValue(nextValue);
            onChangeEnd?.(nextValue);
            break;
          }
          const nextValue = getFloatingValue(Math.min(Math.max(_value - step!, min!), max!), precision);
          setValue(nextValue);
          onChangeEnd?.(nextValue);
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();
          thumb.current?.focus();
          if (restrictToMarks && marks) {
            const nextValue = dir === "rtl" ? getNextMarkValue(_value, marks) : getPreviousMarkValue(_value, marks);
            setValue(nextValue);
            onChangeEnd?.(nextValue);
            break;
          }
          const nextValue = getFloatingValue(Math.min(Math.max(dir === "rtl" ? _value + step! : _value - step!, min!), max!), precision);
          setValue(nextValue);
          onChangeEnd?.(nextValue);
          break;
        }

        case "Home": {
          event.preventDefault();
          thumb.current?.focus();
          if (restrictToMarks && marks) {
            setValue(getFirstMarkValue(marks));
            onChangeEnd?.(getFirstMarkValue(marks));
            break;
          }
          setValue(min!);
          onChangeEnd?.(min!);
          break;
        }
        case "End": {
          event.preventDefault();
          thumb.current?.focus();
          if (restrictToMarks && marks) {
            setValue(getLastMarkValue(marks));
            onChangeEnd?.(getLastMarkValue(marks));
            break;
          }
          setValue(max!);
          onChangeEnd?.(max!);
          break;
        }

        default: {
          break;
        }
      }
    }
  };

  const stylesApi = { unstyled, classNames, styles, disabled };

  return (
    <ctx.Provider value={{ dir, getStyles }}>
      <Edge
        key={dir}
        {...{
          el: "div",
          selector: "root",
          ref: useMergedRef(ref, root),
          onKeyDownCapture: handleTrackKeydownCapture,
          onMouseDownCapture: () => root.current?.focus(),
          dir,
          size,
          round,
          ...stylesApi,
          ...props
        }}
      >
        <SliderTrack
          {...{
            inverted,
            offset: 0,
            position,
            marks,
            min,
            max,
            value: scaledValue,
            containerProps: {
              ref: container as any,
              onMouseEnter: showLabelOnHover ? () => setHovered(true) : undefined,
              onMouseLeave: showLabelOnHover ? () => setHovered(false) : undefined
            },
            ...stylesApi
          }}
        >
          <SliderThumb
            {...{
              max,
              min,
              value: scaledValue,
              position,
              dragging: active,
              label: _label,
              ref: thumb as any,
              labelTransitionProps,
              labelAlwaysOn,
              thumbLabel,
              showLabelOnHover,
              isHovered: hovered,
              ...stylesApi,
              ...thumbProps
            }}
          >
            {thumbChildren}
          </SliderThumb>
        </SliderTrack>

        <input type="hidden" id={name} name={name} value={scaledValue} {...hiddenInputProps} />
      </Edge>
    </ctx.Provider>
  );
}) as SliderComponent;
Slider.displayName = "Slider";

export type RangeSliderValue = [number, number];
export interface RangeSliderProps extends ComponentProps<"div", "onChange" | "value" | "defaultValue"> {
  color?: CSSProperties["color"];
  round?: (string & {}) | number;
  size?: (string & {}) | number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  value?: RangeSliderValue;
  defaultValue?: RangeSliderValue;
  onChange?: (value: RangeSliderValue) => void;
  onChangeEnd?: (value: RangeSliderValue) => void;
  name?: string;
  marks?: { value: number; label?: React.ReactNode }[];
  label?: React.ReactNode | ((value: number) => React.ReactNode);
  labelTransitionProps?: TransitionOverride;
  labelAlwaysOn?: boolean;
  showLabelOnHover?: boolean;
  thumbChildren?: React.ReactNode;
  disabled?: boolean;
  thumbSize?: number | string;
  scale?: (value: number) => number;
  inverted?: boolean;
  minRange?: number;
  maxRange?: number;
  thumbFromLabel?: string;
  thumbToLabel?: string;
  hiddenInputProps?: React.ComponentPropsWithoutRef<"input">;
  thumbProps?: (index: 0 | 1) => React.ComponentPropsWithoutRef<"div">;
  dir?: "ltr" | "rtl";
}
export const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>((_props, ref) => {
  const {
    classNames,
    styles,
    value,
    onChange,
    onChangeEnd,
    size,
    maxRange,
    precision: _precision,
    defaultValue,
    name,
    thumbFromLabel,
    thumbToLabel,
    thumbChildren,
    unstyled,
    inverted,
    dir = "ltr",
    hiddenInputProps,
    thumbProps,
    min = 0,
    max = 100,
    minRange = 10,
    step = 1,
    marks = [],
    label = f => f,
    labelTransitionProps = { transition: "fade", duration: 0 },
    labelAlwaysOn = false,
    showLabelOnHover = true,
    disabled = false,
    scale = v => v,
    round,
    ...props
  } = _props;
  const [focused, setFocused] = React.useState(-1);
  const [hovered, setHovered] = React.useState(false);
  const [_value, setValue] = useUncontrolled<RangeSliderValue>({
    value,
    defaultValue,
    finalValue: [min!, max!],
    onChange
  });
  const valueRef = React.useRef(_value);
  const thumbs = React.useRef<HTMLDivElement[]>([]);
  const thumbIndex = React.useRef<number | undefined>(undefined);
  const positions = [getPosition({ value: _value[0], min: min!, max: max! }), getPosition({ value: _value[1], min: min!, max: max! })];

  const precision = _precision ?? getPrecision(step!);

  const _setValue = (val: RangeSliderValue) => {
    setValue(val);
    valueRef.current = val;
  };

  React.useEffect(
    () => {
      if (Array.isArray(value)) {
        valueRef.current = value;
      }
    },
    Array.isArray(value) ? [value[0], value[1]] : [null, null]
  );

  const setRangedValue = (val: number, index: number, triggerChangeEnd: boolean) => {
    const clone: RangeSliderValue = [...valueRef.current];
    clone[index] = val;

    if (index === 0) {
      if (val > clone[1] - (minRange! - 0.000000001)) {
        clone[1] = Math.min(val + minRange!, max!);
      }
      if (val > (max! - (minRange! - 0.000000001) || min!)) {
        clone[index] = valueRef.current[index];
      }
      if (clone[1] - val > maxRange!) {
        clone[1] = val + maxRange!;
      }
    }

    if (index === 1) {
      if (val < clone[0] + minRange!) {
        clone[0] = Math.max(val - minRange!, min!);
      }
      if (val < clone[0] + minRange!) {
        clone[index] = valueRef.current[index];
      }
      if (val - clone[0] > maxRange!) {
        clone[0] = val - maxRange!;
      }
    }
    clone[0] = getFloatingValue(clone[0], precision);
    clone[1] = getFloatingValue(clone[1], precision);
    _setValue(clone);
    if (triggerChangeEnd) {
      onChangeEnd?.(valueRef.current);
    }
  };

  const handleChange = (val: number) => {
    if (!disabled) {
      const nextValue = getChangeValue({
        value: val,
        min: min!,
        max: max!,
        step: step!,
        precision
      });
      setRangedValue(nextValue, thumbIndex.current!, false);
    }
  };

  const { ref: container, active } = useMove(({ x }) => handleChange(x), { onScrubEnd: () => onChangeEnd?.(valueRef.current) }, dir);

  function handleThumbMouseDown(index: number) {
    thumbIndex.current = index;
  }

  const handleTrackMouseDownCapture = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    container.current!.focus();
    const rect = container.current!.getBoundingClientRect();
    const changePosition = getClientPosition(event.nativeEvent);
    const changeValue = getChangeValue({
      value: changePosition - rect.left,
      max: max!,
      min: min!,
      step: step!,
      containerWidth: rect.width
    });
    const nearestHandle = Math.abs(_value[0] - changeValue) > Math.abs(_value[1] - changeValue) ? 1 : 0;
    const _nearestHandle = dir === "ltr" ? nearestHandle : nearestHandle === 1 ? 0 : 1;
    thumbIndex.current = _nearestHandle;
  };

  const getFocusedThumbIndex = () => {
    if (focused !== 1 && focused !== 0) {
      setFocused(0);
      return 0;
    }
    return focused;
  };

  const handleTrackKeydownCapture = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!disabled) {
      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(getFloatingValue(Math.min(Math.max(valueRef.current[focusedIndex] + step!, min!), max!), precision), focusedIndex, true);
          break;
        }
        case "ArrowRight": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(getFloatingValue(Math.min(Math.max(dir === "rtl" ? valueRef.current[focusedIndex] - step! : valueRef.current[focusedIndex] + step!, min!), max!), precision), focusedIndex, true);
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(getFloatingValue(Math.min(Math.max(valueRef.current[focusedIndex] - step!, min!), max!), precision), focusedIndex, true);
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(getFloatingValue(Math.min(Math.max(dir === "rtl" ? valueRef.current[focusedIndex] + step! : valueRef.current[focusedIndex] - step!, min!), max!), precision), focusedIndex, true);
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  const sharedThumbProps = {
    max: max!,
    min: min!,
    size,
    labelTransitionProps,
    labelAlwaysOn,
    onBlur: () => setFocused(-1)
  };

  const hasArrayThumbChildren = Array.isArray(thumbChildren);
  const stylesApi = { unstyled, classNames, styles, disabled };

  return (
    <ctx.Provider value={{ dir, getStyles }}>
      <Edge key={dir} {...{ el: "div", selector: "root", ref, dir, size, round, ...stylesApi, ...props }}>
        <SliderTrack
          {...{
            offset: positions[0],
            marksOffset: _value[0],
            position: positions[1] - positions[0],
            marks,
            inverted,
            min,
            max,
            value: _value[1],
            containerProps: {
              ref: container as any,
              onMouseEnter: showLabelOnHover ? () => setHovered(true) : undefined,
              onMouseLeave: showLabelOnHover ? () => setHovered(false) : undefined,
              onTouchStartCapture: handleTrackMouseDownCapture,
              onTouchEndCapture: () => {
                thumbIndex.current = -1;
              },
              onMouseDownCapture: handleTrackMouseDownCapture,
              onMouseUpCapture: () => {
                thumbIndex.current = -1;
              },
              onKeyDownCapture: handleTrackKeydownCapture
            },
            ...stylesApi
          }}
        >
          <SliderThumb
            {...{
              value: scale!(_value[0]),
              position: positions[0],
              dragging: active,
              label: typeof label === "function" ? label(getFloatingValue(scale!(_value[0]), precision)) : label,
              ref: node => {
                thumbs.current[0] = node!;
              },
              thumbLabel: thumbFromLabel,
              onMouseDown: () => handleThumbMouseDown(0),
              onFocus: () => setFocused(0),
              showLabelOnHover,
              isHovered: hovered,
              ...thumbProps?.(0),
              ...sharedThumbProps,
              ...stylesApi,
              ...thumbProps
            }}
          >
            {hasArrayThumbChildren ? thumbChildren[0] : thumbChildren}
          </SliderThumb>

          <SliderThumb
            {...{
              thumbLabel: thumbToLabel,
              value: scale!(_value[1]),
              position: positions[1],
              dragging: active,
              label: typeof label === "function" ? label(getFloatingValue(scale!(_value[1]), precision)) : label,
              ref: node => {
                thumbs.current[1] = node!;
              },
              onMouseDown: () => handleThumbMouseDown(1),
              onFocus: () => setFocused(1),
              showLabelOnHover,
              isHovered: hovered,
              ...thumbProps?.(1),
              ...sharedThumbProps,
              ...stylesApi,
              ...thumbProps
            }}
          >
            {hasArrayThumbChildren ? thumbChildren[1] : thumbChildren}
          </SliderThumb>
        </SliderTrack>

        <input type="hidden" name={`${name}_from`} value={_value[0]} {...hiddenInputProps} />
        <input type="hidden" name={`${name}_to`} value={_value[1]} {...hiddenInputProps} />
      </Edge>
    </ctx.Provider>
  );
});
RangeSlider.displayName = "RangeSlider";

export interface TrackProps extends ComponentProps<"div"> {
  position: number;
  offset?: number;
  marksOffset?: number;
  marks: { value: number; label?: React.ReactNode }[] | undefined;
  min: number;
  max: number;
  value: number;
  children: React.ReactNode;
  containerProps?: React.PropsWithRef<React.ComponentProps<"div">>;
  disabled: boolean | undefined;
  inverted: boolean | undefined;
}
export const SliderTrack = React.forwardRef<HTMLDivElement, TrackProps>((_props, ref) => {
  const { unstyled, classNames, styles, position, children, offset, disabled, marksOffset, inverted, containerProps, ...props } = _props;
  const stylesRest = { unstyled, classNames, styles, disabled };
  const stylesApi = { ...stylesRest, inverted };
  return (
    <Edge
      {...{
        el: "div",
        selector: "trackContainer",
        ref,
        ...stylesRest,
        ...containerProps
      }}
    >
      <Edge {...{ el: "div", selector: "track", ...stylesApi }}>
        <Edge
          {...{
            el: "div",
            selector: "bar",
            style: {
              "--slider-bar-width": `calc(${position}% + var(--slider-size))`,
              "--slider-bar-offset": `calc(${offset}% - var(--slider-size))`
            },
            ...stylesApi
          }}
        />
        {children}
        <SliderMarks {...{ ...props, offset: marksOffset, ...stylesApi }} />
      </Edge>
    </Edge>
  );
});
SliderTrack.displayName = "Slider/SliderTrack";

export interface SliderMarksProps extends ComponentProps<"div"> {
  marks: { value: number; label?: React.ReactNode }[] | undefined;
  min: number;
  max: number;
  value: number;
  offset: number | undefined;
  disabled: boolean | undefined;
  inverted: boolean | undefined;
}
export const SliderMarks = React.forwardRef<HTMLDivElement, SliderMarksProps>((_props, ref) => {
  const { unstyled, classNames, styles, marks, min, max, disabled, value, offset, inverted, ...props } = _props;
  const stylesRest = { unstyled, classNames, styles, disabled };

  if (!marks) return null;

  const items = marks.map((mark, index) => (
    <Edge
      key={index}
      {...{
        el: "div",
        selector: "markWrapper",
        ref,
        style: {
          "--mark-offset": `${getPosition({ value: mark.value, min, max })}%`
        },
        ...stylesRest,
        ...props
      }}
    >
      <Edge
        {...{
          el: "div",
          selector: "mark",
          "data-filled": isMarkFilled({ mark, value, offset, inverted }) ? "true" : undefined,
          ...stylesRest
        }}
      />
      {mark.label && <Edge {...{ el: "div", selector: "markLabel", ...stylesRest }}>{mark.label}</Edge>}
    </Edge>
  ));

  return items.length ? <div>{items}</div> : null;
});
SliderMarks.displayName = "Slider/SliderMarks";

export interface ThumbProps extends ComponentProps<"div", "value"> {
  max: number;
  min: number;
  value: number;
  position: number;
  dragging: boolean;
  label: React.ReactNode;
  onKeyDownCapture?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onMouseDown?: (event: any) => void;
  labelTransitionProps: TransitionOverride | undefined;
  labelAlwaysOn: boolean | undefined;
  thumbLabel: string | undefined;
  showLabelOnHover: boolean | undefined;
  isHovered?: boolean;
  children?: React.ReactNode;
  disabled: boolean | undefined;
  className?: string;
}
export const SliderThumb = React.forwardRef<HTMLDivElement, ThumbProps>((_props, ref) => {
  const { unstyled, classNames, styles, style, max, min, value, position, label, dragging, onMouseDown, onKeyDownCapture, labelTransitionProps, labelAlwaysOn, thumbLabel, onFocus, onBlur, isHovered, showLabelOnHover, children = null, disabled, role = "slider", ...props } = _props;

  const [focused, setFocused] = React.useState(false);
  const stylesApi = { unstyled, classNames, styles };
  const isVisible = labelAlwaysOn || dragging || focused || (showLabelOnHover && isHovered);

  const handleFocus = (event: React.FocusEvent<HTMLDivElement, Element>) => {
    setFocused(true);
    typeof onFocus === "function" && onFocus(event);
  };
  const handleBlur = (event: React.FocusEvent<HTMLDivElement, Element>) => {
    setFocused(false);
    typeof onBlur === "function" && onBlur(event);
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <Edge
      {...{
        el: "div",
        selector: "thumb",
        ref,
        role,
        disabled,
        tabIndex: 0,
        "aria-label": thumbLabel,
        "aria-valuemax": max,
        "aria-valuemin": min,
        "aria-valuenow": value,
        "data-dragging": dragging ? "true" : undefined,
        onTouchStart: onMouseDown,
        onMouseDown: onMouseDown,
        onKeyDownCapture: onKeyDownCapture,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onClick: handleClick,
        style: { "--slider-thumb-offset": `${position}%`, ...style },
        ...stylesApi,
        ...props
      }}
    >
      {children}
      <Transition duration={0} transition="fade" mounted={label != null && !!isVisible} {...labelTransitionProps}>
        {transitionStyles => <Edge {...{ el: "div", selector: "label", style: transitionStyles, ...stylesApi }}>{label}</Edge>}
      </Transition>
    </Edge>
  );
});
SliderThumb.displayName = "Slider/SliderThumb";

type EdgeType<T extends React.ElementType, Exclude extends string = never> = ComponentProps<T> &
  __SliderProps &
  Omit<
    {
      selector?: __Selector;
      el?: T;
      dir?: string;
      ref?: React.ComponentPropsWithRef<T>["ref"];
    },
    Exclude
  >;
const Edge = React.forwardRef(function Edge<T extends React.ElementType>(_props: EdgeType<T, "ref">, ref: React.ComponentPropsWithRef<T>["ref"]) {
  const { unstyled, className, classNames, el, style, styles, selector, size, thumbSize, round, disabled, color, inverted, dir, ...props } = _props;
  const ctx = useSlider();
  const Components = (el || "div") as React.ElementType;
  return (
    <Components
      {...{
        ref,
        dir: ctx?.dir ?? dir,
        ...ctx.getStyles(selector as __Selector, { unstyled, className, classNames, style, styles, size, thumbSize, color, inverted, disabled, round, ...ctx }),
        ...props
      }}
    />
  );
}) as <T extends React.ElementType>(_props: EdgeType<T>) => React.ReactElement;

interface GetChangeValue {
  value: number;
  containerWidth?: number;
  min: number;
  max: number;
  step: number;
  precision?: number;
}
export function getChangeValue({ value, containerWidth, min, max, step, precision }: GetChangeValue) {
  const left = !containerWidth ? value : Math.min(Math.max(value, 0), containerWidth) / containerWidth;
  const dx = left * (max - min);
  const nextValue = (dx !== 0 ? Math.round(dx / step) * step : 0) + min;
  const nextValueWithinStep = Math.max(nextValue, min);
  if (precision !== undefined) return Number(nextValueWithinStep.toFixed(precision));
  return nextValueWithinStep;
}

export function getPrecision(step: number) {
  if (!step) return 0;
  const split = step.toString().split(".");
  return split.length > 1 ? split[1].length : 0;
}

interface GetPosition {
  value: number;
  min: number;
  max: number;
}
export function getPosition({ value, min, max }: GetPosition) {
  const position = ((value - min) / (max - min)) * 100;
  return Math.min(Math.max(position, 0), 100);
}

export function findClosestNumber(value: number, numbers: number[]): number {
  if (numbers.length === 0) return value;
  return numbers.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev));
}

export function getNextMarkValue(currentValue: number, marks: { value: number; label?: React.ReactNode }[]) {
  const sortedMarks = [...marks].sort((a, b) => a.value - b.value);
  const nextMark = sortedMarks.find(mark => mark.value > currentValue);
  return nextMark ? nextMark.value : currentValue;
}

export function getPreviousMarkValue(currentValue: number, marks: { value: number; label?: React.ReactNode }[]) {
  const sortedMarks = [...marks].sort((a, b) => b.value - a.value);
  const previousMark = sortedMarks.find(mark => mark.value < currentValue);
  return previousMark ? previousMark.value : currentValue;
}

export function getFirstMarkValue(marks: { value: number; label?: React.ReactNode }[]) {
  const sortedMarks = [...marks].sort((a, b) => b.value - a.value);
  return sortedMarks.length > 0 ? sortedMarks[0].value : 0;
}

export function getLastMarkValue(marks: { value: number; label?: React.ReactNode }[]) {
  const sortedMarks = [...marks].sort((a, b) => a.value - b.value);
  return sortedMarks.length > 0 ? sortedMarks[sortedMarks.length - 1].value : 100;
}

export function getFloatingValue(value: number, precision: number) {
  return parseFloat(value.toFixed(precision));
}

export function getClientPosition(event: any) {
  if ("TouchEvent" in window && event instanceof window.TouchEvent) {
    const touch = event.touches[0];
    return touch.clientX;
  }
  return event.clientX;
}

interface IsMarkFilled {
  mark: { value: number; label?: any };
  offset?: number;
  value: number;
  inverted?: boolean;
}
export function isMarkFilled({ mark, offset, value, inverted = false }: IsMarkFilled) {
  return inverted ? (typeof offset === "number" ? mark.value <= offset || mark.value >= value : mark.value >= value) : typeof offset === "number" ? mark.value >= offset && mark.value <= value : mark.value <= value;
}

// Export as a composite component
type SliderComponent = React.ForwardRefExoticComponent<SliderProps> & {
  Track: typeof SliderTrack;
  Thumb: typeof SliderThumb;
  Marks: typeof SliderMarks;
};
// Attach sub-components
Slider.Track = SliderTrack;
Slider.Thumb = SliderThumb;
Slider.Marks = SliderMarks;
