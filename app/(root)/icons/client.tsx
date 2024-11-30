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
import { FileIcon } from "@/modules/icons";
import { Playground } from "@/source/ui/playground";
import { toPascalCase, Tooltip } from "@/modules/index";
import { Code } from "@/source/ui/code";
import { sourceFile } from "@/source/utils";

const FallbackComponent = (slug: string) => (
  <div>
    <p className=" border-b pb-1 pt-2">Component not found</p>
    <a
      href={`https://github.com/ilkhoeri/oeri/edit/main/resource/icons/${slug}.tsx`}
      target="_blank"
      className="w-max justify-start gap-2 pb-1.5 pt-3 text-sm text-muted-foreground transition-colors underline-hover hover:text-constructive">
      Edit this page on GitHub <FileIcon arrow />
    </a>
  </div>
);

export function LoadComponent({
  file,
  content,
  segment,
  setInnerHTML
}: {
  file: string;
  content?: string | null;
  setInnerHTML?: string | null;
  segment: string[] | undefined;
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
        }}>
        <SheetsTrigger unstyled>
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
                  "--hex": "hsl(var(--color-muted))",
                  background:
                    "0 5.2px / 20px 20px linear-gradient(0deg, transparent 24%, var(--hex) 25%, var(--hex) 26%, transparent 27%, transparent 74%, var(--hex) 75%, var(--hex) 76%, transparent 77%, transparent), 4.8px 0 / 20px 20px linear-gradient(90deg, transparent 24%, var(--hex) 25%, var(--hex) 26%, transparent 27%, transparent 74%, var(--hex) 75%, var(--hex) 76%, transparent 77%, transparent), 0px 10px / 10px 10px radial-gradient(var(--hex) .5px, #0000 .5px)",
                  boxShadow: "0 0 0 0.3px var(--hex)"
                } as React.CSSProperties
              }}>
              <React.Suspense>
                <Component />
              </React.Suspense>
            </div>
          </div>

          <Tabs defaultValue="code" className="mb-12 w-full">
            <Playground
              expand="collapse"
              childrens={{
                code: (
                  <Code
                    code={content}
                    setInnerHTML={setInnerHTML}
                    repo={`${sourceFile(segment)}/${file}`}
                    title={`<${toPascalCase(file.replace(".tsx", "Icon"))}/>`}
                    className="[&>h4]:font-geist-mono [&_code]:max-h-[300px] [&_code]:overflow-y-auto"
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
