import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m10.89,12h11.11" />
      <path d="m18.67,15.33l3.33-3.33-3.33-3.33" />
      <path d="m6.44,12c0-1.23-.99-2.22-2.22-2.22s-2.22.99-2.22,2.22.99,2.22,2.22,2.22,2.22-.99,2.22-2.22Z" />
    </Svg>
  );
}
