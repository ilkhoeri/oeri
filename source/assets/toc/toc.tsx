"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "cretex";
import { sourceFile } from "@/source/utils";
import { usePathname } from "next/navigation";
import { ArrowsSquareIcon } from "@/icons/*";
import { formatTitle, sanitizedName } from "@/source/utils/text-transform";
import { useQueryApp } from "@/source/hooks/use-query-app";

import type { TableOfContents } from "./config";

interface TocProps {
  toc: TableOfContents | null;
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

  const itemIds: string[] = React.useMemo(
    () =>
      toc?.items
        ? toc.items
            .flatMap(item => [item.url, (item?.items ?? [])?.map(item => item.url)])
            .flat()
            .filter(Boolean)
            .map(id => id?.split("#")[1])
        : [],
    [toc]
  );

  const activeHeading = useActiveItem(itemIds);

  // if (rootSegment) return null;

  const paths = pathname.split("/").slice(2).filter(Boolean);
  const editPageLink = paths.length > 1 ? `https://github.com/ilkhoeri/oeri/edit/master/resource/docs_raw/${sourceFile(paths)}.mdx` : "";

  return (
    <aside
      data-controls="table-of-contents"
      className="m-0 mt-[calc(var(--navbar)*-1)] h-[--aside-h] max-h-[--aside-h] w-full overflow-hidden bg-background-theme pt-[calc(var(--navbar)+18px)] [--aside-h:100dvh] [--aside-w:calc(var(--aside)-1rem)] max-lg:sr-only max-lg:z-[-111] max-lg:hidden lg:sticky lg:top-0 lg:w-[--aside-w] lg:min-w-[--aside-w] lg:max-w-[--aside-w] lg:pl-8 lg:pr-4 lg:transition-none lg:[--aside-h:calc(100dvh-2rem)] lg:rtl:pl-4 lg:rtl:pr-8"
    >
      {min_lg && (
        <>
          {toc?.items?.length && (
            <nav className="sticky flex flex-col flex-nowrap items-start justify-start overflow-y-auto overflow-x-hidden pl-3 pt-4 webkit-scrollbar max-lg:pb-24 max-lg:pt-0 lg:pb-20 rtl:pl-0 rtl:pr-3">
              <hgroup>
                <h4 role="presentation" className="mb-2 font-medium text-paragraph">
                  On This Page
                </h4>
              </hgroup>

              <Tree tree={toc} sub={sub} activeItem={activeHeading} />
            </nav>
          )}

          <hr className="mt-5 w-full min-w-[212px]" />
        </>
      )}

      <Link href={editPageLink} target="_blank" rel="noopener noreferrer nofollow" className="group mt-5 h-4 justify-start gap-1 pb-1.5 text-muted-foreground">
        <span className="truncate text-sm transition-all underline-hover group-hover:text-constructive">Edit this page on GitHub</span>
        <ArrowsSquareIcon arrow="right" square={false} className="-rotate-45 stroke-[1.25] sizer [--sz:28px]" />
      </Link>
    </aside>
  );
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  sub?: number;
  activeItem?: string | null;
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const previousId = React.useRef<string | null>(null);

  React.useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      let visibleId: string | null = null;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleId = entry.target.id;
          break;
        }
      }

      if (visibleId && visibleId !== previousId.current) {
        previousId.current = visibleId;
        requestAnimationFrame(() => setActiveId(visibleId));
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "0% 0% -80% 0%"
    });

    itemIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      itemIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      previousId.current = null;
    };
  }, [itemIds.join(",")]); // depend on a stable string

  return activeId;
}

/*
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
const Tree = React.memo(function Tree({ tree, level = 1, sub = 3, activeItem }: TreeProps) {
  if (!tree?.items?.length || level >= sub) return null;

  return (
    <div
      className={cn("list-none text-span", {
        "pl-4 rtl:pl-0 rtl:pr-4": level !== 1
      })}
    >
      {tree.items.map(item => {
        const formattedTitle = formatTitle(sanitizedName(item.title));
        const isActive = item.url === `#${activeItem}`;

        return (
          <div key={item.url} className="pt-2 text-muted-foreground">
            <a href={item.url} className={cn("inline-block no-underline transition-colors hover:text-color", isActive ? "text-color" : "text-muted-foreground")}>
              {formattedTitle}
            </a>
            {item.items?.length ? <Tree tree={item} level={level + 1} sub={sub} activeItem={activeItem} /> : null}
          </div>
        );
      })}
    </div>
  );
});

*/
function Tree({ tree, level = 1, sub = 3, activeItem }: TreeProps) {
  return tree?.items?.length && level < sub ? (
    <div
      className={cn("list-none text-span", {
        "pl-4 rtl:pl-0 rtl:pr-4": level !== 1
      })}
    >
      {tree.items.map((item, index) => {
        return (
          <div key={index} className={cn("pt-2 text-muted-foreground")}>
            <a href={item.url} className={cn("inline-block no-underline transition-colors", item.url === `#${activeItem}` ? "text-blue-500 hover:text-blue-500" : "text-muted-foreground hover:text-color")}>
              {formatTitle(sanitizedName(item.title))}
            </a>
            {item.items?.length ? <Tree sub={sub} tree={item} level={level + 1} activeItem={activeItem} /> : null}
          </div>
        );
      })}
    </div>
  ) : null;
}
