"use client";

import React from "react";
import Link from "next/link";
import { cvx, cn } from "cretex";
import { Title } from "@/source/assets/components";
import { displayName } from "@/source/utils";
import { transform, sanitizedWord } from "@/utility/text-parser";

import type { SingleRoute, NestedRoute } from "@/source/routes";

import globalStyle from "@/source/styles/styles";

const classes = cvx({
  variants: {
    as: {
      wrapper: "w-full min-w-full grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 mt-5 sm:gap-6",
      label: "absolute left-0 z-9 cursor-pointer font-bold tracking-normal transition-all",
      input: "peer mb-12 mt-1 w-full min-w-full border-b bg-transparent pb-3 leading-none transition-colors placeholder:min-h-8 placeholder:leading-none placeholder:text-transparent placeholder-shown:bg-transparent autofill:bg-transparent valid:bg-transparent focus:bg-transparent focus-visible:border-b-color focus-visible:outline-0 focus-visible:ring-0 focus-visible:placeholder:text-muted-foreground"
    },
    labelState: {
      true: "top-[-24px] text-[100%]",
      false: "translate-y-0 text-h3 peer-focus:top-[-28px] peer-focus:text-[100%] peer-focus-visible:top-[-28px] peer-focus-visible:text-[100%]"
    }
  }
});

function isSingleRoute(route: SingleRoute | NestedRoute): route is SingleRoute {
  return (route as SingleRoute).data[0].href !== undefined;
}

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
          <Title el="h4" id={sanitizedWord(subRoute.title)}>{subRoute.title}</Title>

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

interface FilterDocsProps {
  id: string;
  value: string;
  className?: string;
  autoFocus?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
export function FilterDocs(props: FilterDocsProps) {
  const { id, value, onChange, className, autoFocus = true } = props;
  const _id = sanitizedWord(id);
  return (
    <>
      <input
        id={_id}
        name={_id}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className={cn(classes({ as: "input" }), className)}
        placeholder="Search"
        autoComplete="true"
        type="text"
      />
      <label role="presentation" htmlFor={_id} className={classes({ as: "label", labelState: value ? "true" : "false" })}>
        {transform.capitalize(id)}
      </label>
    </>
  );
}

interface RestDocsProps {
  id: string;
  routes: (SingleRoute | NestedRoute)[] | null;
}
export function RestDocs(props: RestDocsProps) {
  const { routes, id } = props;
  const [value, setValue] = React.useState<string>("");

  if (!routes) return null;

  return (
    <div className="relative mx-auto flex w-full flex-col items-center justify-start">
      <FilterDocs id={id} value={value} onChange={e => setValue(e.target.value)} />
      {isSingleRoute(routes[0]) ? renderSingleRoute(routes as SingleRoute[], value) : renderNestedRoute(routes as NestedRoute[], value)}
    </div>
  );
}
