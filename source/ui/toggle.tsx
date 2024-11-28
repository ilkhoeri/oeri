"use client";

import * as React from "react";
import { Link } from "./link";
import { tocopy } from "../utils";
import { twMerge } from "str-merge";
import { UnstyledButton } from "./button";
import { Tooltip } from "@/modules/components/web";
import { useClipboard } from "@/hooks/use-clipboard";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import {
  ChevronDownSquareIcon,
  GithubIcon,
  CheckIcon,
  CopyIcon
} from "@/modules/icons";

import globalStyle from "../styles/styles";

export const GetCodeButton = React.forwardRef<
  React.ElementRef<typeof Link>,
  Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> & {
    repo?: string & NonNullable<unknown>;
    href?: string & NonNullable<unknown>;
  }
>(function GetCodeButton({ className, href, repo, ...props }, ref) {
  if (!repo) {
    return null;
  }
  return (
    <Tooltip
      asChild
      side="left"
      sideOffset={6}
      content={<span>Repository</span>}
      contentProps={{ className: "min-w-[86px]" }}>
      <Link
        ref={ref}
        {...props}
        target="_blank"
        rel="noopener noreferrer nofollow"
        href={href || `https://github.com/ilkhoeri/modules/blob/main/${repo}`}
        tabIndex={-1}
        title="Get Code"
        className={globalStyle({ toggle: "item", size: "icon-xs" }, className)}>
        <GithubIcon className="size-5" />
      </Link>
    </Tooltip>
  );
});
GetCodeButton.displayName = "GetCodeButton";

export const CopyButton = React.forwardRef<
  React.ElementRef<typeof UnstyledButton>,
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
      className={globalStyle(
        { toggle: "item", size: "icon-xs" },
        clipboard.copied ? "bg-muted" : "bg-background",
        className
      )}
      side="left"
      sideOffset={6}
      contentProps={{ className: "min-w-[86px]" }}
      content={<span>{clipboard.copied ? "Success" : "Copy"}</span>}>
      {clipboard.copied ? (
        <CheckIcon className="size-5 animate-fade-in fade-in-0 zoom-in-0 [animation-duration:150ms]" />
      ) : (
        <CopyIcon className="size-5" />
      )}
    </Tooltip>
  );
});
CopyButton.displayName = "CopyButton";

export const ScrollToggle = React.forwardRef<
  React.ElementRef<typeof UnstyledButton>,
  React.ComponentPropsWithoutRef<typeof UnstyledButton>
>(({ className, ...props }, ref) => {
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
      className={twMerge(
        "size-8 p-0.5 fixed bottom-4 right-4 mr-[--scrollbar-space,var(--has-scrollbar)] z-[99] flex items-center justify-center cursor-pointer select-none outline-0 disabled:pointer-events-none disabled:opacity-50 text-muted-foreground/90 backdrop-blur supports-[backdrop-filter]:bg-background/40 bg-background/40 border border-muted-foreground/40 rounded-xl capitalize transition-none duration-0 [&_svg]:size-full",
        "after:content-[''] after:absolute after:h-8 after:w-12 after:left-0",
        className
      )}
      // style={{
      //   width: visible ? "32px" : "8px",
      //   transform: visible ? "translateX(0)" : "translateX(12px)",
      //   transition: "transform 0.3s, width 0.3s",
      // }}
    >
      <ChevronDownSquareIcon
        style={{
          rotate: bottom ? "180deg" : "0deg",
          transition: "rotate 0.3s"
        }}
      />
    </UnstyledButton>
  );
});
ScrollToggle.displayName = "ScrollToggle";
