"use client";

import React from "react";
import Link from "next/link";
import { log } from "@/source/log/development";
import { displayName } from "@/source/utils";
import { cvx } from "str-merge";
import { Title } from "@/source/ui/components";
import { FilterDocs } from "@/source/ui/input";
import { sanitizedToParams } from "@/modules/ondevelopment/utils";

import dynamic from "next/dynamic";
import { FileIcon } from "@/modules/icons";
import { sourceFiles } from "@/source/utils";
import { Spinner } from "@/source/assets/loader";
import { readdirPrefix } from "@/source/generated/fs-get-demos";

import type { SingleRoute, NestedRoute } from "@/source/routes";

import globalStyle from "@/source/styles/styles";

const classes = cvx({
  variants: {
    as: {
      wrapper:
        "w-full min-w-full grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 mt-5 sm:gap-6"
    }
  }
});

function renderSingleRoute(routes: SingleRoute[], value: string) {
  return (
    <div className={classes({ as: "wrapper" })}>
      {routes.map(route => {
        const filtered = route.data.filter(item =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
        return filtered.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            title={item.title}
            className={globalStyle({ cards: "box" })}>
            <span className="font-medium">{displayName(item.title)}</span>
          </Link>
        ));
      })}
    </div>
  );
}

function renderNestedRoute(routes: NestedRoute[], value: string) {
  return routes.map(route =>
    route.data.map((subRoute, index) => {
      const filtered = subRoute.data.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      if (!filtered.length) return null;
      return (
        <div key={index} className="mt-12 w-full min-w-full first-of-type:mt-0">
          <Title
            el="h4"
            id={sanitizedToParams(subRoute.title)}
            size="h4"
            variant="section">
            {subRoute.title}
          </Title>

          <div className={classes({ as: "wrapper" })}>
            {filtered.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                title={item.title}
                className={globalStyle({ cards: "box" })}>
                <span className="font-medium">{displayName(item.title)}</span>
              </Link>
            ))}
          </div>
        </div>
      );
    })
  );
}

export function RestDocs({
  routes,
  id
}: {
  id: string;
  routes: (SingleRoute | NestedRoute)[] | null;
}) {
  const [value, setValue] = React.useState<string>("");

  if (!routes) return null;

  const isSingleRoute = (
    route: SingleRoute | NestedRoute
  ): route is SingleRoute => {
    return (route as SingleRoute).data[0].href !== undefined;
  };

  return (
    <div className="relative mx-auto flex w-full flex-col items-center justify-start">
      <FilterDocs
        id={id}
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      {isSingleRoute(routes[0])
        ? renderSingleRoute(routes as SingleRoute[], value)
        : renderNestedRoute(routes as NestedRoute[], value)}
    </div>
  );
}

interface Segment {
  segment: string[];
}

const FallbackComponent = ({ segment }: Segment) => (
  <div>
    <p className=" border-b pb-1 pt-2">Component not found</p>
    <a
      href={`https://github.com/ilkhoeri/oeri/edit/main/resource/${sourceFiles(segment)}.mdx`}
      target="_blank"
      className="w-max justify-start gap-2 pb-1.5 pt-3 text-sm text-muted-foreground transition-colors underline-hover hover:text-constructive">
      Edit this page on GitHub <FileIcon arrow />
    </a>
  </div>
);

export function LoadComponent({ segment, file }: Segment & { file: string }) {
  const Component = dynamic(
    () =>
      import(
        `@/resource/docs_demo/${readdirPrefix("readdir", segment)}/${file}`
      )
        .then(mod => mod.Demo)
        .catch(err => {
          log("Error loading component:", err);
          return FallbackComponent({ segment });
        }),
    {
      ssr: false,
      loading: () => <Spinner size={22} classNames={{ root: "my-auto" }} />
    }
  );
  return (
    <React.Suspense
      fallback={<Spinner size={22} classNames={{ root: "my-auto" }} />}>
      <Component />
    </React.Suspense>
  );
}
