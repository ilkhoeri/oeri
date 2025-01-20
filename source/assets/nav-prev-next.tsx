"use client";

import React from "react";
import Link from "next/link";
import { merge } from "str-merge";
import { displayName } from "../utils";
import { ArrowIcon } from "@/icons/*";
import { usePathname } from "next/navigation";
import { InnerRoutes, SingleRoute } from "@/source/routes";

function getPrevNextRoutes(pathname: string, routes: SingleRoute[] | null) {
  let currentRoutes: InnerRoutes[] = [];

  if (routes) {
    if ((routes as SingleRoute[]).every(route => "href" in route.data[0])) {
      currentRoutes = (routes as SingleRoute[]).flatMap(section =>
        section.data.map(route => ({
          title: route.title,
          href: route.href
        }))
      );
    }
  }

  const currentIndex = currentRoutes.findIndex(route => route.href === pathname);
  const previousRoute = currentRoutes[currentIndex - 1] || null;
  const nextRoute = currentRoutes[currentIndex + 1] || null;

  return [previousRoute, nextRoute] as const;
}

const classes = {
  container: merge("flex flex-row items-center justify-between gap-4 pt-12 [--pd:.25rem] md:gap-8 md:[--pd:.5rem] xl:gap-9 xl:[--pd:1rem]"),
  previous: merge("justify-start ltr:pl-[--pd] rtl:ml-auto rtl:pr-[--pd]"),
  next: merge("ml-auto justify-end ltr:pr-[--pd] rtl:ml-0 rtl:mr-auto rtl:pl-[--pd]"),
  link: merge(
    "inline-flex h-16 w-full cursor-pointer appearance-none items-center gap-1 rounded-lg border border-border bg-background p-2 text-[clamp(0.75rem,0.65rem+0.65vw,0.9rem)] font-medium leading-tight text-muted-foreground transition-[transform,color,background-color,border-color,text-decoration-color,fill,stroke] duration-75 [-moz-appearance:none] [-webkit-appearance:none] hover:text-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primitive-emphasis/35 focus-visible:ring-offset-1 focus-visible:ring-offset-background active:scale-[.985] disabled:pointer-events-none disabled:gap-2 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0"
  ),
  icon: merge("rtl:rotate-180")
};

export interface NavBottomProps {
  routes: SingleRoute[] | null;
}
export function NavBottom(props: NavBottomProps) {
  const pathname = usePathname();
  const [previous, next] = getPrevNextRoutes(pathname, props.routes);

  return (
    <nav className={classes.container}>
      {previous && (
        <Link className={merge(classes.link, classes.previous)} href={previous ? previous.href : ""}>
          <ArrowIcon arrow="left" className={classes.icon} />
          <span className="truncate">{previous ? displayName(previous.title) : "Previous"}</span>
        </Link>
      )}

      {next && (
        <Link className={merge(classes.link, classes.next)} href={next ? next.href : ""}>
          <span className="truncate">{next ? displayName(next.title) : "Next"}</span>
          <ArrowIcon arrow="right" className={classes.icon} />
        </Link>
      )}
    </nav>
  );
}
