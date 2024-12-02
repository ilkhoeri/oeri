import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ fill = "#38bdf8", ...props }: SvgProps) {
  return (
    <Svg currentFill="fill" {...{ fill, ...props }}>
      <path d="m12,5.4c-2.93,0-4.77,1.47-5.5,4.4,1.1-1.47,2.38-2.02,3.85-1.65.84.21,1.43.82,2.1,1.49,1.08,1.09,2.33,2.36,5.05,2.36,2.93,0,4.77-1.47,5.5-4.4-1.1,1.47-2.38,2.02-3.85,1.65-.84-.21-1.43-.82-2.1-1.49-1.08-1.09-2.33-2.36-5.05-2.36Zm-5.5,6.6c-2.93,0-4.77,1.47-5.5,4.4,1.1-1.47,2.38-2.02,3.85-1.65.84.21,1.43.82,2.1,1.49,1.08,1.09,2.33,2.36,5.05,2.36,2.93,0,4.77-1.47,5.5-4.4-1.1,1.47-2.38,2.02-3.85,1.65-.84-.21-1.43-.82-2.1-1.49-1.08-1.09-2.33-2.36-5.05-2.36Z" />
    </Svg>
  );
}