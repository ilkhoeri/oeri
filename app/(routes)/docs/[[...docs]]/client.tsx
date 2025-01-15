"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { cvx, cn } from "str-merge";
import { Title } from "@/source/assets/components";
import { log } from "@/resource/log/development";
import { displayName, sourceFiles } from "@/source/utils";
import { readdirPrefix } from "@/source/generated/fs-get-demos";
import { transform, sanitizedWord } from "@/utility/text-parser";
import { Loader } from "@/ui/loader";
import { FileIcon } from "@/icons/*";

import type { SingleRoute, NestedRoute } from "@/source/routes";

import globalStyle from "@/source/styles/styles";

const classes = cvx({
  variants: {
    as: {
      wrapper: "w-full min-w-full grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 mt-5 sm:gap-6"
    }
  }
});

function renderSingleRoute(routes: SingleRoute[], value: string) {
  return (
    <div className={classes({ as: "wrapper" })}>
      {routes.map(route => {
        const filtered = route.data.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
        return filtered.map((item, index) => (
          <Link key={index} href={item.href} title={item.title} className={globalStyle({ cards: "box" })}>
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
      const filtered = subRoute.data.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
      if (!filtered.length) return null;
      return (
        <div key={index} className="mt-12 w-full min-w-full first-of-type:mt-0">
          <Title el="h4" id={sanitizedWord(subRoute.title)}>
            {subRoute.title}
          </Title>

          <div className={classes({ as: "wrapper" })}>
            {filtered.map((item, index) => (
              <Link key={index} href={item.href} title={item.title} className={globalStyle({ cards: "box" })}>
                <span className="font-medium">{displayName(item.title)}</span>
              </Link>
            ))}
          </div>
        </div>
      );
    })
  );
}

export function FilterDocs({
  id,
  value,
  onChange,
  className,
  autoFocus = true
}: {
  id: string;
  value: string;
  className?: string;
  autoFocus?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <>
      <input
        type="text"
        name={sanitizedWord(id)}
        id={sanitizedWord(id)}
        value={value}
        onChange={onChange}
        placeholder="Search"
        autoComplete="true"
        autoFocus={autoFocus}
        className={cn(
          "peer mb-12 mt-1 w-full min-w-full border-b bg-transparent pb-3 leading-none transition-colors placeholder:min-h-8 placeholder:leading-none placeholder:text-transparent placeholder-shown:bg-transparent autofill:bg-transparent valid:bg-transparent focus:bg-transparent focus-visible:border-b-color focus-visible:outline-0 focus-visible:ring-0 focus-visible:placeholder:text-muted-foreground",
          className
        )}
      />
      <label
        role="presentation"
        htmlFor={sanitizedWord(id)}
        className={cn(
          "absolute left-0 z-9 cursor-pointer font-bold tracking-normal transition-all",
          value
            ? "top-[-24px] text-[100%]"
            : "translate-y-0 text-h3 peer-focus:top-[-28px] peer-focus:text-[100%] peer-focus-visible:top-[-28px] peer-focus-visible:text-[100%]"
        )}
      >
        {transform("capitalize", id)}
      </label>
    </>
  );
}

export function RestDocs({ routes, id }: { id: string; routes: (SingleRoute | NestedRoute)[] | null }) {
  const [value, setValue] = React.useState<string>("");

  if (!routes) return null;

  const isSingleRoute = (route: SingleRoute | NestedRoute): route is SingleRoute => {
    return (route as SingleRoute).data[0].href !== undefined;
  };

  return (
    <div className="relative mx-auto flex w-full flex-col items-center justify-start">
      <FilterDocs id={id} value={value} onChange={e => setValue(e.target.value)} />

      {isSingleRoute(routes[0]) ? renderSingleRoute(routes as SingleRoute[], value) : renderNestedRoute(routes as NestedRoute[], value)}
    </div>
  );
}

interface Segment {
  segment: string[];
}

const Spinner = () => (
  <>
    <span />
    <Loader size={22} classNames={{ root: "my-auto" }} />
    <span />
  </>
);

const FallbackComponent = ({ segment }: Segment) => (
  <div>
    <p className=" border-b pb-1 pt-2">Component not found</p>
    <a
      href={`https://github.com/ilkhoeri/oeri/edit/main/resource/${sourceFiles(segment)}.mdx`}
      target="_blank"
      className="w-max justify-start gap-2 pb-1.5 pt-3 text-sm text-muted-foreground transition-colors underline-hover hover:text-constructive"
    >
      Edit this page on GitHub <FileIcon arrow />
    </a>
  </div>
);

export function LoadComponent({ segment, file }: Segment & { file: string }) {
  const Component = dynamic(
    () =>
      import(`@/source/docs_demo/${readdirPrefix("readdir", segment)}/${file}`)
        .then(mod => mod.Demo)
        .catch(err => {
          log("Error loading component:", err);
          return FallbackComponent({ segment });
        }),
    {
      ssr: true,
      loading: () => <Spinner />
    }
  );
  return (
    <React.Suspense fallback={<Spinner />}>
      <Component />
    </React.Suspense>
  );
}
