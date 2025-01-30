import { Svg, type SvgProps } from "@/ui/svg";

export function Icon({ fill, ...props }: SvgProps) {
  return (
    <Svg currentFill="fill" {...{ fill, ...props }}>
      <path d="m1,9.46h3.38v-3.38h11.85v1.69h6.77v6.77h-3.38v3.38H7.77v-1.69H1" fill={fill || "#093344"} />
      <path d="m2.69,11.15h1.69v1.69h1.69v-5.08h1.69v6.77H2.69" fill={fill || "#f6df19"} />
      <path d="m9.46,7.77h5.08v1.69h-3.38v1.69h3.38v5.08h-5.08v-1.69h3.38v-1.69h-3.38" fill={fill || "#f6df19"} />
      <path d="m16.23,9.46h5.08v3.38h-1.69v-1.69h-1.69v5.08h-1.69" fill={fill || "#f6df19"} />
    </Svg>
  );
}
