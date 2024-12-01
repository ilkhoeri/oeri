import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m13.11,12H2" />
      <path d="m5.33,15.33l-3.33-3.33,3.33-3.33" />
      <path d="m17.56,12c0-1.23.99-2.22,2.22-2.22s2.22.99,2.22,2.22-.99,2.22-2.22,2.22-2.22-.99-2.22-2.22Z" />
    </Svg>
  );
}
