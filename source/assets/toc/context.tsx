"use client";
import * as React from "react";
import { useIsomorphicEffect } from "@/hooks/use-isomorphic-effect";
import { twMerge } from "tailwind-merge";

const ContentReadyContext = React.createContext<{
  ready: boolean;
  setReady: (v: boolean) => void;
}>({
  ready: false,
  setReady: () => {}
});

export const useContentReady = () => React.useContext(ContentReadyContext);

export function TableOfContentsProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false);
  return <ContentReadyContext.Provider value={{ ready, setReady }}>{children}</ContentReadyContext.Provider>;
}

export const ArticleContent = React.forwardRef<HTMLElement, React.ComponentProps<"article">>((_props, ref) => {
  const { className, ...props } = _props;

  const { setReady } = useContentReady();

  useIsomorphicEffect(() => {
    setReady(true);
    return () => setReady(false); // reset saat leave
  }, []);

  return <article ref={ref} {...props} className={twMerge("relative mx-auto w-full md:max-lg:pr-6", className)} />;
});
ArticleContent.displayName = "ArticleContent";
