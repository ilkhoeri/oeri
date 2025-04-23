"use client";
import { createContext, useCallback, useContext, useLayoutEffect, useState } from "react";
import { CodeLanguage } from "./types";
import type { HighlighterGeneric } from "shiki";

import { classes } from "./shiki-code-highlight-tabs";
import moonlightTheme from "@/resource/docs_demo/assets/rehype/moonlight.json" with { type: "json" };
import { highlightCode } from "../rehype/rehype-customizer";

interface FallbackCode {
  code: string;
  highlighted: boolean;
  lang: CodeLanguage;
}

type HighlightCode = {
  shiki: (code: string, lang: CodeLanguage) => FallbackCode;
  rehype: (code: string, lang: CodeLanguage) => FallbackCode;
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

const Context = createContext<HighlightCode | null>(null);

interface ShikiProviderProps {
  children: React.ReactNode;
  loadShiki: () => Promise<HighlighterGeneric<any, any>>;
  code: string | null | undefined;
}

export function ShikiProvider({ children, loadShiki }: ShikiProviderProps) {
  const [shikiState, setShikiState] = useState<HighlighterGeneric<any, any> | null>(null);

  useLayoutEffect(() => {
    loadShiki().then(s => setShikiState(s));
  }, [loadShiki]);

  const shiki = useCallback(
    (code: string, lang: CodeLanguage = "tsx") => {
      if (!shikiState) {
        return { code, lang, highlighted: false };
      }

      return {
        code: prepareHtmlCode(shikiState.codeToHtml(code, { lang: lang, theme: moonlightTheme })),
        lang,
        highlighted: true
      };
    },
    [shikiState]
  );

  const [highlighted, setHighlighted] = useState<Record<string, string>>({});

  const rehype = useCallback(
    (code: string, lang: CodeLanguage = "tsx") => {
      // Kalau sudah ada hasil highlight sebelumnya
      if (highlighted[code]) {
        return { code: highlighted[code], lang, highlighted: true };
      }

      function raw(text: string, lang: string): string {
        return `\`\`\`${lang} showLineNumbers\n${text}\n\`\`\``.trimEnd();
      }

      // Kalau belum, return langsung, sambil proses di background
      highlightCode(raw(code, lang))
        .then(result => {
          setHighlighted(prev => ({ ...prev, [code]: result }));
        })
        .catch(error => {
          console.error("Highlight error:", error);
        });

      return { code, lang, highlighted: false };
    },
    [highlighted]
  );

  return <Context.Provider value={{ shiki, rehype }}>{children}</Context.Provider>;
}

export function useShiki(): HighlightCode {
  const ctx = useContext(Context)!;
  // if (!ctx) throw new Error("useShiki must be used within a <TableTileProvider>");
  return ctx;
}

export function useShikiX() {
  const ctx = useContext(Context);
  /*
  const [prettyState, setPrettyState] = useState(code as string);

  useEffect(() => {
    if (code) {
      const setPretty = async () => {
        function raw(text: string, lang: string = "tsx"): string {
          return `\`\`\`${lang} showLineNumbers\n${text}\n\`\`\``.trimEnd();
        }
        try {
          const textPretty = await highlightCode(raw(code));
          setPrettyState(textPretty);
        } catch (error) {
          console.error("Text Pretty", error);
          setPrettyState(code as string);
          // alert('⚠️\nInput tidak sesuai');
        }
      };
      setPretty();
    }
  }, [code]);
  */
  if (!ctx) {
    return {
      shiki: (code: string, lang: CodeLanguage) => ({ code, lang, highlighted: false }),
      rehype: (code: string, lang: CodeLanguage) => ({ code, lang, highlighted: false })
    };
  }
  return ctx;
}
