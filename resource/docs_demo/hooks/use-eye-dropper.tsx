"use client";
import { useEyeDropper } from "@/hooks/use-eye-dropper";
import { PickColorIcon } from "@/modules/icons";
import { SetProps } from "../__set_props";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const { pickColor, color, supported, error } = useEyeDropper();

  let message: string = "Pick color";
  if (!supported) return "Your browser does not support the EyeDropper API";
  if (error) message = error?.message;
  if (color) message = color;

  return (
    <div>
      <button
        type="button"
        aria-label="pick color"
        title="pick color"
        id="pick color"
        onClick={pickColor}
        className={globalStyle({ button: "outline", size: "icon-sm" }, "z-9")}>
        <PickColorIcon color={color} size={20} />
      </button>
      <SetProps.LabelOnly htmlFor="pick color">{message}</SetProps.LabelOnly>
      <div
        className="absolute inset-0 flex size-full min-h-full min-w-full items-center justify-center rounded-lg"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
