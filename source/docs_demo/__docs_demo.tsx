"use client";
import * as React from "react";
import { Slider, SliderProps } from "@/ui/slider";
import { nextValue } from "@/source/utils";
import { cvx, inferType, cvxProps, cn } from "str-merge";
import { capitalizeFirst } from "@/source/ondevelopment/utils";
import { Sheets, SheetsContent, SheetsTrigger } from "@/ui/sheets";
import { ColorFormat, ColorPicker, ColorPickerIcon } from "@/ui/color-picker";
import { DataAlign, DataSide } from "@/hooks/use-open-state";
import { sanitizedWord } from "@/utility/text-parser";
import { useStringToHEx } from "@/hooks/use-random-colors";
import { useApp } from "@/config/app-context";
import { Input } from "@/ui/input";

const classes = cvx({
  variants: {
    variant: {
      root: "mt-auto flex items-center justify-center size-full min-w-full max-w-xl",
      area: "flex flex-col items-center justify-center max-w-full",
      "area-only": "mb-8 flex size-full max-w-96 flex-col items-center justify-center",
      controls: "text-muted-foreground",
      control: "",
      button: "w-auto min-w-full max-w-full flex-1 grow inline-flex justify-start items-center rounded-md border border-primitive-foreground px-2 py-1 text-sm bg-background cursor-pointer ring-offset-constructive/35 focus-visible:border-constructive transition-colors [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [-moz-appearance:none] [-webkit-appearance:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      nameprops: "text-muted-foreground italic",
      labelOnly: "absolute top-2 left-4 [font-size:clamp(20px,0.75rem+4vw,2.25rem)] font-extrabold text-muted hover:text-color-muted z-9 cursor-pointer select-none leading-none",
      comment: "text-muted-foreground/60 italic font-geist-mono text-sm mt-4 mr-auto",
      code: "codebox w-max !text-xs",
      label: "text-sm text-muted-foreground font-medium pl-0.5",
      input: "",
      select: "",
      div: "",
      option: "h-4 cursor-pointer",
      unstyled: "",
    },
  }
});
const size = {
  "26": "min-w-26",
  "36": "min-w-36",
  icon: "h-[--sz] w-[--sz] min-h-[--sz,var(--min-sz)] min-w-[--sz,var(--min-sz)] [--sz:2rem] py-1 px-1 border",
};
const stackControls = {
  relative: "",
  absolute: "",
};

type __variant = NonNullable<cvxProps<typeof classes>["variant"]>;
type Options = StylesNames & {};
type CSSProperties = React.CSSProperties & { [key: string]: any };
type StylesNames<Exclude extends string = never> = Omit<
  { className?: string; style?: CSSProperties; unstyled?: boolean },
  Exclude
> & cvxProps<typeof classes>;
type ComponentProps<
  T extends React.ElementType,
  Exclude extends string = never
> = StylesNames & {
  color?: React.CSSProperties["color"];
} & React.PropsWithoutRef<
    Omit<React.ComponentProps<T>, "style" | "color" | Exclude>
  >;

function getStyles(variant: __variant, options: Options = {}) {
  return {
    className: cn(
      !options?.unstyled && classes({ variant }),
      options?.className
    ),
    style: {
      ...options?.style
    }
  };
}

interface __docs_demoProps extends ComponentProps<"div"> {
  title?: string
  // passRoot?: boolean;
}
export const __docs_demo = React.forwardRef<HTMLDivElement, __docs_demoProps>(
  (_props, ref) => {
    const { className, unstyled, style, variant = "root", children, ...props } = _props;
    if (children) {
      return <>{children}</>
    }
    return <div {...{ ref, ...getStyles(variant, { unstyled, className, style }), ...props }}>{children}</div>;
  }
) as __docs_demoComposite;
__docs_demo.displayName = "__docs_demo"

export const Composite = {
  area: React.forwardRef<HTMLDivElement, ComponentProps<"div">>(
    (_props, ref) => {
      const {className, style, unstyled, variant = "area", ...props} = _props;
      const { dir } = useApp();
      return <div {...{ ref, "data-demo": "area", dir, ...getStyles(variant, { unstyled, className, style }), ...props }} />
    }
  ),
  controls: React.forwardRef<HTMLUListElement, ComponentProps<"ul"> & {stack?: keyof typeof stackControls }>(
    (_props, ref) => {
      const {className, style, unstyled, variant = "controls", stack = "relative", ...props} = _props;
      const { dir } = useApp();
      return <ul {...{ ref, "data-demo": "controls", dir, ...getStyles(variant, { unstyled, className: cn(stackControls[stack], className), style }), ...props }} />
    }
  ),
  control: React.forwardRef<HTMLLIElement, ComponentProps<"li">>(
    (_props, ref) => {
      const {className, style, unstyled, variant = "control", ...props} = _props;
      const { dir } = useApp();
      return <li {...{ ref, "data-demo": "control", dir, ...getStyles(variant, { unstyled, className, style }), ...props }} />
    }
  ),
  button: React.forwardRef<HTMLButtonElement, ComponentProps<"button">>(
    (_props, ref) => {
      const {className, style, unstyled, type = "button", variant = "button", ...props} = _props;
      return <button {...{ ref, type, ...getStyles(variant, { unstyled, className: cn( size[26], className), style }), ...props }} />
    }
  ),
  label: React.forwardRef<HTMLLabelElement, ComponentProps<"label">>(
    (_props, ref) => {
      const {className, style, unstyled, "aria-label": al = "label", variant = "label", title, children, ...props} = _props;
      return <label {...{ ref, "aria-label": al, ...getStyles(variant, { unstyled, className, style }), ...props }}>{children || title}</label>
    }
  ),
  slider: React.forwardRef<HTMLDivElement, SliderProps>(
    (_props, ref) => {
      const {...props} = _props;
      const ctx = useApp();
      return <Slider {...{ ref, dir: ctx.dir, ...props }} />
    }
  ),
  input: React.forwardRef<HTMLInputElement, ComponentProps<"input">>(
    (_props, ref) => {
      const {className, style, unstyled, variant = "input", ...props} = _props;
      return <Input {...{ ref, ...getStyles(variant, { unstyled, className, style }), ...props }} />
    }
  ),
  nameprops: React.forwardRef<HTMLSpanElement, ComponentProps<"span">>(
    (_props, ref) => {
      const {className, style, unstyled, variant = "nameprops", ...props} = _props;
      return <span {...{ ref, ...getStyles(variant, { unstyled, className, style }), ...props }} />
    }
  ),
  comment: React.forwardRef<HTMLElement, ComponentProps<"kbd">>(
    (_props, ref) => {
      const {className, style, unstyled, title, variant = "comment", ...props} = _props;
      return (
        <kbd {...{ ref, ...getStyles(variant, { unstyled, className, style }), ...props }}>
          {props.children || title}
        </kbd>
      );
    }
  ),
  code: React.forwardRef<HTMLElement, ComponentProps<"samp">>(
    (_props, ref) => {
      const {className, style, unstyled, title, variant = "code", ...props} = _props;
      return (
        <samp {...{ ref, ...getStyles(variant, { unstyled, className, style }), ...props }}>
          {props.children || title}
        </samp>
      );
    }
  ),
  select: React.forwardRef<HTMLSelectElement, ComponentProps<"select">>(
    (_props, ref) => {
      const {className, style, unstyled, variant = "button", ...props} = _props;
      const setClassName = cn("max-h-40 cursor-pointer border-primitive-emphasis font-inter scrollbar", className);
      return <select {...{ ref, ...getStyles(variant, { unstyled, className: setClassName, style }), ...props }} />
    }
  ),
  option: React.forwardRef<HTMLOptionElement, ComponentProps<"option">>(
    (_props, ref) => {
      const {className, style, unstyled, variant = "option", ...props} = _props;
      return <option {...{ ref, ...getStyles(variant, { unstyled, className, style }), ...props }} />
    }
  ),
  div: React.forwardRef<HTMLDivElement, ComponentProps<"div">>(
    (_props, ref) => {
      const {className, style, unstyled, variant = "div", ...props} = _props;
      return <div {...{ ref, ...getStyles(variant, { unstyled, className, style }), ...props }} />
    }
  )
};
Composite.area.displayName = "Composite.area";
Composite.controls.displayName = "Composite.controls";
Composite.control.displayName = "Composite.control";
Composite.button.displayName = "Composite.button";
Composite.label.displayName = "Composite.label";
Composite.slider.displayName = "Composite.slider";
Composite.nameprops.displayName = "Composite.nameprops";
Composite.input.displayName = "Composite.input"
Composite.div.displayName = "Composite.div"
Composite.comment.displayName = "Composite.comment";
Composite.code.displayName = "Composite.code";
Composite.select.displayName = "Composite.select";
Composite.option.displayName = "Composite.option";

export function SetBoolean(X: {
  label: string;
  boo: boolean;
  setBoo: (v: boolean) => void;
  booleanish?: boolean;
}) {
  const { label, booleanish = true, boo, setBoo } = X;
  return (
    <Composite.control>
      <Composite.button onClick={() => setBoo(!boo)} className={cn("min-w-max",{"border-constructive bg-constructive/20":boo})}>
        <Composite.nameprops>
          {label}
          {booleanish && "="}
        </Composite.nameprops>
        {booleanish && "{"}
        {booleanish && <span className="italic">{boo ? "true" : "false"}</span>}
        {booleanish && "}"}
      </Composite.button>
    </Composite.control>
  );
}

export function SetText(X: { str: string; setStr: (v: string) => void } & ComponentProps<"input">) {
  const { str, setStr, className, ...props } = X;
  return (
    <Composite.control>
      <Composite.input
        id="text"
        name="text"
        title="input text"
        value={str}
        onChange={e => setStr(e.target.value)}
        className={cn("min-w-[auto]", className)}
        {...props}
      />
    </Composite.control>
  );
}

export function SetRadio(
  X: { label: string; values: string[] } & inferType<typeof useDemo>
) {
  const { str, setStr, label, values } = X;
  return values.map(i => (
    <Composite.control key={i}>
      <Composite.input id={i} name={i} value={i} checked={str === i} onChange={e => setStr(e.target.value)} />
      <label htmlFor={i}>
        {label}=&quot;{i}&quot;
      </label>
    </Composite.control>
  ));
}

export function SetSelect(X: {
  label?: string;
  values: string[];
  str: string;
  setStr: (e: string) => void;
  variant?: "button" | "select";
}) {
  const { str, setStr, values, label = "select", variant = "select" } = X;
  switch (variant) {
    case "button":
      return (
        <Composite.control className="flex-col items-start gap-1 rounded-lg border border-primitive-emphasis bg-primitive p-1">
          <Composite.label id={label} title={label} aria-label={label}>
            {label}
          </Composite.label>
          <div data-selects="button" className="grid w-full grid-cols-2 gap-1">
            {values.map(i => (
              <Composite.button
                key={i}
                onClick={() => setStr(i)}
                className={cn(
                  "w-full min-w-16 text-center",
                  str === i && "border-constructive bg-constructive/20"
                )}
              >
                {capitalizeFirst(i)}
              </Composite.button>
            ))}
          </div>
        </Composite.control>
      );

    case "select":
      return (
        <Composite.control className="flex-col items-start rounded-lg border border-primitive-emphasis bg-primitive p-1">
          {label && (
            <Composite.label title={label} aria-label={label} htmlFor={sanitizedWord(label)}>
              {label}
            </Composite.label>
          )}
          <Composite.select
            id={sanitizedWord(label)}
            name={sanitizedWord(label)}
            title={label}
            aria-label={label}
            value={str}
            data-selects="select"
            onChange={e => setStr(e.target.value)}
          >
            {values.map(i => (
              <Composite.option key={i} value={i}>
                {capitalizeFirst(i)}
              </Composite.option>
            ))}
          </Composite.select>
        </Composite.control>
      );
  }
}

export function SetColor(X: {
  format?: ColorFormat;
  str: string;
  setStr: (e: string) => void;
  swatches?: string[];
  className?: string,
  label?: string,
}) {
  const {
    format = "hsla",
    swatches = ["#82c91e", "#fab005", "#fd7e14"],
    str,
    setStr,
    className,
    label = undefined
  } = X;
  const ctx = useStringToHEx({ color: str, setColor: setStr });
  const swatchRow = swatches.length > 0;

  return (
    <Composite.control className={cn("items-center gap-2", className)}>
      {swatchRow && (
        <ColorPicker
          format={format}
          withShadow
          swatchPerRow={swatches.length}
          value={ctx.color}
          onChange={e => ctx.setColor(e)}
          swatches={swatches}
          className="grow"
          round={14}
          styles={{
            swatch: { "--cp-swatch-h": "2rem" }
          }}
        />
      )}

      <Sheets align="start" sideOffset={6} clickOutsideToClose variant="dropdown">
        <SheetsTrigger
          id="dropdown"
          data-label={label}
          unstyled
          {...getStyles("button",
            {className: cn(
              size.icon, "justify-center", swatchRow ? "flex-[1_1_68.25%]" : "w-full",
              { "mt-4 before:absolute before:content-[attr(data-label)] before:text-sm before:-top-6 before:text-muted-foreground before:left-0": label }
            )}
          )}
        >
          <ColorPickerIcon />
        </SheetsTrigger>

        <SheetsContent className="w-full min-w-max max-w-[178px] p-1.5">
          <ColorPicker
            format={format}
            swatchPerRow={5}
            value={ctx.color}
            onChange={e => ctx.setColor(e)}
            // className="block w-full [--cp-saturation-height:6.5rem] [--cp-width:100%]"
            withPicker
            swatches={[
              "#2e2e2e",
              "#868e96",
              "#fa5252",
              "#F3457B",
              "#be4bdb",
              "#965BA0",
              "#7950f2",
              "#228be6",
              "#15aabf",
              "#12b886"
            ]}
          />
          <Composite.input
            id="set-input-color"
            title="input color"
            name="set-input-color"
            value={ctx.color}
            onChange={e => ctx.setColor(e.target.value)}
            className="stylelayer-inputs relative mt-2 inline-flex h-[--input-h,var(--input-sz)] w-auto min-w-full max-w-full flex-1 grow cursor-text appearance-none items-center justify-start rounded-md border border-primitive-foreground bg-background px-2 py-1 text-xs text-muted-foreground ring-offset-constructive/35 transition-colors [-moz-appearance:none] [-webkit-appearance:none] placeholder:text-muted-foreground focus-visible:border-constructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:placeholder:text-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          />
        </SheetsContent>
      </Sheets>
    </Composite.control>
  );
}

const markSize = [
  { value: 0, label: "xs" },
  { value: 25, label: "sm" },
  { value: 50, label: "md" },
  { value: 75, label: "lg" },
  { value: 100, label: "xl" }
];
export const rangeSz = (val: number) => markSize.find((mark) => mark.value === val)!.label
export function SetRange(
  X: { setNumb: (e: number) => void } & React.ComponentProps<"input"> & {
      label: string;
      withMarkSize?: boolean;
    }
) {
  const { label, value, setNumb, className, min = 0, max = 100, withMarkSize, ...props } = X;
  const ctx = useApp();
  return (
    <Composite.control className={className}>
      <Composite.label aria-label={label} unstyled className="text-sm leading-none text-muted-foreground">
        <Composite.nameprops>{label}</Composite.nameprops>
        {!withMarkSize && <span>=&#123;{value}&#125;</span>}
      </Composite.label>
      <Slider
        dir={ctx.dir} id={label} name={label}
        value={Number(value)} onChange={setNumb}
        min={withMarkSize ? undefined : Number(min)} max={withMarkSize ? undefined : Number(max)}
        label={withMarkSize ? rangeSz : undefined}
        step={withMarkSize ? 25 : undefined}
        marks={withMarkSize ? markSize : undefined}
        styles={{ markLabel: { display: "none" } }}
        hiddenInputProps={props}
      />
    </Composite.control>
  );
}

export function SetSideAlign(X: {
  setAlign?: (v: `${DataAlign}`) => void;
  setSide?: (v: `${DataSide}`) => void;
  align?: `${DataAlign}`;
  side?: `${DataSide}`;
}) {
  const { side, align, setAlign, setSide } = X;
  if (!side && !align) return null;
  return (
    <Composite.control className="gap-2 max-md:[--direction:row]">
      {setSide && side && (
        <Composite.button onClick={() => setSide(nextValue(side, dataSide))}>
          <Composite.nameprops>side=</Composite.nameprops>
          <span>&quot;{side}&quot;</span>
        </Composite.button>
      )}

      {setAlign && align && (
        <Composite.button onClick={() => setAlign(nextValue(align, dataAlign))}>
          <Composite.nameprops>align=</Composite.nameprops>
          <span>&quot;{align}&quot;</span>
        </Composite.button>
      )}
    </Composite.control>
  );
}

// Export as a composite component
type __docs_demoComposite = React.ForwardRefExoticComponent<__docs_demoProps> & {
  area: typeof Composite.area;
  controls: typeof Composite.controls;
  control: typeof Composite.control;
  button: typeof Composite.button;
  label: typeof Composite.label;
  slider: typeof Composite.slider;
  nameprops: typeof Composite.nameprops;
  input: typeof Composite.input;
  div: typeof Composite.div;
  comment: typeof Composite.comment;
  code: typeof Composite.code;
  select: typeof Composite.select;
  option: typeof Composite.option;
  setBoo: typeof SetBoolean;
  setText: typeof SetText;
  setRange: typeof SetRange;
  setRadio: typeof SetRadio;
  setSelect: typeof SetSelect;
  setColor: typeof SetColor;
  setSideAlign: typeof SetSideAlign;
  useDemo: typeof useDemo;
  sz: typeof rangeSz;
};
// Attach sub-components
__docs_demo.area = Composite.area;
__docs_demo.controls = Composite.controls;
__docs_demo.control = Composite.control;
__docs_demo.button = Composite.button;
__docs_demo.label = Composite.label;
__docs_demo.slider = Composite.slider;
__docs_demo.nameprops = Composite.nameprops;
__docs_demo.input = Composite.input;
__docs_demo.div = Composite.div;
__docs_demo.comment = Composite.comment;
__docs_demo.code = Composite.code;
__docs_demo.select = Composite.select;
__docs_demo.option = Composite.option;
__docs_demo.setBoo = SetBoolean;
__docs_demo.setText = SetText;
__docs_demo.setRange = SetRange;
__docs_demo.setRadio = SetRadio;
__docs_demo.setSelect = SetSelect;
__docs_demo.setColor = SetColor;
__docs_demo.setSideAlign = SetSideAlign;
__docs_demo.useDemo = useDemo;
__docs_demo.sz = rangeSz;

export function useDemo({
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
export const alignItemsValues = [
  "stretch",
  "center",
  "flex-start",
  "flex-end"
  // "end",
  // "start",
  // "self-end",
  // "self-start",
  // "baseline",
  // "normal",
];
export const justifyContentValues = [
  "center",
  "flex-start",
  "flex-end",
  "space-between",
  "space-around"
  // "space-evenly",
  // "stretch",
  // "end",
  // "start",
  // "left",
  // "normal",
  // "right",
];

/**
[data-docs="demo-preview"] {
  @apply relative flex size-full min-h-[30rem] max-w-full items-center justify-center [--inset-controls:calc(var(--p)*-1)] [--p:1rem] [--p2:calc(var(--p)*2)] max-xl:flex-col max-xl:justify-between;

  & [data-demo="area"] {
    @apply min-h-full min-w-[auto] appearance-none max-xl:m-auto p-[--p];
  }

  & [data-demo="controls"] {
    @apply relative p-[--p] flex justify-start gap-3 bg-background max-xl:ml-0 max-xl:mt-4 max-xl:h-max max-xl:flex-none max-xl:flex-row max-xl:flex-wrap max-xl:items-center max-xl:border-t xl:h-full xl:flex-[0_0_15rem] xl:flex-col xl:items-stretch xl:border-l [&_span]:text-nowrap [&_span]:font-mono;

    &:first-of-type,
    &:only-of-type {
      @apply appearance-none;
    }
    &:not(:first-of-type) {
      @apply mt-4;
    }
  }

  & [data-demo="control"] {
    @apply flex [flex-direction:--direction,column] max-xl:[flex:--f,1];
    &:has([data-cp]) {
      @apply [--direction:row-reverse];
    }
    &:has(select, .stylelayer-slider) {
      @apply [--f:0_0_calc((100%-0.75rem)/2)];
    }
    &:last-of-type {
      @apply max-xl:mb-0;
      @apply mb-auto;
    }
  }

  &:has([data-demo="controls"]) {
    @apply appearance-none;
  }
  &:not(:has([data-demo="controls"])) {
    @apply p-4;
  }

  & hr[data-ignore] {
    @apply w-full my-4;
  }
}
 */