import * as React from "react";

export const InitialSizeSvg = ["unset", "xxs", "xxxs", "xs", "base", "sm", "md", "lg", "xl", "xxl", "xxxl", "full"] as const;

export type InitialSizeSvg = (typeof InitialSizeSvg)[number];

export type IconType = (props: DetailedSvgProps) => React.JSX.Element;
export type SizeSvg = InitialSizeSvg | (string & {}) | number | undefined;
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
  currentFill?: "fill" | "stroke" | "fill-stroke" | "none";
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
  size?: SizeSvg;
  w?: string | number;
  h?: string | number;
  width?: string | number;
  height?: string | number;
  /**
   * Nilai viewBox="0 0 24 24" merujuk pada sistem koordinat yang digunakan untuk menggambarkan ruang gambar dalam elemen SVG. Nilai ini terdiri dari empat angka:
   *
   * - **0** (nilai pertama) – Posisi horizontal **x** dari sudut kiri atas area tampilan (viewBox). Jadi, posisi horizontal dimulai dari koordinat x = 0.
   * - **0** (nilai kedua) – Posisi vertikal **y** dari sudut kiri atas area tampilan. Posisi vertikal dimulai dari koordinat y = 0.
   * - **24** (nilai ketiga) – Lebar area tampilan dalam unit yang digunakan (biasanya pixel atau unit SVG). Dengan kata lain, lebar area tampilan adalah 24 unit.
   * - **24** (nilai keempat) – Tinggi area tampilan dalam unit yang digunakan (biasanya pixel atau unit SVG). Jadi, tinggi area tampilan adalah 24 unit.
   */
  ratio?: {
    /** Menentukan rasio lebar area tampilan dalam unit yang digunakan. */
    w?: number;
    /** Menentukan rasio tinggi area tampilan dalam unit yang digunakan. */
    h?: number;
  };
}

export declare function SvgIcon(data: IconTree): (props: DetailedSvgProps) => React.JSX.Element;
export declare function SvgBase(props: DetailedSvgProps & { attr?: Record<string, string> }): React.JSX.Element;

export function getInitialSizes<T>(size: T): string | T | undefined {
  const sizeMap: Record<InitialSizeSvg, string | undefined> = {
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
    xxxl: "112px",
    full: "100%"
  };
  if (typeof size === "string" && InitialSizeSvg.includes(size as InitialSizeSvg)) return sizeMap[size as InitialSizeSvg];
  return size;
}

// Check if stroke is a valid color or a valid number
const isNumber = <T,>(value: T): boolean => !isNaN(Number(value)) && Number(value) > 0;
const isColor = <T,>(value: T): boolean =>
  typeof value === "string" &&
  (/^#[0-9A-Fa-f]{3,6}$/.test(value) || // Hex color
    /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(value) || // RGB
    /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/.test(value) || // RGBA
    /^[a-zA-Z]+$/.test(value)); // Named color

function _isValidSize<T>(size: T): boolean {
  if (typeof size === "string") {
    if (/^(calc|clamp|var)\(|auto|inherit/.test(size)) return true;
    if (InitialSizeSvg.includes(size as InitialSizeSvg)) return true;
  }
  return false;
}

function applyRatio(size: string | number | undefined, ratio: number | undefined = 1): string | undefined {
  if (!size) return;
  const parseSize = typeof size === "number" ? size : parseFloat(size.replace(/[^\d.-]/g, ""));
  const newSize = parseSize * ratio;
  return typeof size === "number" ? `${newSize / 16}rem` : size;
}

export function getSizes(size: SizesProps) {
  const { size: sizeProp, width: widthProp, height: heightProp, h, w, ratio } = size;

  function sizer(ratio: number | undefined) {
    if (typeof sizeProp === "string" && InitialSizeSvg.includes(sizeProp as InitialSizeSvg)) {
      return applyRatio(getInitialSizes(sizeProp), ratio);
    }
    return applyRatio(sizeProp, ratio);
  }

  return { width: widthProp || w || sizer(ratio?.w), height: heightProp || h || sizer(ratio?.h) };
}

export function svgProps(detail: DetailedSvgProps) {
  const { size = "1rem", width: widthProp, height: heightProp, w, h, xmlns = "http://www.w3.org/2000/svg", viewBox = "0 0 24 24", "aria-hidden": ariaHidden = "true", currentFill = "stroke", fill, stroke, strokeWidth, strokeLinecap, strokeLinejoin, ratio, color, style, ...props } = detail;

  const { width, height } = getSizes({ size, width: widthProp, height: heightProp, h, w, ratio });

  // Determine strokeIsColor and strokeIsWidth
  const strokeIsColor = typeof stroke === "string" && isColor(stroke) ? stroke : undefined;
  const strokeIsWidth = strokeWidth || (isNumber(stroke) ? stroke : undefined);
  const getColor: Record<typeof currentFill, Record<string, string | undefined> | undefined> = {
    fill: { fill: fill || color },
    stroke: { stroke: strokeIsColor || color },
    "fill-stroke": { fill: fill || color, stroke: strokeIsColor || color },
    none: undefined
  };

  const __props = {
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    viewBox,
    xmlns,
    /* height: !isValidSize(size) ? height : undefined, */
    /* width: !isValidSize(size) ? width : undefined, */
    style: { height: height, width: width, minHeight: height, minWidth: width, color, ...getColor[currentFill], ...style },
    "aria-hidden": ariaHidden,
    ...props
  } as React.SVGAttributes<SVGSVGElement>;

  switch (currentFill) {
    case "stroke":
      __props.fill = !fill ? "none" : undefined;
      __props.stroke = !strokeIsColor ? "currentColor" : undefined;
      __props.strokeWidth = strokeIsWidth || "2";
      __props.strokeLinecap = strokeLinecap || "round";
      __props.strokeLinejoin = strokeLinejoin || "round";
      break;
    case "fill":
      __props.fill = !fill ? "currentColor" : undefined;
      __props.stroke = strokeIsColor || "none";
      __props.strokeWidth = strokeIsWidth || "0";
      __props.strokeLinecap = strokeLinecap;
      __props.strokeLinejoin = strokeLinejoin;
      break;
    case "fill-stroke":
      __props.fill = !fill ? "currentColor" : undefined;
      __props.stroke = !strokeIsColor ? "currentColor" : undefined;
      __props.strokeWidth = strokeIsWidth || "2";
      __props.strokeLinecap = strokeLinecap || "round";
      __props.strokeLinejoin = strokeLinejoin || "round";
      break;
    case "none":
      __props.stroke = strokeIsColor;
      __props.strokeWidth = strokeIsWidth;
      __props.strokeLinecap = strokeLinecap;
      __props.strokeLinejoin = strokeLinejoin;
      break;
    default:
      break;
  }

  return __props;
}

export const Svg = React.forwardRef<React.ElementRef<"svg">, DetailedSvgProps>((props, ref) => <svg ref={ref} {...svgProps(props)} />);
Svg.displayName = "Svg";

export default Svg;
