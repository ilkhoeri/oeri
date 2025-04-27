"use client";

import { useState } from "react";
import { useIsomorphicEffect } from "@/hooks/use-isomorphic-effect";
import { highlightCode } from "./rehype-customizer";

import type { CodeLanguage } from "../shiki/types";

interface RehypeOptions {
  lang?: CodeLanguage;
  showLineNumbers?: boolean;
}

export function useRehype(input: string, opts: RehypeOptions = {}) {
  const { lang, showLineNumbers } = opts;

  const [prettyState, setPrettyState] = useState(input as string);
  const [m, sM] = useState(false);

  const sln = showLineNumbers ? "showLineNumbers" : undefined;
  const commemt = [lang, sln]?.join(" ");
  const raw = (text: string) => (lang || sln ? `\`\`\`${commemt}\n${text}\n\`\`\`` : text);

  useIsomorphicEffect(() => {
    sM(true);
    if (input) {
      async function setPretty() {
        try {
          const textPretty = await highlightCode(raw(input));
          setPrettyState(textPretty);
          sM(false);
        } catch (error) {
          console.error("Text Pretty", error);
          setPrettyState(input);
        }
      }
      setPretty();
    }
  }, [input, lang]);

  const code = !m ? prettyState : "";

  return code;
}
