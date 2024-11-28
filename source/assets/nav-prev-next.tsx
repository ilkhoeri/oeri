"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronIcon } from "@/modules/icons";
import { InnerRoutes, SingleRoute } from "@/source/routes";
import { cnx } from "str-merge";
import { displayName } from "../utils";

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

  const classLink = cnx(
    "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-border bg-background py-2 text-sm font-medium shadow-sm transition-colors hover:text-color focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground disabled:pointer-events-none disabled:opacity-50 max-md:max-w-[144px] [@media(hover:hover)]:hover:bg-muted/65"
  );

  return (
    <nav className="flex flex-row items-center justify-between pt-12">
      {previousRoute && (
        <Link
          className={cnx(classLink, "pl-3 pr-4")}
          href={previousRoute ? previousRoute.href : ""}>
          <ChevronIcon chevron="left" className="size-4" />
          <span className="truncate">
            {previousRoute ? displayName(previousRoute.title) : "Previous"}
          </span>
        </Link>
      )}

      {nextRoute && (
        <Link
          className={cnx(classLink, "ml-auto pl-4 pr-3")}
          href={nextRoute ? nextRoute.href : ""}>
          <span className="truncate">
            {nextRoute ? displayName(nextRoute.title) : "Next"}
          </span>
          <ChevronIcon chevron="right" className="size-4" />
        </Link>
      )}
    </nav>
  );
}
