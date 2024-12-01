import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="10" strokeMiterlimit="10" />
      <path d="m16,9.32s-1.79,1.35-4,1.35-4-1.35-4-1.35" />
      <polyline points="15.05 18 12.89 13.89 12.89 10.67 11.11 10.67 11.11 13.89 8.95 18" />
      <circle cx="12" cy="6.67" r=".67" />
    </Svg>
  );
}
