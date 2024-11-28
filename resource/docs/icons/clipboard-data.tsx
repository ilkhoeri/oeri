import { Svg, type SvgProps } from "../components/web/svg";

export const ClipboardDataIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
      <path d="M9 17v-4" />
      <path d="M12 17v-1" />
      <path d="M15 17v-2" />
      <path d="M12 17v-1" />
    </Svg>
  );
};
