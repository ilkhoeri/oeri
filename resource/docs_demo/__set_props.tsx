"use client";

import * as React from "react";
import { DataAlign, DataSide, sanitizedToParams } from "@/modules/index";
import { PolymorphicWithoutRef } from "@/source/ui/element";
import { twMerge, cvx, InferTypes, VariantsType } from "str-merge";

import globalStyle from "@/source/styles/styles";
import { nextValue } from "@/source/utils";
import { capitalizeFirst } from "@/modules/ondevelopment/utils";

export const styles = cvx({
  variants: {
    as: {
      wrapper:
        "absolute top-4 left-4 flex flex-col items-start gap-3 [&_span]:font-mono [&_span]:text-nowrap",
      wrapp: "w-full grid grid-flow-row",
      button:
        "w-full justify-start rounded-md border px-2 py-1 text-sm bg-background cursor-pointer ring-offset-constructive/35 focus-visible:border-constructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      nameprops: "text-muted-foreground italic",
      labelOnly:
        "absolute top-4 left-4 text-h1 font-extrabold opacity-20 hover:opacity-100 z-9 cursor-pointer select-none",
      comment: "text-[#858AA6] italic font-mono text-sm mt-4",
      code: "codebox w-max !text-xs",
      div: "flex flex-col",
      label: "text-sm text-muted-foreground font-medium pl-0.5"
    },
    size: {
      "26": "min-w-26",
      "36": "min-w-36"
    }
  }
});

function classes(
  as: VariantsType<typeof styles>["as"],
  className?: string,
  options: {
    size?: VariantsType<typeof styles>["size"];
  } = {}
) {
  const { size } = options;
  return {
    className: twMerge(styles({ as, size }), className)
  };
}

// prettier-ignore
export const SetProps = {
  Wrapper: React.forwardRef<HTMLUListElement, PolymorphicWithoutRef<"ul">>(({ className, ...props }, ref) => (
    <ul ref={ref} role="list" {...classes("wrapper", className)} {...props} />
  )),
  Wrapp: React.forwardRef<HTMLLIElement, PolymorphicWithoutRef<"li">>(({ className, ...props }, ref) => (
    <li ref={ref} role="listitem" {...classes("wrapp", className)} {...props} />
  )),
  Button: React.forwardRef<HTMLButtonElement, PolymorphicWithoutRef<"button">>(({ className, ...props }, ref) => (
    <button ref={ref} type="button" role="button" {...classes("button", className, { size: "26" })} {...props} />
  )),
  LabelOnly: React.forwardRef<HTMLLabelElement, PolymorphicWithoutRef<"label">>(({ className, ...props }, ref) => (
    <label ref={ref} aria-label="label" {...classes("labelOnly", className)} {...props} />
  )),
  Label: React.forwardRef<HTMLLabelElement, PolymorphicWithoutRef<"label">>(({ className, ...props }, ref) => (
    <label ref={ref} aria-label="label" className={className} {...props} />
  )),
  Range: React.forwardRef<HTMLInputElement, PolymorphicWithoutRef<"input">>(({ className, ...props }, ref) => (
    <input ref={ref} type="range" aria-label="range" className={className} {...props} />
  )),
  Radio: React.forwardRef<HTMLInputElement, PolymorphicWithoutRef<"input">>(({ className, ...props }, ref) => (
    <input ref={ref} type="radio" aria-label="radio" className={className} {...props} />
  )),
  Text: React.forwardRef<HTMLInputElement, PolymorphicWithoutRef<"input">>(({ className, ...props }, ref) => (
    <input ref={ref} type="text" aria-label="input text" className={globalStyle({ input: "text" }, className)} {...props} />
  )),
  Nameprops: React.forwardRef<HTMLSpanElement, PolymorphicWithoutRef<"span">>(({ className, ...props }, ref) => (
    <span ref={ref} {...classes("nameprops", className)} {...props} />
  )),
  Comment: React.forwardRef<HTMLSpanElement, PolymorphicWithoutRef<"span">>(({ className, ...props }, ref) => (
    <span ref={ref} {...classes("comment", className)} {...props}>{props.children || props.title}</span>
  )),
  Code: React.forwardRef<HTMLElement, PolymorphicWithoutRef<"code">>(({ className, ...props }, ref) => (
    <samp ref={ref} {...classes("code", className )} {...props}>{props.children || props.title}</samp>
  )),
  Div: React.forwardRef<HTMLDivElement, PolymorphicWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div ref={ref} {...classes("div", className )} {...props} />
  )),
};
SetProps.Wrapper.displayName = "Wrapper";
SetProps.Wrapp.displayName = "Wrapp";
SetProps.Button.displayName = "Button";
SetProps.LabelOnly.displayName = "LabelOnly";
SetProps.Label.displayName = "Label";
SetProps.Range.displayName = "Range";
SetProps.Radio.displayName = "Radio";
SetProps.Text.displayName = "Text";
SetProps.Nameprops.displayName = "Nameprops";
SetProps.Comment.displayName = "Comment";
SetProps.Code.displayName = "Code";
SetProps.Div.displayName = "Div";

export function SetPropsBoolean(X: {
  label: string;
  boo: boolean;
  setBoo: (v: boolean) => void;
}) {
  const { label, boo, setBoo } = X;
  return (
    <SetProps.Wrapp>
      <SetProps.Button onClick={() => setBoo(!boo)}>
        <SetProps.Nameprops>{label}=</SetProps.Nameprops>
        &#123;<span className="italic">{boo ? "true" : "false"}</span>&#125;
      </SetProps.Button>
    </SetProps.Wrapp>
  );
}

export function SetPropsText(X: { str: string; setStr: (v: string) => void }) {
  const { str, setStr } = X;
  return (
    <SetProps.Wrapp>
      <SetProps.Text
        id="text"
        name="text"
        title="input text"
        value={str}
        onChange={e => setStr(e.target.value)}
      />
    </SetProps.Wrapp>
  );
}

/**

      <SetProps.Wrapp>
        <label htmlFor="sideOffset" {...classes("button", { size: "36" })}>
          <SetProps.Nameprops>sideOffset=</SetProps.Nameprops>
          <span>&#123;{numb}&#125;</span>
        </label>

        <input
          type="range"
          name="sideOffset"
          id="sideOffset"
          aria-label="sideOffset"
          min="0"
          max="100"
          value={numb}
          onChange={(e) => setNumb(Number(e.target.value))}
          className="w-40"
        />
      </SetProps.Wrapp>
 */

export function SetPropsRange(
  X: { setNumb: (e: number) => void } & PolymorphicWithoutRef<"input"> & {
      label: string;
    }
) {
  const { label, value, setNumb, className, ...props } = X;
  return (
    <SetProps.Wrapp className={twMerge("gap-0.5", className)}>
      <label htmlFor={label} {...classes("button")}>
        <SetProps.Nameprops>{label}=</SetProps.Nameprops>
        <span>&#123;{value}&#125;</span>
      </label>
      <SetProps.Range
        name={label}
        id={label}
        value={value}
        onChange={e => setNumb(Number(e.target.value))}
        {...props}
      />
    </SetProps.Wrapp>
  );
}

export function SetPropsRadio(
  X: { label: string; values: string[] } & InferTypes<typeof useSetProps>
) {
  const { str, setStr, label, values } = X;
  return values.map(i => (
    <SetProps.Wrapp key={i}>
      <SetProps.Radio
        id={i}
        name={i}
        value={i}
        checked={str === i}
        onChange={e => setStr(e.target.value)}
      />
      <label htmlFor={i}>
        {label}=&quot;{i}&quot;
      </label>
    </SetProps.Wrapp>
  ));
}

export function SetPropsButtonSelect(X: {
  label?: string;
  values: string[];
  str: string;
  setStr: (e: string) => void;
}) {
  const { str, setStr, values, label = "select" } = X;
  return (
    <SetProps.Wrapp className="flex-col items-start gap-1 rounded-lg border bg-muted p-1">
      <label id={label} title={label} aria-label={label} {...classes("label")}>
        {label}
      </label>
      <div className="grid w-full grid-cols-2 gap-1">
        {values.map(i => (
          <SetProps.Button
            key={i}
            onClick={() => setStr(i)}
            className={twMerge(
              "w-full min-w-16 text-center",
              str === i && "bg-constructive/20 border-constructive"
            )}
          >
            {capitalizeFirst(i)}
          </SetProps.Button>
        ))}
      </div>
    </SetProps.Wrapp>
  );
}

export function SetPropsSelect(X: {
  label?: string;
  values: string[];
  str: string;
  setStr: (e: string) => void;
}) {
  const { str, setStr, values, label = "select" } = X;
  return (
    <SetProps.Wrapp className="flex-col items-start rounded-lg border bg-muted p-1">
      {label && (
        <label
          id={label}
          title={label}
          aria-label={label}
          htmlFor={sanitizedToParams(label)}
          {...classes("label")}
        >
          {label}
        </label>
      )}
      <select
        id={sanitizedToParams(label)}
        name={sanitizedToParams(label)}
        title={label}
        aria-label={label}
        {...classes("button", undefined, { size: "36" })}
        value={str}
        onChange={e => setStr(e.target.value)}
      >
        {values.map(i => (
          <option key={i} value={i} className="h-4 cursor-pointer">
            {capitalizeFirst(i)}
          </option>
        ))}
      </select>
    </SetProps.Wrapp>
  );
}

export function SetPropsColor(X: { str: string; setStr: (e: string) => void }) {
  const { str, setStr } = X;
  // Fungsi untuk mencoba mengonversi warna ke format hex jika memungkinkan
  const convertToHex = (color: string): string | null => {
    if (typeof document === "undefined") return null;
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = color; // Set the color
    const computedColor = ctx.fillStyle; // Get the computed color
    return /^#[0-9A-Fa-f]{6}$/.test(computedColor) ? computedColor : null; // Validate hex
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setStr(newValue); // Update the state with the input value
  };

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStr(e.target.value); // Directly update the state with the hex value
  };

  const colorValue = convertToHex(str) || "#000000"; // Provide a fallback for the color input

  return (
    <SetProps.Wrapp className="flex flex-row items-center gap-2">
      <input
        id="set-color"
        title="set color"
        name="set-color"
        type="color"
        className="size-9 min-w-9"
        value={colorValue} // Default to black if invalid
        onChange={e => handleColorInputChange(e)}
      />
      <input
        id="set-input-color"
        title="input color"
        name="set-input-color"
        type="text"
        {...classes("button", "max-w-[7rem] cursor-text")}
        value={str}
        onChange={e => handleTextInputChange(e)}
      />
    </SetProps.Wrapp>
  );
}

export function SetPropsSideAlign(X: {
  setAlign?: (v: `${DataAlign}`) => void;
  setSide?: (v: `${DataSide}`) => void;
  align?: `${DataAlign}`;
  side?: `${DataSide}`;
}) {
  const { side, align, setAlign, setSide } = X;
  if (!side && !align) return null;
  return (
    <SetProps.Wrapp>
      {setSide && side && (
        <SetProps.Button onClick={() => setSide(nextValue(side, dataSide))}>
          <SetProps.Nameprops>side=</SetProps.Nameprops>
          <span>&quot;{side}&quot;</span>
        </SetProps.Button>
      )}

      {setAlign && align && (
        <SetProps.Button onClick={() => setAlign(nextValue(align, dataAlign))}>
          <SetProps.Nameprops>align=</SetProps.Nameprops>
          <span>&quot;{align}&quot;</span>
        </SetProps.Button>
      )}
    </SetProps.Wrapp>
  );
}

export function useSetProps({
  Numb = 0,
  Str = "",
  Boo = false,
  Align = "center",
  Side = "bottom"
}: {
  Numb?: number;
  Str?: string;
  Boo?: boolean;
  Align?: `${DataAlign}`;
  Side?: `${DataSide}`;
} = {}) {
  const [align, setAlign] = React.useState<`${DataAlign}`>(Align);
  const [side, setSide] = React.useState<`${DataSide}`>(Side);
  const [numb, setNumb] = React.useState<number>(Numb);
  const [str, setStr] = React.useState<string>(Str);
  const [boo, setBoo] = React.useState<boolean>(Boo);

  return {
    numb,
    setNumb,
    str,
    setStr,
    boo,
    setBoo,
    side,
    setSide,
    align,
    setAlign
  };
}

// type PositionValue =
//   | React.CSSProperties["position"]
//   | (string & NonNullable<unknown>);
// const pointValues: ("x" | "y")[] = ["x", "y"];
// const styleValues: ("default" | "dropdown")[] = ["default", "dropdown"];
const dataSide: `${DataSide}`[] = Object.values(DataSide);
const dataAlign: `${DataAlign}`[] = Object.values(DataAlign);
