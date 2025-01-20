"use client";
import { createContext, useCallback, useContext, useLayoutEffect, useState } from "react";
import { ShikiLanguage } from "./types";
import type { HighlighterGeneric } from "shiki";

import { classes } from "./shiki-code-highlight-tabs";
import moonlightTheme from "@/resource/docs_demo/assets/rehype/moonlight.json" with { type: "json" };

type HighlightCode = {
  highlight: (code: string, language: ShikiLanguage) => { code: string; highlighted: boolean };
  segment: string[];
  codes: {
    code: Record<"content" | "extension", string | null>;
    css: Record<"content" | "source", string | null>;
  } | null;
};

function prepareHtmlCode(code: string) {
  return code
    .replaceAll('tabindex="0"', "")
    .replace("<code>", `<code class="${classes({ selector: "code" })}">`)
    .replaceAll('class="shiki moonlight"', `class="${classes({ selector: "pre" })}"`)
    .replaceAll('style="background-color:#ffffff;color:#1f2328"', "")
    .replaceAll('style="background-color:#1F2028;color:#c8d3f5"', "")
    .replaceAll('style="background-color:#0d1117;color:#e6edf3', "");
}

const ShikiContext = createContext<HighlightCode | null>(null);

interface ShikiProviderProps {
  children: React.ReactNode;
  loadShiki: () => Promise<HighlighterGeneric<any, any>>;
  loadCodes: () => Promise<HighlightCode["codes"]>;
  segment?: string[];
}

export function ShikiProvider({ children, loadShiki, loadCodes, segment = [] }: ShikiProviderProps) {
  const [shiki, setShiki] = useState<HighlighterGeneric<any, any> | null>(null);
  const [codes, setCodes] = useState<HighlightCode["codes"] | null>(null);

  useLayoutEffect(() => {
    loadShiki().then(s => setShiki(s));
    loadCodes().then(s => setCodes(s));
  }, [loadShiki]);

  const highlight = useCallback(
    (code: string, language = "tsx") => {
      if (!shiki) {
        return { code, highlighted: false };
      }

      return {
        code: prepareHtmlCode(shiki.codeToHtml(code, { lang: language, theme: moonlightTheme })),
        highlighted: true
      };
    },
    [shiki, codes]
  );

  return <ShikiContext.Provider value={{ highlight, codes, segment }}>{children}</ShikiContext.Provider>;
}

export function useShiki() {
  const shiki = useContext(ShikiContext);
  if (!shiki) {
    return {
      highlight: (code: string) => ({ code, highlighted: false }),
      segment: [],
      codes: null
    };
  }
  return shiki;
}
