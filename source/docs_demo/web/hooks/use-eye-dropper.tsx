"use client";
import { useEyeDropper } from "@/hooks/use-eye-dropper";
import { PickColorIcon } from "@/icons/*";
import { __docs_demo } from "../../__docs_demo";
import globalStyle from "@/source/styles/styles";

export function Demo() {
  const { pickColor, color, supported, error } = useEyeDropper();

  let message: string = "Pick color";
  if (!supported) return "Your browser does not support the EyeDropper API";
  if (error) message = error?.message;
  if (color) message = color;

  return (
    <__docs_demo>
    <button
      type="button"
      aria-label="pick color"
      title="pick color"
      id="pick color"
      onClick={pickColor}
      className={globalStyle({ button: "outline", size: "icon-sm" }, "m-auto z-9")}
    >
      <PickColorIcon color={color} size={20} />
    </button>
    <__docs_demo.label variant="labelOnly" htmlFor="pick color">{message}</__docs_demo.label>
    <__docs_demo className="absolute inset-0 flex size-full min-h-full min-w-full items-center justify-center rounded-lg" {...{style: { backgroundColor: color }}} />
    </__docs_demo>
  );
}
