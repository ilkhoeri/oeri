import { Svg, type SvgProps } from "@/ui/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m8.87,8.86v6.28h6.28" />
      <path d="m15.14,8.86l-6.29,6.29" />
      <path d="m12,2c8,0,10,2,10,10s-2,10-10,10S2,20,2,12,4,2,12,2Z" />
    </Svg>
  );
}
