import { Svg, type SvgProps } from "@/ui/svg";

const chevronMap = {
  up: ["M6 15l6 -6l6 6"],
  right: ["M9 6l6 6l-6 6"],
  down: ["M6 9l6 6l6 -6"],
  left: ["M15 6l-6 6l6 6"],
  "up-down": ["m7 9 5-5 5 5", "m7 15 5 5 5-5"],
  "left-right": ["m9 7-5 5 5 5", "m15 7 5 5-5 5"]
} as const;

export function Icon(_props: SvgProps<{ chevron?: keyof typeof chevronMap }>) {
  const { chevron = "up", ...props } = _props;
  return (
    <Svg {...props}>
      {chevronMap[chevron].map(d => (
        <path key={d} d={d} />
      ))}
    </Svg>
  );
}
