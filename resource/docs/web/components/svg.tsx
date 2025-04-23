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

export type IconType = (props: DetailedSvgProps) => React.JSX.Element;
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
  size?: Sizes;
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

// const isValidSize = typeof size === 'string' && (size.startsWith('calc(') || size.startsWith('clamp(') || size.startsWith('var('));

function isValidSize(size: number | string | undefined): boolean {
  return typeof size === "string" && /^(calc|clamp|var)\(/.test(size);
}

function parseSize(sz: string | number): number {
  return typeof sz === "number" ? sz : parseFloat(sz.replace(/[^\d.-]/g, ""));
}

function applyRatio(sz: string | number | undefined, ratio: number | undefined = 1): string | undefined {
  if (!sz) return;
  const newSize = parseSize(sz) * ratio;
  return typeof sz === "number" ? `${newSize / 16}rem` : sz;
}

export function getSizes(Size: SizesProps) {
  const { size = "16px", height, width, h, w, ratio } = Size;
  const sizeMap = getInitialSizes(size);
  const inSz = Object.values(InitialSize) as string[];

  const initialSize = (sz: string) => inSz.includes(sz);

  const sz = (sz: Sizes) => (initialSize(sz as string) ? sizeMap : sz);

  const sizer = (rt: number | undefined) => (initialSize(size as string) ? applyRatio(sizeMap, rt) : applyRatio(size, rt));

  return {
    sz,
    h: height || h || sz(sizer(ratio?.h)),
    w: width || w || sz(sizer(ratio?.w))
  };
}

export function svgProps(detail: DetailedSvgProps) {
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
    style,
    ...props
  } = detail;

  const sz = getSizes({ size, h, w, height, width, ratio });

  // Check if stroke is a valid color or a valid number
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

  const __props = {
    fill,
    stroke: strokeIsColor,
    strokeWidth: strokeIsWidth,
    strokeLinecap,
    strokeLinejoin,
    viewBox,
    xmlns,
    height: !isValidSize(size) ? sz.h : undefined,
    width: !isValidSize(size) ? sz.w : undefined,
    style: { ...style, height: sz.h, width: sz.w, minHeight: sz.h, minWidth: sz.w },
    "aria-hidden": ariaHidden,
    ...props
  } as React.SVGAttributes<SVGSVGElement>;

  switch (currentFill) {
    case "stroke":
      __props.fill = fill || "none";
      __props.stroke = strokeIsColor || color || "currentColor";
      __props.strokeWidth = strokeIsWidth || "2";
      __props.strokeLinecap = strokeLinecap || "round";
      __props.strokeLinejoin = strokeLinejoin || "round";
      break;
    case "fill":
      __props.fill = fill || color || "currentColor";
      __props.stroke = strokeIsColor || "none";
      __props.strokeWidth = strokeIsWidth || "0";
      __props.strokeLinecap = strokeLinecap;
      __props.strokeLinejoin = strokeLinejoin;
      break;
    case "fill-stroke":
      __props.fill = fill || color || "currentColor";
      __props.stroke = strokeIsColor || "currentColor";
      __props.strokeWidth = strokeIsWidth || "2";
      __props.strokeLinecap = strokeLinecap || "round";
      __props.strokeLinejoin = strokeLinejoin || "round";
      break;
    case "none":
      __props.fill = fill || color;
      __props.stroke = strokeIsColor;
      __props.strokeWidth = strokeIsWidth;
      __props.strokeLinecap = strokeLinecap;
      __props.strokeLinejoin = strokeLinejoin;
      break;
    default:
      break;
  }

  return { props: __props, ...sz };
}

export const Svg = React.forwardRef<React.ElementRef<"svg">, DetailedSvgProps>((props, ref) => <svg {...{ ref, ...svgProps({ ...props }).props }} />);
Svg.displayName = "Svg";

export default Svg;
