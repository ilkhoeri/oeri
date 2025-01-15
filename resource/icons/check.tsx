import { Svg, type SvgProps } from "@/ui/svg";

export function Icon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M5 12l5 5l10 -10" />
    </Svg>
  );
}
