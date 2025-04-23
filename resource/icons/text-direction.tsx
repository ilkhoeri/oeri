import { Svg, type SvgProps } from "@/ui/svg";

const dirMap = {
  ltr: ["M17 21l2 -2l-2 -2"],
  rtl: ["M7 21l-2 -2l2 -2"]
} as const;

export function Icon({ dir = "ltr", ...props }: SvgProps<{ dir?: "ltr" | "rtl" }>) {
  return (
    <Svg {...props}>
      <path d="M5 19h14" />
      <path d="M14 15v-11" />
      <path d="M16 4h-6.5a3.5 3.5 0 0 0 0 7h.5" />
      <path d="M10 15v-11" />
      {dirMap[dir].map((i, _i) => (
        <path key={_i} d={i} />
      ))}
    </Svg>
  );
}
