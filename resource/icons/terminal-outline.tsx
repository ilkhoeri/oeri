import { Svg, type SvgProps } from "@/ui/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m19.63,19.63c1.31,0,2.37-1.06,2.37-2.37V6.73c0-1.31-1.06-2.37-2.37-2.37H4.37c-1.31,0-2.37,1.06-2.37,2.37v10.53c0,1.31,1.06,2.37,2.37,2.37h15.27Z" />
      <path d="m6.52,7.5l3.91,3.91-3.91,3.91" />
      <path d="m12,16.5h5.48" />
    </Svg>
  );
}
