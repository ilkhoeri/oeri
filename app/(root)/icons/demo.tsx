import * as React from "react";
import { Title } from "@/source/assets/components";
import { Customizer } from "@/resource/docs_demo/assets/mdx/mdx-customizer";
import { highlightCode } from "@/resource/docs_demo/assets/rehype/rehype-customizer";
import { Doc } from "@/.contentlayer/generated";

interface DemosProps {
  files: string[];
  usages: { [key: string]: string | null } | string | null;
  doc: Doc | null;
}

export async function Demos(_props: DemosProps) {
  const { usages, doc } = _props;

  return (
    <div className="mt-6">
      {doc?.title && <Title size="h1" title={doc?.title} variant="segment" className="mb-12 font-geist-mono text-h1" />}

      {usages && typeof usages === "string" && (
        <Customizer
          setInnerHTML={await highlightCode(usages, {
            copy: true
          })}
          className="mb-0 scrollbar"
        />
      )}
    </div>
  );
}
