import { Svg, type SvgProps } from "@/ui/svg";

export function Icon({ role = "img", fill = "#24292f", "data-animation": dA, ...props }: SvgProps<{ ["data-animation"]?: boolean }>) {
  return (
    <Svg currentFill="fill" {...{ role, fill, ...props }}>
      {!dA ? (
        <path d="m12.01,1C5.92,1,1,5.96,1,12.09c0,4.9,3.15,9.05,7.53,10.52.55.11.75-.24.75-.53,0-.26-.02-1.14-.02-2.06-3.06.66-3.7-1.32-3.7-1.32-.49-1.29-1.22-1.62-1.22-1.62-1-.68.07-.68.07-.68,1.11.07,1.7,1.14,1.7,1.14.98,1.69,2.57,1.21,3.21.92.09-.72.38-1.21.69-1.49-2.44-.26-5.01-1.21-5.01-5.47,0-1.21.44-2.2,1.13-2.97-.11-.28-.49-1.41.11-2.94,0,0,.93-.29,3.03,1.14.9-.24,1.82-.37,2.75-.37.93,0,1.88.13,2.75.37,2.1-1.43,3.03-1.14,3.03-1.14.6,1.52.22,2.66.11,2.94.71.77,1.13,1.76,1.13,2.97,0,4.26-2.57,5.2-5.03,5.47.4.35.75,1.01.75,2.06,0,1.49-.02,2.68-.02,3.05,0,.29.2.64.75.53,4.37-1.47,7.53-5.62,7.53-10.52.02-6.13-4.92-11.09-10.99-11.09Z" />
      ) : (
        <>
          <mask id="lineMdGithubLoop0" width="24" height="24" x="0" y="0">
            <g fill="#fff">
              <ellipse cx="9.5" cy="9" rx="1.5" ry="1" />
              <ellipse cx="14.5" cy="9" rx="1.5" ry="1" />
            </g>
          </mask>
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path
              strokeDasharray="32"
              strokeDashoffset="32"
              d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"
            >
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.7s" values="32;0" />
            </path>
            <path strokeDasharray="10" strokeDashoffset="10" d="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5">
              <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5;M9 19c-1.406 0-3-.5-4-.5-.532 0-1 0-2-.5;M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5" />
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="10;0" />
            </path>
          </g>
          <rect width="8" height="4" x="8" y="11" fill="currentColor" mask="url(#lineMdGithubLoop0)">
            <animate attributeName="y" dur="10s" keyTimes="0;0.45;0.46;0.54;0.55;1" repeatCount="indefinite" values="11;11;7;7;11;11" />
          </rect>
        </>
      )}
    </Svg>
  );
}
