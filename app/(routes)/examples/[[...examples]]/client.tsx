"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { FileIcon } from "@/modules/icons";
import { sourceFiles } from "@/source/utils";
import { Spinner } from "@/source/assets/loader";

const FallbackComponent = (segment: string[] | undefined) => (
  <div>
    <p className=" border-b pb-1 pt-2">Component not found</p>
    <a
      href={`https://github.com/ilkhoeri/oeri/edit/master/resource/docs_raw/${sourceFiles(segment)}.mdx`}
      target="_blank"
      className="w-max justify-start gap-2 pb-1.5 pt-3 text-sm text-muted-foreground transition-colors underline-hover hover:text-constructive">
      Edit this page on GitHub <FileIcon arrow />
    </a>
  </div>
);

const loadComponent = (segment: string[] | undefined) =>
  dynamic(
    () =>
      import(`resource/examples/${segment?.join("/")}`)
        .then(mod => mod.Example)
        .catch(err => {
          console.error("Error loading component:", err);
          return FallbackComponent(segment);
        }),
    {
      ssr: false,
      loading: () => <Spinner size={22} classNames={{ root: "my-auto" }} />
    }
  );

export function Examples({ segment }: { segment: string[] | undefined }) {
  const Component = loadComponent(segment);

  return (
    <article className="relative mx-auto flex min-h-screen w-full max-w-screen-3xl flex-col items-center justify-center">
      <Suspense
        fallback={<Spinner size={22} classNames={{ root: "my-auto" }} />}>
        <Component />
      </Suspense>
    </article>
  );
}
