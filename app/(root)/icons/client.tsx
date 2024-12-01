"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Tabs } from "@/source/ui/tabs";
import { log } from "@/source/log/development";
import {
  Sheets,
  SheetsClosed,
  SheetsContent,
  SheetsTrigger
} from "@/modules/components/web";
import { FileIcon, Svg } from "@/modules/icons";
import { Playground } from "@/source/ui/playground";
import { toPascalCase, Tooltip } from "@/modules/index";
import { Code } from "@/source/ui/code";
import { Comp } from "@/source/ui/components";
import { cn } from "str-merge";
// import { CopyButton } from "@/source/ui/toggle";

const FallbackComponent = (slug: string) => (
  <div>
    <p className=" border-b pb-1 pt-2">Component not found</p>
    <a
      href={`https://github.com/ilkhoeri/oeri/edit/main/resource/icons/${slug}.tsx`}
      target="_blank"
      className="w-max justify-start gap-2 pb-1.5 pt-3 text-sm text-muted-foreground transition-colors underline-hover hover:text-constructive"
    >
      Edit this page on GitHub <FileIcon arrow />
    </a>
  </div>
);

export function LoadComponent({
  file,
  _raw,
  content,
  segment,
  setInnerHTML
}: {
  file: string;
  content?: string | null;
  setInnerHTML?: string | null;
  segment: string[] | undefined;
  _raw?: {
    _raw: string | undefined;
    content: string | undefined;
  };
}) {
  const Component = dynamic(
    () =>
      import(`@/resource/docs/icons/${file}`)
        .then(mod => mod.Icon)
        .catch(err => {
          log("Error loading component:", err);
          return FallbackComponent(file);
        }),
    {
      ssr: false,
      loading: () => (
        <div className="size-full animate-pulse rounded-sm bg-muted" />
      )
    }
  );

  return (
    <Sheets variant="drawer" side="bottom">
      <Tooltip
        asChild
        content={`<${toPascalCase(file.replace(".tsx", "Icon"))}/>`}
        classNames={{
          trigger:
            "flex aspect-square cursor-pointer items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-md hover:text-color [@media(@supports_(hover:hover))]:hover:bg-muted/60",
          content: "font-geist-mono"
        }}
      >
        <SheetsTrigger unstyled data-content>
          <React.Suspense>
            <Component />
          </React.Suspense>
        </SheetsTrigger>
      </Tooltip>

      <SheetsContent className="pr-0">
        <div className="flex size-full max-h-[76vh] flex-col gap-4 overflow-y-auto p-2 pr-8 webkit-scrollbar">
          <div className="">
            <div
              className="flex aspect-square items-center justify-center rounded-lg sizer [--sz:240px] [&>svg]:sizer"
              {...{
                style: {
                  "--hex": "hsl(var(--muted-foreground)/0.7)",
                  background:
                    "0 5.2px / 20px 20px linear-gradient(0deg, transparent 24%, var(--hex) 25%, var(--hex) 26%, transparent 27%, transparent 74%, var(--hex) 75%, var(--hex) 76%, transparent 77%, transparent), 4.8px 0 / 20px 20px linear-gradient(90deg, transparent 24%, var(--hex) 25%, var(--hex) 26%, transparent 27%, transparent 74%, var(--hex) 75%, var(--hex) 76%, transparent 77%, transparent), 0px 10px / 10px 10px radial-gradient(var(--hex) .5px, #0000 .5px)",
                  boxShadow: "0 0 0 0.3px var(--hex)"
                } as React.CSSProperties
              }}
            >
              <React.Suspense>
                <Component />
              </React.Suspense>
            </div>

            {/* {_raw?._raw && <CopyButton value={_raw?._raw || undefined} />} */}
          </div>

          <Tabs defaultValue="code" className="mb-12 w-full">
            <Playground
              expand="collapse"
              childrens={{
                code: (
                  <Code
                    code={content}
                    setInnerHTML={setInnerHTML}
                    repo={`${segment?.[segment?.length - 1]}/${file}`}
                    title={`<${toPascalCase(file.replace(".tsx", "Icon"))}/>`}
                    className="[&>h4]:font-geist-mono [&_code]:max-h-[300px] [&_code]:overflow-y-auto"
                  />
                ),
                raw: _raw && (
                  <Code
                    code={_raw._raw}
                    setInnerHTML={_raw.content}
                    repo={`${segment?.[segment?.length - 1]}/${file}`}
                    title={file.replace(".tsx", ".svg")}
                    className="[&>h4]:font-geist-mono [&_code]:max-h-[300px] [&_code]:overflow-y-auto [&_code]:sizer [&_code]:![--sz-w:100%]"
                  />
                )
              }}
            />
          </Tabs>
        </div>
        <SheetsClosed />
      </SheetsContent>
    </Sheets>
  );
}

export function LayoutIconsPage({ children }: { children: React.ReactNode }) {
  const [reset, setReset] = React.useState<boolean>(false);
  const [fill, setFill] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<string>("currentColor");
  const [stroke, setStroke] = React.useState<number>(20);
  const [size, setSize] = React.useState<number>(24);

  React.useEffect(() => {
    if (reset) {
      setFill(false);
      setColor("currentColor");
      setStroke(20);
      setSize(24);
      setReset(false); // Matikan reset agar tidak terus berjalan
    }
  }, [reset]);

  return (
    <Comp>
      <aside className="inset-y-0 m-0 h-[--aside-h] max-h-[--aside-h] w-0 overflow-hidden bg-background [--aside-h:100dvh] [--aside-lx:calc(var(--aside)+0rem)] [transition:all_0.5s_ease] data-[state=open]:pl-6 max-md:fixed max-md:left-0 max-md:z-[111] max-md:border-0 max-md:border-r-[0.04rem] max-md:border-r-muted/75 max-md:data-[state=open]:w-[--aside-lx] max-md:data-[state=open]:min-w-[--aside-lx] max-md:data-[state=open]:max-w-[--aside-lx] max-md:data-[state=closed]:px-0 max-md:data-[state=closed]:opacity-0 md:sticky md:left-0 md:top-[calc(var(--navbar)+2rem)] md:mt-[2rem] md:w-[--aside-lx] md:min-w-[--aside-lx] md:max-w-[--aside-lx] md:pl-4 md:transition-none md:[--aside-h:calc(100dvh-2rem)]">
        <nav className="pt-8 [&_*]:font-geist-mono">
          <div className="relative mb-6 grid grid-flow-row gap-8 rounded-lg border border-constructive bg-background p-6 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-bold leading-4 text-muted-foreground">
                {" "}
                Customizer{" "}
              </h2>
              <button
                className="inline-flex rounded-md border-0 bg-transparent p-0 [&>svg]:active:rotate-45 [&>svg]:active:scale-105"
                type="button"
                aria-label="reset"
                title="Reset"
                onClick={() => setReset(true)}
              >
                <Svg className="size-5 [transition:ease_.25s_transform]">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                  <path d="M21 3v5h-5"></path>
                </Svg>
              </button>
            </div>

            <input
              id="color"
              title="color"
              name="color"
              type="color"
              className="size-9 min-w-9"
              value={color}
              onChange={e => setColor(e.target.value)}
            />

            <div className="relative flex w-full flex-row items-center justify-between">
              <label
                htmlFor="current-fill"
                className="flex cursor-pointer select-none items-center"
              >
                <div className="relative">
                  <input
                    aria-label="fill"
                    type="checkbox"
                    id="current-fill"
                    name="current-fill"
                    checked={fill}
                    hidden
                    onChange={() => setFill(!fill)}
                    className="peer sr-only hidden"
                  />
                  <div className="h-5 w-14 rounded-full bg-muted shadow-inner ring-2 ring-inset ring-color" />
                  <div className="absolute -top-1 left-0 flex size-7 items-center justify-center rounded-full bg-color shadow-md transition peer-checked:translate-x-full peer-checked:bg-constructive peer-checked:[&>span]:bg-white">
                    <span className="size-4 rounded-full bg-muted-foreground shadow-sm" />
                  </div>
                </div>
              </label>

              <label htmlFor="current-fill">
                {fill ? "currentColor" : "default"}
              </label>
            </div>

            <div className="relative w-full gap-3">
              <label
                htmlFor="set-stroke-width"
                className="inline-flex w-full items-center justify-between"
              >
                <span>strokeWidth</span> <span>&#123;{stroke / 10}&#125;</span>
              </label>
              <input
                type="range"
                name="set-stroke-width"
                id="set-stroke-width"
                min="5"
                max="35"
                value={stroke}
                onChange={e => setStroke(Number(e.target.value))}
              />
            </div>

            <div className="relative w-full gap-3">
              <label
                htmlFor="set-size"
                className="inline-flex w-full items-center justify-between"
              >
                <span>size</span> <span>&quot;{size}px&quot;</span>
              </label>
              <input
                type="range"
                name="set-size"
                id="set-size"
                min="16"
                max="48"
                value={size}
                onChange={e => setSize(Number(e.target.value))}
              />
            </div>
          </div>
        </nav>
      </aside>

      <article
        className={cn(
          "relative mx-auto mt-16 min-h-screen w-full px-6 [--sz:24px] md:px-8 lg:px-10 xl:px-12 [&_[data-content]>svg]:transition-all [&_[data-content]>svg]:sizer [&_[data-content]>svg]:[color:--clr] [&_[data-content]>svg]:[stroke-width:--str-w] [&_svg]:[will-change:width,height,stroke-width,stroke,color,fill]",
          {
            "[&_[data-content]>svg[stroke=none]]:[fill:--fill] [&_[data-content]>svg[stroke=none]_*]:[fill:--fill]":
              fill
          }
        )}
        {...{
          style: {
            "--str-w": `${stroke / 10}px`,
            "--clr": `${color}`,
            "--sz": `${size}px`,
            "--fill": fill ? `${color}` : undefined
          } as React.CSSProperties
        }}
      >
        {children}
      </article>
    </Comp>
  );
}
