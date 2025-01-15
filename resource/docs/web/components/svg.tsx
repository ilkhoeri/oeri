import * as React from "react";

export enum InitialSize {
  unset = "unset",
  xxs = "xxs",
  xxxs = "xxxs",
  xs = "xs",
  base = "base",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
  xxl = "xxl",
  xxxl = "xxxl"
}

export type IconType = (props: DetailedSvgProps) => JSX.Element;
export type Sizes = `${InitialSize}` | (string & {}) | number | undefined;
export type Colors = React.CSSProperties["color"] | "currentColor";
export type SvgProps<OverrideProps = object> = Omit<DetailedSvgProps, "children" | "currentFill" | "ratio"> & {
  ref?: React.Ref<SVGSVGElement>;
} & OverrideProps;

export interface IconTree {
  tag: string;
  child: IconTree[];
  attr: { [key: string]: string };
}

export interface DetailedSvgProps extends Omit<React.SVGAttributes<SVGElement>, "stroke">, SizesProps {
  color?: Colors;
  stroke?: number | Colors;
  style?: React.CSSProperties & { [key: string]: any };
  currentFill?: "fill" | "stroke" | "fill-stroke";
}

export interface SizesProps {
  /**
   * ```ts
   * type Size = InitialSize | (string & {}) | number | undefined;
   * ```
   * Initial:
   *
   * `unset: undefined` | `xs: "10px"` | `xxs: "12px"` | `xxxs: "14px"` | `base: "16px"` | `sm: "18px"` | `md: "22px"` | `lg: "32px"` | `xl: "48px"` | `xxl: "86px"` | `xxxl: "112px"`
   */
  size?: Sizes;
  h?: string | number;
  w?: string | number;
  width?: string | number;
  height?: string | number;
  ratio?: { h?: number; w?: number };
}

export declare function SvgIcon(data: IconTree): (props: DetailedSvgProps) => React.JSX.Element;
export declare function SvgBase(props: DetailedSvgProps & { attr?: Record<string, string> }): JSX.Element;

export const getInitialSizes = (size: Sizes): string | undefined => {
  const sizeMap: Record<InitialSize, string | undefined> = {
    unset: undefined,
    xs: "10px",
    xxs: "12px",
    xxxs: "14px",
    base: "16px",
    sm: "18px",
    md: "22px",
    lg: "32px",
    xl: "48px",
    xxl: "86px",
    xxxl: "112px"
  };
  return sizeMap[size as InitialSize];
};

export function getSizes(Size: SizesProps) {
  const { size = "16px", height, width, h, w, ratio } = Size;
  const sizeMap = getInitialSizes(size);
  const inSz = Object.values(InitialSize) as string[];
  const initialSize = (sz: string) => inSz.includes(sz);
  function parseSize(sz: string | number) {
    return typeof sz === "number" ? sz : parseFloat(sz.replace(/[^\d.-]/g, ""));
  }
  function applyRatio(sz: string | number | undefined, ratio: number | undefined = 1) {
    if (!sz) return;
    const newSize = parseSize(sz) * ratio;
    return typeof sz === "number" ? `${newSize / 16}rem` : sz;
  }
  const sz = (sz: Sizes) => (initialSize(sz as string) ? sizeMap : sz);
  const sizer = (rt: number | undefined) => (initialSize(size as string) ? applyRatio(sizeMap, rt) : applyRatio(size, rt));
  return {
    sz,
    h: height || h || sz(sizer(ratio?.h)),
    w: width || w || sz(sizer(ratio?.w))
  };
}

export function getSvg(Svg: DetailedSvgProps) {
  const {
    xmlns = "http://www.w3.org/2000/svg",
    viewBox = "0 0 24 24",
    "aria-hidden": ariaHidden = "true",
    currentFill = "stroke",
    w,
    h,
    size,
    width,
    height,
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    ratio,
    color,
    ...props
  } = Svg;

  const sz = getSizes({ size, h, w, height, width, ratio });
  const attr = { viewBox, xmlns, height: sz.h, width: sz.w, "aria-hidden": ariaHidden, ...props };

  // Helper functions to check if stroke is a valid color or a valid number
  const isNumber = (value: any): boolean => !isNaN(Number(value)) && Number(value) > 0;
  const isColor = (value: any): boolean =>
    typeof value === "string" &&
    (/^#[0-9A-Fa-f]{3,6}$/.test(value) || // Hex color
      /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(value) || // RGB
      /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/.test(value) || // RGBA
      /^[a-zA-Z]+$/.test(value)); // Named color

  // Determine strokeIsColor and strokeIsWidth
  const strokeIsColor = typeof stroke === "string" && isColor(stroke) ? stroke : undefined;
  const strokeIsWidth = strokeWidth || (isNumber(stroke) ? stroke : undefined);

  const _props_ = {
    fill,
    stroke: strokeIsColor,
    strokeWidth: strokeIsWidth,
    strokeLinecap,
    strokeLinejoin,
    ...attr
  } as React.SVGAttributes<SVGSVGElement>;

  switch (currentFill) {
    case "stroke":
      _props_.fill = fill || "none";
      _props_.stroke = strokeIsColor || color || "currentColor";
      _props_.strokeWidth = strokeIsWidth || "2";
      _props_.strokeLinecap = strokeLinecap || "round";
      _props_.strokeLinejoin = strokeLinejoin || "round";
      break;
    case "fill":
      _props_.fill = fill || color || "currentColor";
      _props_.stroke = strokeIsColor || "none";
      _props_.strokeWidth = strokeIsWidth || "0";
      _props_.strokeLinecap = undefined;
      _props_.strokeLinejoin = undefined;
      break;
    case "fill-stroke":
      _props_.fill = fill || color || "currentColor";
      _props_.stroke = strokeIsColor || "currentColor";
      _props_.strokeWidth = strokeIsWidth || "2";
      _props_.strokeLinecap = strokeLinecap || "round";
      _props_.strokeLinejoin = strokeLinejoin || "round";
      break;
    default:
      break;
  }

  return { props: _props_, ...sz };
}

export const Svg = React.forwardRef<React.ElementRef<"svg">, DetailedSvgProps>((props, ref) => <svg {...{ ref, ...getSvg({ ...props }).props }} />);
Svg.displayName = "Svg";

export default Svg;
