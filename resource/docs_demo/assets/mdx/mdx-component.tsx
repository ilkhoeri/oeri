"use client";
import * as React from "react";
import Image from "next/image";
import { Svg } from "@/ui/svg";
import { cn } from "@/utils/cn";
import { Tabs } from "@/ui/tabs";
import { Event } from "./events";
import { NpmCommands } from "./unist";
import { BannerClosingGetStarted, Figure } from "./build-components";
import { CopyButton } from "../../../../source/assets/toggle";
import { Typography } from "@/ui/typography";
import { TypingWords } from "@/ui/typing-words";
import Link, { type LinkProps } from "next/link";
import { CodeBlockCommand, Expand } from "../rehype";
import { Avatar } from "@/ui/avatar";
import { demoComponentsEntries } from "../demo-manifest-component";
import { demoHooksEntries } from "../demo-manifest-hook";
import { SourceCodes } from "./source-codes";

export const components = {
  SourceCodes,
  Expand,
  Image,
  Avatar,
  Figure,
  Svg,
  TypingWords,
  Typography,
  BannerClosingGetStarted,
  _A_: ({ href = "", ...props }: Omit<LinkProps, "href"> & { href?: string }) => <Link href={href} {...props} target="_blank" rel="noopener noreferrer nofollow" />,
  a: ({ href = "", ...props }: Omit<LinkProps, "href"> & { href?: string }) => <Link href={href} {...props} />,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h1" role="presentation" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h2" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h3" {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h4" {...props} />,
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h5" {...props} />,
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Typography prose="h6" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <Typography prose="p" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <Typography el="ul" prose="ul" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <Typography el="ol" prose="ol" {...props} />,
  li: (props: React.HTMLAttributes<HTMLElement>) => <Typography el="li" prose="li" {...props} />,
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className="my-4 md:my-8" {...props} />,
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ alt = "", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div data-table="scroll-area" className="my-6">
      <table {...props} />
    </div>
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => <th {...props} />,
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td {...props} />,
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        "relative isolate my-8 flex flex-col items-start whitespace-pre-line rounded-2xl bg-background-box py-6 pl-12 pr-4 [unicode-bidi:isolate] before:absolute before:inset-y-1/2 before:left-6 before:z-[10] before:h-4/5 before:w-1 before:-translate-y-1/2 before:bg-[#202425] before:content-['']",
        className
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    __rawString__,
    __npmCommand__,
    __yarnCommand__,
    __pnpmCommand__,
    __bunCommand__,
    __withMeta__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __rawString__?: string;
    __withMeta__?: boolean;
    __src__?: string;
    __event__?: Event["name"];
  } & NpmCommands) => {
    const isCommand = __npmCommand__ && __yarnCommand__ && __pnpmCommand__ && __bunCommand__;
    if (isCommand) return <CodeBlockCommand {...{ __npmCommand__, __yarnCommand__, __pnpmCommand__, __bunCommand__ }} />;
    return (
      <>
        <pre className={cn("mb-4 mt-6 !bg-transparent !bg-none", className)} {...props} />
        {__rawString__ && <CopyButton value={__rawString__} className={cn("absolute right-1 top-1 shadow", __withMeta__ && "top-16")} />}
      </>
    );
  },
  code: (props: React.HTMLAttributes<HTMLElement>) => <code dir="ltr" {...props} />,
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => <Tabs className={cn("relative mt-6 w-full", className)} {...props} />,
  TabsList: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("w-full justify-start rounded-none border-b bg-transparent p-0", className)} {...props} />,
  TabsTrigger: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn("relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-muted-foreground data-[state=active]:text-muted-foreground data-[state=active]:shadow-none", className)}
      {...props}
    />
  ),
  TabsContent: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold", className)} {...props} />,
  FrameworkDocs: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn(className)} {...props} />,
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => <Link className={cn("font-medium underline underline-offset-4", className)} {...props} />,
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => <Link className={cn("flex w-full flex-col items-center rounded-2xl border bg-background p-6 text-color shadow-md transition-colors hover:bg-muted/30 dark:hover:bg-muted/50 sm:p-10", className)} {...props} />,
  GridCard: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("mt-5 grid gap-4 sm:grid-cols-2 sm:gap-6", className)} {...props} />,
  ...demoComponentsEntries,
  ...demoHooksEntries
};
