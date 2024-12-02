import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ viewBox = "0 0 24 9.6", ...props }: SvgProps) {
  return (
    <Svg currentFill="fill" ratio={{ h: 1.5 }} {...{ viewBox, ...props }}>
      <path d="m1.12.64c.64,0,1.28.32,1.76.8l6.4,6.56c.8.8,1.76,1.12,2.72,1.12s1.92-.32,2.72-1.12l6.4-6.56c.48-.48,1.12-.8,1.76-.8S23.52.32,23.52,0H.48c0,.32.32.64.64.64Z" />
      <path
        data-arrow="border"
        d="m20.64.96l-6.4,6.56c-1.28,1.28-3.2,1.28-4.48,0L3.36.96C2.72.32,1.92,0,1.12,0H0C0,.64.48,1.12,1.12,1.12s1.12.16,1.44.64l6.4,6.56c.8.8,1.92,1.28,3.04,1.28s2.24-.48,3.04-1.28l6.4-6.56c.32-.32.96-.64,1.44-.64S24,.64,24,0h-1.12C22.08,0,21.28.32,20.64.96Z"
      />
    </Svg>
  );
}