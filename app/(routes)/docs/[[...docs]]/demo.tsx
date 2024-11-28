import * as React from "react";
import Link from "next/link";
import { Tabs } from "@/source/ui/tabs";
import { retitled } from "@/source/utils";
import { Title } from "@/source/ui/components";
import { Playground } from "@/source/ui/playground";
import { Code, Customizer } from "@/source/ui/code";
import { highlightCode } from "@/source/utils/escape-code";
import { sanitizedToParams } from "@/modules/ondevelopment/utils";
import { LoadComponent } from "./client";
import { Doc } from "@/.contentlayer/generated";
import { compareWords } from "@/modules/utility";

interface DemosProps {
  segment: string[];
  files: string[];
  usage: { [key: string]: string | null } | string | null;
  doc: Doc | null;
}

export async function Demos(_props: DemosProps) {
  const { files, segment, usage, doc } = _props;
  if (!files.length) {
    return (
      <div className="mt-6">
        {doc?.title && (
          <Title
            size="h1"
            title={doc?.title}
            variant="segment"
            className="mb-12 font-geist-mono text-h1"
          />
        )}

        <LinksFields fields={doc?.links?.related} />

        {usage && typeof usage === "string" && (
          <Tabs
            id="usage"
            defaultValue="usage"
            className="prefers_code_fragment mb-12 w-full">
            <Playground
              childrens={{
                usage: (
                  <Customizer
                    setInnerHTML={await highlightCode(usage, {
                      copy: true
                    })}
                    className="mb-0 scrollbar"
                  />
                )
              }}
            />
          </Tabs>
        )}
      </div>
    );
  }

  return (
    <React.Fragment>
      {doc?.title && (
        <Title
          size="h1"
          title={doc?.title}
          variant="segment"
          className="mb-12 font-geist-mono text-h1"
        />
      )}
      {files.map(async file => {
        return (
          <div
            key={file}
            className="mt-12 border-t pt-8 first:mt-6 first:border-t-0 first:pt-0">
            {!compareWords(doc?.title, retitled(file)) && (
              <Title
                size="h1"
                variant="segment"
                title={retitled(file)}
                className="mb-12 mt-16 font-geist-mono text-h1"
              />
            )}

            <LinksFields fields={doc?.links?.related} />

            <Tabs
              id={`usage-${sanitizedToParams(file)}`}
              defaultValue="preview"
              className="mb-12 w-full">
              <Playground
                childrens={{
                  preview: (
                    <article
                      data-rehype-pretty-code-fragment=""
                      className="relative mx-auto flex size-full min-h-[32rem] flex-col items-center justify-center">
                      <LoadComponent segment={segment} file={file} />
                    </article>
                  ),
                  usage: usage && typeof usage === "object" && (
                    <Code
                      title={`${file}-demo.tsx`}
                      ext=".tsx"
                      code={usage[file]}
                      setInnerHTML={await highlightCode(usage[file])}
                    />
                  )
                }}
              />
            </Tabs>
          </div>
        );
      })}
    </React.Fragment>
  );
}

function LinksFields({
  label,
  fields
}: {
  label?: string;
  fields?: { label?: string; link?: string }[] | null;
}) {
  if (!fields) {
    return null;
  }
  return (
    <div className="mb-14">
      {label && <h3 className="mb-6 font-bold text-h3">{label}</h3>}

      <div className="flex flex-row flex-wrap items-center gap-3">
        {fields?.map((i, __i) => (
          <Link
            key={__i}
            target="_blank"
            href={i.link || ""}
            rel="noopener noreferrer nofollow"
            className="rounded-md border bg-color px-2 py-px font-roboto-mono text-sm font-semibold text-background no-underline transition-colors decoration-none after:ml-1 after:text-muted-foreground after:transition-colors after:content-['↗'] hover:bg-color/90 hover:text-background hover:after:text-constructive md:after:content-['🡵']">
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
