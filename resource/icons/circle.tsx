import { Svg, type SvgProps } from "@/ui/svg";

export function Icon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    </Svg>
  );
}
