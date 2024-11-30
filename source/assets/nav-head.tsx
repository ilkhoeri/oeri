"use client";

import Link from "next/link";
import Element from "@/source/ui/element";
import {
  BrandDiscordFillIcon,
  BrandGithubIcon,
  BrandOeriIcon,
  LineMenuBarIcon
} from "@/modules/icons";
import { useHoveredElement } from "@/source/hooks/use-hovered-element";
import { useNavContext } from "../hooks/use-nav";
import { CommandDialog } from "./command-dialog";
import { appRoutes } from "@/source/routes";
import { NavLinkItem } from "@/source/ui/link-nav";
import { twMerge } from "str-merge";
import type { SingleRoute, NestedRoute } from "@/source/routes";

import globalStyle from "../styles/styles";

export function Headnav({
  routes
}: {
  routes?: (SingleRoute | NestedRoute)[] | null;
}) {
  const { minQuery, toggle, pathname, open } = useNavContext();

  const { hovered, onMouseEnter, onMouseLeave } = useHoveredElement();

  return (
    <header
      className={twMerge(
        "h-[--navbar] flex items-center justify-between py-4 md:px-5 xl:px-6 border-0 border-b-[0.04rem] border-b-muted/75 fixed top-0 inset-x-0 z-[--z,88] w-[calc(100%-var(--has-scrollbar,0px))] max-w-var backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60 mr-[--has-scrollbar]",
        pathname === "/" && open && "[--z:0]"
      )}>
      <Element className="relative mx-auto flex w-full max-w-screen-3xl items-center px-4 3xl:px-20">
        <LinkHome
          open={open}
          className="[transition:all_0.5s_ease] max-md:data-[state=open]:translate-x-[-32px] max-md:data-[state=open]:opacity-0"
        />

        <div className="relative ml-10 mr-auto hidden h-full items-center justify-between overflow-hidden rounded-sm text-sm font-medium md:flex">
          {appRoutes["services"].map((i, index) => (
            <Link
              key={index}
              href={i.href}
              role="button"
              className="h-6 cursor-pointer select-none rounded-sm px-2 py-1 text-muted-foreground transition-colors centered hover:text-color"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>
              <span>{i.title}</span>
            </Link>
          ))}

          {hovered && (
            <Element
              el="span"
              className="absolute -z-1 animate-fade-in rounded-sm bg-muted fade-in-0 zoom-in-90 [animation-duration:90ms]"
              style={{
                transition:
                  "background-color 180ms, transform 180ms, width 90ms",
                height: `${hovered.height}px`,
                width: `${hovered.width}px`,
                transform: `translateX(calc(${hovered.x}px - var(--tolerance)))`,
                "--tolerance": "176.5px"
                // transform: `translateY(${hovered?.y - ((minQuery ? 72 : 64) - scrollPosition - (scrollBody >= 1930 ? scrollBody - 1930 : 0))}px)`,
              }}
            />
          )}
        </div>

        <div
          className={globalStyle(
            { toggle: "group" },
            "ml-auto [&_svg]:size-5 [&>:nth-child(1)]:mr-2"
          )}>
          <CommandDialog routes={routes} />

          <NavLinkItem
            icon={BrandGithubIcon}
            target="_blank"
            aria-label="github repository"
            href="https://github.com/ilkhoeri/oeri"
            className={globalStyle({ toggle: "item", size: "icon-xs" })}
          />
          <NavLinkItem
            icon={BrandDiscordFillIcon}
            target="_blank"
            aria-label="discord community"
            href="https://discord.gg/Xct5BBPDZ9"
            className={globalStyle({ toggle: "item", size: "icon-xs" })}
          />
        </div>

        <ButtonAside
          open={open}
          onClick={toggle}
          hidden={
            minQuery || pathname.split("/").filter(Boolean).includes("examples")
          }
          className="max-md:ml-[26px] max-md:data-[state=open]:translate-x-[212px] max-md:data-[state=open]:opacity-0"
        />
      </Element>
    </header>
  );
}

export function LinkHome({
  open,
  className
}: {
  open?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="oeri"
      data-state={open ? "open" : "closed"}
      className={twMerge(
        "rounded-lg gap-2 py-1 px-2 text-lg font-medium leading-none font-geist-mono",
        className
      )}>
      <BrandOeriIcon size={30} />
      <span>oeri</span>
    </Link>
  );
}

export function ButtonAside({
  hidden,
  open,
  onClick,
  className
}: {
  hidden: boolean | undefined;
  open?: boolean;
  onClick: () => void;
  className?: string;
}) {
  if (hidden) {
    return null;
  }
  return (
    <button
      type="button"
      onClick={onClick}
      data-state={open ? "open" : "closed"}
      aria-label={[open ? "Close" : "Open", "Menu"].join(" ")}
      className={twMerge(
        "centered md:hidden md:sr-only relative z-10 scale-100 lg:scale-0 opacity-100 lg:opacity-0 [transition:all_0.5s_ease] rounded-[4px] focus-visible:outline-0",
        className
      )}>
      <LineMenuBarIcon
        data-state={open ? "open" : "closed"}
        className={twMerge(
          "sizer [--sz:24px] overflow-visible [transition:transform_.35s_ease] data-[state=open]:rotate-45 data-[state=open]:[transition-delay:.25s] [&_path]:[transition:transform_.35s_ease]",
          "[&_[data-line=top]]:data-[state=open]:[transform:rotate(112.5deg)_translate(-27.2%,-80.2%)] [&_[data-line=center]]:data-[state=open]:[transform:rotate(22.5deg)_translate(15.5%,-23%)] [&_[data-line=bottom]]:data-[state=open]:[transform:rotate(112.5deg)_translate(-15%,-149.5%)]"
        )}
      />
    </button>
  );
}
