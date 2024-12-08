import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m19.6,17.2c-1.33,0-2.4,1.08-2.4,2.4s1.08,2.4,2.4,2.4,2.4-1.08,2.4-2.4-1.08-2.4-2.4-2.4ZM6.8,4.4c0,1.33-1.08,2.4-2.4,2.4s-2.4-1.08-2.4-2.4,1.08-2.4,2.4-2.4,2.4,1.08,2.4,2.4Zm-2.4,12.79c-1.33,0-2.4,1.08-2.4,2.4s1.08,2.4,2.4,2.4,2.4-1.08,2.4-2.4-1.08-2.4-2.4-2.4Zm0-10.39v10.39M22,6.77l-2.39-2.39,2.39-2.39m-4.77,4.77l2.39-2.39-2.39-2.39m2.37,15.2,0,0v-7.75" />
    </Svg>
  );
}