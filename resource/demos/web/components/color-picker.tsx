"use client";
import { useState } from "react";
import { Input } from "@/ui/input";
import { ColorPicker, type ColorPickerProps } from "@/ui/color-picker";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { Svg } from "@/ui/svg";
import { CheckIcon } from "@/icons/*";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { Input } from "@/ui/input";\nimport { ColorPicker } from "@/ui/color-picker";\nimport { CheckIcon } from "@/icons/*";\nimport { Svg } from "@/ui/svg";\n\nconst swatches = ["#ffffff", "#000000", "#2e2e2e", "#868e96", "#fa5252", "#e64980", "#be4bdb", "#639", "#4c6ef5", "#228be6", "#15aabf", "#12b886", "#40c057", "#82c91e", "#fab005", "#fd7e14"];\n\nexport function ColorPickerDemo() {\n  const [value, onChange] = useState("#639");\n  return (\n    <div className="flex flex-wrap items-center justify-evenly gap-12">\n      <Svg currentFill="fill" size="xxxl" fill={value}>\n        <path d="m19.48,1H1v18.48c0,1.94,1.58,3.52,3.52,3.52h14.96c1.94,0,3.52-1.58,3.52-3.52V4.52c0-1.94-1.58-3.52-3.52-3.52Zm-10.58,18.79c.51,0,.7-.51.66-1.08h1.63c.09,1.61-.92,2.55-2.35,2.53-1.39,0-2.27-.77-2.27-2.27v-3.7c0-1.47.95-2.27,2.38-2.27,1.41-.02,2.29.9,2.24,2.46h-1.63c.04-.59-.22-1.03-.66-1.01-.55,0-.7.37-.7,1.08v3.21c0,.68.22,1.01.7,1.03Zm5.1,1.45c-1.41,0-2.2-.97-2.22-2.53h1.52c.02.7.24,1.14.73,1.14s.66-.29.66-.95c0-.55-.24-.86-.84-1.14l-.57-.26c-1.01-.48-1.43-1.08-1.43-2.27,0-1.32.84-2.24,2.2-2.24s2.09.95,2.11,2.49h-1.47c0-.64-.13-1.08-.62-1.08-.44,0-.66.22-.66.77s.2.77.73.99l.53.24c1.12.53,1.61,1.21,1.61,2.49,0,1.52-.86,2.35-2.27,2.35Zm4.97,0c-1.41,0-2.2-.97-2.22-2.53h1.54c0,.7.24,1.14.7,1.14s.66-.29.66-.95c0-.55-.22-.86-.84-1.14l-.57-.26c-1.01-.48-1.41-1.08-1.41-2.27,0-1.32.81-2.24,2.2-2.24s2.07.95,2.11,2.49h-1.47c-.02-.64-.15-1.08-.64-1.08-.44,0-.64.22-.64.77s.18.77.7.99l.55.24c1.1.53,1.58,1.21,1.58,2.49,0,1.52-.86,2.35-2.27,2.35Z" />\n      </Svg>\n\n      <ColorPicker withPicker={false} format="hsla" size={18} value={value} onChange={onChange} swatches={swatches} selectedIcon={<CheckIcon size="sm" />}>\n        <Input\n          value={value}\n          onChange={e => onChange(e.target.value)}\n          className="mt-[--cp-space] h-auto rounded-[--cp-input-round] p-[--cp-input-p] leading-none [font-size:--cp-input-fz]"\n        />\n      </ColorPicker>\n    </div>\n  );\n}',
  configurator:
    '"use client";\nimport { useState } from "react";\nimport { Input } from "@/ui/input";\nimport { ColorPicker } from "@/ui/color-picker";\n\nexport function ColorPickerDemo() {\n  const [value, onChange] = useState("rgba(47, 119, 150, 0.7)");\n  const swatches = ["#ffffff", "#000000", "#2e2e2e", "#868e96", "#fa5252", "#e64980", "#be4bdb", "#639", "#4c6ef5", "#228be6", "#15aabf", "#12b886", "#40c057", "#82c91e", "#fab005", "#fd7e14" ];\n  return (\n      <ColorPicker{{props}} value={value} onChange={onChange} swatches={swatches}>\n      <Input\n        value={value}\n        onChange={e => onChange(e.target.value)}\n        className="mt-[--cp-space] h-auto rounded-[--cp-input-round] p-[--cp-input-p] leading-none [font-size:--cp-input-fz]"\n      />\n      </ColorPicker>\n  );\n}'
};

const swatches = ["#ffffff", "#000000", "#2e2e2e", "#868e96", "#fa5252", "#e64980", "#be4bdb", "#639", "#4c6ef5", "#228be6", "#15aabf", "#12b886", "#40c057", "#82c91e", "#fab005", "#fd7e14"];

function ColorPickerDemo() {
  const [value, onChange] = useState("#639");
  return (
    <div className="flex flex-wrap items-center justify-evenly gap-12">
      <Svg currentFill="fill" size="xxxl" fill={value}>
        <path d="m19.48,1H1v18.48c0,1.94,1.58,3.52,3.52,3.52h14.96c1.94,0,3.52-1.58,3.52-3.52V4.52c0-1.94-1.58-3.52-3.52-3.52Zm-10.58,18.79c.51,0,.7-.51.66-1.08h1.63c.09,1.61-.92,2.55-2.35,2.53-1.39,0-2.27-.77-2.27-2.27v-3.7c0-1.47.95-2.27,2.38-2.27,1.41-.02,2.29.9,2.24,2.46h-1.63c.04-.59-.22-1.03-.66-1.01-.55,0-.7.37-.7,1.08v3.21c0,.68.22,1.01.7,1.03Zm5.1,1.45c-1.41,0-2.2-.97-2.22-2.53h1.52c.02.7.24,1.14.73,1.14s.66-.29.66-.95c0-.55-.24-.86-.84-1.14l-.57-.26c-1.01-.48-1.43-1.08-1.43-2.27,0-1.32.84-2.24,2.2-2.24s2.09.95,2.11,2.49h-1.47c0-.64-.13-1.08-.62-1.08-.44,0-.66.22-.66.77s.2.77.73.99l.53.24c1.12.53,1.61,1.21,1.61,2.49,0,1.52-.86,2.35-2.27,2.35Zm4.97,0c-1.41,0-2.2-.97-2.22-2.53h1.54c0,.7.24,1.14.7,1.14s.66-.29.66-.95c0-.55-.22-.86-.84-1.14l-.57-.26c-1.01-.48-1.41-1.08-1.41-2.27,0-1.32.81-2.24,2.2-2.24s2.07.95,2.11,2.49h-1.47c-.02-.64-.15-1.08-.64-1.08-.44,0-.64.22-.64.77s.18.77.7.99l.55.24c1.1.53,1.58,1.21,1.58,2.49,0,1.52-.86,2.35-2.27,2.35Z" />
      </Svg>

      <ColorPicker withPicker={false} format="hsla" size={18} value={value} onChange={onChange} swatches={swatches} selectedIcon={<CheckIcon size="sm" />}>
        <Input value={value} onChange={e => onChange(e.target.value)} className="mt-[--cp-space] h-auto rounded-[--cp-input-round] p-[--cp-input-p] leading-none [font-size:--cp-input-fz]" />
      </ColorPicker>
    </div>
  );
}

const usage: DataTrees = {
  type: "code",
  component: ColorPickerDemo,
  code: codes.usage,
  centered: true
};

function ColorPickerConfiguratorDemo(props: ColorPickerProps) {
  const [value, onChange] = useState("rgba(47, 119, 150, 0.7)");
  return (
    <ColorPicker {...props} value={value} onChange={onChange} swatches={swatches}>
      <Input value={value} onChange={e => onChange(e.target.value)} className="mt-[--cp-space] h-auto rounded-[--cp-input-round] p-[--cp-input-p] leading-none [font-size:--cp-input-fz]" />
    </ColorPicker>
  );
}

const configurator: DataTrees = {
  type: "configurator",
  component: ColorPickerConfiguratorDemo,
  code: codes.configurator,
  centered: true,
  classNames: { demoInner: "w-full flex items-center justify-center" },
  controls: [
    { prop: "format", type: "select", initialValue: "hex", libraryValue: null, data: ["hex", "hexa", "rgb", "rgba", "hsl", "hsla"] },
    { prop: "size", type: "number", initialValue: 20, libraryValue: 16, min: 10, max: 40 },
    { prop: "round", type: "number", initialValue: 6, libraryValue: 6, min: 2, max: 14 },
    { prop: "swatchPerRow", type: "number", initialValue: 7, libraryValue: 7, min: 4, max: 12 },
    { prop: "withPicker", type: "boolean", initialValue: true, libraryValue: true },
    { prop: "fullWidth", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "withShadow", type: "boolean", initialValue: false, libraryValue: false },
    { prop: "withClipboard", type: "boolean", initialValue: false, libraryValue: false }
  ]
};

export const ColorPickerDemos = {
  usage,
  configurator
};
