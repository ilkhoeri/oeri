"use client";
import React from "react";
import { Svg } from "@/ui/svg";
import { RangeSlider, Slider, type SliderProps } from "@/ui/slider";
import { Typography } from "@/ui/typography";
import { useApp as useAppContext } from "@/modules/web/configuration/app-context";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { MoonStarIcon, StarIcon, SunIcon } from "@/icons/*";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { Slider } from "@/ui/slider";\nimport { Svg } from "@/ui/svg";\nimport { Typography } from "@/ui/typography";\nimport { useApp as useAppContext } from "@/config/app-context";\n\nconst INITIAL_VALUES: number = 35;\nconst marks = [\n  { value: 41, label: "25%" },\n  { value: 66, label: "50%" },\n  { value: 91, label: "75%" }\n];\n\nexport function SliderDemo() {\n  const ctx = useAppContext();\n  const [value, setValue] = useState<number>(INITIAL_VALUES);\n  const [endValue, setEndValue] = useState<number>(INITIAL_VALUES);\n\n  return (\n    <div className="flex size-full max-w-96 flex-col items-center justify-center [&_svg]:mr-auto [&_svg]:rtl:ml-auto [&_svg]:rtl:mr-0">\n      <Slider dir={ctx.dir} value={value} onChange={setValue} onChangeEnd={setEndValue} marks={marks} min={16} max={116} />\n\n      <hr className="mt-14 w-full border-t border-border" />\n\n      <Typography prose="span">\n        onChange value: <b>{value}</b>\n      </Typography>\n      <Svg size={value} currentFill="fill" role="img" fill="#149eca">\n        <circle cx="12" cy="12" r="2.1" />\n        <path d="m19.62,8.19c-.19-.09-.39-.17-.59-.25.03-.22.06-.43.08-.64.24-2.38-.33-4.09-1.61-4.83-1.28-.74-3.05-.38-4.99,1.02-.17.12-.34.25-.51.39-.17-.14-.34-.27-.51-.39-1.94-1.4-3.71-1.76-4.99-1.02-1.28.74-1.85,2.45-1.61,4.83.02.21.05.42.08.64-.2.08-.4.16-.59.25-2.18.98-3.38,2.33-3.38,3.81s1.2,2.83,3.38,3.81c.19.09.39.17.59.25-.03.22-.06.43-.08.64-.24,2.38.33,4.09,1.61,4.83.43.25.92.37,1.46.37,1.04,0,2.25-.47,3.53-1.39.17-.12.34-.25.51-.39.17.14.34.27.51.39,1.28.92,2.49,1.39,3.53,1.39.53,0,1.02-.12,1.46-.37,1.28-.74,1.85-2.45,1.61-4.83-.02-.21-.05-.42-.08-.64.2-.08.4-.16.59-.25,2.18-.98,3.38-2.33,3.38-3.81s-1.2-2.83-3.38-3.81Zm-6.5-3.85c1.09-.79,2.1-1.19,2.92-1.19.35,0,.67.08.94.23.89.51,1.29,1.9,1.09,3.82-.01.13-.03.26-.05.39-.96-.29-2-.51-3.1-.65-.67-.88-1.38-1.68-2.11-2.36.11-.08.21-.16.32-.24Zm-6.36,8.98c.22.43.45.87.7,1.3.25.43.51.85.78,1.25-.73-.13-1.43-.3-2.07-.5.15-.66.35-1.35.6-2.05Zm-.6-4.69c.65-.2,1.34-.37,2.07-.5-.27.4-.53.82-.78,1.25-.25.43-.48.86-.7,1.3-.25-.7-.46-1.38-.6-2.05Zm1.14,3.37c.31-.7.67-1.4,1.07-2.1.4-.69.83-1.36,1.28-1.97.76-.08,1.55-.12,2.35-.12s1.59.04,2.35.12c.45.62.88,1.28,1.28,1.97.4.69.76,1.4,1.07,2.1-.31.7-.67,1.4-1.07,2.1-.4.69-.83,1.36-1.28,1.97-.76.08-1.55.12-2.35.12s-1.59-.04-2.35-.12c-.45-.62-.88-1.28-1.28-1.97-.4-.69-.76-1.4-1.07-2.1Zm9.24,2.62c.25-.43.48-.86.7-1.3.25.7.46,1.38.6,2.05-.65.2-1.34.37-2.07.5.27-.4.53-.82.78-1.25Zm.7-3.94c-.22-.43-.45-.87-.7-1.3-.25-.43-.51-.85-.78-1.25.73.13,1.43.3,2.07.5-.15.66-.35,1.35-.6,2.05Zm-5.23-5.42c.5.46.99.98,1.47,1.55-.48-.03-.98-.05-1.47-.05s-.99.02-1.47.05c.48-.57.97-1.09,1.47-1.55Zm-4.98-1.88c.27-.15.58-.23.94-.23.81,0,1.83.41,2.92,1.19.11.08.21.16.32.24-.73.68-1.44,1.48-2.11,2.36-1.1.14-2.15.36-3.1.65-.02-.13-.03-.26-.05-.39-.19-1.91.21-3.3,1.09-3.82Zm-2.22,11.47c-1.75-.79-2.76-1.83-2.76-2.86s1.01-2.07,2.76-2.86c.12-.05.24-.11.37-.16.22.97.56,1.99.99,3.01-.43,1.02-.76,2.04-.99,3.01-.12-.05-.25-.1-.37-.16Zm6.07,4.8c-1.56,1.12-2.96,1.47-3.85.96-.89-.51-1.29-1.9-1.09-3.82.01-.13.03-.26.05-.39.96.29,2,.51,3.1.65.67.88,1.38,1.68,2.11,2.36-.11.08-.21.16-.32.24Zm1.12-.92c-.5-.46-.99-.98-1.47-1.55.48.03.98.05,1.47.05s.99-.02,1.47-.05c-.48.57-.97,1.09-1.47,1.55Zm4.98,1.88c-.89.51-2.29.16-3.85-.96-.11-.08-.21-.16-.32-.24.73-.68,1.44-1.48,2.11-2.36,1.1-.14,2.15-.36,3.1-.65.02.13.03.26.05.39.19,1.91-.21,3.3-1.09,3.82Zm2.22-5.76c-.12.05-.24.11-.37.16-.22-.97-.56-1.99-.99-3.01.43-1.02.76-2.04.99-3.01.12.05.25.1.37.16,1.75.79,2.76,1.83,2.76,2.86s-1.01,2.07-2.76,2.86Z" />\n      </Svg>\n\n      <Typography prose="span">\n        onChangeEnd value: <b>{endValue}</b>\n      </Typography>\n      <Svg size={endValue} currentFill="fill" role="img">\n        <path d="m11.61,1c-.16,0-.28,0-.33,0-.05,0-.2.02-.33.03-3.12.28-6.05,1.97-7.91,4.56-1.03,1.44-1.69,3.07-1.94,4.81-.09.6-.1.78-.1,1.6s.01,1,.1,1.6c.6,4.13,3.54,7.6,7.52,8.89.71.23,1.47.39,2.32.48.33.04,1.77.04,2.11,0,1.48-.16,2.73-.53,3.96-1.16.19-.1.23-.12.2-.14-.02-.01-.82-1.09-1.79-2.4l-1.76-2.38-2.2-3.26c-1.21-1.79-2.21-3.26-2.22-3.26,0,0-.02,1.45-.02,3.22,0,3.1,0,3.22-.05,3.3-.06.11-.1.15-.19.2-.07.03-.13.04-.45.04h-.37l-.1-.06c-.06-.04-.11-.09-.14-.16l-.05-.1v-4.31s.01-4.31.01-4.31l.07-.08s.11-.1.16-.13c.09-.04.12-.05.49-.05.44,0,.51.02.63.14.03.03,1.23,1.83,2.65,4,1.45,2.19,2.89,4.38,4.34,6.57l1.74,2.64.09-.06c.78-.51,1.61-1.23,2.26-1.98,1.39-1.6,2.29-3.55,2.59-5.62.09-.6.1-.78.1-1.6s-.01-1-.1-1.6c-.6-4.13-3.54-7.6-7.52-8.89-.7-.23-1.45-.38-2.29-.48-.15-.02-.99-.03-1.48-.03h0Zm3.73,6.62c.32,0,.37,0,.45.04.1.05.19.15.22.25.02.06.02,1.25.02,3.95v3.87s-.69-1.05-.69-1.05l-.68-1.05v-2.81c0-1.82,0-2.84.02-2.89.03-.12.11-.22.21-.27.09-.05.12-.05.46-.05h0Z" />\n      </Svg>\n    </div>\n  );\n}',
  configurator:
    '"use client";\nimport React from "react";\nimport { Slider } from "@/ui/slider";\nimport { Typography } from "@/ui/typography";\nimport { useApp as useAppContext } from"@/config/app-context";\n\nconst marks = [\n  { value: 25, label: "25%" },\n  { value: 50, label: "50%" },\n  { value: 75, label: "75%" }\n];\n\nexport function SliderDemo() {\n  const ctx = useAppContext();\n  const [value, setValue] = React.useState(35);\n  const [endValue, setEndValue] = React.useState(35);\n\n  return (\n    <div className="flex size-full max-w-96 flex-col items-center justify-center">\n      <Slider\n        {{props}}\n        dir={ctx.dir}\n        defaultValue={35}\n        value={value}\n        onChange={setValue}\n        onChangeEnd={setEndValue}\n        marks={marks}\n      />\n      <Typography prose="span">\n        onChange value: <b>{value}</b>\n      </Typography>\n      <Typography prose="span">\n        onChangeEnd value: <b>{endValue}</b>\n      </Typography>\n    </div>\n  );\n}',
  inverted:
    "import { RangeSlider, Slider } from '@/ui/slider';\n\nexport function SliderInvertedDemo() {\n  return (\n    <div className=\"flex size-full max-w-96 flex-col items-center justify-center gap-10\">\n      <Slider inverted defaultValue={80} />\n      <RangeSlider inverted defaultValue={[40, 80]} />\n    </div>\n  );\n}",
  label:
    '"use client";\nimport React from "react";\nimport { Slider } from "@/ui/slider";\nimport { useApp as useAppContext } from "@/config/app-context";\nimport { Typography } from "@/ui/typography";\n\nexport function SliderLabelDemo() {\n  const ctx = useAppContext();\n  return (\n    <div className="mb-12 flex size-full max-w-96 flex-col items-center justify-center [&>span:not(:first-of-type)]:mt-6">\n      <Typography prose="span">No label</Typography>\n      <Slider dir={ctx.dir} defaultValue={40} label={null} />\n\n      <Typography prose="span">Formatted label</Typography>\n      <Slider dir={ctx.dir} defaultValue={40} label={(value) => `${value} °C`} />\n\n      <Typography prose="span">Label always visible</Typography>\n      <Slider dir={ctx.dir} defaultValue={40} labelAlwaysOn />\n\n      <Typography prose="span">Custom label transition</Typography>\n      <Slider dir={ctx.dir} defaultValue={40} labelTransitionProps={{ transition: "skew-down", duration: 150, timingFunction: "linear" }} />\n    </div>\n  );\n}',
  marks:
    'import { Slider, RangeSlider } from \'@/ui/slider\';\nimport { Typography } from "@/ui/typography";\n\nconst marks = [\n  { value: 0, label: "xs" },\n  { value: 25, label: "sm" },\n  { value: 50, label: "md" },\n  { value: 75, label: "lg" },\n  { value: 100, label: "xl" }\n];\n\nexport function SliderMarksDemo() {\n  return (\n    <div className="m-auto mb-12 flex size-full flex-col items-center justify-center [&>*]:max-w-96">\n      <Typography prose="span">Marks</Typography>\n      <Slider defaultValue={40} marks={[{ value: 10 }, { value: 40 }, { value: 95 }]} />\n      <Slider defaultValue={40} marks={marks} className="mt-6" />\n      <RangeSlider defaultValue={[20, 80]} marks={[{ value: 20, label: "20%" }, { value: 50, label: "50%" }, { value: 80, label: "80%" }]} className="mt-6" />\n\n      <Typography prose="span" className="mt-10">Restrict selection to marks</Typography>\n      <Slider restrictToMarks defaultValue={25} marks={Array.from({ length: 5 }).map((_, index) => ({ value: index * 25 }))} />\n\n      <Typography prose="span" className="mt-6">Disabled</Typography>\n      <Slider defaultValue={60} disabled />\n      <RangeSlider disabled defaultValue={[25, 75]} marks={marks} className="mt-6" />\n    </div>\n  );\n}',
  scale:
    'import { RangeSlider, Slider } from \'@/ui/slider\';\n\nconst getScale = (v: number) => 2 ** v;\nfunction valueLabelFormat(value: number) {\n  const units = ["KB", "MB", "GB", "TB"];\n  let unitIndex = 0;\n  let scaledValue = value;\n  while (scaledValue >= 1024 && unitIndex < units.length - 1) {\n    unitIndex += 1;\n    scaledValue /= 1024;\n  }\n  return `${scaledValue} ${units[unitIndex]}`;\n}\n\nexport function SliderScaleDemo() {\n  return (\n    <div className="flex size-full max-w-96 flex-col items-center justify-center gap-12 py-8">\n      <Slider scale={getScale} step={1} min={2} max={30} labelAlwaysOn defaultValue={10} label={valueLabelFormat} />\n\n      <RangeSlider scale={getScale} step={1} min={2} max={30} labelAlwaysOn defaultValue={[10, 20]} label={valueLabelFormat} />\n    </div>\n  );\n}',
  step: 'import { Slider, RangeSlider } from \'@/ui/slider\';\nimport { Typography } from "@/ui/typography";\n\nconst marks = [\n  { value: 0, label: "xs" },\n  { value: 25, label: "sm" },\n  { value: 50, label: "md" },\n  { value: 75, label: "lg" },\n  { value: 100, label: "xl" }\n];\n\nexport function SliderStepDemo() {\n  return (\n    <div className="mb-12 flex size-full max-w-96 flex-col items-center justify-center">\n      <Typography prose="span">Decimal Values</Typography>\n      <Slider min={0} max={1} step={0.0005} defaultValue={0.5535} />\n      <RangeSlider minRange={0.2} min={0} max={1} step={0.0005} defaultValue={[0.1245, 0.5535]} />\n\n      <Typography prose="span" className="mt-6">Decimal step</Typography>\n      <Slider defaultValue={0} min={-10} max={10} label={(value) => value.toFixed(1)} step={0.1} />\n\n      <Typography prose="span" className="mt-6">Step matched with marks</Typography>\n      <Slider\n        defaultValue={50}\n        label={(val) => marks.find((mark) => mark.value === val)!.label}\n        step={25}\n        marks={marks}\n      />\n    </div>\n  );\n}',
  thumb:
    'import { RangeSlider, Slider } from "@/ui/slider";\nimport { Typography } from "@/ui/typography";\nimport { MoonStarIcon, StarIcon, SunIcon } from "@/icons/*";\n\nexport function SliderThumbDemo() {\n  const styles = { thumb: { borderWidth: "2px", padding: "3px" } };\n  return (\n    <div className="mb-12 flex size-full max-w-96 flex-col items-center justify-center">\n      <Slider{{props}} defaultValue={20} />\n\n      <Typography prose="span" className="mt-6">Thumb Icon</Typography>\n      <Slider{{props}} thumbChildren={<StarIcon size="75%" />} color="#f08c00" label={null} defaultValue={40} styles={styles} />\n      <RangeSlider{{props}} color="red" label={null} defaultValue={[20, 60]} thumbChildren={[<SunIcon size="75%" key="1" />, <MoonStarIcon size="75%" key="2" />]} styles={styles} className="mt-6" />\n    </div>\n  );\n}'
};

const INITIAL_VALUES: number = 35;

const marksLabel = [
  { value: 41, label: "25%" },
  { value: 66, label: "50%" },
  { value: 91, label: "75%" }
];

function Demo() {
  const ctx = useAppContext();
  const [value, setValue] = React.useState<number>(INITIAL_VALUES);
  const [endValue, setEndValue] = React.useState<number>(INITIAL_VALUES);

  return (
    <div className="flex size-full max-w-96 flex-col items-center justify-center [&_svg]:mr-auto [&_svg]:rtl:ml-auto [&_svg]:rtl:mr-0">
      <Slider dir={ctx.dir} value={value} onChange={setValue} onChangeEnd={setEndValue} marks={marksLabel} min={16} max={116} />
      <hr className="mt-14 w-full border-t border-border" />

      <Typography prose="span">
        onChange value: <b>{value}</b>
      </Typography>
      <Svg size={value} currentFill="fill" role="img" fill="#149eca">
        <circle cx="12" cy="12" r="2.1" />
        <path d="m19.62,8.19c-.19-.09-.39-.17-.59-.25.03-.22.06-.43.08-.64.24-2.38-.33-4.09-1.61-4.83-1.28-.74-3.05-.38-4.99,1.02-.17.12-.34.25-.51.39-.17-.14-.34-.27-.51-.39-1.94-1.4-3.71-1.76-4.99-1.02-1.28.74-1.85,2.45-1.61,4.83.02.21.05.42.08.64-.2.08-.4.16-.59.25-2.18.98-3.38,2.33-3.38,3.81s1.2,2.83,3.38,3.81c.19.09.39.17.59.25-.03.22-.06.43-.08.64-.24,2.38.33,4.09,1.61,4.83.43.25.92.37,1.46.37,1.04,0,2.25-.47,3.53-1.39.17-.12.34-.25.51-.39.17.14.34.27.51.39,1.28.92,2.49,1.39,3.53,1.39.53,0,1.02-.12,1.46-.37,1.28-.74,1.85-2.45,1.61-4.83-.02-.21-.05-.42-.08-.64.2-.08.4-.16.59-.25,2.18-.98,3.38-2.33,3.38-3.81s-1.2-2.83-3.38-3.81Zm-6.5-3.85c1.09-.79,2.1-1.19,2.92-1.19.35,0,.67.08.94.23.89.51,1.29,1.9,1.09,3.82-.01.13-.03.26-.05.39-.96-.29-2-.51-3.1-.65-.67-.88-1.38-1.68-2.11-2.36.11-.08.21-.16.32-.24Zm-6.36,8.98c.22.43.45.87.7,1.3.25.43.51.85.78,1.25-.73-.13-1.43-.3-2.07-.5.15-.66.35-1.35.6-2.05Zm-.6-4.69c.65-.2,1.34-.37,2.07-.5-.27.4-.53.82-.78,1.25-.25.43-.48.86-.7,1.3-.25-.7-.46-1.38-.6-2.05Zm1.14,3.37c.31-.7.67-1.4,1.07-2.1.4-.69.83-1.36,1.28-1.97.76-.08,1.55-.12,2.35-.12s1.59.04,2.35.12c.45.62.88,1.28,1.28,1.97.4.69.76,1.4,1.07,2.1-.31.7-.67,1.4-1.07,2.1-.4.69-.83,1.36-1.28,1.97-.76.08-1.55.12-2.35.12s-1.59-.04-2.35-.12c-.45-.62-.88-1.28-1.28-1.97-.4-.69-.76-1.4-1.07-2.1Zm9.24,2.62c.25-.43.48-.86.7-1.3.25.7.46,1.38.6,2.05-.65.2-1.34.37-2.07.5.27-.4.53-.82.78-1.25Zm.7-3.94c-.22-.43-.45-.87-.7-1.3-.25-.43-.51-.85-.78-1.25.73.13,1.43.3,2.07.5-.15.66-.35,1.35-.6,2.05Zm-5.23-5.42c.5.46.99.98,1.47,1.55-.48-.03-.98-.05-1.47-.05s-.99.02-1.47.05c.48-.57.97-1.09,1.47-1.55Zm-4.98-1.88c.27-.15.58-.23.94-.23.81,0,1.83.41,2.92,1.19.11.08.21.16.32.24-.73.68-1.44,1.48-2.11,2.36-1.1.14-2.15.36-3.1.65-.02-.13-.03-.26-.05-.39-.19-1.91.21-3.3,1.09-3.82Zm-2.22,11.47c-1.75-.79-2.76-1.83-2.76-2.86s1.01-2.07,2.76-2.86c.12-.05.24-.11.37-.16.22.97.56,1.99.99,3.01-.43,1.02-.76,2.04-.99,3.01-.12-.05-.25-.1-.37-.16Zm6.07,4.8c-1.56,1.12-2.96,1.47-3.85.96-.89-.51-1.29-1.9-1.09-3.82.01-.13.03-.26.05-.39.96.29,2,.51,3.1.65.67.88,1.38,1.68,2.11,2.36-.11.08-.21.16-.32.24Zm1.12-.92c-.5-.46-.99-.98-1.47-1.55.48.03.98.05,1.47.05s.99-.02,1.47-.05c-.48.57-.97,1.09-1.47,1.55Zm4.98,1.88c-.89.51-2.29.16-3.85-.96-.11-.08-.21-.16-.32-.24.73-.68,1.44-1.48,2.11-2.36,1.1-.14,2.15-.36,3.1-.65.02.13.03.26.05.39.19,1.91-.21,3.3-1.09,3.82Zm2.22-5.76c-.12.05-.24.11-.37.16-.22-.97-.56-1.99-.99-3.01.43-1.02.76-2.04.99-3.01.12.05.25.1.37.16,1.75.79,2.76,1.83,2.76,2.86s-1.01,2.07-2.76,2.86Z" />
      </Svg>

      <Typography prose="span">
        onChangeEnd value: <b>{endValue}</b>
      </Typography>
      <Svg size={endValue} currentFill="fill" role="img">
        <path d="m11.61,1c-.16,0-.28,0-.33,0-.05,0-.2.02-.33.03-3.12.28-6.05,1.97-7.91,4.56-1.03,1.44-1.69,3.07-1.94,4.81-.09.6-.1.78-.1,1.6s.01,1,.1,1.6c.6,4.13,3.54,7.6,7.52,8.89.71.23,1.47.39,2.32.48.33.04,1.77.04,2.11,0,1.48-.16,2.73-.53,3.96-1.16.19-.1.23-.12.2-.14-.02-.01-.82-1.09-1.79-2.4l-1.76-2.38-2.2-3.26c-1.21-1.79-2.21-3.26-2.22-3.26,0,0-.02,1.45-.02,3.22,0,3.1,0,3.22-.05,3.3-.06.11-.1.15-.19.2-.07.03-.13.04-.45.04h-.37l-.1-.06c-.06-.04-.11-.09-.14-.16l-.05-.1v-4.31s.01-4.31.01-4.31l.07-.08s.11-.1.16-.13c.09-.04.12-.05.49-.05.44,0,.51.02.63.14.03.03,1.23,1.83,2.65,4,1.45,2.19,2.89,4.38,4.34,6.57l1.74,2.64.09-.06c.78-.51,1.61-1.23,2.26-1.98,1.39-1.6,2.29-3.55,2.59-5.62.09-.6.1-.78.1-1.6s-.01-1-.1-1.6c-.6-4.13-3.54-7.6-7.52-8.89-.7-.23-1.45-.38-2.29-.48-.15-.02-.99-.03-1.48-.03h0Zm3.73,6.62c.32,0,.37,0,.45.04.1.05.19.15.22.25.02.06.02,1.25.02,3.95v3.87s-.69-1.05-.69-1.05l-.68-1.05v-2.81c0-1.82,0-2.84.02-2.89.03-.12.11-.22.21-.27.09-.05.12-.05.46-.05h0Z" />
      </Svg>
    </div>
  );
}

export function SliderConfiguratorDemo({ displayOnValueChange = true, marks, ...props }: SliderProps & { displayOnValueChange?: boolean }) {
  const ctx = useAppContext();
  const [value, setValue] = React.useState(35);
  const [endValue, setEndValue] = React.useState(35);

  const marksLabel = [
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" }
  ];

  return (
    <div className="flex size-full max-w-96 flex-col items-center justify-center">
      <Slider {...props} dir={ctx.dir} defaultValue={35} value={value} onChange={setValue} onChangeEnd={setEndValue} marks={marks ?? marksLabel} />
      {displayOnValueChange && (
        <>
          <Typography prose="span">
            onChange value: <b>{value}</b>
          </Typography>
          <Typography prose="span">
            onChangeEnd value: <b>{endValue}</b>
          </Typography>
        </>
      )}
    </div>
  );
}

function InvertedDemo() {
  return (
    <div className="flex size-full max-w-96 flex-col items-center justify-center gap-10">
      <Slider inverted defaultValue={80} />
      <RangeSlider inverted defaultValue={[40, 80]} />
    </div>
  );
}

function LabelDemo() {
  const ctx = useAppContext();
  return (
    <div className="mb-12 flex size-full max-w-96 flex-col items-center justify-center [&>span:not(:first-of-type)]:mt-6">
      <Typography prose="span">No label</Typography>
      <Slider dir={ctx.dir} defaultValue={40} label={null} />

      <Typography prose="span">Formatted label</Typography>
      <Slider dir={ctx.dir} defaultValue={40} label={value => `${value} °C`} />

      <Typography prose="span">Label always visible</Typography>
      <Slider dir={ctx.dir} defaultValue={40} labelAlwaysOn />

      <Typography prose="span">Custom label transition</Typography>
      <Slider dir={ctx.dir} defaultValue={40} labelTransitionProps={{ transition: "skew-down", duration: 150, timingFunction: "linear" }} />
    </div>
  );
}

const marksLabel2 = [
  { value: 0, label: "xs" },
  { value: 25, label: "sm" },
  { value: 50, label: "md" },
  { value: 75, label: "lg" },
  { value: 100, label: "xl" }
];

export function MarksDemo() {
  return (
    <div className="m-auto mb-12 flex size-full flex-col items-center justify-center [&>*]:max-w-96">
      <Typography prose="span">Marks</Typography>
      <Slider defaultValue={40} marks={[{ value: 10 }, { value: 40 }, { value: 95 }]} />
      <Slider defaultValue={40} marks={marksLabel2} className="mt-6" />
      <RangeSlider
        defaultValue={[20, 80]}
        marks={[
          { value: 20, label: "20%" },
          { value: 50, label: "50%" },
          { value: 80, label: "80%" }
        ]}
        className="mt-6"
      />

      <Typography prose="span" className="mt-10">
        Restrict selection to marks
      </Typography>
      <Slider restrictToMarks defaultValue={25} marks={Array.from({ length: 5 }).map((_, index) => ({ value: index * 25 }))} />

      <Typography prose="span" className="mt-6">
        Disabled
      </Typography>
      <Slider defaultValue={60} disabled />
      <RangeSlider disabled defaultValue={[25, 75]} marks={marksLabel2} className="mt-6" />
    </div>
  );
}

const getScale = (v: number) => 2 ** v;
function valueLabelFormat(value: number) {
  const units = ["KB", "MB", "GB", "TB"];
  let unitIndex = 0;
  let scaledValue = value;
  while (scaledValue >= 1024 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue /= 1024;
  }
  return `${scaledValue} ${units[unitIndex]}`;
}

function ScaleDemo() {
  return (
    <div className="flex size-full max-w-96 flex-col items-center justify-center gap-12 py-8">
      <Slider scale={getScale} step={1} min={2} max={30} labelAlwaysOn defaultValue={10} label={valueLabelFormat} />

      <RangeSlider scale={getScale} step={1} min={2} max={30} labelAlwaysOn defaultValue={[10, 20]} label={valueLabelFormat} />
    </div>
  );
}

const marksLabel3 = [
  { value: 0, label: "xs" },
  { value: 25, label: "sm" },
  { value: 50, label: "md" },
  { value: 75, label: "lg" },
  { value: 100, label: "xl" }
];

function StepDemo() {
  return (
    <div className="mb-12 flex size-full max-w-96 flex-col items-center justify-center">
      <Typography prose="span">Decimal Values</Typography>
      <Slider min={0} max={1} step={0.0005} defaultValue={0.5535} />
      <br />
      <RangeSlider minRange={0.2} min={0} max={1} step={0.0005} defaultValue={[0.1245, 0.5535]} />

      <Typography prose="span" className="mt-6">
        Decimal step
      </Typography>
      <Slider defaultValue={0} min={-10} max={10} label={value => value.toFixed(1)} step={0.1} />

      <Typography prose="span" className="mt-6">
        Step matched with marks
      </Typography>
      <Slider defaultValue={50} label={val => marksLabel3.find(mark => mark.value === val)!.label} step={25} marks={marksLabel3} />
    </div>
  );
}

function ThumbDemo(props: { thumbSize?: SliderProps["thumbSize"] }) {
  const styles = { thumb: { borderWidth: "2px", padding: "3px" } };
  return (
    <div className="mb-12 flex size-full max-w-96 flex-col items-center justify-center">
      <Slider {...props} defaultValue={20} />

      <Typography prose="span" className="mt-6">
        Thumb Icon
      </Typography>
      <Slider {...props} thumbChildren={<StarIcon size="75%" />} color="#f08c00" label={null} defaultValue={40} styles={styles} />
      <RangeSlider {...props} color="red" label={null} defaultValue={[20, 60]} thumbChildren={[<SunIcon size="75%" key="1" />, <MoonStarIcon size="75%" key="2" />]} styles={styles} className="mt-6" />
    </div>
  );
}

const usage: DataTrees = {
  type: "code",
  component: Demo,
  code: codes.usage,
  classNames: { demoInner: "min-h-72 pt-8 pb-4 w-full centered" }
};

const configurator: DataTrees = {
  type: "configurator",
  component: SliderConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  classNames: { demoInner: "min-h-72 w-full centered" },
  controls: [
    { prop: "color", type: "color", initialValue: "hsl(var(--constructive))", libraryValue: "hsl(var(--constructive))" },
    { prop: "size", type: "number", initialValue: 8, libraryValue: 8, min: 6, max: 20 },
    { prop: "round", type: "number", initialValue: 32, libraryValue: 999, min: 4, max: 20 },
    { prop: "labelAlwaysOn", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "disabled", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

const inverted: DataTrees = {
  type: "code",
  component: InvertedDemo,
  code: codes.inverted,
  classNames: { demoInner: "min-h-72 w-full centered" }
};

const label: DataTrees = {
  type: "code",
  component: LabelDemo,
  code: codes.label,
  classNames: { demoInner: "min-h-72 w-full centered" }
};

const marks: DataTrees = {
  type: "code",
  component: MarksDemo,
  code: codes.marks,
  classNames: { demoInner: "min-h-72 w-full centered" }
};

const scale: DataTrees = {
  type: "code",
  component: ScaleDemo,
  code: codes.scale,
  classNames: { demoInner: "min-h-72 w-full centered" }
};

const step: DataTrees = {
  type: "code",
  component: StepDemo,
  code: codes.step,
  classNames: { demoInner: "min-h-72 w-full centered" }
};

const thumb: DataTrees = {
  type: "configurator",
  component: ThumbDemo,
  code: codes.thumb,
  classNames: { demoInner: "min-h-72 w-full centered" },
  controls: [{ prop: "thumbSize", type: "number", initialValue: 26, libraryValue: null, min: 16, max: 42 }]
};

export const SliderDemos = {
  usage,
  configurator,
  inverted,
  label,
  marks,
  scale,
  step,
  thumb
};
