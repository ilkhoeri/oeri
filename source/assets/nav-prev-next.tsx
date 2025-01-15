"use client";

import React from "react";
import Link from "next/link";
import { cn } from "str-merge";
import { displayName } from "../utils";
import { ArrowIcon } from "@/icons/*";
import { usePathname } from "next/navigation";
import { InnerRoutes, SingleRoute } from "@/source/routes";

export function NavBottom({ routes }: { routes: SingleRoute[] | null }) {
  const pathname = usePathname();
  // const paths = pathname.split("/").filter(Boolean);

  let currentRoutes: InnerRoutes[] = [];

  if (routes) {
    if ((routes as SingleRoute[]).every(route => "href" in route.data[0])) {
      currentRoutes = (routes as SingleRoute[]).flatMap(section =>
        section.data.map(route => ({
          title: route.title,
          href: route.href
          // href: `/${section.title.toLowerCase()}/${route.href.split("/").slice(2).join("/")}`,
        }))
      );
    }
  }

  const currentIndex = currentRoutes.findIndex(
    route => route.href === pathname
  );
  const previousRoute = currentRoutes[currentIndex - 1] || null;
  const nextRoute = currentRoutes[currentIndex + 1] || null;

  const classLink =
    "w-full h-16 [@media(hover:hover)]:hover:bg-accent inline-flex cursor-pointer appearance-none items-center rounded-lg border border-border bg-background p-2 gap-1 text-[clamp(0.75rem,0.65rem+0.65vw,0.9rem)] font-medium leading-tight text-muted-foreground transition-[transform,color,background-color,border-color,text-decoration-color,fill,stroke] duration-75 [-moz-appearance:none] [-webkit-appearance:none] hover:text-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primitive-emphasis/35 focus-visible:ring-offset-1 focus-visible:ring-offset-background active:scale-[.985] disabled:pointer-events-none disabled:gap-2 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0";

  return (
    <nav className="flex flex-row items-center justify-between pt-12 gap-4 md:gap-8 xl:gap-9 [--pd:.25rem] md:[--pd:.5rem] xl:[--pd:1rem]">
      {previousRoute && (
        <Link className={cn(classLink, "justify-start rtl:ml-auto ltr:pl-[--pd] rtl:pr-[--pd]")} href={previousRoute ? previousRoute.href : ""}>
          <ArrowIcon arrow="left" className="rtl:rotate-180" />
          <span className="truncate">{previousRoute ? displayName(previousRoute.title) : "Previous"}</span>
        </Link>
      )}

      {nextRoute && (
        <Link className={cn(classLink, "justify-end ml-auto rtl:ml-0 rtl:mr-auto ltr:pr-[--pd] rtl:pl-[--pd]")} href={nextRoute ? nextRoute.href : ""}>
          <span className="truncate">{nextRoute ? displayName(nextRoute.title) : "Next"}</span>
          <ArrowIcon arrow="right" className="rtl:rotate-180" />
        </Link>
      )}
    </nav>
  );
}
