import { Svg, type SvgProps } from "@/ui/svg";

const arrowMap = {
  down: ["M12 5l0 14", "M18 13l-6 6", "M6 13l6 6"],
  "down-left": ["M17 7l-10 10", "M16 17l-9 0l0 -9"],
  "down-right": ["M7 7l10 10", "M17 8l0 9l-9 0"],
  left: ["M5 12l14 0", "M5 12l6 6", "M5 12l6 -6"],
  right: ["M5 12l14 0", "M13 18l6 -6", "M13 6l6 6"],
  up: ["M12 5l0 14", "M18 11l-6 -6", "M6 11l6 -6"],
  "up-left": ["M7 7l10 10", "M16 7l-9 0l0 9"],
  "up-right": ["M17 7l-10 10", "M8 7l9 0l0 9"]
} as const;

export function Icon(_props: SvgProps<{ arrow?: keyof typeof arrowMap }>) {
  const { arrow = "up", ...props } = _props;
  return (
    <Svg {...props}>
      {arrowMap[arrow].map(d => (
        <path key={d} d={d} />
      ))}
    </Svg>
  );
}
