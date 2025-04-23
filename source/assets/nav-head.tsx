"use client";
import { useState } from "react";
import Link from "next/link";
import { useNavContext } from "../hooks/use-nav";
import { CommandDialog } from "./command-dialog";
import { appRoutes } from "@/source/routes";
import { NavLinkItem } from "@/source/assets/navlink";
import { merge } from "cretex";
import { Polymorphic } from "@/ui/polymorphic-slot";
import { FloatingIndicator } from "@/ui/floating-indicator";
import { BrandOeriIcon, TextDirectionIcon } from "@/icons/*";
import { useApp } from "@/config/app-context";
import { Burger } from "@/ui/burger";
import { Button } from "@/ui/button";

import type { SingleRoute, NestedRoute } from "@/source/routes";

import globalStyle from "../styles/styles";

export function Headnav({ routes }: { routes?: (SingleRoute | NestedRoute)[] | null }) {
  const { toggleDirection, dir } = useApp();
  const { minQuery, toggle, pathname, open, setOpen } = useNavContext();

  const [parentRef, setParentRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLAnchorElement | null>>({});
  const [active, setActive] = useState<string>(`/${pathname.split("/").filter(Boolean)[0] || "docs"}`);
  const [hover, setHover] = useState<string | null>(null);

  const setControlRef = (key: string) => (node: HTMLAnchorElement) => {
    controlsRefs[key] = node;
    setControlsRefs(controlsRefs);
  };
  const isActive = (key: string) => (active === key ? "true" : undefined);

  const excludesPath = pathname.split("/").filter(Boolean).includes("examples");

  return (
    <header
      dir={dir}
      className={merge(
        "fixed inset-x-0 top-0 z-[--z,88] mr-[--has-scrollbar] flex h-[--navbar] w-[calc(100%-var(--has-scrollbar,0px))] max-w-var items-center justify-between border-0 border-b-[0.04rem] border-b-muted/75 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-5 xl:px-6",
        pathname === "/" && open && "[--z:0]"
      )}
    >
      <Polymorphic dir={dir} className="relative mx-auto flex w-full max-w-screen-3xl items-center 3xl:px-12">
        <LinkHome open={open} className="[transition:all_0.5s_ease] max-md:data-[state=open]:translate-x-[-32px] max-md:data-[state=open]:opacity-0" />

        {minQuery && (
          <div dir={dir} ref={setParentRef} className="relative hidden h-full items-center justify-between rounded-sm text-sm font-medium md:flex ltr:ml-10 ltr:mr-auto rtl:ml-auto rtl:mr-10">
            {appRoutes["services"].map(i => (
              <Link key={i.href} ref={setControlRef(i.href)} href={i.href} role="button" onClick={() => setActive(i.href)} data-active={isActive(i.href)} className="h-6 cursor-pointer select-none rounded-sm text-muted-foreground transition-colors centered hover:text-color data-[active]:text-color">
                <span className="relative z-1 px-2 py-1" onMouseEnter={() => setHover(i.href)} onMouseLeave={() => setHover(null)}>
                  {i.title}
                </span>
              </Link>
            ))}
            <FloatingIndicator target={controlsRefs[hover ?? active]} parent={parentRef} transitionDuration={450} className="rounded-md border bg-background/15 shadow-md" />
          </div>
        )}

        <div dir={dir} className={globalStyle({ toggle: "group" }, { "max-md:pr-2 rtl:max-md:pr-0 rtl:max-md:pl-2": excludesPath }, "ltr:ml-auto rtl:mr-auto gap-1.5")}>
          <CommandDialog routes={routes} />
          <div className="grid grid-flow-col gap-0.5">
            <LinksSection />
            <Button size="icon" variant="outline" onClick={toggleDirection} className="bg-color text-background transition-colors max-md:hidden [&_svg]:transition-colors">
              <TextDirectionIcon dir={dir} size={20} stroke={2} />
            </Button>
          </div>
        </div>

        <ButtonAside {...{ open, setOpen, onClick: toggle }} hidden={minQuery || excludesPath} className="max-md:mx-2 max-md:data-[state=open]:translate-x-[212px] max-md:data-[state=open]:opacity-0 ltr:[--x:calc(212px)] rtl:[--x:calc(212px*-1)]" />
      </Polymorphic>
    </header>
  );
}

function LinksSection() {
  return appRoutes["sections"].map((i, __i) => (
    <NavLinkItem
      key={__i}
      icon={i.icon}
      target="_blank"
      aria-label={i.label}
      href={i.href}
      iconProps={{
        currentFill: i.label.includes("Collective") ? "fill-stroke" : "fill",
        fill: "white",
        stroke: "white",
        size: 20
      }}
      className={globalStyle({ toggle: "item", size: "icon-xs" }, "bg-[--color] border border-background focus-visible:ring-[--color] [&_svg]:hover:text-white hover:bg-[--color] [@media(hover:hover)]:hover:bg-[--color] max-md:hidden max-md:last-of-type:flex")}
      style={{
        "--color": i.color
      }}
    />
  ));
}

export function LinkHome({ open, className }: { open?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="oeri" data-state={open ? "open" : "closed"} className={merge("gap-2 rounded-lg px-2 py-1 font-geist-mono text-lg font-medium leading-none", className)}>
      <BrandOeriIcon size={30} />
      <span>oeri</span>
    </Link>
  );
}

export function ButtonAside(_props: React.ComponentProps<typeof Burger>) {
  const { hidden, open, onClick, setOpen, className } = _props;
  if (hidden) return null;
  return (
    <Burger
      {...{
        open,
        setOpen,
        className: merge("relative z-10 scale-100 opacity-100 md:sr-only md:hidden lg:scale-0 lg:opacity-0", className),
        onClick
      }}
    />
  );
}
