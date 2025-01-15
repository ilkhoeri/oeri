import * as React from "react";
import Link from "next/link";
import { Tabs } from "@/ui/tabs";
import { LoadComponent } from "./client";
import { retitled } from "@/source/utils";
import { Typography } from "@/ui/typography";
import { PlayTabs } from "@/source/assets/playtabs";
import { highlightCode } from "@/resource/docs_demo/assets/rehype/rehype-customizer";
import { Code, Customizer } from "@/resource/docs_demo/assets/mdx/mdx-customizer";
import { removeTrailingDash } from "@/source/ondevelopment/utils";
import { compareWords, sanitizedWord } from "@/utility/text-parser";
import { Doc } from "@/.contentlayer/generated";

interface DemosProps {
  segment: string[];
  files: string[];
  usages: { [key: string]: string | null } | string | null;
  doc: Doc | null;
}

export async function Demos(_props: DemosProps) {
  const { files, segment, usages, doc } = _props;
  if (!files.length) {
    return (
      <div className="mt-6">
        {doc?.title && <Typography prose="h1">{doc?.title}</Typography>}

        <LinksFields fields={doc?.links?.related} />

        {usages && typeof usages === "string" && (
          <Tabs id="usage" defaultValue="usage" className="prefers_code_fragment mb-12 w-full">
            <PlayTabs
              defaultValue="usage"
              childrens={{
                usage: (
                  <Customizer
                    setInnerHTML={await highlightCode(usages, {
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
      {doc?.title && <Typography prose="h1">{doc?.title}</Typography>}
      {files.map(async file => {
        return (
          <div key={file} className="mt-12 border-t pt-8 first:mt-6 first:border-t-0 first:pt-0">
            {!compareWords(doc?.title, retitled(file)) && <Typography prose="h1">{retitled(file)}</Typography>}

            <LinksFields fields={doc?.links?.related} />

            <Tabs id={`usage-${sanitizedWord(removeTrailingDash(file))}`} defaultValue="preview" className="mb-12 w-full">
              <PlayTabs
                defaultValue="preview"
                childrens={{
                  preview: (
                    <article data-docs="demo-preview">
                      <LoadComponent segment={segment} file={file} />
                    </article>
                  ),
                  usage: usages && typeof usages === "object" && (
                    <Code title={`${removeTrailingDash(file)}-demo.tsx`} ext=".tsx" code={usages[file]} setInnerHTML={await highlightCode(usages[file])} />
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

function LinksFields({ label, fields }: { label?: string; fields?: { label?: string; link?: string }[] | null }) {
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
            className="rounded-md border bg-color px-2 py-px font-roboto-mono text-sm font-semibold text-background no-underline transition-colors decoration-none after:ml-1 after:text-muted-foreground after:transition-colors after:content-['↗'] hover:bg-color/90 hover:text-background hover:after:text-constructive md:after:content-['🡵']"
          >
            {i.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
