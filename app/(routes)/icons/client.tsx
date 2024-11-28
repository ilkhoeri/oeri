"use client";

import React from "react";
import dynamic from "next/dynamic";
import { log } from "@/source/log/development";

import { FileIcon } from "@/modules/icons";
import { Spinner } from "@/source/assets/loader";

const FallbackComponent = (slug: string) => (
  <div>
    <p className=" border-b pb-1 pt-2">Component not found</p>
    <a
      href={`https://github.com/ilkhoeri/oeri/edit/main/resource/icons/${slug}.tsx`}
      target="_blank"
      className="w-max justify-start gap-2 pb-1.5 pt-3 text-sm text-muted-foreground transition-colors underline-hover hover:text-constructive">
      Edit this page on GitHub <FileIcon arrow />
    </a>
  </div>
);

export function LoadComponent({ file }: { file: string }) {
  const Component = dynamic(
    () =>
      import(`@/resource/docs/icons/${file}`)
        .then(mod => mod.Icon)
        .catch(err => {
          log("Error loading component:", err);
          return FallbackComponent(file);
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
