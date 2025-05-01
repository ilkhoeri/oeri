"use client";
import * as React from "react";
import { NpmCommands } from "../mdx/unist";
import { Tabs } from "@/ui/tabs";
import { Button } from "@/ui/button";
import { Event, trackEvent } from "../mdx/events";
import { useConfig } from "../mdx/config";
import { cn } from "cretex";
import { Tooltip } from "@/ui/tooltip";
import { HasCopyIcon } from "@/resource/docs_demo/assets/shiki/shiki-code-highlight-tabs";
import { ScrollArea } from "@/ui/scroll-area";
import { useShiki } from "../shiki/shiki-context";
import { purify } from "@/source/libs/dom-purify";

export function CodeBlockCommand(_props: React.ComponentProps<"pre"> & NpmCommands) {
  const { __npmCommand__, __yarnCommand__, __pnpmCommand__, __bunCommand__ } = _props;
  const [config, setConfig] = useConfig();
  const [copied, setCopied] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const ctx = useShiki();

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const packageManager = config.packageManager || "pnpm";
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpmCommand__,
      npm: __npmCommand__,
      yarn: __yarnCommand__,
      bun: __bunCommand__
    };
  }, [__npmCommand__, __pnpmCommand__, __yarnCommand__, __bunCommand__]);

  async function copyToClipboardWithMeta(value: string, event?: Event) {
    navigator.clipboard.writeText(value.trimEnd());
    if (event) {
      trackEvent(event);
    }
  }

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager];

    if (!command) {
      return;
    }

    copyToClipboardWithMeta(command, {
      name: "copy_npm_command",
      properties: {
        command,
        pm: packageManager
      }
    });
    setCopied(true);
  }, [packageManager, tabs]);

  const copyLabel = "Copy code";
  const copiedLabel = "Copied";

  return (
    <div data-installation="" className="relative mt-6 max-h-[650px] overflow-hidden rounded-xl border">
      <Tabs
        unstyled
        value={packageManager}
        defaultValue={packageManager}
        onValueChange={value => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun"
          });
        }}
      >
        <Tabs.List className="flex flex-row items-center justify-start gap-3 border-b bg-background-box px-3 pt-0.5">
          {Object.entries(tabs).map(([key]) => {
            return (
              <Tabs.Tab
                key={key}
                value={key}
                data-pm={key}
                className={cn("-mb-px border-b border-transparent p-1 font-geist-mono text-muted-foreground", {
                  "aria-selected:border-color aria-selected:text-color": mounted
                })}
              >
                {key}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
        {Object.entries(tabs).map(([key, value]) => {
          const highlighted = ctx?.shiki((value || "")?.trim(), "bash");
          const isHighlight = highlighted.highlighted;

          return (
            <ScrollArea key={key} dir="ltr" orientation="horizontal">
              <Tabs.Panel
                value={key}
                className={cn("mt-0 px-4 py-5", {
                  "text-transparent": !mounted,
                  "[--pre-p:0] [--code-p:0] [--code-fz:1rem] [--code-leading:1.55]": isHighlight
                })}
                dangerouslySetInnerHTML={isHighlight ? { __html: purify(highlighted.code) } : undefined}
              >
                {!isHighlight ? (
                  <code data-language="bash" className={cn("inline-flex min-w-max", { "text-transparent": !mounted })}>
                    {purify(highlighted.code)}
                  </code>
                ) : null}
              </Tabs.Panel>
            </ScrollArea>
          );
        })}
      </Tabs>

      <Tooltip asChild content={copied ? copiedLabel : copyLabel} side="left" aria-label={copied ? copiedLabel : copyLabel}>
        <Button size="icon" variant="ghost" className="absolute right-1 top-px z-10 border-0 [&_svg]:size-5" onClick={copyCommand}>
          <span className="sr-only">Copy</span>
          <HasCopyIcon has={copied} />
        </Button>
      </Tooltip>
    </div>
  );
}
