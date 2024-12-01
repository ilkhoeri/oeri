import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m10.89,17.67h11.11" />
      <path d="m18.67,14.33l3.33,3.33-3.33,3.33" />
      <path d="m6.44,17.67c0,1.23-.99,2.22-2.22,2.22s-2.22-.99-2.22-2.22.99-2.22,2.22-2.22,2.22.99,2.22,2.22Z" />
      <path d="m13.11,6.33H2" />
      <path d="m5.33,9.67l-3.33-3.33,3.33-3.33" />
      <path d="m17.56,6.33c0-1.23.99-2.22,2.22-2.22s2.22.99,2.22,2.22-.99,2.22-2.22,2.22-2.22-.99-2.22-2.22Z" />
    </Svg>
  );
}
