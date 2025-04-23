import { Svg, type SvgProps } from "@/ui/svg";

export function Icon({ animation, ...props }: SvgProps<{ animation?: boolean }>) {
  return (
    <Svg {...props} viewBox={animation ? "0 0 18 24" : "0 0 24 24"}>
      {!animation ? (
        <>
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </>
      ) : (
        <>
          <mask id="mask">
            <g stroke="#fff" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 5l-14 14" strokeDasharray="24" strokeDashoffset="24">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" />
              </path>
              <path strokeWidth="4" stroke="#000" d="M2 5l14 14" strokeDasharray="24" strokeDashoffset="24">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" begin="0.4s" />
              </path>
              <path d="M2 5l14 14" strokeDasharray="24" strokeDashoffset="24">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" begin="0.4s" />
              </path>
            </g>
          </mask>
          <path fill="currentColor" mask="url(#mask)" d="M0 0h18v24H0z" />
        </>
      )}
    </Svg>
  );
}
