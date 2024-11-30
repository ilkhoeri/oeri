import * as React from "react";
import { cn } from "str-merge";
import { CopyButton, GetCodeButton } from "./toggle";
import { sanitizedToParams } from "@/modules/utility";
import {
  ChainIcon,
  BrandCSSFillIcon,
  BrandTypescriptFillIcon
} from "@/modules/icons";

type CodeCustomizer = {
  code?: string | null;
  setInnerHTML?: string | null;
  className?: string;
  title?: string;
  repo?: string | null;
};

type ExtIconsType = { ext?: string | null };
export function ExtIcons({ ext }: ExtIconsType) {
  if (!ext) return null;

  if (ext === ".ts") return <BrandTypescriptFillIcon />;
  if (ext === ".tsx") return <BrandTypescriptFillIcon />;
  if (ext === ".css") return <BrandCSSFillIcon />;
}

export function Code(Text: CodeCustomizer & ExtIconsType) {
  const { code, setInnerHTML, title, repo, ...rest } = Text;

  return (
    <>
      <div className="flex h-12 w-full flex-row items-center rounded-t-[inherit] border-b to-background-code-header p-[0_12px_0_16px]">
        {title && (
          <div className="flex flex-row items-center gap-2 text-[13px] text-muted-foreground [&_svg]:size-4">
            <ExtIcons {...rest} /> <span className="font-normal">{title}</span>
          </div>
        )}
        <div className="ml-auto flex flex-row items-center gap-1">
          {repo && <GetCodeButton repo={repo} />}{" "}
          {code && <CopyButton value={code} />}
        </div>
      </div>

      <div
        data-rehype-pretty-code-fragment=""
        data-code-fragment=""
        className="scrollbar">
        <pre
          className="rounded-lg p-4 [&>code>[data-rehype-pretty-code-figure]]:pr-8"
          data-language="tsx"
          data-theme="default">
          <code
            data-language="tsx"
            data-theme="default"
            dangerouslySetInnerHTML={
              setInnerHTML ? { __html: setInnerHTML } : undefined
            }>
            {setInnerHTML ? null : code}
          </code>
        </pre>
      </div>
    </>
  );
}

export function Customizer(Text: CodeCustomizer) {
  if (!Text.code && !Text.setInnerHTML) return null;
  return (
    <div
      className={cn("mb-12 text-base", Text.className)}
      data-rehype-customizer=""
      data-code-fragment="">
      {Text.title && <h4>{Text.title}</h4>}
      <div
        className="mdx_customizer relative whitespace-pre-wrap"
        data-language="tsx"
        data-theme="default"
        dangerouslySetInnerHTML={
          Text.setInnerHTML ? { __html: Text.setInnerHTML } : undefined
        }>
        {Text.setInnerHTML ? null : Text.code}
      </div>
    </div>
  );
}

export function Reference(Text: CodeCustomizer) {
  if (!Text.code && !Text.setInnerHTML) return null;
  return (
    <div
      data-block="reference"
      data-rehype-customizer=""
      className={cn("-mt-4 text-base", Text.className)}>
      {Text.title && (
        <h4 id={sanitizedToParams(Text.title)}>
          <a
            className="anchor_id"
            href={`#${sanitizedToParams(Text.title)}`}
            aria-label={sanitizedToParams(Text.title)}>
            <ChainIcon size={26} className="mr-2" />
          </a>
          {Text.title}
        </h4>
      )}

      <div
        className="relative mb-12 mt-4 flex flex-col gap-6 whitespace-pre-wrap"
        data-block="body"
        dangerouslySetInnerHTML={
          Text.setInnerHTML ? { __html: Text.setInnerHTML } : undefined
        }>
        {Text.setInnerHTML ? null : Text.code}
      </div>
    </div>
  );
}
