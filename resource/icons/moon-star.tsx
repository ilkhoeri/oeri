import { Svg, type SvgProps } from "@/ui/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m5.15,5.3v-3.3m-1.65,1.65h3.3" />
      <path d="m3.65,14.5v-3.3m-1.65,1.65h3.3" />
      <path d="m9.67,10.18v-3.3m-1.65,1.65h3.3" />
      <path d="m14.23,15.27c.36-.03.68.25.71.61s-.25.68-.61.71-.68-.25-.71-.61m2.47-5.14c.62-.38,1.44-.19,1.82.44.38.63.19,1.44-.44,1.82-.62.38-1.44.19-1.82-.44m1.85-7.45c-1.03-.6-2.14-.96-3.25-1.12,2.19,2.81,2.59,6.76.7,10.03-1.89,3.27-5.52,4.9-9.04,4.41.69.89,1.56,1.66,2.59,2.26,4.3,2.49,9.81,1.01,12.29-3.29,2.49-4.3,1.01-9.81-3.29-12.29Zm-.62,6.76h0" />
    </Svg>
  );
}
