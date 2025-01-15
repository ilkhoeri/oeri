import { Svg, SvgProps } from "@/ui/svg";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";

const codes = {
  usage:
    'import { Svg, SvgProps } from "@/ui/svg";\n\nexport function SvgDemo({ viewBox = "0 0 94.2 24", size = 64, ...props }: SvgProps) {\n  return (\n    <Svg currentFill="fill" ratio={{ w: 3.925 /* result from viewBox: 94.2 divided by 24 */ }} {...{ viewBox, size, ...props }}>\n      <rect x="88.58" y="0" width="5.62" height="24" rx="2.81" ry="2.81" />\n      <path d="m68.63,21.19c0,1.55,1.26,2.81,2.81,2.81h0c1.55,0,2.81-1.26,2.81-2.81v-9.05c0-3.6,2.92-6.51,6.51-6.51h0c1.55,0,2.81-1.26,2.81-2.81h0C83.58,1.26,82.32,0,80.76,0h0c-6.7,0-12.14,5.43-12.14,12.14v9.05Z" />\n      <path d="m51.63,18.38c-4.01,0-7.16-3.71-6.2-7.88.53-2.3,2.39-4.16,4.69-4.69,3.12-.72,5.98.86,7.23,3.38h-6.47c-1.56,0-2.82,1.26-2.82,2.82h0c0,1.56,1.26,2.82,2.82,2.82h9.93c1.52,0,2.81-1.2,2.82-2.72s-.26-2.98-.94-4.56C60.81,3.19,56.6.1,51.87,0c-7.01-.14-12.68,5.73-12.22,12.8.36,5.55,4.68,10.28,10.19,11.07,2.34.34,4.58,0,6.54-.85,2.77-1.2,1.82-5.39-1.2-5.39h0c-.41,0-.8.11-1.18.26-.73.31-1.53.49-2.38.49Z" />\n      <circle cx="22.63" cy="12" r="2.81" />\n      <path d="m14.56,13.82c.98-.41,1.63-1.34,1.72-2.4.21-2.28,1.64-4.38,3.9-5.31s4.75-.47,6.52,1c.82.68,1.93.88,2.91.48h0c1.91-.79,2.38-3.35.8-4.7C27.11.04,22.35-.87,18.04.91s-7.03,5.8-7.37,10.15c-.16,2.07,1.98,3.55,3.89,2.76h0Z" />\n      <path d="m30.7,10.18c-.98.41-1.63,1.34-1.72,2.4-.21,2.28-1.64,4.38-3.9,5.31s-4.75.47-6.52-1c-.82-.68-1.93-.88-2.91-.48h0c-1.91.79-2.38,3.35-.8,4.7,3.32,2.84,8.07,3.75,12.39,1.97s7.03-5.8,7.37-10.15c.16-2.07-1.98-3.55-3.89-2.76h0Z" />\n    </Svg>\n  );\n}',
  configurator:
    'import { Svg, type SvgProps } from "@/ui/svg";\n\nconst arrowMap = {\n  down: ["M12 5l0 14", "M18 13l-6 6", "M6 13l6 6"],\n  "down-left": ["M17 7l-10 10", "M16 17l-9 0l0 -9"],\n  "down-right": ["M7 7l10 10", "M17 8l0 9l-9 0"],\n  left: ["M5 12l14 0", "M5 12l6 6", "M5 12l6 -6"],\n  right: ["M5 12l14 0", "M13 18l6 -6", "M13 6l6 6"],\n  up: ["M12 5l0 14", "M18 11l-6 -6", "M6 11l6 -6"],\n  "up-left": ["M7 7l10 10", "M16 7l-9 0l0 9"],\n  "up-right": ["M17 7l-10 10", "M8 7l9 0l0 9"]\n} as const;\n\nexport function ArrowIcon(_props: SvgProps<{ arrow?: keyof typeof arrowMap }>) {\n  const { arrow = "up", ...props } = _props;\n  return (\n    <Svg {...props}>\n      {arrowMap[arrow].map(d => (\n        <path key={d} d={d} />\n      ))}\n    </Svg>\n  );\n}\n\nexport function SvgDemo() {\n  return <ArrowIcon{{props}} />;\n}'
};

function Demo({ viewBox = "0 0 94.2 24", size = 64, ...props }: SvgProps) {
  return (
    <Svg currentFill="fill" ratio={{ w: 3.925 /* result from viewBox: 94.2 divided by 24 */ }} {...{ viewBox, size, ...props }}>
      <rect x="88.58" y="0" width="5.62" height="24" rx="2.81" ry="2.81" />
      <path d="m68.63,21.19c0,1.55,1.26,2.81,2.81,2.81h0c1.55,0,2.81-1.26,2.81-2.81v-9.05c0-3.6,2.92-6.51,6.51-6.51h0c1.55,0,2.81-1.26,2.81-2.81h0C83.58,1.26,82.32,0,80.76,0h0c-6.7,0-12.14,5.43-12.14,12.14v9.05Z" />
      <path d="m51.63,18.38c-4.01,0-7.16-3.71-6.2-7.88.53-2.3,2.39-4.16,4.69-4.69,3.12-.72,5.98.86,7.23,3.38h-6.47c-1.56,0-2.82,1.26-2.82,2.82h0c0,1.56,1.26,2.82,2.82,2.82h9.93c1.52,0,2.81-1.2,2.82-2.72s-.26-2.98-.94-4.56C60.81,3.19,56.6.1,51.87,0c-7.01-.14-12.68,5.73-12.22,12.8.36,5.55,4.68,10.28,10.19,11.07,2.34.34,4.58,0,6.54-.85,2.77-1.2,1.82-5.39-1.2-5.39h0c-.41,0-.8.11-1.18.26-.73.31-1.53.49-2.38.49Z" />
      <circle cx="22.63" cy="12" r="2.81" />
      <path d="m14.56,13.82c.98-.41,1.63-1.34,1.72-2.4.21-2.28,1.64-4.38,3.9-5.31s4.75-.47,6.52,1c.82.68,1.93.88,2.91.48h0c1.91-.79,2.38-3.35.8-4.7C27.11.04,22.35-.87,18.04.91s-7.03,5.8-7.37,10.15c-.16,2.07,1.98,3.55,3.89,2.76h0Z" />
      <path d="m30.7,10.18c-.98.41-1.63,1.34-1.72,2.4-.21,2.28-1.64,4.38-3.9,5.31s-4.75.47-6.52-1c-.82-.68-1.93-.88-2.91-.48h0c-1.91.79-2.38,3.35-.8,4.7,3.32,2.84,8.07,3.75,12.39,1.97s7.03-5.8,7.37-10.15c.16-2.07-1.98-3.55-3.89-2.76h0Z" />
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

function ConfiguratorDemo(props: React.ComponentProps<typeof ArrowIcon>) {
  return <ArrowIcon {...props} />;
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage
};

const configurator: DataTrees = {
  type: "configurator",
  component: ConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  controls: [
    {
      prop: "arrow",
      type: "select",
      initialValue: "up",
      libraryValue: "up",
      data: ["down", "down-left", "down-right", "left", "right", "up", "up-left", "up-right"]
    },
    { prop: "currentFill", type: "select", initialValue: "stroke", libraryValue: "stroke", data: ["stroke", "fill", "fill-stroke"] },
    { prop: "size", type: "number", initialValue: 16, libraryValue: 16, min: 6, max: 46 },
    { prop: "color", type: "color", initialValue: "currentColor", libraryValue: "currentColor" }
  ]
};

export const SvgDemos = {
  usage,
  configurator
};
