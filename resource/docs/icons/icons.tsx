import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 6.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" />
      <path d="M2.5 21h8l-4 -7z" />
      <path d="M14 3l7 7" />
      <path d="M14 10l7 -7" />
      <path d="M14 14h7v7h-7z" />
    </Svg>
  );
}
