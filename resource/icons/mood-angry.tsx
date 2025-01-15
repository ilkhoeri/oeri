import { Svg, type SvgProps } from "@/ui/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18z" />
      <path d="M8 9l2 1" />
      <path d="M16 9l-2 1" />
      <path d="M14.5 16.05a3.5 3.5 0 0 0 -5 0" />
    </Svg>
  );
}
