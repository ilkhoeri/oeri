import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m6.7,22H2c.64-1.13.97-2.4.96-3.68,0-2.04,1.68-3.68,3.76-3.68s3.76,1.65,3.76,3.68-1.68,3.68-3.76,3.68h-.01Zm3.02-10.65c1.63.68,2.95,1.93,3.72,3.51m-3.35,1.83s1.21.06,1.93-.45c1.42-1.01,7.95-9.03,9.51-10.97.22-.28.37-.6.43-.95h0c.25-1.43-1.05-2.61-2.47-2.25h0c-.34.09-.66.26-.91.51-1.81,1.72-9.29,8.87-10.18,10.36-.45.76-.29,1.95-.29,1.95" />
    </Svg>
  );
}
