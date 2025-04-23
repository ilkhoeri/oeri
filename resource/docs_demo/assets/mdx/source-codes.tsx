"use client";
import React from "react";
import { Tabs } from "@/ui/tabs";
import { PlayTabs } from "@/source/assets/playtabs";
import { Code } from "@/resource/docs_demo/assets/mdx/mdx-customizer";
import { useShiki } from "../shiki/shiki-context";
import { purify } from "@/source/libs/dom-purify";
import { merge } from "cretex";

interface SourceCodesProps {
  ext?: string;
  name?: string;
  segment?: string[];
  children?: React.ReactNode;
  code?: string | null;
  css?: string | null;
  repo?: string;
}

export function SourceCodes({ code, css, repo, name, ext }: SourceCodesProps) {
  const ctx = useShiki();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const childs: Record<string, React.JSX.Element | null> = {};

  const classNames = {
    content: merge("m-0 block p-[var(--pre-p,.625rem_1rem)] leading-[0] [--code-line-height:--code-leading,1.7]", "[--pre-p:.625rem_0rem]", {
      "pointer-events-none overflow-hidden after:absolute after:inset-0 after:z-[21] after:bg-background/60 after:content-[''] after:animate-pulse": !mounted
    }),
    inner:
      "whitespace-pre-wrap inline-block rounded-[.125rem] p-[var(--code-p,.0625rem_.1875rem)] font-mono [font-size:var(--code-fz,.8125rem)] leading-[--code-line-height,1.55] [&_>_figure_>_pre_>_code:is([data-language][data-line-numbers])]:[--fz-code:.8125rem] [&_>_figure_>_pre_>_code:is([data-language][data-line-numbers])]:[--p-code:0] [&_>_figure_>_pre_>_code:is([data-language][data-line-numbers])]:border-0 [&_>_figure_>_pre_>_code:is([data-language][data-line-numbers]):focus]:outline-0 focus-visible:[&_>_figure_>_pre_>_code:is([data-language][data-line-numbers])]:border-0"
  };

  if (css) {
    const shiki = ctx?.rehype(css?.trim(), "css");
    childs.css = <Code code={css} title="globals.css" __html={purify(shiki.code)} classNames={classNames} />;
  }
  if (code) {
    const shiki = ctx?.rehype(code, "ts");
    const loaded = (code: string | null | undefined) => (mounted && shiki.highlighted ? code : null);
    childs.code = <Code title={`${name}${ext}`} code={loaded(code)} repo={loaded(repo) as string | undefined} __html={loaded(shiki.code)} classNames={classNames} />;
  }

  if (!childs) return null;

  return (
    <Tabs defaultValue="code" className="mb-12 w-full">
      <PlayTabs defaultValue="code" childrens={childs} />
    </Tabs>
  );
}
