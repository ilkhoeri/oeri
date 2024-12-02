import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m16,8v5c0,.8.32,1.56.88,2.12.56.56,1.33.88,2.12.88s1.56-.32,2.12-.88c.56-.56.88-1.33.88-2.12v-1c0-2.26-.76-4.45-2.17-6.22-1.4-1.77-3.36-3.01-5.56-3.52-2.2-.51-4.5-.27-6.55.7-2.04.96-3.69,2.59-4.69,4.61-1,2.02-1.28,4.33-.81,6.53s1.68,4.19,3.43,5.62c1.74,1.43,3.92,2.23,6.18,2.27,2.26.04,4.46-.69,6.25-2.06m-2.08-7.94c0,2.21-1.79,4-4,4s-4-1.79-4-4,1.79-4,4-4,4,1.79,4,4Z" />
    </Svg>
  );
}
