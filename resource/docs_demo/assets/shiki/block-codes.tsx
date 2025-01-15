"use client";
import React from "react";
import { Tabs } from "@/ui/tabs";
import { PlayTabs } from "@/source/assets/playtabs";
import { Code } from "@/resource/docs_demo/assets/mdx/mdx-customizer";
import { useShiki } from "./shiki-context";
import { purify } from "@/source/libs/dom-purify";
import { ShikiLanguage } from "./types";
import { getSlug } from "@/source/utils";

type CtxProps = {
  segment: string[];
  codes: {
    code: Record<"content" | "extension", string | null>;
    css: Record<"content" | "source", string | null>;
  } | null;
};

const ctx = React.createContext<CtxProps | undefined>(undefined);
const useBlockCodes = () => React.useContext(ctx)!;

interface BlockCodesProviderProps {
  children: React.ReactNode;
  loadCodes: () => Promise<CtxProps["codes"]>;
  segment?: string[];
}
export function BlockCodesProvider({ children, loadCodes, segment = [] }: BlockCodesProviderProps) {
  const [codes, setShiki] = React.useState<CtxProps["codes"] | null>(null);

  React.useEffect(() => {
    loadCodes().then(s => setShiki(s));
  }, [loadCodes]);

  return <ctx.Provider value={{ codes, segment }}>{children}</ctx.Provider>;
}

export function LoadCodes() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  const ctx = useBlockCodes();
  const { codes, segment } = ctx;
  const highlight = useShiki();

  const childs: Record<string, React.JSX.Element | null> = {};

  const windowIsDefine = typeof window !== "undefined" && typeof document !== "undefined";
  if (!windowIsDefine || !mounted) return null;

  if (codes?.css.content) {
    const highlighted = highlight(codes?.css.content?.trim(), "css");
    childs.css = <Code ext=".css" code={codes?.css.content} title={codes?.css.source} setInnerHTML={purify(highlighted.code)} />;
  }
  if (codes?.code.content) {
    const lang = (codes?.code.extension || ".ts").replace(".", "") as ShikiLanguage;
    const highlighted = highlight(codes?.code.content?.trim(), lang);
    childs.code = (
      <Code
        code={codes?.code.content}
        ext={codes?.code.extension || ".ts"}
        title={`${getSlug(segment)}${codes?.code.extension}`}
        setInnerHTML={purify(highlighted.code)}
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
