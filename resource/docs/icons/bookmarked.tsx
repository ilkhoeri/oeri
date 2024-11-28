import { Svg, type SvgProps } from "../components/web/svg";

export const BookmarkedIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <polyline points="10 2 10 10 13 7 16 10 16 2" />
    </Svg>
  );
};
