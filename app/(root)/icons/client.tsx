"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Tabs } from "@/source/ui/tabs";
import { log } from "@/source/log/development";
import {
  Input,
  Sheets,
  SheetsClosed,
  SheetsContent,
  SheetsTrigger
} from "@/modules/components/web";
import { FileIcon, Svg, XIcon } from "@/modules/icons";
import { Playground } from "@/source/ui/playground";
import { toPascalCase, Tooltip } from "@/modules/index";
import { Code } from "@/source/ui/code";
import { Comp } from "@/source/ui/components";
import { cn } from "str-merge";
import { RawToJsonProps } from "@/source/generated/generated";
import { cleanHTML } from "@/source/libs/dom-purify";
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

export const component = (file: string) =>
  dynamic(
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

export function LoadComponent({
  files,
  _raw,
  content,
  segment,
  setInnerHTML
}: {
  files: RawToJsonProps;
  content?: string | null;
  setInnerHTML?: string | null;
  segment: string[] | undefined;
  _raw?: {
    raw: string | undefined;
    content: string | undefined;
  };
}) {
  // const Component = component(files.file);
  return (
    <Sheets variant="drawer" side="bottom">
      <Tooltip
        asChild
        content={`${toPascalCase(files.file.replace(".tsx", "Icon"))}`}
        classNames={{
          trigger:
            "aspect-square cursor-pointer flex items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-md hover:text-color [@media(@supports_(hover:hover))]:hover:bg-muted/60",
          content: "font-geist-mono"
        }}
      >
        <SheetsTrigger
          unstyled
          data-content
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: cleanHTML(String(files.raw))
          }}
        />
      </Tooltip>

      <SheetsContent className="pr-0">
        <div className="flex size-full max-h-[76vh] min-h-[76vh] flex-col gap-4 overflow-y-auto p-2 pr-8 webkit-scrollbar">
          <div className="">
            <React.Suspense>
              <div
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(String(files.raw))
                }}
                {...{
                  className:
                    "flex aspect-square items-center justify-center rounded-lg sizer [--sz:240px] [&>svg]:sizer",
                  style: {
                    "--hex": "hsl(var(--muted-foreground)/0.7)",
                    background:
                      "0 5.2px / 20px 20px linear-gradient(0deg, transparent 24%, var(--hex) 25%, var(--hex) 26%, transparent 27%, transparent 74%, var(--hex) 75%, var(--hex) 76%, transparent 77%, transparent), 4.8px 0 / 20px 20px linear-gradient(90deg, transparent 24%, var(--hex) 25%, var(--hex) 26%, transparent 27%, transparent 74%, var(--hex) 75%, var(--hex) 76%, transparent 77%, transparent), 0px 10px / 10px 10px radial-gradient(var(--hex) .5px, #0000 .5px)",
                    boxShadow: "0 0 0 0.3px var(--hex)"
                  } as React.CSSProperties
                }}
              />
            </React.Suspense>

            {/* {_raw?._raw && <CopyButton value={_raw?._raw || undefined} />} */}
          </div>

          <Tabs defaultValue="code" className="mb-12 w-full">
            <Playground
              expand="collapse"
              classNames={{ expand: "hidden" }}
              childrens={{
                code: (
                  <Code
                    code={content}
                    setInnerHTML={setInnerHTML}
                    repo={`${segment?.[segment?.length - 1]}/${files.file}`}
                    title={`<${toPascalCase(files.file.replace(".tsx", "Icon"))}/>`}
                    classNames={{
                      title: "font-geist-mono",
                      content: "[&_code]:max-h-[300px] [&_code]:overflow-y-auto"
                    }}
                  />
                ),
                raw: _raw && (
                  <Code
                    code={_raw.raw}
                    setInnerHTML={_raw.content}
                    href={`https://github.com/ilkhoeri/oericons/blob/master/resource/svg/${files.file.replace(".tsx", ".svg")}`}
                    title={files.file.replace(".tsx", ".svg")}
                    classNames={{
                      title: "font-geist-mono",
                      content:
                        "[&_code]:max-h-[300px] [&_code]:overflow-y-auto [&_code]:scrollbar [&_code]:!sizer [&_code]:[--sz-w:100%]"
                    }}
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
  const [open, setOpen] = React.useState<boolean>(false);
  const [reset, setReset] = React.useState<boolean>(false);
  const [fill, setFill] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<string>("currentcolor");
  const [stroke, setStroke] = React.useState<number>(20);
  const [size, setSize] = React.useState<number>(24);

  React.useEffect(() => {
    if (reset) {
      setFill(false);
      setColor("currentcolor");
      setStroke(20);
      setSize(24);
      setReset(false); // Matikan reset agar tidak terus berjalan
    }
  }, [reset]);

  return (
    <Comp>
      <aside
        data-state={open ? "open" : "closed"}
        className="top-0 m-0 h-[--aside-h] max-h-[--aside-h] w-0 overflow-hidden pr-2 [--aside-h:100dvh] [--aside-lx:calc(var(--aside)+0rem)] [transition:all_0.5s_ease] data-[state=open]:pl-6 max-md:fixed max-md:left-0 max-md:z-[99] max-md:border-0 max-md:data-[state=open]:w-[--aside-lx] max-md:data-[state=open]:min-w-[--aside-lx] max-md:data-[state=open]:max-w-[--aside-lx] max-md:data-[state=closed]:px-0 max-md:data-[state=closed]:opacity-0 md:sticky md:left-0 md:top-[calc(var(--navbar)+2rem)] md:mt-[2rem] md:w-[--aside-lx] md:min-w-[--aside-lx] md:max-w-[--aside-lx] md:pl-6 md:transition-none md:[--aside-h:calc(100dvh-2rem)]"
      >
        <nav className="pt-8 [&_*]:font-geist-mono">
          <div className="relative mb-6 grid grid-flow-row gap-8 rounded-lg bg-background-box p-6 pt-4 ring ring-background ring-offset-2 ring-offset-constructive">
            <div className="mb-3 flex items-center justify-center">
              <h2 className="mr-auto text-base font-bold leading-4 text-muted-foreground">
                Customizer
              </h2>

              <button
                className="inline-flex rounded-md border-0 bg-transparent p-0 [&>svg]:active:rotate-45 [&>svg]:active:scale-110 [&>svg]:active:text-constructive"
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

              <button
                className="ml-4 flex items-center justify-center rounded-md border-0 bg-transparent p-0 text-destructive md:!hidden"
                type="button"
                aria-label="closed"
                title="Closed"
                onClick={() => setOpen(false)}
              >
                <XIcon size={22} />
              </button>
            </div>

            <div className="relative flex w-full flex-row items-center gap-4">
              <Input
                id="color"
                title="color"
                name="color"
                type="color"
                className="size-9 min-w-9"
                value={color === "currentcolor" ? "#000000" : color}
                onChange={e => setColor(e.target.value)}
              />
              <input
                id="input-color"
                title="input-color"
                name="input-color"
                type="text"
                className="h-9 w-full rounded-md border px-3 text-sm"
                value={color}
                onChange={e => setColor(e.target.value)}
              />
            </div>

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
                  <div className="h-5 w-14 rounded-full bg-muted shadow-inner ring-2 ring-inset ring-transparent focus-visible:ring-constructive/60 peer-checked:bg-color" />
                  <div className="absolute -top-1 left-0 flex size-7 items-center justify-center rounded-full bg-color shadow-md transition peer-checked:translate-x-full peer-checked:bg-white peer-checked:[&>span]:bg-constructive">
                    <span className="size-4 rounded-full bg-muted-foreground shadow-sm" />
                  </div>
                </div>
              </label>

              <label htmlFor="current-fill">
                {fill ? "currentColor" : "solidFill"}
              </label>
            </div>

            <div className="relative w-full gap-3">
              <label
                htmlFor="set-stroke-width"
                className="inline-flex w-full items-center justify-between"
              >
                <span>strokeWidth</span> <span>&#123;{stroke / 10}&#125;</span>
              </label>
              <Input
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
              <Input
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
          "relative mx-auto mt-16 min-h-screen w-full p-[0_var(--p)_var(--p)_calc(var(--p)-0.5rem)] [--p:1.5rem] [--sz:24px] lg:[--p:2rem] xl:[--p:2.5rem] [&_[data-content]>svg]:transition-all [&_[data-content]>svg]:sizer [&_[data-content]>svg]:[color:--clr] [&_[data-content]>svg]:[stroke-width:--str-w] [&_svg]:[will-change:width,height,stroke-width,stroke,color,fill]",
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
        <button
          className="absolute bottom-[calc(100%+16px)] right-6 inline-flex rounded-md border-0 bg-background-box px-2 py-1 text-constructive ring ring-background ring-offset-2 ring-offset-constructive transition-transform active:scale-95 md:!hidden"
          type="button"
          aria-label="customizer"
          title="Customizer"
          onClick={() => setOpen(!open)}
        >
          Customizer
        </button>
        {children}
      </article>
    </Comp>
  );
}
