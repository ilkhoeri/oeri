"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { cn } from "str-merge";
import { Figure } from "./pre-component";
import { CopyButton } from "../ui/toggle";
import { Svg } from "@/modules/components/web";
import { TypingWords } from "@/modules/index";

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      role="presentation"
      className={cn(
        "border-b-0 pb-0 font-bold tracking-normal text-h2 first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-12 pb-2 font-inter font-semibold tracking-tight text-h3 first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn("mt-8 font-semibold tracking-tight text-h4", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn("mt-8 font-semibold tracking-tight text-h5", className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn("mt-8 font-semibold tracking-tight text-h6", className)}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn("mt-8 text-base font-semibold tracking-tight", className)}
      {...props}
    />
  ),
  a: ({
    className,
    href = "",
    ...props
  }: Omit<React.ComponentProps<typeof Link>, "href"> & { href?: string }) => (
    <Link href={href} className={cn("", className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("text-justify leading-7", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc pl-3", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal pl-3", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        "relative isolate my-8 flex flex-row items-center rounded-xl bg-background-box py-6 pl-12 pr-4 [unicode-bidi:isolate] before:absolute before:left-6 before:z-[10] before:h-4/5 before:w-1 before:bg-[#202425] before:content-['']",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div data-table="scroll-area" className="my-6">
      <table
        className={cn(
          // "relative w-full overflow-hidden border-none text-sm",
          className
        )}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        // "m-0 border-b last:border-b-0",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        // "px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        // "px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    __rawString__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __rawString__?: string;
    __withMeta__?: boolean;
    __src__?: string;
  }) => {
    return (
      <>
        <pre
          className={cn("mb-4 mt-6 !bg-transparent !bg-none", className)}
          {...props}
        />

        <CopyButton
          value={__rawString__}
          className="absolute right-1 top-1 shadow"
        />
      </>
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className={cn("", className)} {...props} />
  ),
  Image,
  Figure,
  Svg,
  TypingWords,
  CodeBlockWrapper: ({ ...props }) => (
    <div className="rounded-md border" {...props} />
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight font-heading",
        className
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  Tabs: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("relative mt-6 w-full", className)} {...props} />
  ),
  TabsList: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        "w-full justify-start rounded-none border-b bg-transparent p-0",
        className
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-muted-foreground data-[state=active]:text-muted-foreground data-[state=active]:shadow-none",
        className
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
        className
      )}
      {...props}
    />
  ),
  FrameworkDocs: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn(className)} {...props} />
  ),
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "flex w-full flex-col items-center rounded-lg border bg-background p-6 text-color shadow-md transition-colors hover:bg-muted/30 dark:hover:bg-muted/50 sm:p-10",
        className
      )}
      {...props}
    />
  ),
  GridCard: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn("mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6", className)}
      {...props}
    />
  )
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  // const [config] = useConfig();
  const Component = useMDXComponent(code, {
    // style: config.style
  });

  return (
    <div
      data-code-fragment="true"
      className="mdx_customizer"
      data-rehype-customizer="true">
      <Component components={components} />
    </div>
  );
}
