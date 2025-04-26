import { Svg, type SvgProps } from "@/ui/svg";

export function BrandOeriIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m18.09,4.07c-2.74-2.1-6.49-2.72-9.91-1.3S2.54,7.27,2.09,10.7" />
      <path d="m5.91,19.93c2.74,2.1,6.49,2.72,9.91,1.3s5.63-4.51,6.09-7.93" />
      <line x1="13.85" y1="15.95" x2="18.25" y2="14.13" />
      <path d="m9.12,17.62l1.11-2.69c.61-1.47-.09-3.15-1.56-3.76l-2.69-1.11" />
    </Svg>
  );
}
export function BookOpenIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path fillRule="evenodd" d="M2 16.144V4.998c0-1.098.886-1.99 1.982-1.923c.977.06 2.131.179 3.018.413c1.05.276 2.296.866 3.282 1.388A3.5 3.5 0 0 0 12 5.275v15.2a3.46 3.46 0 0 1-1.628-.406c-1-.532-2.29-1.15-3.372-1.435c-.877-.232-2.016-.35-2.985-.411C2.906 18.153 2 17.255 2 16.143" clipRule="evenodd" opacity="1" />
      <path d="M22 16.144V4.934c0-1.073-.846-1.953-1.918-1.916c-1.129.04-2.535.156-3.582.47c-.908.271-1.965.816-2.826 1.315A3.5 3.5 0 0 1 12 5.275v15.2c.56 0 1.121-.136 1.628-.406c1-.532 2.29-1.15 3.372-1.435c.877-.232 2.016-.35 2.985-.411c1.109-.07 2.015-.968 2.015-2.08" />
      <path filter="invert(1)" d="M4.273 12.818a.75.75 0 0 1 .91-.545l4 1a.75.75 0 1 1-.365 1.455l-4-1a.75.75 0 0 1-.545-.91m.909-4.545a.75.75 0 1 0-.364 1.455l4 1a.75.75 0 0 0 .364-1.455z" />
    </Svg>
  );
}
export function BrandGithubFillIcon({ role = "img", fill = "#24292f", "data-animation": dA, ...props }: SvgProps<{ ["data-animation"]?: boolean }>) {
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
export function BrandDiscordFillIcon({ role = "img", fill = "#436ab2", "data-animation": dA, ...props }: SvgProps<{ ["data-animation"]?: boolean }>) {
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
export function HeartIcon({ "data-animation": dA, ...props }: SvgProps<{ ["data-animation"]?: boolean }>) {
  return (
    <Svg {...props}>
      {!dA ? (
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      ) : (
        <>
          <path fill="currentColor" fillOpacity="0" d="M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9c0 0 -7.43 -7.79 -8.24 -9c-0.48 -0.71 -0.76 -1.57 -0.76 -2.5c0 -2.49 2.01 -4.5 4.5 -4.5c1.56 0 2.87 0.84 3.74 2c0.76 1 0.76 1 0.76 1Z">
            <animate fill="freeze" attributeName="fill-opacity" begin="0.7s" dur="0.5s" values="0;1" />
          </path>
          <path
            fill="none"
            stroke="currentColor"
            strokeDasharray="32"
            strokeDashoffset="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c0 0 0 0 -0.76 -1c-0.88 -1.16 -2.18 -2 -3.74 -2c-2.49 0 -4.5 2.01 -4.5 4.5c0 0.93 0.28 1.79 0.76 2.5c0.81 1.21 8.24 9 8.24 9M12 8c0 0 0 0 0.76 -1c0.88 -1.16 2.18 -2 3.74 -2c2.49 0 4.5 2.01 4.5 4.5c0 0.93 -0.28 1.79 -0.76 2.5c-0.81 1.21 -8.24 9 -8.24 9"
          >
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.7s" values="32;0" />
          </path>
        </>
      )}
    </Svg>
  );
}
export function FireSquareIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path
        fillRule="evenodd"
        d="M3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464M17 12.667C17 16.933 13.444 18 11.667 18C10.11 18 7 16.933 7 12.667C7 10.81 8.063 9.633 8.956 9.04c.408-.271.916-.098.942.391c.058 1.071.883 1.931 1.523 1.07c.584-.788.873-1.858.873-2.501c0-.947.958-1.548 1.707-.968C15.459 8.162 17 10.056 17 12.667"
        clipRule="evenodd"
      />
    </Svg>
  );
}
export function ArrowsSquareIcon(
  _props: SvgProps<{
    arrow?: "top" | "right" | "bottom" | "left";
    square?: boolean;
  }>
) {
  const { arrow = "top", square = true, ...props } = _props;
  let chevron: string | undefined;
  let line: string | undefined;
  switch (arrow) {
    case "top":
      chevron = "M16 12l-4 -4l-4 4";
      line = "M12 16v-8";
      break;
    case "right":
      chevron = "M12 16l4 -4l-4 -4";
      line = "M8 12h8";
      break;
    case "bottom":
      chevron = "M8 12l4 4l4 -4";
      line = "M12 8v8";
      break;
    case "left":
      chevron = "M12 8l-4 4l4 4";
      line = "M16 12h-8";
      break;
    default:
      break;
  }

  return (
    <Svg {...props}>
      <path d={chevron} />
      <path d={line} />
      {square && <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" data-d="square" />}
    </Svg>
  );
}
export function StarIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path d="M9.153 5.408C10.42 3.136 11.053 2 12 2s1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182s.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506s-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452s-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882S3.58 8.328 6.04 7.772l.636-.144c.699-.158 1.048-.237 1.329-.45s.46-.536.82-1.182z" />
    </Svg>
  );
}
export function MoonStarIcon({ animation, ...props }: SvgProps<{ animation?: boolean }>) {
  if (animation) {
    return (
      <Svg {...props}>
        <g fill="none" stroke="currentColor" strokeDasharray="4" strokeDashoffset="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
          <path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5">
            <animate id="lineMdMoonRisingFilledAltLoop0" fill="freeze" attributeName="stroke-dashoffset" begin="0.7s;lineMdMoonRisingFilledAltLoop0.begin+6s" dur="0.4s" values="4;0" />
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop0.begin+2s;lineMdMoonRisingFilledAltLoop0.begin+4s" dur="0.4s" values="4;0" />
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop0.begin+1.2s;lineMdMoonRisingFilledAltLoop0.begin+3.2s;lineMdMoonRisingFilledAltLoop0.begin+5.2s" dur="0.4s" values="0;4" />
            <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop0.begin+1.8s" to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5" />
            <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop0.begin+3.8s" to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5" />
            <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop0.begin+5.8s" to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5" />
          </path>
          <path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5">
            <animate id="lineMdMoonRisingFilledAltLoop1" fill="freeze" attributeName="stroke-dashoffset" begin="1.1s;lineMdMoonRisingFilledAltLoop1.begin+6s" dur="0.4s" values="4;0" />
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop1.begin+2s;lineMdMoonRisingFilledAltLoop1.begin+4s" dur="0.4s" values="4;0" />
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop1.begin+1.2s;lineMdMoonRisingFilledAltLoop1.begin+3.2s;lineMdMoonRisingFilledAltLoop1.begin+5.2s" dur="0.4s" values="0;4" />
            <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop1.begin+1.8s" to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5" />
            <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop1.begin+3.8s" to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5" />
            <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop1.begin+5.8s" to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5" />
          </path>
          <path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5">
            <animate id="lineMdMoonRisingFilledAltLoop2" fill="freeze" attributeName="stroke-dashoffset" begin="2s;lineMdMoonRisingFilledAltLoop2.begin+6s" dur="0.4s" values="4;0" />
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop2.begin+2s" dur="0.4s" values="4;0" />
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonRisingFilledAltLoop2.begin+1.2s;lineMdMoonRisingFilledAltLoop2.begin+3.2s" dur="0.4s" values="0;4" />
            <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop2.begin+1.8s" to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5" />
            <set fill="freeze" attributeName="d" begin="lineMdMoonRisingFilledAltLoop2.begin+5.8s" to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5" />
          </path>
        </g>
        <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z" transform="translate(0 22)">
          <animateMotion fill="freeze" calcMode="linear" dur="0.6s" path="M0 0v-22" />
        </path>
      </Svg>
    );
  }
  return (
    <Svg {...props}>
      <path d="m5.15,5.3v-3.3m-1.65,1.65h3.3" />
      <path d="m3.65,14.5v-3.3m-1.65,1.65h3.3" />
      <path d="m9.67,10.18v-3.3m-1.65,1.65h3.3" />
      <path d="m14.23,15.27c.36-.03.68.25.71.61s-.25.68-.61.71-.68-.25-.71-.61m2.47-5.14c.62-.38,1.44-.19,1.82.44.38.63.19,1.44-.44,1.82-.62.38-1.44.19-1.82-.44m1.85-7.45c-1.03-.6-2.14-.96-3.25-1.12,2.19,2.81,2.59,6.76.7,10.03-1.89,3.27-5.52,4.9-9.04,4.41.69.89,1.56,1.66,2.59,2.26,4.3,2.49,9.81,1.01,12.29-3.29,2.49-4.3,1.01-9.81-3.29-12.29Zm-.62,6.76h0" />
    </Svg>
  );
}
export function SunIcon({ animation, ...props }: SvgProps<{ animation?: boolean }>) {
  if (animation) {
    return (
      <Svg {...props}>
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path strokeDasharray="2" strokeDashoffset="2" d="M12 19v1M19 12h1M12 5v-1M5 12h-1">
            <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1" />
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="2;0" />
          </path>
          <path strokeDasharray="2" strokeDashoffset="2" d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5">
            <animate fill="freeze" attributeName="d" begin="0.8s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5" />
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="2;0" />
          </path>
          <animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
        </g>
        <mask id="lineMdMoonFilledAltToSunnyFilledLoopTransition0">
          <circle cx="12" cy="12" r="12" fill="#fff" />
          <circle cx="18" cy="6" r="12" fill="#fff">
            <animate fill="freeze" attributeName="cx" dur="0.4s" values="18;22" />
            <animate fill="freeze" attributeName="cy" dur="0.4s" values="6;2" />
            <animate fill="freeze" attributeName="r" dur="0.4s" values="12;3" />
          </circle>
          <circle cx="18" cy="6" r="10">
            <animate fill="freeze" attributeName="cx" dur="0.4s" values="18;22" />
            <animate fill="freeze" attributeName="cy" dur="0.4s" values="6;2" />
            <animate fill="freeze" attributeName="r" dur="0.4s" values="10;1" />
          </circle>
        </mask>
        <circle cx="12" cy="12" r="10" mask="url(#lineMdMoonFilledAltToSunnyFilledLoopTransition0)" fill="currentColor">
          <animate fill="freeze" attributeName="r" dur="0.4s" values="10;6" />
        </circle>
      </Svg>
    );
  }
  return (
    <Svg {...props}>
      <path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z" />
      <g data-g="high">
        <path d="M4 12h-3" />
        <path d="M12 4v-3" />
        <path d="M20 12h3" />
        <path d="M12 20v3" />
      </g>
      <g data-g="low">
        <path d="M6.343 17.657l-1.414 1.414" />
        <path d="M6.343 6.343l-1.414 -1.414" />
        <path d="M17.657 6.343l1.414 -1.414" />
        <path d="M17.657 17.657l1.414 1.414" />
      </g>
    </Svg>
  );
}
export function MonitorSmartphoneIcon({ animation, ...props }: SvgProps<{ animation?: boolean }>) {
  return (
    <Svg {...props}>
      <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
      <path d="M10 19v-3.96 3.15" />
      <path d="M7 19h5" />
      <rect width="6" height="10" x="16" y="12" rx="2" />
    </Svg>
  );
}
export function CheckIcon({ animation, ...props }: SvgProps<{ animation?: boolean }>) {
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
export function XIcon({ animation, ...props }: SvgProps<{ animation?: boolean }>) {
  return (
    <Svg {...props} viewBox={!animation ? "0 0 24 24" : "0 0 18 24"}>
      {!animation ? (
        <>
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </>
      ) : (
        <>
          <mask id="mask">
            <g stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
export function DotsIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </Svg>
  );
}
export function CommandIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </Svg>
  );
}
export function CodeSquareIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path
        fillRule="evenodd"
        d="M3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464m10.024 2.982a.75.75 0 0 1 .53.918l-2.588 9.66a.75.75 0 0 1-1.449-.389l2.589-9.659a.75.75 0 0 1 .918-.53M14.97 8.47a.75.75 0 0 1 1.06 0l.209.208c.635.635 1.165 1.165 1.529 1.642c.384.504.654 1.036.654 1.68s-.27 1.176-.654 1.68c-.364.477-.894 1.007-1.53 1.642l-.208.208a.75.75 0 1 1-1.06-1.06l.171-.172c.682-.682 1.139-1.14 1.434-1.528c.283-.37.347-.586.347-.77s-.064-.4-.347-.77c-.295-.387-.752-.846-1.434-1.528l-.171-.172a.75.75 0 0 1 0-1.06m-7 0a.75.75 0 0 1 1.06 1.06l-.171.172c-.682.682-1.138 1.14-1.434 1.528c-.283.37-.346.586-.346.77s.063.4.346.77c.296.387.752.846 1.434 1.528l.172.172a.75.75 0 1 1-1.061 1.06l-.208-.208c-.636-.635-1.166-1.165-1.53-1.642c-.384-.504-.653-1.036-.653-1.68s.27-1.176.653-1.68c.364-.477.894-1.007 1.53-1.642z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
export function ShareSquareIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path d="M3.464 3.464C4.93 2 7.286 2 12 2c1.023 0 1.934 0 2.75.015c.004.57.223 1.14.659 1.576l1.159 1.159H14c-2.617 0-4.252 1.298-4.914 1.963L8.9 6.9l-.187.186C8.048 7.748 6.75 9.383 6.75 12v3a2.25 2.25 0 0 0 4.5 0v-3c0-1.02.488-1.576.637-1.725l.192-.19l.196-.198c.149-.149.705-.637 1.725-.637h2.568l-1.159 1.159a2.25 2.25 0 1 0 3.182 3.182l3.405-3.405q.005.843.004 1.814c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536" />
      <path
        fillRule="evenodd"
        d="M16.47 1.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06l3.72-3.72H14c-1.552 0-2.467.757-2.788 1.08l-.19.191l-.193.191c-.322.32-1.079 1.236-1.079 2.788v3a.75.75 0 0 1-1.5 0v-3c0-2.084 1.027-3.36 1.521-3.851l.19-.189l.188-.189C10.64 7.277 11.916 6.25 14 6.25h6.19l-3.72-3.72a.75.75 0 0 1 0-1.06"
        clipRule="evenodd"
      />
    </Svg>
  );
}
export function SafeSquareIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path d="M11.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0" />
      <path
        fillRule="evenodd"
        d="M3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464M6.75 7a.75.75 0 0 0-1.5 0v10a.75.75 0 0 0 1.5 0zm3.78.47a.75.75 0 1 0-1.06 1.06l1.401 1.402A3.73 3.73 0 0 0 10.25 12c0 .764.229 1.475.621 2.068L9.47 15.47a.75.75 0 1 0 1.06 1.06l1.402-1.401A3.73 3.73 0 0 0 14 15.75c.764 0 1.475-.229 2.068-.621l1.402 1.401a.75.75 0 1 0 1.06-1.06l-1.401-1.402A3.73 3.73 0 0 0 17.75 12c0-.764-.229-1.475-.621-2.068L18.53 8.53a.75.75 0 0 0-1.06-1.06l-1.402 1.4A3.73 3.73 0 0 0 14 8.25c-.764 0-1.475.229-2.068.621z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
export function TuningIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path d="M10 17.25a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5M15.25 8a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0" />
      <path
        fillRule="evenodd"
        d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12m8 6.75a2.75 2.75 0 1 1 0-5.5a2.75 2.75 0 0 1 0 5.5M16.75 8a2.75 2.75 0 1 1-5.5 0a2.75 2.75 0 0 1 5.5 0m-3.5 8a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75M10 7.25a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1 0-1.5zM4.25 16a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75M19 7.25a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1 0-1.5z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
export function FileIcon({ arrow, ...props }: SvgProps<{ arrow?: boolean }>) {
  return (
    <Svg {...props} currentFill="fill">
      <path d="m19.352 7.617l-3.96-3.563c-1.127-1.015-1.69-1.523-2.383-1.788L13 5c0 2.357 0 3.536.732 4.268S15.643 10 18 10h3.58c-.362-.704-1.012-1.288-2.228-2.383" />
      {arrow ? (
        <path
          fillRule="evenodd"
          d="M10 22h4c3.771 0 5.657 0 6.828-1.172S22 17.771 22 14v-.437c0-.873 0-1.529-.043-2.063h-4.052c-1.097 0-2.067 0-2.848-.105c-.847-.114-1.694-.375-2.385-1.066c-.692-.692-.953-1.539-1.067-2.386c-.105-.781-.105-1.75-.105-2.848l.01-2.834q0-.124.02-.244C11.121 2 10.636 2 10.03 2C6.239 2 4.343 2 3.172 3.172C2 4.343 2 6.229 2 10v4c0 3.771 0 5.657 1.172 6.828S6.229 22 10 22m-.328-3.487l1.875-2a.75.75 0 0 0 0-1.026l-1.875-2a.75.75 0 0 0-1.094 1.026l.69.737H6a.75.75 0 0 0 0 1.5h3.269l-.691.737a.75.75 0 0 0 1.094 1.026"
          clipRule="evenodd"
        />
      ) : (
        <path
          fillRule="evenodd"
          d="M14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14v-4c0-3.771 0-5.657 1.172-6.828S6.239 2 10.03 2c.606 0 1.091 0 1.5.017q-.02.12-.02.244l-.01 2.834c0 1.097 0 2.067.105 2.848c.114.847.375 1.694 1.067 2.386c.69.69 1.538.952 2.385 1.066c.781.105 1.751.105 2.848.105h4.052c.043.534.043 1.19.043 2.063V14c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22"
          clipRule="evenodd"
        />
      )}
    </Svg>
  );
}
export function FileCodeIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path d="m19.352 7.617l-3.96-3.563c-1.127-1.015-1.69-1.523-2.383-1.788L13 5c0 2.357 0 3.536.732 4.268S15.643 10 18 10h3.58c-.362-.704-1.012-1.288-2.228-2.383" />
      <path
        fillRule="evenodd"
        d="M10 22h4c3.771 0 5.657 0 6.828-1.172S22 17.771 22 14v-.437c0-.873 0-1.529-.043-2.063h-4.052c-1.097 0-2.067 0-2.848-.105c-.847-.114-1.694-.375-2.385-1.066c-.692-.692-.953-1.539-1.067-2.386c-.105-.781-.105-1.75-.105-2.848l.01-2.834q0-.124.02-.244C11.121 2 10.636 2 10.03 2C6.239 2 4.343 2 3.172 3.172C2 4.343 2 6.229 2 10v4c0 3.771 0 5.657 1.172 6.828S6.229 22 10 22m.97-6.53a.75.75 0 0 1 1.06 0l1 1a.75.75 0 0 1 0 1.06l-1 1a.75.75 0 1 1-1.06-1.06l.47-.47l-.47-.47a.75.75 0 0 1 0-1.06m-.268-1.207a.75.75 0 1 0-1.404-.526l-1.5 4a.75.75 0 1 0 1.404.526zM7.53 13.47a.75.75 0 0 1 0 1.06l-.47.47l.47.47a.75.75 0 1 1-1.06 1.06l-1-1a.75.75 0 0 1 0-1.06l1-1a.75.75 0 0 1 1.06 0"
        clipRule="evenodd"
      />
    </Svg>
  );
}
export function FolderFilesIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path
        fillRule="evenodd"
        d="M2.07 5.258C2 5.626 2 6.068 2 6.95V14c0 3.771 0 5.657 1.172 6.828S6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.172S22 17.771 22 14v-2.202c0-2.632 0-3.949-.77-4.804a3 3 0 0 0-.224-.225C20.151 6 18.834 6 16.202 6h-.374c-1.153 0-1.73 0-2.268-.153a4 4 0 0 1-.848-.352C12.224 5.224 11.816 4.815 11 4l-.55-.55c-.274-.274-.41-.41-.554-.53a4 4 0 0 0-2.18-.903C7.53 2 7.336 2 6.95 2c-.883 0-1.324 0-1.692.07A4 4 0 0 0 2.07 5.257M16.283 3c.365 0 .548 0 .702.02c1.018.14 1.828.943 2.014 1.98a5 5 0 0 0-.461-.081c-.64-.084-1.448-.084-2.45-.084h-.334c-.942 0-1.3-.005-1.625-.101a2.5 2.5 0 0 1-.542-.233c-.296-.17-.552-.428-1.218-1.118L12 3zM13 9.25a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
export function FolderOpenIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path
        fillRule="evenodd"
        d="M3.358 12.779c-.61.941-.358 2.25.145 4.868c.363 1.885.544 2.827 1.172 3.452q.246.244.544.429C5.982 22 6.995 22 9.022 22h6.956c2.027 0 3.04 0 3.803-.472q.298-.185.544-.429c.628-.625.81-1.567 1.172-3.452c.503-2.618.755-3.927.145-4.868a3 3 0 0 0-.57-.646c-.87-.735-2.279-.735-5.094-.735H9.022c-2.815 0-4.223 0-5.094.735a3 3 0 0 0-.57.646m6.337 4.402c0-.4.343-.723.765-.723h4.08c.422 0 .765.323.765.723s-.343.723-.765.723h-4.08c-.422 0-.765-.324-.765-.723"
        clipRule="evenodd"
      />
      <path
        d="M3.576 12.485q.16-.19.352-.352c.87-.735 2.279-.735 5.094-.735h6.956c2.815 0 4.223 0 5.094.735q.192.162.353.353v-2.73c0-.91 0-1.663-.086-2.264c-.09-.635-.286-1.197-.755-1.66a3 3 0 0 0-.242-.214c-.512-.408-1.125-.575-1.82-.652c-.669-.074-1.512-.074-2.545-.074h-.353c-.982 0-1.334-.006-1.653-.087a2.7 2.7 0 0 1-.536-.196c-.284-.14-.532-.351-1.227-.968l-.474-.42c-.2-.176-.335-.296-.48-.403a4.3 4.3 0 0 0-2.183-.803A8 8 0 0 0 8.414 2h-.117c-.64 0-1.063 0-1.43.061c-1.605.268-2.903 1.39-3.22 2.875c-.071.337-.071.724-.07 1.283z"
        opacity="0.5"
      />
    </Svg>
  );
}
export function FolderPathConnectIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path d="M2 20a.75.75 0 0 1 .75-.75h8.5V15h1.5v4.25h8.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 20" opacity="0.5" />
      <path
        fillRule="evenodd"
        d="M19 9.8V8.369c0-1.711 0-2.567-.539-3.123q-.075-.077-.157-.146c-.598-.5-1.52-.5-3.362-.5h-.262c-.808 0-1.211 0-1.588-.1a3 3 0 0 1-.594-.228c-.341-.177-.627-.442-1.198-.972l-.385-.358a6 6 0 0 0-.388-.344a2.9 2.9 0 0 0-1.526-.587C8.87 2 8.736 2 8.465 2c-.618 0-.927 0-1.184.045c-1.133.199-2.019 1.021-2.232 2.073C5 4.357 5 4.644 5 5.218V9.8c0 2.451 0 3.677.82 4.438C6.64 15 7.96 15 10.6 15h2.8c2.64 0 3.96 0 4.78-.761c.82-.762.82-1.988.82-4.439m-5.5-3.05a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      />
      <circle cx="12" cy="20" r="2" />
    </Svg>
  );
}
export function FolderSearchIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M11 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v4" />
      <circle cx="17" cy="17" r="3" />
      <path d="m21 21-1.5-1.5" />
    </Svg>
  );
}
export function SleepingSquareIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill" fillRule="evenodd" clipRule="evenodd">
      <path d="M16.375 4.65a.75.75 0 1 1-.75-1.3l3.464-2a.75.75 0 0 1 1.1.844l-.996 3.715l1.896-1.094a.75.75 0 1 1 .75 1.299l-3.464 2a.75.75 0 0 1-1.1-.844l.996-3.715zm-3.702 1.5a.75.75 0 1 1 .75-1.3l1.732 1a.75.75 0 0 1-.181 1.374l-.983.264l.164.095a.75.75 0 1 1-.75 1.299l-1.732-1a.75.75 0 0 1 .18-1.374l.984-.264z" />
      <path d="M13.975 3.02q-.087.18-.141.371a2.25 2.25 0 0 0-3.032 1.968a2.25 2.25 0 0 0 .12 3.822l1.733 1a2.25 2.25 0 0 0 3.357-1.663a2.25 2.25 0 0 0 3.113.894l1.782-1.028C21 9.61 21 11.116 21 13c0 4.714 0 7.071-1.465 8.535C18.072 23 15.715 23 11 23s-7.071 0-8.536-1.465C1 20.072 1 17.714 1 13s0-7.071 1.464-8.536C3.93 3 6.286 3 11 3c1.117 0 2.103 0 2.975.02m-.917 8.479a.75.75 0 1 0-1.116 1.002c.67.744 1.548 1.249 2.558 1.249s1.889-.505 2.558-1.248a.75.75 0 1 0-1.116-1.004c-.465.517-.965.752-1.442.752s-.977-.235-1.442-.751m-8.06-.057a.75.75 0 0 1 1.06.056c.465.517.965.752 1.442.752s.978-.235 1.442-.751a.75.75 0 1 1 1.116 1.002c-.67.744-1.548 1.249-2.558 1.249s-1.889-.505-2.558-1.248a.75.75 0 0 1 .056-1.06M12 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0" />
    </Svg>
  );
}
export function HomeIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill">
      <path
        d="M13.106 22h-2.212c-3.447 0-5.17 0-6.345-1.012s-1.419-2.705-1.906-6.093l-.279-1.937c-.38-2.637-.57-3.956-.029-5.083s1.691-1.813 3.992-3.183l1.385-.825C9.8 2.622 10.846 2 12 2s2.199.622 4.288 1.867l1.385.825c2.3 1.37 3.451 2.056 3.992 3.183s.35 2.446-.03 5.083l-.278 1.937c-.487 3.388-.731 5.081-1.906 6.093S16.553 22 13.106 22"
        opacity=".5"
      />
      <path d="M8.25 18a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75" />
    </Svg>
  );
}
export function CopyCheckIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
      <path d="M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
      <path d="M11 14l2 2l4 -4" />
    </Svg>
  );
}
export function CopyIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
      <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
    </Svg>
  );
}
const arrowMap = {
  down: ["M12 5l0 14", "M18 13l-6 6", "M6 13l6 6"],
  "down-left": ["M17 7l-10 10", "M16 17l-9 0l0 -9"],
  "down-right": ["M7 7l10 10", "M17 8l0 9l-9 0"],
  left: ["M5 12l14 0", "M5 12l6 6", "M5 12l6 -6"],
  right: ["M5 12l14 0", "M13 18l6 -6", "M13 6l6 6"],
  up: ["M12 5l0 14", "M18 11l-6 -6", "M6 11l6 -6"],
  "up-left": ["M7 7l10 10", "M16 7l-9 0l0 9"],
  "up-right": ["M17 7l-10 10", "M8 7l9 0l0 9"]
} as const;
export function ArrowIcon(_props: SvgProps<{ arrow?: keyof typeof arrowMap }>) {
  const { arrow = "up", ...props } = _props;
  return (
    <Svg {...props}>
      {arrowMap[arrow].map(d => (
        <path key={d} d={d} />
      ))}
    </Svg>
  );
}
const chevronMap = {
  up: ["M6 15l6 -6l6 6"],
  right: ["M9 6l6 6l-6 6"],
  down: ["M6 9l6 6l6 -6"],
  left: ["M15 6l-6 6l6 6"],
  "up-down": ["m7 9 5-5 5 5", "m7 15 5 5 5-5"],
  "left-right": ["m9 7-5 5 5 5", "m15 7 5 5-5 5"]
} as const;
export function ChevronIcon(_props: SvgProps<{ chevron?: keyof typeof chevronMap }>) {
  const { chevron = "up", ...props } = _props;
  return (
    <Svg {...props}>
      {chevronMap[chevron].map(d => (
        <path key={d} d={d} />
      ))}
    </Svg>
  );
}
const dirMap = {
  ltr: ["M17 21l2 -2l-2 -2"],
  rtl: ["M7 21l-2 -2l2 -2"]
} as const;
export function TextDirectionIcon({ dir = "ltr", ...props }: SvgProps<{ dir?: "ltr" | "rtl" }>) {
  return (
    <Svg {...props}>
      <path d="M5 19h14" />
      <path d="M14 15v-11" />
      <path d="M16 4h-6.5a3.5 3.5 0 0 0 0 7h.5" />
      <path d="M10 15v-11" />
      {dirMap[dir].map((i, _i) => (
        <path key={_i} d={i} />
      ))}
    </Svg>
  );
}
export function CircleIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    </Svg>
  );
}
export function ArrowSquareRoundRightIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m11.99,16.45l4.44-4.44-4.44-4.44" />
      <path d="m7.55,12.01h8.89" />
      <path d="m12,2c8,0,10,2,10,10s-2,10-10,10S2,20,2,12,4,2,12,2Z" />
    </Svg>
  );
}
export function ArrowSquareRoundLeftIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m12.01,7.57l-4.44,4.44,4.44,4.44" />
      <path d="m16.45,12.01H7.56" />
      <path d="m12,2c8,0,10,2,10,10s-2,10-10,10S2,20,2,12,4,2,12,2Z" />
    </Svg>
  );
}
export function ChevronCircleRightIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M11 9l3 3l-3 3" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0z" />
    </Svg>
  );
}
export function ChevronCircleLeftIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M13 15l-3 -3l3 -3" />
      <path d="M21 12a9 9 0 1 0 -18 0a9 9 0 0 0 18 0z" />
    </Svg>
  );
}
export function MoodCryIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M9 10l.01 0" />
      <path d="M15 10l.01 0" />
      <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
      <path d="M17.566 17.606a2 2 0 1 0 2.897 .03l-1.463 -1.636l-1.434 1.606z" />
      <path d="M20.865 13.517a8.937 8.937 0 0 0 .135 -1.517a9 9 0 1 0 -9 9c.69 0 1.36 -.076 2 -.222" />{" "}
    </Svg>
  );
}
export function MoodSadIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 10l.01 0" />
      <path d="M15 10l.01 0" />
      <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
    </Svg>
  );
}
export function MoodSmileIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 10l.01 0" />
      <path d="M15 10l.01 0" />
      <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
    </Svg>
  );
}
export function MoodCrazyHappyIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M7 8.5l3 3" />
      <path d="M7 11.5l3 -3" />
      <path d="M14 8.5l3 3" />
      <path d="M14 11.5l3 -3" />
      <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
    </Svg>
  );
}
export function MoodHappyIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 9l.01 0" />
      <path d="M15 9l.01 0" />
      <path d="M8 13a4 4 0 1 0 8 0h-8" />
    </Svg>
  );
}
export function GitBranchIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m6.8,4.4c0,1.33-1.08,2.4-2.4,2.4s-2.4-1.08-2.4-2.4,1.08-2.4,2.4-2.4,2.4,1.08,2.4,2.4Zm-2.4,12.79c-1.33,0-2.4,1.08-2.4,2.4s1.08,2.4,2.4,2.4,2.4-1.08,2.4-2.4-1.08-2.4-2.4-2.4ZM19.6,2c-1.33,0-2.4,1.08-2.4,2.4s1.08,2.4,2.4,2.4,2.4-1.08,2.4-2.4-1.08-2.4-2.4-2.4ZM4.4,6.8v10.39m0-1c0-1.33,1.09-2.18,2.4-2.4l10.39-1.79c1.31-.23,2.4-1.08,2.4-2.4v-2.79" />
    </Svg>
  );
}
export function GitCommitIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m16.5,12h5.5m-10-4.5c-2.49,0-4.5,2.01-4.5,4.5s2.01,4.5,4.5,4.5,4.5-2.01,4.5-4.5-2.01-4.5-4.5-4.5ZM2,12h5.5" />
    </Svg>
  );
}
export function GitPullRequestDraftIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m6.8,4.4c0,1.33-1.08,2.4-2.4,2.4s-2.4-1.08-2.4-2.4,1.08-2.4,2.4-2.4,2.4,1.08,2.4,2.4Zm-2.4,12.79c-1.33,0-2.4,1.08-2.4,2.4s1.08,2.4,2.4,2.4,2.4-1.08,2.4-2.4-1.08-2.4-2.4-2.4Zm0-10.39v10.39m15.2,0c-1.33,0-2.4,1.08-2.4,2.4s1.08,2.4,2.4,2.4,2.4-1.08,2.4-2.4-1.08-2.4-2.4-2.4Z" />
      <circle cx="19.6" cy="4.4" r="1" />
      <circle cx="19.6" cy="12" r="1" />
    </Svg>
  );
}
export function GitPullRequestIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m14.39,6.77l-2.39-2.39,2.39-2.39m5.21,15.2c-1.33,0-2.4,1.08-2.4,2.4s1.08,2.4,2.4,2.4,2.4-1.08,2.4-2.4-1.08-2.4-2.4-2.4Zm0,0V6.79c0-1.33-1.08-2.4-2.4-2.4h-5.2m-5.2.02c0,1.33-1.08,2.4-2.4,2.4s-2.4-1.08-2.4-2.4,1.08-2.4,2.4-2.4,2.4,1.08,2.4,2.4Zm-2.4,12.79c-1.33,0-2.4,1.08-2.4,2.4s1.08,2.4,2.4,2.4,2.4-1.08,2.4-2.4-1.08-2.4-2.4-2.4Zm0-10.39v10.39" />
    </Svg>
  );
}
export function PickColorIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M11 7l6 6" />
      <path d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" />
    </Svg>
  );
}
export function MinimizeIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
    </Svg>
  );
}
export function MaximizeIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </Svg>
  );
}
export function ChainIcon(props: SvgProps) {
  return (
    <Svg {...props} currentFill="fill" fillRule="evenodd" clipRule="evenodd">
      <path fill="none" stroke="currentColor" strokeDasharray="28" strokeDashoffset="28" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0">
        <animate fill="freeze" attributeName="stroke-dashoffset" dur="1s" values="28;0" />
      </path>
    </Svg>
  );
}
export function BrandCssFillIcon({ fill = "#639", ...props }: SvgProps) {
  return (
    <Svg currentFill="fill" {...{ fill, ...props }}>
      <path d="m19.48,1H1v18.48c0,1.94,1.58,3.52,3.52,3.52h14.96c1.94,0,3.52-1.58,3.52-3.52V4.52c0-1.94-1.58-3.52-3.52-3.52Zm-10.58,18.79c.51,0,.7-.51.66-1.08h1.63c.09,1.61-.92,2.55-2.35,2.53-1.39,0-2.27-.77-2.27-2.27v-3.7c0-1.47.95-2.27,2.38-2.27,1.41-.02,2.29.9,2.24,2.46h-1.63c.04-.59-.22-1.03-.66-1.01-.55,0-.7.37-.7,1.08v3.21c0,.68.22,1.01.7,1.03Zm5.1,1.45c-1.41,0-2.2-.97-2.22-2.53h1.52c.02.7.24,1.14.73,1.14s.66-.29.66-.95c0-.55-.24-.86-.84-1.14l-.57-.26c-1.01-.48-1.43-1.08-1.43-2.27,0-1.32.84-2.24,2.2-2.24s2.09.95,2.11,2.49h-1.47c0-.64-.13-1.08-.62-1.08-.44,0-.66.22-.66.77s.2.77.73.99l.53.24c1.12.53,1.61,1.21,1.61,2.49,0,1.52-.86,2.35-2.27,2.35Zm4.97,0c-1.41,0-2.2-.97-2.22-2.53h1.54c0,.7.24,1.14.7,1.14s.66-.29.66-.95c0-.55-.22-.86-.84-1.14l-.57-.26c-1.01-.48-1.41-1.08-1.41-2.27,0-1.32.81-2.24,2.2-2.24s2.07.95,2.11,2.49h-1.47c-.02-.64-.15-1.08-.64-1.08-.44,0-.64.22-.64.77s.18.77.7.99l.55.24c1.1.53,1.58,1.21,1.58,2.49,0,1.52-.86,2.35-2.27,2.35Z" />
    </Svg>
  );
}
export function BrandTypescriptFillIcon({ fill = "#3178c6", ...props }: SvgProps) {
  return (
    <Svg currentFill="fill" {...{ fill, ...props }}>
      <path d="m20.85,1H3.14c-1.18,0-2.14.97-2.14,2.15v17.71c0,1.18.96,2.14,2.14,2.14h17.71c1.18,0,2.15-.96,2.15-2.14V3.15c0-1.18-.97-2.15-2.15-2.15Zm-7.09,12.21h-2.76v7.86h-2.19v-7.86h-2.74v-1.76h7.69v1.76Zm7.13,6.47c-.21.36-.49.66-.84.88-.35.23-.75.39-1.22.49-.46.1-.95.15-1.47.15s-1.03-.05-1.51-.13c-.47-.09-.89-.23-1.24-.41v-2.15c.39.33.82.57,1.28.74.45.16.91.24,1.38.24.27,0,.51-.02.72-.07.2-.05.37-.12.51-.21.13-.08.24-.19.3-.31.07-.11.1-.24.1-.38,0-.19-.05-.36-.16-.51-.1-.14-.25-.28-.44-.41-.18-.12-.4-.24-.66-.36-.26-.12-.53-.23-.83-.36-.75-.31-1.31-.69-1.68-1.15-.37-.45-.56-.99-.56-1.64,0-.5.1-.93.31-1.29.2-.36.47-.66.82-.89.35-.23.75-.4,1.21-.51.45-.11.94-.17,1.45-.17s.95.03,1.33.09c.39.06.75.16,1.08.28v2.01c-.16-.11-.34-.21-.53-.3-.19-.08-.39-.15-.59-.21-.2-.05-.4-.09-.6-.12-.2-.03-.39-.04-.57-.04-.25,0-.47.02-.67.07s-.37.11-.51.2c-.14.08-.25.18-.33.3-.07.12-.11.26-.11.4,0,.16.04.31.13.44.08.12.2.25.36.36.16.11.35.23.57.34.23.11.48.22.76.34.39.16.73.33,1.04.51s.57.39.79.61c.22.23.39.49.51.79.11.29.17.63.17,1.02,0,.54-.1.99-.3,1.36Z" />
    </Svg>
  );
}
export function ClipboardCheckIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
      <path d="M9 14l2 2l4 -4" />
    </Svg>
  );
}
export function EmptyBoxIcon({ strokeWidth = 1, color = "currentColor", viewBox = "0 0 64 41", width = 64, height = 41, ...props }: SvgProps) {
  return (
    <Svg {...{ strokeWidth, viewBox, width, height, ...props }}>
      <path d="m42,.5h-20c-1.2,0-2.3.5-3,1.4l-10,11.4v9.2h46v-9.2L45,1.9c-.8-.9-1.9-1.4-3-1.4Z" fill="none" stroke={color} />
      <path d="m41.6,16.5c0-1.6,1-2.9,2.2-2.9h11.2v18.1c0,2.1-1.3,3.9-3,3.9H12c-1.6,0-3-1.7-3-3.9V13.6h11.2c1.2,0,2.2,1.3,2.2,2.9h0c0,1.6,1,2.9,2.2,2.9h14.8c1.2,0,2.2-1.3,2.2-2.9h0Z" fill="none" stroke={color} />
      <path d="m55,28.64v-15.04h-11.2c-1.2,0-2.2,1.3-2.2,2.9s-1,2.9-2.2,2.9h-14.8c-1.2,0-2.2-1.3-2.2-2.9s-1-2.9-2.2-2.9h-11.2v15.04c-5.57,1.26-9,2.97-9,4.86,0,3.87,14.33,7,32,7s32-3.13,32-7c0-1.89-3.43-3.6-9-4.86Z" fill={color} fillOpacity={0.25} strokeWidth={0} />
    </Svg>
  );
}
export function ArrowDownloadIcon({ animation, ...props }: SvgProps<{ animation?: boolean }>) {
  if (animation) {
    return (
      <Svg {...props}>
        <path strokeDasharray="2 4" strokeDashoffset="6" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9">
          <animate attributeName="stroke-dashoffset" dur="0.6s" repeatCount="indefinite" values="6;0" />
        </path>
        <path strokeDasharray="32" strokeDashoffset="32" d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9">
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.1s" dur="0.4s" values="32;0" />
        </path>
        <path strokeDasharray="10" strokeDashoffset="10" d="M12 8v7.5">
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="10;0" />
        </path>
        <path strokeDasharray="6" strokeDashoffset="6" d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5">
          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="6;0" />
        </path>
      </Svg>
    );
  }
  return (
    <Svg {...props}>
      <path strokeDasharray="64" strokeDashoffset="64" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z">
        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
      </path>
      <path strokeDasharray="12" strokeDashoffset="12" d="M12 7l0 9.5">
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="12;0" />
      </path>
      <path strokeDasharray="8" strokeDashoffset="8" d="M12 17l4 -4M12 17l-4 -4">
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="8;0" />
      </path>
    </Svg>
  );
}
export function SlashIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M17 4l-9 17" />
    </Svg>
  );
}
export function CircleDotIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12,6.48,2,12,2Zm0,6c2.21,0,4,1.79,4,4s-1.79,4-4,4-4-1.79-4-4,1.79-4,4-4Zm0,1c1.66,0,3,1.34,3,3s-1.34,3-3,3-3-1.34-3-3,1.34-3,3-3Zm0,1c1.1,0,2,.9,2,2s-.9,2-2,2-2-.9-2-2,.9-2,2-2Zm0,1c.55,0,1,.45,1,1s-.45,1-1,1-1-.45-1-1,.45-1,1-1Z" />
    </Svg>
  );
}
export function HasCopyIcon({ has, ...props }: SvgProps<{ has?: boolean }>) {
  return has ? <CheckIcon animation className="animate-fade-in fade-in-0 zoom-in-0 [animation-duration:150ms]" {...props} /> : <CopyIcon {...props} />;
}
const textMap = {
  png: ["M4.75 15.25V12.25M4.75 12.25V8.75H6.25C6.80228 8.75 7.25 9.19772 7.25 9.75V11.25C7.25 11.8023 6.80228 12.25 6.25 12.25H4.75Z", "M9.75 15.25V8.75L13.25 15.25V8.75", "M19.25 8.75H17.75C16.6454 8.75 15.75 9.64543 15.75 10.75V13.25C15.75 14.3546 16.6454 15.25 17.75 15.25H19.25V12.25H17.75"],
  svg: [
    "M7.25 8.75H6.5C5.5335 8.75 4.75 9.5335 4.75 10.5V11C4.75 11.6904 5.30964 12.25 6 12.25V12.25C6.69036 12.25 7.25 12.8096 7.25 13.5V13.75C7.25 14.5784 6.57843 15.25 5.75 15.25H4.75",
    "M18 12.75H18.25C18.8023 12.75 19.25 13.1977 19.25 13.75V14.25C19.25 14.8023 18.8023 15.25 18.25 15.25H16.75C16.1977 15.25 15.75 14.8023 15.75 14.25V11.25V9.75C15.75 9.19772 16.1977 8.75 16.75 8.75H18.25C18.8023 8.75 19.25 9.19772 19.25 9.75V10.25",
    "M9.75 8.75L11.5 15.25L13.25 8.75"
  ]
} as const;
export function TextIcon({ icon, ...props }: SvgProps<{ icon: keyof typeof textMap }>) {
  return (
    <Svg {...props} stroke={1.5}>
      {textMap[icon].map((i, _i) => (
        <path key={_i} d={i} />
      ))}
    </Svg>
  );
}
export function CircleArrowIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path strokeDasharray="36" strokeDashoffset="36" d="M12 5c-3.87 0 -7 3.13 -7 7c0 3.87 3.13 7 7 7c3.87 0 7 -3.13 7 -7">
        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="36;0" />
      </path>
      <path strokeDasharray="12" strokeDashoffset="12" d="M13 11l7 -7">
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="12;0" />
      </path>
      <path strokeDasharray="8" strokeDashoffset="8" d="M21 3h-6M21 3v6">
        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="8;0" />
      </path>
    </Svg>
  );
}
