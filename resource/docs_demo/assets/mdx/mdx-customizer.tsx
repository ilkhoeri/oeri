"use client";
import * as React from "react";
import { cn, ocx } from "cretex";
import { sanitizedWord } from "@/utility/text-parser";
import { CopyButton as CopyToggle } from "@/ui/copy-button";
import { CopyButton, DownloadButton, GetCodeButton } from "../../../../source/assets/toggle";
import { ChainIcon, BrandCssFillIcon, BrandTypescriptFillIcon, CheckIcon } from "@/icons/*";
import { ScrollArea } from "@/ui/scroll-area";

type CustomizerOrigin = "title" | "content" | "inner";
type CodeCustomizer = {
  code?: string | null;
  __html?: string | null;
  className?: string;
  title?: string | null;
  repo?: string;
  href?: string;
  children?: React.ReactNode;
  classNames?: Partial<Record<CustomizerOrigin, string>>;
};

type ExtIconsType = { ext?: string | null };
export function ExtIcons({ ext }: ExtIconsType) {
  if (!ext) return null;
  if (/.*?ts*?/.test(ext)) return <BrandTypescriptFillIcon />;
  if (/.*?css*?/.test(ext)) return <BrandCssFillIcon />;
}

export function Code(Text: CodeCustomizer & ExtIconsType) {
  const { code, __html, title, repo, href, className, classNames, children = null } = Text;

  return (
    <>
      <div className={cn("flex h-12 w-full flex-row items-center rounded-t-[inherit] border-b bg-background p-[0_12px_0_16px]", className)}>
        {title && (
          <CopyToggle timeout={1750} value={title.trimEnd()}>
            {({ copied, copy }) => (
              <h6 className={cn("flex cursor-pointer flex-row items-center gap-2 text-[13px] [&_svg]:size-4", copied ? "text-color" : "text-muted-foreground", classNames?.title)} onClick={copy} aria-label={copied ? "Copied" : "Copy"} title={copied ? "Copied" : "Copy"}>
                {copied ? <CheckIcon animation /> : <ExtIcons ext={title} />} <span className="font-normal">{title}</span>
              </h6>
            )}
          </CopyToggle>
        )}
        <div className="ml-auto flex flex-row items-center gap-1">
          {(repo || href) && <GetCodeButton href={href} repo={repo} />}
          {code && <CopyButton value={code} />}
          {code && title && <DownloadButton code={code} filename={title} />}
        </div>
      </div>
      <ScrollArea
        dir="ltr"
        viewportProps={ocx({ "data-code-fragment": "", "data-rehype-pretty-code-fragment": "" })}
        className={cn("min-h-full min-w-full !overflow-hidden rounded-lg p-4 [&>code>[data-rehype-pretty-code-figure]]:pr-8", classNames?.content)}
        classNames={{ viewport: classNames?.inner }}
        styles={{ root: { overflow: "hidden" } }}
        dangerouslySetInnerHTML={!children && __html ? { __html: __html } : undefined}
      >
        {/* {!__html && !children ? (
          <pre data-language="tsx" data-theme="default">
            <code data-language="tsx" data-theme="default">
              {code}
            </code>
          </pre>
        ) : (
          children
        )} */}
      </ScrollArea>
    </>
  );
}

export function Customizer(Text: CodeCustomizer) {
  if (!Text.code && !Text.__html) return null;
  return (
    <div className={cn("mb-12 text-base", Text.className)} data-rehype-customizer="" data-code-fragment="">
      {Text.title && <h4 className={Text?.classNames?.title}>{Text.title}</h4>}
      <div className={cn("mdx_customizer relative whitespace-pre-wrap", Text?.classNames?.content)} data-language="tsx" data-theme="default" dangerouslySetInnerHTML={Text.__html ? { __html: Text.__html } : undefined}>
        {Text.__html ? null : Text.code}
      </div>
    </div>
  );
}

export function Reference(Text: CodeCustomizer) {
  if (!Text.code && !Text.__html) return null;
  return (
    <div data-block="reference" data-rehype-customizer="" className={cn("-mt-4 text-base", Text.className)}>
      {Text.title && (
        <h4 id={sanitizedWord(Text.title)} className={Text?.classNames?.title}>
          <a className="anchor_id" href={`#${sanitizedWord(Text.title)}`} aria-label={sanitizedWord(Text.title)}>
            <ChainIcon size={26} className="mr-2" />
          </a>
          {Text.title}
        </h4>
      )}

      <div className={cn("relative mb-12 mt-4 flex flex-col gap-6 whitespace-pre-wrap", Text?.classNames?.content)} data-block="body" dangerouslySetInnerHTML={Text.__html ? { __html: Text.__html } : undefined}>
        {Text.__html ? null : Text.code}
      </div>
    </div>
  );
}
