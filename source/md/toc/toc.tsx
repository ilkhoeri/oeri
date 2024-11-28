"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "str-merge";
import { sourceFile } from "@/source/utils";
import { usePathname } from "next/navigation";
import { ArrowsSquareIcon } from "@/resource/docs";
import { formatTitle } from "@/source/utils/text-transform";

import type { TableOfContentsType } from "./config";

interface TocProps {
  toc: TableOfContentsType | null;
  sub?: number;
}

export function useMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export function TableOfContents({ toc, sub }: TocProps) {
  const pathname = usePathname();

  const itemIds = React.useMemo(
    () =>
      toc?.items
        ? toc.items
            .flatMap(item => [item.url, item?.items?.map(item => item.url)])
            .flat()
            .filter(Boolean)
            .map(id => id?.split("#")[1])
        : [],
    [toc]
  );
  // @ts-ignore
  const activeHeading = useActiveItem(itemIds);
  // const mounted = useMounted();

  const paths = pathname.split("/").slice(2).filter(Boolean);
  const editPageLink =
    paths.length > 1
      ? `https://github.com/ilkhoeri/oeri/edit/main/resource/docs_raw/${sourceFile(paths)}.mdx`
      : "";

  return (
    <aside className="sticky m-0 mt-[calc(var(--navbar)*-1)] h-[--aside-h] max-h-[--aside-h] w-full overflow-hidden bg-background-theme pt-[calc(var(--navbar)+18px)] [--aside-h:100dvh] [--aside-rx:calc(var(--aside)-1rem)] max-md:sr-only max-md:z-[-111] max-md:hidden md:top-0 md:w-[--aside-rx] md:min-w-[--aside-rx] md:max-w-[--aside-rx] md:pl-8 md:pr-4 md:transition-none md:[--aside-h:calc(100dvh-2rem)]">
      {toc?.items?.length && (
        <nav className="sticky flex flex-col flex-nowrap items-start justify-start overflow-y-auto overflow-x-hidden pl-3 pt-4 webkit-scrollbar max-md:pb-24 max-md:pt-0 md:pb-20">
          <hgroup>
            <h4 role="presentation" className="mb-2 font-medium text-paragraph">
              On This Page
            </h4>
          </hgroup>

          <Tree tree={toc} sub={sub} activeItem={activeHeading} />
        </nav>
      )}

      <hr className="mt-5 w-full min-w-[212px]" />

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
            setActiveId(entry?.target?.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds?.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContentsType;
  level?: number;
  sub?: number;
  activeItem?: string;
}

function Tree({ tree, level = 1, sub = 3, activeItem }: TreeProps) {
  return tree?.items?.length && level < sub ? (
    <div
      className={cn("m-0 list-none space-y-2 font-medium text-span", {
        "pl-4": level !== 1
      })}>
      {tree.items.map((item, index) => {
        return (
          <div key={index} className={cn("mt-0 pt-2 text-muted-foreground")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline transition-colors hover:text-color",
                item.url === `#${activeItem}`
                  ? "font-medium text-color"
                  : "text-muted-foreground"
              )}>
              {formatTitle(item.title)}
            </a>
            {item.items?.length ? (
              <Tree
                sub={sub}
                tree={item}
                level={level + 1}
                activeItem={activeItem}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  ) : null;
}
