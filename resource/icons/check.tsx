import { Svg, type SvgProps } from "@/ui/svg";

export function Icon({ animation, ...props }: SvgProps<{ animation?: boolean }>) {
  return (
    <Svg {...props}>
      {!animation ? (
        <path d="M5 12l5 5l10 -10" />
      ) : (
        <>
          <mask id="lineMdCheckAll0">
            <g fill="none" stroke="#fff" strokeDasharray="24" strokeDashoffset="24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M2 13.5l4 4l10.75 -10.75">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" />
              </path>
              <path stroke="#000" strokeWidth="6" d="M7.5 13.5l4 4l10.75 -10.75">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0" />
              </path>
              <path d="M7.5 13.5l4 4l10.75 -10.75">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0" />
              </path>
            </g>
          </mask>
          <rect width="24" height="24" fill="currentColor" mask="url(#lineMdCheckAll0)" />
        </>
      )}
    </Svg>
  );
}
