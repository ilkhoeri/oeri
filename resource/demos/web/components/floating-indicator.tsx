"use client";
import { useState } from "react";
import { UnstyledButton } from "@/ui/button";
import { FloatingIndicator, FloatingIndicatorProps } from "@/ui/floating-indicator";
import { DataTrees } from "@/resource/docs_demo/assets/demo-slot";
import { ArrowIcon, CircleIcon } from "@/icons/*";
import { cvx, cvxVariants } from "xuxi";

const codes = {
  usage:
    '"use client";\nimport { useState } from "react";\nimport { UnstyledButton } from "@/ui/button";\nimport { FloatingIndicator } from "@/ui/floating-indicator";\n\nconst data = ["React", "Vue", "Angular", "Svelte"];\n\nexport function FloatingIndicatorDemo() {\n  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);\n  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});\n  const [active, setActive] = useState(0);\n  const [hover, setHover] = useState<number | null>(null);\n\n  const setControlRef = (index: number) => (node: HTMLButtonElement) => {\n    controlsRefs[index] = node;\n    setControlsRefs(controlsRefs);\n  };\n  const isActive = (index: number) => (active === index ? "true" : undefined);\n\n  const controls = data.map((item, index) => (\n    <UnstyledButton\n      key={item}\n      className="touch-manipulation appearance-none rounded-md text-sm font-medium leading-none text-muted-foreground transition-[color] hover:text-color data-[active]:text-color"\n      ref={setControlRef(index)}\n      onClick={() => setActive(index)}\n      data-active={isActive(index)}\n    >\n      <span className="relative z-1 px-3 py-[.4375rem]" onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)}>{item}</span>\n    </UnstyledButton>\n  ));\n\n  return (\n    <div className="relative m-auto w-fit rounded-lg border bg-background p-[.3125rem]" ref={setRootRef}>\n      {controls}\n      <FloatingIndicator target={controlsRefs[hover ?? active]} parent={rootRef} className="rounded-md" />\n    </div>\n  );\n}',
  configurator:
    '"use client";\nimport { useState } from "react";\nimport { ArrowIcon, CircleIcon } from "@/icons/*";\nimport { UnstyledButton } from "@/ui/button";\nimport { FloatingIndicator } from "@/ui/floating-indicator";\nimport { cvx, cvxVariants } from "xuxi";\n\nconst classes = cvx({\n  variants: {\n    selector: {\n      root: "m-auto relative w-max p-2 rounded-lg border bg-muted/60",\n      indicator: "rounded-md shadow-md border border-solid",\n      controls: "flex",\n      control: "size-[50px] flex items-center justify-center text-muted-foreground rounded-md data-[active]:text-color hover:text-color [@media(hover:hover)]:hover:bg-muted/60 [&>svg]:block [&>svg]:relative [&>svg]:z-1"\n    }\n  }\n});\n\nconst style = (selector: NonNullable<cvxVariants<typeof classes>>["selector"]) => classes({ selector });\n\nexport function FloatingIndicatorMultipleDemo() {\n  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);\n  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});\n  const [active, setActive] = useState<string>("center");\n\n  const setControlRef = (name: string) => (node: HTMLButtonElement) => {\n    controlsRefs[name] = node;\n    setControlsRefs(controlsRefs);\n  };\n  const dataActive = (state: string) => ({ "data-active": active === state });\n\n  const controls = [\n    ["up-left", "up", "up-right"],\n    ["left", "center", "right"],\n    ["down-left", "down", "down-right"]\n  ];\n\n  const renderIcon = (name: string) => {\n    if (name === "center") return <CircleIcon size={26} stroke={1.5} />;\n    return <ArrowIcon arrow={name as any} size={26} stroke={1.5} />;\n  };\n\n  return (\n    <div className={style("root")} dir="ltr" ref={setRootRef}>\n      <FloatingIndicator{{props}} target={controlsRefs[active]} parent={rootRef} className={style("indicator")} />\n      {controls.map((row, rowIndex) => (\n        <div key={rowIndex} className={style("controls")}>\n          {row.map(name => (\n            <UnstyledButton\n              key={name}\n              className={style("control")}\n              onClick={() => setActive(name)}\n              ref={setControlRef(name)}\n              {...dataActive(name)}\n            >\n              {renderIcon(name)}\n            </UnstyledButton>\n          ))}\n        </div>\n      ))}\n    </div>\n  );\n}'
};

const data = ["React", "Vue", "Angular", "Svelte"];

function Demo() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };
  const isActive = (index: number) => (active === index ? "true" : undefined);

  const controls = data.map((item, index) => (
    <UnstyledButton key={item} className="touch-manipulation appearance-none rounded-md text-sm font-medium leading-none text-muted-foreground transition-[color] hover:text-color data-[active]:text-color" ref={setControlRef(index)} onClick={() => setActive(index)} data-active={isActive(index)}>
      <span className="relative z-1 px-3 py-[.4375rem]" onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)}>
        {item}
      </span>
    </UnstyledButton>
  ));

  return (
    <div className="relative m-auto w-fit rounded-lg border bg-background p-[.3125rem]" ref={setRootRef}>
      {controls}
      <FloatingIndicator target={controlsRefs[hover ?? active]} parent={rootRef} className="rounded-md" />
    </div>
  );
}

const classes = cvx({
  variants: {
    selector: {
      root: "m-auto relative w-max p-2 rounded-lg border bg-muted/60",
      indicator: "rounded-md shadow-md border border-solid",
      controls: "flex",
      control: "size-[50px] flex items-center justify-center text-muted-foreground rounded-md data-[active]:text-color hover:text-color [@media(hover:hover)]:hover:bg-muted/60 [&>svg]:block [&>svg]:relative [&>svg]:z-1"
    }
  }
});

const style = (selector: NonNullable<cvxVariants<typeof classes>>["selector"]) => classes({ selector });

function ConfiguratorDemo(props: FloatingIndicatorProps) {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [active, setActive] = useState<string>("center");

  const setControlRef = (name: string) => (node: HTMLButtonElement) => {
    controlsRefs[name] = node;
    setControlsRefs(controlsRefs);
  };
  const dataActive = (state: string) => ({ "data-active": active === state });

  const controls = [
    ["up-left", "up", "up-right"],
    ["left", "center", "right"],
    ["down-left", "down", "down-right"]
  ];

  const renderIcon = (name: string) => {
    if (name === "center") return <CircleIcon size={26} stroke={1.5} />;
    return <ArrowIcon arrow={name as any} size={26} stroke={1.5} />;
  };

  return (
    <div className={style("root")} dir="ltr" ref={setRootRef}>
      <FloatingIndicator {...props} target={controlsRefs[active]} parent={rootRef} className={style("indicator")} />
      {controls.map((row, rowIndex) => (
        <div key={rowIndex} className={style("controls")}>
          {row.map(name => (
            <UnstyledButton key={name} className={style("control")} onClick={() => setActive(name)} ref={setControlRef(name)} {...dataActive(name)}>
              {renderIcon(name)}
            </UnstyledButton>
          ))}
        </div>
      ))}
    </div>
  );
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
  classNames: { demoInner: "h-72 flex items-center justify-center" },
  controls: [
    { prop: "transitionDuration", type: "number", initialValue: 200, libraryValue: 200, min: 100, max: 1500 },
    { prop: "color", type: "color", initialValue: "yellowgreen", libraryValue: "#3b82f6" }
  ]
};

export const FloatingIndicatorDemos = {
  usage,
  configurator
};
