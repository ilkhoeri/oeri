"use client";

import React, { useEffect, useState } from "react";
import { cvx, VariantsType } from "str-merge";
import { Command, command } from "@/modules/resolver/command";
import { EmptyBoxIcon, FileIcon, XIcon } from "@/modules/icons";
import {
  fuzzySearch,
  levenshteinDistance
} from "@/modules/ondevelopment/utils";
import { appRoutes, type SingleRoute, type NestedRoute } from "@/source/routes";
import { docsRoutes } from "../generated/gen-routes";

type Routes = (SingleRoute | NestedRoute)[] | null;
export type CommandDialogType = { routes: Routes };

export function useSearch<T>({
  clearQuery = true
}: { clearQuery?: boolean | undefined } = {}) {
  const [query, setQuery] = useState("");
  const [suggest, setSuggest] = useState<T[]>([]);

  useEffect(() => {
    if (!clearQuery) {
      setQuery("");
      setSuggest([]);
    }
  }, [clearQuery]);

  return { query, setQuery, suggest, setSuggest };
}

interface Suggestion {
  id: string;
  label: string;
  href: string;
  leftSection: JSX.Element;
}
interface FilterResult {
  group: string;
  actions: Suggestion[];
}

export function CommandDialog({
  routes = docsRoutes
}: {
  routes?: (SingleRoute | NestedRoute)[] | null;
}) {
  const { query, setQuery, suggest, setSuggest } = useSearch<FilterResult>();

  useEffect(() => {
    const results = filter(routes, query);
    setSuggest(results);
  }, [routes, query, setSuggest]);

  const Suggest = (
    <React.Fragment>
      <h4 {...cns("suggest")}>Suggestions:</h4>
      {suggest.map((group, index) => (
        <Command.ActionsGroup key={index} label={group.group}>
          {group.actions.map(i => (
            <Command.Action key={i.label} href={i.href}>
              {i.leftSection} {i.label}
            </Command.Action>
          ))}
        </Command.ActionsGroup>
      ))}
    </React.Fragment>
  );

  const rightSection = (
    <button
      type="button"
      tabIndex={-1}
      {...cns("close")}
      onClick={() => {
        command.close();
        setQuery("");
      }}>
      <XIcon size={16} />
    </button>
  );

  const rest = {
    query,
    onQueryChange: setQuery,
    actions: [...suggestMain({ query }), ...suggest],
    nothingFound: suggest.length > 0 ? Suggest : <EmptyBoxIcon />,
    classNames: {
      content: "h-2/3",
      empty: suggest.length > 0 ? "pt-0 [display:unset]" : undefined
    }
  };

  return (
    <>
      <button type="button" {...cns("trigger")} onClick={command.open}>
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd {...cns("kbd")}>
          <span>⌘</span>K
        </kbd>
      </button>

      <Command
        searchProps={{
          rightSection,
          value: query,
          onChange: e => setQuery(e.target.value)
        }}
        {...rest}
      />
    </>
  );
}

function filter(routes: Routes, query: string) {
  if (!routes) return [];

  const filteredRoutes = routes.flatMap(route => {
    const routeData = (route as NestedRoute).data?.[0]?.data
      ? (route as NestedRoute).data
      : [route as SingleRoute];

    return routeData.flatMap(singleRoute => {
      const actions = singleRoute.data
        .filter(i => fuzzySearch(i.title, query))
        .map(i => ({
          id: i.title.toLowerCase().replace(" ", "-"),
          label: i.title,
          href: i.href,
          leftSection: <FileIcon />
        }));

      return {
        group: singleRoute.title,
        actions
      };
    });
  });

  if (filteredRoutes.some(route => route.actions.length > 0)) {
    return filteredRoutes;
  }

  const levenshteinSuggestions = routes.flatMap(route => {
    const routeData = (route as NestedRoute).data?.[0]?.data
      ? (route as NestedRoute).data
      : [route as SingleRoute];

    return routeData.flatMap(singleRoute => {
      const actions = singleRoute.data
        .map(i => ({ item: i, distance: levenshteinDistance(i.title, query) }))
        .filter(({ distance }) => distance <= 4)
        .sort((a, b) => a.distance - b.distance)
        .map(({ item }) => ({
          id: item.title.toLowerCase().replace(" ", "-"),
          label: item.title,
          href: item.href,
          leftSection: <FileIcon arrow />
        }));

      return {
        group: singleRoute.title,
        actions
      };
    });
  });

  return levenshteinSuggestions.filter(route => route.actions.length > 0);
}

function suggestMain({ query }: { query: string }) {
  if (query) return [];

  const routes = appRoutes["suggestions"];
  const actions = routes.data.map(i => ({
    id: i.title.toLowerCase().replace(" ", "-"),
    label: i.title,
    href: i.href,
    leftSection: <i.icon />
  }));
  return [
    {
      group: routes.title,
      actions
    }
  ];
}

const classes = cvx({
  variants: {
    as: {
      trigger:
        "inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-muted/60 text-muted-foreground hover:text-color px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-64",
      kbd: "pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex [&_span]:text-xs",
      close:
        "size-4 absolute right-3 top-3 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50",
      suggest:
        "italic text-left px-2 py-1.5 text-sm font-medium select-none flex items-center",
      content: "overflow-hidden p-0 md:w-[520px] md:h-[360px]",
      command: "[&_[data-command=search-wrap]]:pr-10"
    }
  }
});

type Origin = NonNullable<VariantsType<typeof classes>["as"]>;
function cns(as: Origin) {
  return {
    className: classes({ as })
  };
}
/**
<div className="flex gap-4 px-4 h-11 items-center">
    <p className="text-3xs text-tertiary inline-flex gap-2 items-center max-md-gutters:hidden">
      <kbd>↵</kbd>
      <span>to select</span>
    </p>
    <p className="text-3xs text-tertiary inline-flex gap-2 items-center max-md-gutters:hidden">
      <kbd>↑</kbd>
      <kbd>↓</kbd>
      <span>to navigate</span>
    </p>
    <p className="text-3xs text-tertiary inline-flex gap-2 items-center max-md-gutters:hidden">
      <kbd>esc</kbd>
      <span>to close</span>
    </p>
    <p className="text-3xs text-tertiary inline-flex gap-2 items-center ml-auto">
      <span>Search by</span>
      <a
        href="https://www.algolia.com/developers/?utm_medium=referral&utm_content=powered_by&utm_source=expo.dev.com&utm_campaign=docsearch"
        target="_blank">
        <AlgoliaLogo />
      </a>
    </p>
  </div>
 */