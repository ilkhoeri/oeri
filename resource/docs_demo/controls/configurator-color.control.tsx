"use client";
import { useApp } from "@/config/app-context";
import { useState } from "react";
import { Input } from "@/ui/input";
import { Group } from "@/ui/group";
import { CheckIcon } from "@/icons/*";
import { Sheets } from "@/ui/sheets";
import { ColorWheelIcon } from "./color-wheel-icon";
import { getControlLabel } from "./get-control-label";
import { ConfiguratorControl } from "./types.control";
import { ComponentProps } from "../assets/types/component";
import { ColorPicker, ColorSwatch } from "@/ui/color-picker";
import { __cn } from "./classes.control";

export type ConfiguratorColorControlOptions = ConfiguratorControl<"color", { swatches?: string[]; initialValue: string }>;

export interface ConfiguratorColorControlProps extends ComponentProps<"div", "onChange" | "value" | "size"> {
  value: string;
  onChange: (value: string) => void;
  prop: string;
  swatches?: string[];
}

export function ConfiguratorColorControl(_props: ConfiguratorColorControlProps) {
  const { value, onChange, prop, swatches = ["#82c91e", "#fab005", "#fd7e14"], ...props } = _props;

  const [colorPickerColor, setColorPickerColor] = useState("#fff");
  const ctx = useApp();

  const handleColorPickerChange = (color: string) => {
    setColorPickerColor(color);
    onChange(color);
  };

  // const colors = Object.keys(DEFAULT_THEME.colors)
  const colors = swatches
    .filter(color => color !== "dark")
    .map(color => (
      <ColorSwatch
        color={color}
        key={color}
        withShadow
        onClick={() => onChange(color)}
        className="flex flex-[1_0_calc(15%-0px)] cursor-pointer items-center justify-center overflow-hidden text-white"
        aria-label={color}
      >
        {value === color && <CheckIcon size="sm" />}
      </ColorSwatch>
    ));

  return (
    <Input.Wrapper labelElement="div" label={getControlLabel(prop)} {...props} unstyled={{ label: true }} classNames={{ label: __cn("label") }}>
      <Group gap={4} wrap="wrap" className="stylelayer-colorpicker mt-0.5 [--cp-preview-sz:28px] [--cp-round:6px]">
        {colors}
        <Sheets variant="dropdown" side="bottom" align={ctx.dir === "rtl" ? "start" : "end"} sideOffset={4} clickOutsideToClose>
          <Sheets.Trigger
            unstyled
            className={__cn("button")}
            aria-label="Pick color"
            /** className="flex h-7 flex-[1_0_calc(15%-4px)] cursor-pointer items-center justify-center rounded-sm border" */
          >
            <ColorWheelIcon />
          </Sheets.Trigger>

          <Sheets.Content className="w-full min-w-max max-w-[178px] rounded-xl p-2">
            <ColorPicker
              format="rgba"
              value={colorPickerColor}
              onChange={handleColorPickerChange}
              withPicker
              fullWidth
              // round=".2rem"
              swatches={["#2e2e2e", "#868e96", "#fa5252", "#F3457B", "#be4bdb", "#965BA0", "#7950f2", "#228be6", "#15aabf", "#12b886"]}
              classNames={{ swatch: "flex flex-[1_0_calc(15%-0px)] items-center justify-center overflow-hidden rounded-sm text-white [--cp-swatch-h:24px]" }}
            />
            <Input
              value={colorPickerColor}
              onChange={event => handleColorPickerChange(event.currentTarget.value)}
              placeholder="Enter color"
              id="enter-color"
              className="mt-2 rounded-[6px]"
            />
          </Sheets.Content>
        </Sheets>
      </Group>
    </Input.Wrapper>
  );
}
