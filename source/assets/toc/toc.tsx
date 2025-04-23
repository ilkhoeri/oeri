"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "cretex";
import { sourceFile } from "@/source/utils";
import { usePathname } from "next/navigation";
import { ArrowsSquareIcon } from "@/icons/*";
import { formatTitle, sanitizedName } from "@/source/utils/text-transform";
import { useQueryApp } from "@/source/hooks/use-query-app";

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
  const { min_lg } = useQueryApp();

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
  const editPageLink = paths.length > 1 ? `https://github.com/ilkhoeri/oeri/edit/master/resource/docs_raw/${sourceFile(paths)}.mdx` : "";

  return (
    <aside className="bg-background-theme m-0 mt-[calc(var(--navbar)*-1)] h-[--aside-h] max-h-[--aside-h] w-full overflow-hidden pt-[calc(var(--navbar)+18px)] [--aside-h:100dvh] [--aside-w:calc(var(--aside)-1rem)] max-lg:sr-only max-lg:z-[-111] max-lg:hidden lg:sticky lg:top-0 lg:w-[--aside-w] lg:min-w-[--aside-w] lg:max-w-[--aside-w] lg:pl-8 lg:pr-4 lg:transition-none lg:[--aside-h:calc(100dvh-2rem)] lg:rtl:pl-4 lg:rtl:pr-8">
      {min_lg && (
        <>
          {toc?.items?.length && (
            <nav className="webkit-scrollbar sticky flex flex-col flex-nowrap items-start justify-start overflow-y-auto overflow-x-hidden pl-3 pt-4 max-lg:pb-24 max-lg:pt-0 lg:pb-20 rtl:pl-0 rtl:pr-3">
              <hgroup>
                <h4 role="presentation" className="text-paragraph mb-2 font-medium">
                  On This Page
                </h4>
              </hgroup>

              <Tree tree={toc} sub={sub} activeItem={activeHeading} />
            </nav>
          )}

          <hr className="mt-5 w-full min-w-[212px]" />
        </>
      )}

      <Link href={editPageLink} target="_blank" rel="noopener noreferrer nofollow" className="text-muted-foreground group mt-5 h-4 justify-start gap-1 pb-1.5">
        <span className="underline-hover group-hover:text-constructive truncate text-sm transition-all">Edit this page on GitHub</span>
        <ArrowsSquareIcon arrow="right" square={false} className="sizer -rotate-45 stroke-[1.25] [--sz:28px]" />
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
      className={cn("text-span list-none", {
        "pl-4 rtl:pl-0 rtl:pr-4": level !== 1
      })}
    >
      {tree.items.map((item, index) => {
        return (
          <div key={index} className={cn("text-muted-foreground pt-2")}>
            <a
              href={item.url}
              className={cn(
                "hover:text-color inline-block no-underline transition-colors",
                item.url === `#${activeItem}` ? "text-color" : "text-muted-foreground"
              )}
            >
              {formatTitle(sanitizedName(item.title))}
            </a>
            {item.items?.length ? <Tree sub={sub} tree={item} level={level + 1} activeItem={activeItem} /> : null}
          </div>
        );
      })}
    </div>
  ) : null;
}
