"use client";

import * as React from "react";
import { Anchor } from "@/ui/anchor";
import { tocopy } from "../utils";
import { merge } from "cretex";
import { useClipboard } from "@/hooks/use-clipboard";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import { UnstyledButton } from "@/ui/button";
import { Tooltip } from "@/ui/tooltip";
import { BrandGithubFillIcon, CheckIcon, CopyIcon, Svg } from "@/icons/*";

import globalStyle from "../styles/styles";

export const GetCodeButton = React.forwardRef<
  React.ComponentRef<typeof Anchor>,
  Omit<React.ComponentPropsWithoutRef<typeof Anchor>, "href"> & {
    repo?: string & NonNullable<unknown>;
    href?: string & NonNullable<unknown>;
  }
>(function GetCodeButton({ className, href, repo, ...props }, ref) {
  if (!(repo || href)) return null;

  return (
    <Tooltip asChild side="left" sideOffset={6} content={<span>Repository</span>} contentProps={{ className: "min-w-[86px]" }}>
      <Anchor ref={ref} {...props} target="_blank" rel="noopener noreferrer nofollow" href={href || `https://github.com/ilkhoeri/oeri/tree/master/resource/docs/${repo}`} tabIndex={-1} title="Get Code" className={globalStyle({ toggle: "item", size: "icon-xs" }, className)}>
        <BrandGithubFillIcon fill="currentColor" className="size-5" />
      </Anchor>
    </Tooltip>
  );
});
GetCodeButton.displayName = "GetCodeButton";

export const CopyButton = React.forwardRef<
  React.ComponentRef<typeof UnstyledButton>,
  React.ComponentPropsWithoutRef<typeof UnstyledButton> & {
    value: string | null | undefined;
  }
>(({ value, className, ...props }, ref) => {
  const clipboard = useClipboard({ timeout: 1000 });

  return (
    <Tooltip
      ref={ref}
      {...props}
      tabIndex={-1}
      onClick={() => {
        if (value) clipboard.copy(tocopy(value));
      }}
      disabled={!value}
      className={globalStyle({ toggle: "item", size: "icon-xs" }, clipboard.copied ? "bg-muted" : "bg-background", className)}
      side="left"
      sideOffset={6}
      contentProps={{ className: "min-w-[86px] py-1" }}
      content={<span>{clipboard.copied ? "Copied" : "Copy code"}</span>}
      suppressHydrationWarning
    >
      {clipboard.copied ? <CheckIcon className="size-5 animate-fade-in fade-in-0 zoom-in-0 [animation-duration:150ms]" /> : <CopyIcon className="size-5" />}
    </Tooltip>
  );
});
CopyButton.displayName = "CopyButton";

export const ScrollToggle = React.forwardRef<React.ElementRef<typeof UnstyledButton>, React.ComponentPropsWithoutRef<typeof UnstyledButton>>(({ className, ...props }, ref) => {
  const { bottom, scrollWindow, mounted } = useWindowScroll();
  // const [hovered, setHovered] = React.useState(false);
  // const visible = hovered || isScroll;

  if (!mounted) {
    return null;
  }

  const label = bottom ? "Scroll to Top" : "Scroll to Bottom";
  return (
    <UnstyledButton
      ref={ref}
      {...props}
      tabIndex={-1}
      aria-label={label}
      title={label}
      onClick={scrollWindow}
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
      className={merge(
        "fixed bottom-4 right-4 z-[99] mr-[--scrollbar-space,var(--has-scrollbar)] flex size-8 cursor-pointer select-none items-center justify-center rounded-xl border border-muted-foreground/40 bg-background/40 p-0.5 capitalize text-muted-foreground/90 outline-0 backdrop-blur transition-none duration-0 disabled:pointer-events-none disabled:opacity-50 supports-[backdrop-filter]:bg-background/40 [&_svg]:size-full",
        "after:absolute after:left-0 after:h-8 after:w-12 after:content-['']",
        className
      )}
      // style={{
      //   width: visible ? "32px" : "8px",
      //   transform: visible ? "translateX(0)" : "translateX(12px)",
      //   transition: "transform 0.3s, width 0.3s",
      // }}
    >
      <Svg
        size={24}
        style={{
          transform: bottom ? "scaleY(-1)" : "scaleY(1)",
          transition: "transform 0.3s linear"
        }}
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path fill="currentColor" fillOpacity="0" strokeDasharray="20" strokeDashoffset="20" d="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5">
            <animate attributeName="d" begin="0.5s" dur="1.5s" repeatCount="indefinite" values="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5;M12 4h2v3h2.5l-4.5 4.5M12 4h-2v3h-2.5l4.5 4.5;M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5" />
            <animate fill="freeze" attributeName="fill-opacity" begin="0.7s" dur="0.15s" values="0;0.3" />
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="20;0" />
          </path>
          <path strokeDasharray="14" strokeDashoffset="14" d="M6 19h12">
            <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="14;0" />
          </path>
        </g>
      </Svg>
    </UnstyledButton>
  );
});
ScrollToggle.displayName = "ScrollToggle";
