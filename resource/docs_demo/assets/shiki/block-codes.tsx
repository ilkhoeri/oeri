"use client";
import React from "react";
import { Tabs } from "@/ui/tabs";
import { PlayTabs } from "@/source/assets/playtabs";
import { Code } from "@/resource/docs_demo/assets/mdx/mdx-customizer";
import { useShiki } from "./shiki-context";
import { purify } from "@/source/libs/dom-purify";
import { ShikiLanguage } from "./types";
import { getSlug } from "@/source/utils";

export function LoadCodes() {
  // const [mounted, setMounted] = React.useState(false);
  const ctx = useShiki();

  // React.useEffect(() => setMounted(true), []);

  const childs: Record<string, React.JSX.Element | null> = {};

  // const windowIsDefine = typeof window !== "undefined" && typeof document !== "undefined";
  // if (!windowIsDefine || !mounted) return null;

  if (ctx?.codes?.css.content) {
    const highlighted = ctx?.highlight(ctx?.codes?.css.content?.trim(), "css");
    childs.css = <Code ext=".css" code={ctx?.codes?.css.content} title={ctx?.codes?.css.source} setInnerHTML={purify(highlighted.code)} />;
  }
  if (ctx?.codes?.code.content) {
    const lang = (ctx?.codes?.code.extension || ".ts").replace(".", "") as ShikiLanguage;
    const highlighted = ctx?.highlight(ctx?.codes?.code.content?.trim(), lang);
    childs.code = (
      <Code
        code={ctx?.codes?.code.content}
        ext={ctx?.codes?.code.extension || ".ts"}
        title={`${getSlug(ctx?.segment)}${ctx?.codes?.code.extension}`}
        setInnerHTML={purify(highlighted.code)}
        className=""
        classNames={{
          content: "m-0 block leading-[0] p-[var(--pre-p,.625rem_1rem)] [--code-line-height:--code-leading,1.7]",
          inner:
            "whitespace-pre-wrap inline-block rounded-[.125rem] p-[var(--code-p,.0625rem_.1875rem)] font-mono [font-size:var(--code-fz,.8125rem)] leading-[--code-line-height,1.55]"
        }}
        // title={`${getSlug(segment)}${code.extension}`}
        // repo={`${sourceFile(segment)}${code.extension}`}
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
