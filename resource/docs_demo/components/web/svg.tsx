import { Svg, SvgProps } from "@/modules/components/web";
import { getRandomColor } from "@/hooks/use-random-colors"; // ignore
import { SetProps, SetPropsRange, SetPropsColor, useSetProps } from "../../__set_props";

export function Demo() {
  const { numb: size, str: color, ...props } = useSetProps({ Str: getRandomColor(), Numb: 16 });
  return (
    <div className="flex flex-row items-center gap-4">
      <LogoIcon size={size} color={color} />
      <FileIcon size={size} color={color} arrow="top-right" />
      <SetProps.Wrapper>
      <SetPropsRange label="bulletRound" value={size} setNumb={props.setNumb} min="8" max="64" />
      <SetPropsColor str={color} {...props} />
      </SetProps.Wrapper>
    </div>
  );
}

// basic usage
// with other propertys
function FileIcon({ arrow, ...props }: SvgProps & { arrow?: "top-right" }) {
  let chevron: string | undefined;
  let line: string | undefined;
  switch (arrow) {
    case "top-right":
      chevron = "M15 16v-5h-5";
      line = "M15 11l-5 5";
      break;
    default:
      break;
  }
  return (
    <Svg {...props}>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <path d={chevron} />
      <path d={line} />
    </Svg>
  );
}

// by default the viewbox="0 0 24 24" and size={16}, here is an example of changing the viewbox and ratio of w
// when size={16} it means height={16} and width={62.8}
function LogoIcon({ viewBox = "0 0 94.2 24", ...props }: SvgProps) {
  return (
    <Svg currentFill="fill" ratio={{ w: 3.925 }} {...{viewBox, ...props}}>
      <rect x="88.58" y="0" width="5.62" height="24" rx="2.81" ry="2.81" />
      <path d="m68.63,21.19c0,1.55,1.26,2.81,2.81,2.81h0c1.55,0,2.81-1.26,2.81-2.81v-9.05c0-3.6,2.92-6.51,6.51-6.51h0c1.55,0,2.81-1.26,2.81-2.81h0C83.58,1.26,82.32,0,80.76,0h0c-6.7,0-12.14,5.43-12.14,12.14v9.05Z" />
      <path d="m51.63,18.38c-4.01,0-7.16-3.71-6.2-7.88.53-2.3,2.39-4.16,4.69-4.69,3.12-.72,5.98.86,7.23,3.38h-6.47c-1.56,0-2.82,1.26-2.82,2.82h0c0,1.56,1.26,2.82,2.82,2.82h9.93c1.52,0,2.81-1.2,2.82-2.72s-.26-2.98-.94-4.56C60.81,3.19,56.6.1,51.87,0c-7.01-.14-12.68,5.73-12.22,12.8.36,5.55,4.68,10.28,10.19,11.07,2.34.34,4.58,0,6.54-.85,2.77-1.2,1.82-5.39-1.2-5.39h0c-.41,0-.8.11-1.18.26-.73.31-1.53.49-2.38.49Z" />
      <circle cx="22.63" cy="12" r="2.81" />
      <path d="m14.56,13.82c.98-.41,1.63-1.34,1.72-2.4.21-2.28,1.64-4.38,3.9-5.31s4.75-.47,6.52,1c.82.68,1.93.88,2.91.48h0c1.91-.79,2.38-3.35.8-4.7C27.11.04,22.35-.87,18.04.91s-7.03,5.8-7.37,10.15c-.16,2.07,1.98,3.55,3.89,2.76h0Z" />
      <path d="m30.7,10.18c-.98.41-1.63,1.34-1.72,2.4-.21,2.28-1.64,4.38-3.9,5.31s-4.75.47-6.52-1c-.82-.68-1.93-.88-2.91-.48h0c-1.91.79-2.38,3.35-.8,4.7,3.32,2.84,8.07,3.75,12.39,1.97s7.03-5.8,7.37-10.15c.16-2.07-1.98-3.55-3.89-2.76h0Z" />
    </Svg>
  );
}
