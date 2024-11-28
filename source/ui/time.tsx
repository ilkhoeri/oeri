"use client";
import React from "react";

import { getTimeAgo } from "@/modules/ondevelopment/utils";
import { twMerge } from "str-merge";

export interface TimeType
  extends Omit<React.TimeHTMLAttributes<HTMLTimeElement>, "style"> {
  time: string | Date | undefined;
  style?: React.CSSProperties & { [key: string]: any };
  diff: "created" | "updated";
}

export const Time = React.forwardRef<HTMLTimeElement, TimeType>(function Time(
  { time, style, children, suppressHydrationWarning, diff, ...props },
  ref
) {
  if (!time) return null;

  return (
    <>
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="28"
        width="28"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-lg border p-[3px]">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        {diff === "created" && (
          <>
            <path d="M20.983 12.548a9 9 0 1 0 -8.45 8.436" />
            <path d="M19 22v-6" />
            <path d="M22 19l-3 -3l-3 3" />
            <path d="M12 7v5l2.5 2.5" />
          </>
        )}
        {diff === "updated" && (
          <>
            <path d="M12 8l0 4l2 2" />
            <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
          </>
        )}
      </svg>
      <time
        {...{
          ref,
          style,
          dateTime: String(time),
          suppressHydrationWarning,
          ...props
        }}>
        {children || getTimeAgo(new Date(String(time)), { diff: "growth" })}
      </time>
      .
    </>
  );
});
Time.displayName = "Time";

interface PostedTimesProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  times:
    | {
        createdAt: string | undefined;
        updatedAt: string | undefined;
      }
    | undefined;
}
export const PostedTimes = React.forwardRef<HTMLElement, PostedTimesProps>(
  function PostedTimes({ times, className, ...props }, ref) {
    if (!times) {
      return null;
    }
    return (
      <section
        ref={ref}
        className={twMerge("border-t mt-16", className)}
        {...props}>
        <Time diff="created" time={times.createdAt} />
        {times.createdAt !== times.updatedAt && (
          <Time diff="updated" time={times.updatedAt} />
        )}
      </section>
    );
  }
);
PostedTimes.displayName = "PostedTimes";
