"use client";
import * as React from "react";
import { Tabs } from "@/ui/tabs";
import { formatTitle, type FormatTransform } from "@/utility/text-parser";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "cretex";

type TabsSwitchPageTrees = "tabs" | "list" | "trigger" | "content" | "fallback";
export interface TabsSwitchPageProps {
  /**
   * @example
   * const x = useSearchQuery('query', 'slug');
   * return `<pathname>?query=slug`
   */
  query: string;
  /**
   * @example
   * const x = useSearchQuery('query', slugs.key);
   * return `<pathname>?query=slugs.key`
   */
  slugs: { key: string; content: React.ReactNode }[];
  nothingFound?: React.ReactNode;
  fallback?: React.ReactNode;
  labelTransform?: FormatTransform;
  classNames?: Partial<Record<TabsSwitchPageTrees, string>>;
}

export function TabsSwitchPage(_props: TabsSwitchPageProps) {
  const { query, slugs, classNames, nothingFound, fallback = "Memuat...", labelTransform } = _props;

  const searchQuery = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQuery = React.useCallback(
    (query: string, slug: string | null) => {
      const params = new URLSearchParams(searchQuery.toString());

      if (slug !== null) {
        params.set(query, slug);
      } else {
        params.delete(query);
      }

      const queryString = params.toString();
      return queryString ? `${pathname}?${queryString}` : pathname;
    },
    [searchQuery, pathname]
  );

  if (!slugs?.length) return null;
  // Ambil nilai query dari URL, jika tidak ada gunakan slug pertama sebagai default
  const queryValue = searchQuery.get(query) || slugs[0]?.key;

  // Pastikan nilai query ada di daftar slugs, jika tidak ada gunakan slug pertama
  const currentTab = slugs.some(slug => slug.key === queryValue) ? queryValue : slugs[0]?.key;

  const renderFallback = typeof fallback === "string" ? <p className={cn("mx-auto mt-6", classNames?.fallback)}>{fallback}</p> : fallback;

  return (
    <Tabs defaultValue={currentTab} className={cn(classNames?.tabs)}>
      <Tabs.List className={cn("flex w-max max-w-full grid-flow-col flex-row flex-wrap items-center justify-start rounded-xl bg-background", classNames?.list)}>
        {slugs.map(slug => (
          <Tabs.Tab
            key={slug.key}
            value={slug.key}
            onClick={() => {
              router.push(createQuery(query, slug.key), { scroll: false });
            }}
            className={cn(
              "rounded-lg border border-transparent font-medium data-[state=active]:border-teal-600 data-[state=active]:bg-teal-600/10 data-[state=active]:text-teal-600",
              classNames?.trigger
            )}
          >
            {formatTitle(slug.key, labelTransform)}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {slugs.map(slug => (
        <React.Suspense key={slug.key} fallback={renderFallback}>
          <Tabs.Panel key={slug.key} value={slug.key} className={cn("mt-6", classNames?.content)}>
            {React.isValidElement(slug.content) ? slug.content : nothingFound}
          </Tabs.Panel>
        </React.Suspense>
      ))}
    </Tabs>
  );
}
