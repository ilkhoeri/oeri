import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m2,9.78h20M6.44,2v2.22m11.11-2.22v2.22M5.56,22h12.89c1.24,0,1.87,0,2.34-.24.42-.21.76-.55.97-.97.24-.48.24-1.1.24-2.34V7.78c0-1.24,0-1.87-.24-2.34-.21-.42-.55-.76-.97-.97-.48-.24-1.1-.24-2.34-.24H5.56c-1.24,0-1.87,0-2.34.24-.42.21-.76.55-.97.97-.24.48-.24,1.1-.24,2.34v10.67c0,1.24,0,1.87.24,2.34.21.42.55.76.97.97.48.24,1.1.24,2.34.24Z" />
    </Svg>
  );
}