import { Svg, type SvgProps } from "../components/web/svg";

export const DesktopCodeIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M11.5 17h-7.5a1 1 0 0 1 -1 -1v-12a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v9" />
      <path d="M3 13h18" />
      <path d="M8 21h3.5" />
      <path d="M10 17l-.5 4" />
      <path d="M17 17l-2 2l2 2" />
      <path d="M20 21l2 -2l-2 -2" />
    </Svg>
  );
};
