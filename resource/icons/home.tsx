import { Svg, type SvgProps } from "@/ui/svg";

export function Icon({
  strokeWidth = 0.25,
  fill = "currentColor",
  ...props
}: SvgProps) {
  return (
    <Svg strokeWidth={strokeWidth} fill={fill} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.397 3.095a2.83 2.83 0 0 1 3.206 0l6 4.125a2.83 2.83 0 0 1 1.227 2.332V18A2.83 2.83 0 0 1 18 20.83H6A2.83 2.83 0 0 1 3.17 18V9.552A2.83 2.83 0 0 1 4.397 7.22l6-4.125Zm2.266 1.368a1.17 1.17 0 0 0-1.326 0l-6 4.125a1.17 1.17 0 0 0-.507.964V18c0 .646.524 1.17 1.17 1.17h2.17V16a3.83 3.83 0 0 1 7.66 0v3.17H18A1.17 1.17 0 0 0 19.17 18V9.552c0-.385-.19-.746-.507-.964l-6-4.125ZM14.17 19.17V16a2.17 2.17 0 0 0-4.34 0v3.17h4.34Z"
      />
    </Svg>
  );
}
