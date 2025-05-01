import * as React from "react";
import { cn, cnx, cvx, ocx, rem, type cvxProps } from "cretex";

const classes = cvx({
  variants: {
    selector: {
      root: "relative",
      indicator: "absolute z-[200] flex items-center justify-center whitespace-nowrap p-1 text-xs leading-none select-none leading-[0] [transform:translate(var(--indicator-translate-x),var(--indicator-translate-y))]"
    },
    processing: {
      true: "before:absolute before:inset-0 before:bg-[var(--indicator-color,inherit)] before:rounded-[--indicator-round,9999px] before:-z-1 data-[processing]:before:content-[''] data-[processing]:before:[animation:processing_1000ms_linear_infinite]"
    },
    position: {
      "top-start": "top-[--indicator-top] left-[--indicator-left]",
      "top-center": "top-[--indicator-top] left-[--indicator-left]",
      "top-end": "top-[--indicator-top] right-[--indicator-right]",
      "middle-start": "top-[--indicator-top] left-[--indicator-left]",
      "middle-center": "top-[--indicator-top] left-[--indicator-left]",
      "middle-end": "top-[--indicator-top] right-[--indicator-right]",
      "bottom-start": "bottom-[--indicator-bottom] left-[--indicator-left]",
      "bottom-center": "bottom-[--indicator-bottom] left-[--indicator-left]",
      "bottom-end": "bottom-[--indicator-bottom] right-[--indicator-right]"
    }
  }
});

type __Selector = NonNullable<cvxProps<typeof classes>["selector"]>;
type IndicatorPosition = NonNullable<cvxProps<typeof classes>["position"]>;
type Options = __IndicatorProps & { hidden?: boolean; arDis?: ElementProps["aria-disabled"] };

function getStyles(selector: __Selector, options: Options) {
  const { unstyled, color, processing, inline, position, size, round, offset, arDis, ...opt } = options;
  const _offset = rem(offset);
  const [_position, _placement] = position!.split("-");
  function is<T>(initial: boolean | undefined, state?: T) {
    return initial ? ((state || "true") as T) : undefined;
  }
  function selected<T>(select: __Selector, state: T) {
    return selector === select ? (state as T) : undefined;
  }
  const removeStyle = typeof unstyled === "object" ? unstyled?.[selector] : unstyled;
  return {
    "data-position": position,
    ...ocx(
      selected("indicator", {
        "data-disabled": is(opt.disabled),
        "data-indicator": "indicator",
        "data-with-label": is(!!opt.label),
        "data-with-border": is(opt.withBorder),
        "data-processing": is(processing)
      })
    ),
    className: cn(
      !removeStyle && classes({ selector, position: selected("indicator", position), processing: selected("indicator", is(processing)) }),
      selected("root", inline ? "inline-block" : "block"),
      selected("indicator", cnx(is(opt.withBorder, "outline outline-2 outline-background"), size ? "h-[--indicator-size] min-w-[--indicator-size]" : "h-2.5 min-w-2.5", round ? "rounded-[--indicator-round]" : "rounded-full", color ? "bg-[--indicator-color]" : "bg-constructive")),
      opt.classNames?.[selector],
      opt.className
    ),
    style: ocx(
      opt.style,
      opt.styles?.[selector],
      selector === "root" && [
        size && { "--indicator-size": rem(size) },
        round && { "--indicator-round": rem(round) },
        color && { "--indicator-color": color },
        _position === "top" && { "--indicator-top": _offset, "--indicator-translate-y": "-50%" },
        _position === "middle" && { "--indicator-top": "50%", "--indicator-translate-y": "-50%" },
        _position === "bottom" && { "--indicator-bottom": _offset, "--indicator-translate-y": "50%" },
        _placement === "start" && { "--indicator-left": _offset, "--indicator-translate-x": "-50%" },
        _placement === "center" && { "--indicator-left": "50%", "--indicator-translate-x": "-50%" },
        _placement === "end" && { "--indicator-right": _offset, "--indicator-translate-x": "50%" }
      ]
    )
  };
}

interface __IndicatorProps {
  className?: string;
  style?: React.CSSProperties & Record<string, any>;
  color?: React.CSSProperties["color"];
  position?: IndicatorPosition;
  offset?: number;
  inline?: boolean;
  size?: number | string;
  label?: React.ReactNode;
  round?: number | string;
  withBorder?: boolean;
  disabled?: boolean;
  processing?: boolean;
  classNames?: Partial<Record<__Selector, string>>;
  styles?: Partial<Record<__Selector, __IndicatorProps["style"]>>;
  unstyled?: boolean | Partial<Record<__Selector, boolean>>;
}
type ElementProps = Omit<React.ComponentProps<"div">, keyof __IndicatorProps>;
export interface IndicatorProps extends React.PropsWithoutRef<ElementProps>, __IndicatorProps {
  title?: string;
}
export const Indicator = React.forwardRef<HTMLDivElement, IndicatorProps>((_props, ref) => {
  const { label, children, classNames, className, style, styles, unstyled, color, size = 10, round, offset = 0, inline = false, disabled = false, processing = false, withBorder = false, position = "top-end", "aria-disabled": arDis, ...props } = _props;
  const stylesApi = { unstyled, classNames, styles, color, disabled, label, withBorder, processing, inline, position, size, round, offset, arDis };
  return (
    <div {...{ ref, ...getStyles("root", { className, style, ...stylesApi }), ...props }}>
      {children}
      {!disabled && <div {...getStyles("indicator", stylesApi)}>{label}</div>}
    </div>
  );
});
Indicator.displayName = "Indicator";
