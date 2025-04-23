import { Svg, type SvgProps } from "@/ui/svg";

export function Icon({ role = "img", fill = "#436ab2", "data-animation": dA, ...props }: SvgProps<{ ["data-animation"]?: boolean }>) {
  return (
    <Svg currentFill="fill" {...{ role, fill, ...props }}>
      {!dA ? (
        <path d="m19.64,5.07c-1.45-.66-2.97-1.13-4.54-1.4-.21.38-.41.77-.58,1.18-1.67-.24-3.36-.24-5.03,0-.16-.37-.39-.83-.58-1.18-1.58.26-3.11.73-4.57,1.4C1.79,8.69.63,13.13,1.1,17.54h0c1.68,1.24,3.56,2.18,5.56,2.79.45-.6.85-1.25,1.19-1.92-.65-.24-1.27-.54-1.87-.9l.46-.36c3.52,1.66,7.59,1.66,11.11,0,.16.12.3.24.47.36-.6.36-1.23.66-1.89.9.35.68.76,1.32,1.22,1.92,2-.61,3.87-1.55,5.56-2.79h0c.46-4.42-.69-8.85-3.26-12.48Zm-11.29,10c-1.16-.07-2.04-1.06-1.98-2.21,0,0,0,0,0,0-.08-1.15.8-2.15,1.95-2.22,0,0,.02,0,.03,0,1.15.05,2.03,1.02,1.98,2.17,0,.02,0,.03,0,.05.04,1.14-.84,2.11-1.98,2.18v.04Zm7.3,0c-1.16-.07-2.04-1.06-1.98-2.22-.07-1.16.81-2.15,1.97-2.22,0,0,0,0,0,0,1.15.05,2.03,1.02,1.98,2.17,0,.02,0,.03,0,.05.05,1.15-.83,2.12-1.98,2.18v.04Z" />
      ) : (
        <>
          <g fill="currentColor" fillOpacity="0">
            <circle cx="9" cy="12" r="1.5">
              <animate fill="freeze" attributeName="fill-opacity" begin="1.3s" dur="0.15s" values="0;1" />
            </circle>
            <circle cx="15" cy="12" r="1.5">
              <animate fill="freeze" attributeName="fill-opacity" begin="1.45s" dur="0.15s" values="0;1" />
            </circle>
          </g>
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path strokeDasharray="32" strokeDashoffset="32" d="M12 6h2l1 -2c0 0 2.5 0.5 4 1.5c3.53 2.35 3 9.5 3 10.5c-1.33 2.17 -5.5 3.5 -5.5 3.5l-1 -2M12 6h-2l-0.97 -2c0 0 -2.5 0.5 -4 1.5c-3.53 2.35 -3 9.5 -3 10.5c1.33 2.17 5.5 3.5 5.5 3.5l1 -2">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.7s" values="32;0" />
            </path>
            <path strokeDasharray="16" strokeDashoffset="16" d="M5.5 16c5 2.5 8 2.5 13 0">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="16;0" />
            </path>
          </g>
        </>
      )}
    </Svg>
  );
}
