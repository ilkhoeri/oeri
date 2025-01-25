"use client";
import React from "react";
import { Tabs } from "@/ui/tabs";
import { PlayTabs } from "@/source/assets/playtabs";
import { Code } from "@/resource/docs_demo/assets/mdx/mdx-customizer";
import { useShiki } from "../shiki/shiki-context";
import { purify } from "@/source/libs/dom-purify";

interface SourceCodesProps {
  children?: React.ReactNode;
  ext?: string;
  segment?: string[];
  code?: string | null;
  css?: string | null;
  name?: string;
  repo?: string;
}

export function SourceCodes({ code, css, repo, name, ext }: SourceCodesProps) {
  const ctx = useShiki();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const childs: Record<string, React.JSX.Element | null> = {};

  if (css) {
    const shiki = ctx?.highlight(css?.trim(), "css");
    childs.css = <Code code={css} title="globals.css" __html={purify(shiki.code)} />;
  }
  if (code) {
    const shiki = ctx?.highlight(code, "ts");
    const loaded = (code: string | null) => (mounted && shiki.highlighted ? code : null);
    childs.code = (
      <Code
        code={loaded(code)}
        title={`${name}${ext}`}
        repo={repo}
        __html={loaded(shiki.code)}
        classNames={{
          content: "m-0 block leading-[0] p-[var(--pre-p,.625rem_1rem)] [--code-line-height:--code-leading,1.7]",
          inner:
            "whitespace-pre-wrap inline-block rounded-[.125rem] p-[var(--code-p,.0625rem_.1875rem)] font-mono [font-size:var(--code-fz,.8125rem)] leading-[--code-line-height,1.55]"
        }}
      />
    );
  }

  if (!childs) return null;

  return (
    <Tabs defaultValue="code" className="mb-12 w-full">
      <PlayTabs defaultValue="code" childrens={childs} />
    </Tabs>
  );
}
