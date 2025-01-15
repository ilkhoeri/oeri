"use client";
import { useFetch } from "@/hooks/use-fetch";
import { cn } from "str-merge";
import globalStyle from "@/source/styles/styles";
import { Code } from "@/ui/code";

type Data = {
  userId: number;
  id: number;
  title: string;
};

export function Demo() {
  const { data, loading, error, refetch, abort } = useFetch<Data[]>(
    "https://jsonplaceholder.typicode.com/albums/"
  );

  const uniqueUserData = data
    ? Object.values(
        data.reduce(
          (acc, data) => {
            if (!acc[data.userId]) {
              acc[data.userId] = data;
            }
            return acc;
          },
          {} as Record<number, Data>
        )
      )
    : null;

  if (error)
    return <p className="text-sm font-medium text-red-600">{error.message}</p>;
  return (
    <>
      <Code block code={uniqueUserData ? JSON.stringify(uniqueUserData, null, 2) : "Fetching"} className="h-full min-h-full w-full" />
      <Code label="data type:" samp={uniqueUserData} className="h-full min-h-full w-full" />

      <button
        type="button"
        role="button"
        onClick={refetch}
        className={globalStyle({ button: "constructive", size: "sm" }, "min-w-24 absolute top-4 left-4 z-20")}
      >
        Refetch
      </button>
      <button
        type="button"
        role="button"
        onClick={abort}
        className={globalStyle({ button: "destructive", size: "sm" }, "min-w-24 absolute top-16 left-4 z-20")}
      >
        Abort
      </button>
      <span
        className={cn(
          "absolute right-4 top-4 size-4 rounded-full",
          !uniqueUserData || loading ? "bg-destructive" : "bg-conservative"
        )}
      />
    </>
  );
}
