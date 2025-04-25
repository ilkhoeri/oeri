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
      <path
        fillRule="evenodd"
        d="M2 16.144V4.998c0-1.098.886-1.99 1.982-1.923c.977.06 2.131.179 3.018.413c1.05.276 2.296.866 3.282 1.388A3.5 3.5 0 0 0 12 5.275v15.2a3.46 3.46 0 0 1-1.628-.406c-1-.532-2.29-1.15-3.372-1.435c-.877-.232-2.016-.35-2.985-.411C2.906 18.153 2 17.255 2 16.143"
        clipRule="evenodd"
        opacity="0.5"
      />
      <path d="M22 16.144V4.934c0-1.073-.846-1.953-1.918-1.916c-1.129.04-2.535.156-3.582.47c-.908.271-1.965.816-2.826 1.315A3.5 3.5 0 0 1 12 5.275v15.2c.56 0 1.121-.136 1.628-.406c1-.532 2.29-1.15 3.372-1.435c.877-.232 2.016-.35 2.985-.411c1.109-.07 2.015-.968 2.015-2.08" />
      <path d="M4.273 12.818a.75.75 0 0 1 .91-.545l4 1a.75.75 0 1 1-.365 1.455l-4-1a.75.75 0 0 1-.545-.91m.909-4.545a.75.75 0 1 0-.364 1.455l4 1a.75.75 0 0 0 .364-1.455z" />
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
export function AppsIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m2,3.25c0-.69.56-1.25,1.25-1.25h5c.69,0,1.25.56,1.25,1.25v5c0,.69-.56,1.25-1.25,1.25H3.25c-.69,0-1.25-.56-1.25-1.25V3.25Z" />
      <path d="m2,15.75c0-.69.56-1.25,1.25-1.25h5c.69,0,1.25.56,1.25,1.25v5c0,.69-.56,1.25-1.25,1.25H3.25c-.69,0-1.25-.56-1.25-1.25v-5Z" />
      <path d="m14.5,15.75c0-.69.56-1.25,1.25-1.25h5c.69,0,1.25.56,1.25,1.25v5c0,.69-.56,1.25-1.25,1.25h-5c-.69,0-1.25-.56-1.25-1.25v-5Z" />
      <path d="m14.5,5.75h7.5" />
      <path d="m18.25,2v7.5" />
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
export function FileIcon({ arrow, ...props }: SvgProps & { arrow?: boolean }) {
  return (
    <Svg {...props}>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      {arrow && (
        <>
          <path d="M15 11l-5 5" />
          <path d="M15 16v-5h-5" />
        </>
      )}
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
export function ComponentsIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M15.5 9L15.6716 9.17157C17.0049 10.5049 17.6716 11.1716 17.6716 12C17.6716 12.8284 17.0049 13.4951 15.6716 14.8284L15.5 15" />
      <path d="M13.2939 7.17041L11.9998 12L10.7058 16.8297" />
      <path d="M8.50019 9L8.32861 9.17157C6.99528 10.5049 6.32861 11.1716 6.32861 12C6.32861 12.8284 6.99528 13.4951 8.32861 14.8284L8.50019 15" />
      <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" />
    </Svg>
  );
}
export function Components2Icon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M5.5 15.5C5.5 14.5572 5.5 14.0858 5.79289 13.7929C6.08579 13.5 6.55719 13.5 7.5 13.5H8.5C9.44281 13.5 9.91421 13.5 10.2071 13.7929C10.5 14.0858 10.5 14.5572 10.5 15.5V16.5C10.5 17.4428 10.5 17.9142 10.2071 18.2071C9.91421 18.5 9.44281 18.5 8.5 18.5C7.08579 18.5 6.37868 18.5 5.93934 18.0607C5.5 17.6213 5.5 16.9142 5.5 15.5Z" />
      <path d="M5.5 8.5C5.5 7.08579 5.5 6.37868 5.93934 5.93934C6.37868 5.5 7.08579 5.5 8.5 5.5C9.44281 5.5 9.91421 5.5 10.2071 5.79289C10.5 6.08579 10.5 6.55719 10.5 7.5V8.5C10.5 9.44281 10.5 9.91421 10.2071 10.2071C9.91421 10.5 9.44281 10.5 8.5 10.5H7.5C6.55719 10.5 6.08579 10.5 5.79289 10.2071C5.5 9.91421 5.5 9.44281 5.5 8.5Z" />
      <path d="M13.5 15.5C13.5 14.5572 13.5 14.0858 13.7929 13.7929C14.0858 13.5 14.5572 13.5 15.5 13.5H16.5C17.4428 13.5 17.9142 13.5 18.2071 13.7929C18.5 14.0858 18.5 14.5572 18.5 15.5C18.5 16.9142 18.5 17.6213 18.0607 18.0607C17.6213 18.5 16.9142 18.5 15.5 18.5C14.5572 18.5 14.0858 18.5 13.7929 18.2071C13.5 17.9142 13.5 17.4428 13.5 16.5V15.5Z" />
      <path d="M13.5 7.5C13.5 6.55719 13.5 6.08579 13.7929 5.79289C14.0858 5.5 14.5572 5.5 15.5 5.5C16.9142 5.5 17.6213 5.5 18.0607 5.93934C18.5 6.37868 18.5 7.08579 18.5 8.5C18.5 9.44281 18.5 9.91421 18.2071 10.2071C17.9142 10.5 17.4428 10.5 16.5 10.5H15.5C14.5572 10.5 14.0858 10.5 13.7929 10.2071C13.5 9.91421 13.5 9.44281 13.5 8.5V7.5Z" />
      <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" />
    </Svg>
  );
}
export function IconsIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 6.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" />
      <path d="M2.5 21h8l-4 -7z" />
      <path d="M14 3l7 7" />
      <path d="M14 10l7 -7" />
      <path d="M14 14h7v7h-7z" />
    </Svg>
  );
}
export function WebhookIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M4.876 13.61a4 4 0 1 0 6.124 3.39h6" />
      <path d="M15.066 20.502a4 4 0 1 0 1.934 -7.502c-.706 0 -1.424 .179 -2 .5l-3 -5.5" />
      <path d="M16 8a4 4 0 1 0 -8 0c0 1.506 .77 2.818 2 3.5l-3 5.5" />
      <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" />
    </Svg>
  );
}
export function UtilityIcon(props: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M8.99953 13C8.33953 13.33 7.78953 13.82 7.37953 14.43C7.14953 14.78 7.14953 15.22 7.37953 15.57C7.78953 16.18 8.33953 16.67 8.99953 17" />
      <path d="M15.2109 13C15.8709 13.33 16.4209 13.82 16.8309 14.43C17.0609 14.78 17.0609 15.22 16.8309 15.57C16.4209 16.18 15.8709 16.67 15.2109 17" />
      <path d="M2.23047 8.01L21.4505 8" />
      <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" />
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
