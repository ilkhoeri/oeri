"use client";
import { useState } from "react";
import { nextValue } from "../utils";
import { cn, cvx } from "str-merge";
import { Button } from "@/source/ui/button";
import { capitalizeWords } from "@/modules/ondevelopment/utils";
import { TabsContent, TabsList, TabsTrigger } from "@/source/ui/tabs";

enum MarkdownValue {
  Code = "code",
  Raw = "raw",
  Css = "css",
  Edit = "edit",
  Usage = "usage",
  Preview = "preview",
  Tailwind = "tailwind"
}
enum Expands {
  "expand" = "expand",
  "expand-full" = "expand-full",
  "collapse" = "collapse"
}
type _PlayOrigin = "tablist" | "content" | "expand";

type RecordNested<
  U extends string,
  T extends string,
  P = Record<string, unknown>
> = {
  [K in U]?: Partial<Record<T, P>>;
};
type PlaygroundType = RecordNested<
  "childrens",
  MarkdownValue,
  React.ReactNode
> & {
  expand?: `${Expands}`;
  defaultState?: MarkdownValue;
  classNames?: Partial<Record<_PlayOrigin, string>>;
};

const classes = cvx({
  variants: {
    card: {
      default:
        "relative rounded-lg border shadow-sm min-h-[62px] bg-background-code-body",
      resize:
        "relative rounded-lg border shadow-sm bg-background-code-body transition-all overflow-hidden"
    },
    statecard: {
      expand:
        "h-[20rem] max-h-[20rem] text-muted-foreground before:content-[''] before:absolute before:bottom-0 before:inset-x-0 before:size-full before:bg-gradient-to-t before:from-background/60 before:z-4",
      "expand-full":
        "h-max min-h-max max-h-[32rem] [&_[data-code-fragment]]:overflow-auto [&_[data-code-fragment]]:max-h-[calc(32rem-3rem)]",
      collapse:
        "h-max max-h-max [&_[data-code-fragment]]:pb-[2.5rem] [&_[data-code-fragment]]:overflow-auto [&_[data-code-fragment]]:max-h-max"
    },
    button: {
      resizer:
        "absolute bottom-4 inset-x-[calc(50%-3rem)] z-9 py-1.5 px-3 min-w-26 w-max transition-[bottom,color,opacity]",
      tabs: "h-9 font-semibold rounded-none data-[state=active]:[box-shadow:0_2px_0_0_hsl(var(--color))] [&_svg]:sizer [--sz:20px] select-none"
    }
  }
});

const EXPAND_VALUES: `${Expands}`[] = Object.values(Expands);

function Resizer({
  expand,
  setExpand,
  className
}: {
  expand: `${Expands}`;
  setExpand: (v: `${Expands}`) => void;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      data-expand={expand}
      className={cn(classes({ button: "resizer" }), className)}
      onClick={() => setExpand(nextValue(expand, EXPAND_VALUES))}
    >
      {capitalizeWords(expand)}
    </Button>
  );
}

export function Playground(_Play: PlaygroundType) {
  const { childrens, expand: defaultExpand = "expand", classNames } = _Play;
  const [expand, setExpand] = useState<`${Expands}`>(defaultExpand);

  const tabs = Object.values(MarkdownValue);
  const omitTab = (key: MarkdownValue) => key === "edit" || key === "preview";

  if (!childrens) return null;

  return (
    <>
      <TabsList
        id={undefined}
        className={cn(
          "w-full flex justify-start bg-background border-b rounded-none p-0 pb-px",
          classNames?.tablist
        )}
      >
        {tabs.map(
          key =>
            childrens[key] && (
              <TabsTrigger
                id={undefined}
                key={key}
                value={key}
                title={key}
                className={classes({ button: "tabs" })}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TabsTrigger>
            )
        )}
      </TabsList>

      {tabs.map(
        key =>
          childrens[key] && (
            <TabsContent
              id={undefined}
              key={key}
              value={key}
              className={cn(
                classes({
                  card: "default",
                  ...(!omitTab(key)
                    ? { statecard: expand, card: "resize" }
                    : {})
                }),
                classNames?.content
              )}
            >
              {childrens[key]}
              {!omitTab(key) && (
                <Resizer
                  expand={expand}
                  setExpand={setExpand}
                  className={classNames?.expand}
                />
              )}
            </TabsContent>
          )
      )}
    </>
  );
}
