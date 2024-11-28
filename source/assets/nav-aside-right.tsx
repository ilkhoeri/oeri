"use client";

import React from "react";
import Link from "next/link";
import { cn } from "str-merge";
import { usePathname } from "next/navigation";
import { cleanedIdSlug, sourceFiles } from "@/source/utils";
import { useIdsContext } from "@/source/context/ids";
import { ArrowsSquareIcon } from "@/resource/docs";
import { ClientOnly } from "../ui/client-only";
import Element from "@/source/ui/element";

export function AsideRight() {
  const pathname = usePathname();
  const { ids } = useIdsContext();
  const idInView = useActiveItem(ids.map(i => i.id));

  const paths = pathname.split("/").filter(part => part !== "");
  const editPageLink =
    paths.length > 1
      ? `https://github.com/ilkhoeri/ioeri/edit/main/resource/${sourceFiles(paths)}.mdx`
      : "";

  return (
    <aside className="inset-y-0 m-0 h-[--aside-h] max-h-[--aside-h] w-full overflow-hidden bg-background [--aside-h:100dvh] [--aside-rx:calc(var(--aside)-1rem)] [transition:all_0.5s_ease] focus-visible:outline-0 data-[state=open]:pl-3 data-[state=open]:pr-6 max-md:sr-only max-md:fixed max-md:left-0 max-md:z-[111] max-md:hidden max-md:border-0 max-md:border-r-[0.04rem] max-md:border-r-muted/75 max-md:data-[state=open]:w-[--aside-rx] max-md:data-[state=open]:min-w-[--aside-rx] max-md:data-[state=open]:max-w-[--aside-rx] max-md:data-[state=closed]:px-0 max-md:data-[state=closed]:opacity-0 md:sticky md:left-0 md:top-[calc(var(--navbar)+2rem)] md:mt-[2rem] md:w-[--aside-rx] md:min-w-[--aside-rx] md:max-w-[--aside-rx] md:pl-8 md:pr-4 md:transition-none md:[--aside-h:calc(100dvh-2rem)]">
      <nav className="sticky top-0 flex flex-col flex-nowrap items-start justify-start overflow-y-auto overflow-x-hidden pl-3 webkit-scrollbar max-md:pb-24 max-md:pt-0 md:pb-20">
        <ClientOnly>
          <hgroup>
            <h4 role="presentation" className="mb-2 font-medium text-paragraph">
              On This Page
            </h4>
          </hgroup>
          <Element
            el="ul"
            role="list"
            className="space-y-2 font-medium text-span">
            {ids &&
              ids.map(({ id, depth }) =>
                id ? (
                  <Element
                    el="li"
                    key={id}
                    role="listitem"
                    className={cn("text-muted-foreground")}
                    style={{
                      paddingLeft: `${depth * 12}px`,
                      color:
                        idInView === id
                          ? "hsl(var(--constructive))"
                          : "hsl(var(--muted-foreground))"
                    }}>
                    <Link
                      href={`${pathname}#${id}`}
                      className="transition-colors hover:text-color">
                      {cleanedIdSlug(pathname, id)}
                    </Link>
                  </Element>
                ) : null
              )}
          </Element>

          <hr className="mt-5 w-full min-w-[212px]" />

          {paths.length > 1 && (
            <Link
              href={editPageLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group mt-5 h-4 justify-start gap-1 pb-1.5 text-muted-foreground">
              <span className="truncate text-sm transition-all underline-hover group-hover:text-constructive">
                Edit this page on GitHub
              </span>
              <ArrowsSquareIcon
                arrow="right"
                square={false}
                className="-rotate-45 stroke-[1.25] sizer [--sz:28px]"
              />
            </Link>
          )}
        </ClientOnly>
      </nav>
    </aside>
  );
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<any>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds?.forEach(id => {
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      }
    });

    return () => {
      itemIds?.forEach(id => {
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            observer.unobserve(element);
          }
        }
      });
    };
  }, [itemIds]);

  return activeId;
}
