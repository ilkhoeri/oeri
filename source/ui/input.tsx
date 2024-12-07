"use client";

import * as React from "react";
import { twMerge, cn } from "str-merge";
import {
  capitalizeWords,
  sanitizedToParams
} from "@/modules/ondevelopment/utils";

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
        name={sanitizedToParams(id)}
        id={sanitizedToParams(id)}
        value={value}
        onChange={onChange}
        placeholder="Search"
        autoComplete="true"
        autoFocus={autoFocus}
        className={twMerge(
          "peer mb-12 mt-1 w-full min-w-full border-b bg-transparent pb-3 leading-none transition-colors placeholder:min-h-8 placeholder:text-transparent placeholder:leading-none placeholder-shown:bg-transparent autofill:bg-transparent valid:bg-transparent focus:bg-transparent focus-visible:placeholder:text-muted-foreground focus-visible:border-b-color focus-visible:outline-0 focus-visible:ring-0",
          className
        )}
      />
      <label
        role="presentation"
        htmlFor={sanitizedToParams(id)}
        className={cn(
          "absolute left-0 z-9 cursor-pointer font-bold tracking-normal transition-all",
          value
            ? "top-[-24px] text-[100%]"
            : "translate-y-0 text-h3 peer-focus:top-[-28px] peer-focus:text-[100%] peer-focus-visible:top-[-28px] peer-focus-visible:text-[100%]"
        )}
      >
        {capitalizeWords(id)}
      </label>
    </>
  );
}
