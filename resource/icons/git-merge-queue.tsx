import { Svg, type SvgProps } from "@/ui/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m6.8,18.6c0-1.33-1.08-2.4-2.4-2.4s-2.4,1.08-2.4,2.4,1.08,2.4,2.4,2.4,2.4-1.08,2.4-2.4Zm-2.4-2.4v-6.25m15.2,4.26c-1.33,0-2.4-1.08-2.4-2.4s1.08-2.4,2.4-2.4,2.4,1.08,2.4,2.4-1.08,2.4-2.4,2.4ZM5.4,4c0,.55-.45,1-1,1s-1-.45-1-1,.45-1,1-1,1,.45,1,1Zm6.9,3.9c0,.55-.45,1-1,1s-1-.45-1-1,.45-1,1-1,1,.45,1,1Z" />
    </Svg>
  );
}
