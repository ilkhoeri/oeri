import { Demos } from "./demo";
import { Tabs } from "@/source/ui/tabs";
import { Code } from "@/source/ui/code";
import { Mdx } from "@/source/md/mdx-component";
import { pathParams } from "@/source/md/config";
import { allDocs } from "contentlayer/generated";
import { Playground } from "@/source/ui/playground";
import { highlightCode } from "@/source/utils/escape-code";
import { configMetadata, siteConfig } from "@/app/site/config";
import { prefixName, getSlug, sourceFile } from "@/source/utils";
import {
  getContent,
  getMdx,
  getRepo
} from "@/source/generated/fs-get-contents";
import {
  getFilesWithPrefix,
  readdirPrefix
} from "@/source/generated/fs-get-demos";

import type { Metadata, ResolvingMetadata } from "next";

interface DocsParams {
  params: Promise<{
    docs: string[];
  }>;
}

function getDocFromParams(slug: string[]) {
  const { path, segment } = pathParams("docs", slug);
  const doc = allDocs.find(doc => doc.url === (slug ? path : segment));

  if (!doc) {
    return null;
  }
  return doc;
}

export async function generateMetadata(
  { params }: DocsParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).docs;
  const doc = getDocFromParams(slug);
  const currentSlug = !slug ? "/docs" : `/docs/${slug.join("/")}`;

  return configMetadata({
    url: currentSlug,
    title: doc?.title || "Docs",
    description: siteConfig.description,
    images: (await parent).openGraph?.images
  });
}

const git_raw =
  "https://raw.githubusercontent.com/ilkhoeri/oeri/refs/heads/master";
async function getCode(segment: string[], files: string[]) {
  const usageMap: { [key: string]: string | null } = {};
  const resource = `/resource/docs/${sourceFile(segment)}`;

  for (const file of files) {
    const usage = await getContent(
      `resource/docs_demo/${readdirPrefix("readdir", segment)}/${file}`,
      undefined,
      {
        Demo: `${prefixName(segment, file)}Demo`
      }
    );
    usageMap[file] = usage.content;
  }

  const content = await getContent(resource, [".tsx", ".ts"]);

  return {
    code: {
      content:
        content.content ||
        (await getRepo(
          `${git_raw}/resource/docs/${sourceFile(segment)}`,
          undefined,
          { ext: ".ts" }
        )),
      extension: content.extension || ".ts"
    },
    css: await getContent(resource, [".css"], undefined, { lang: "css" }).then(
      res => res.content
    ),
    usages: !files.length ? await getMdx(resource, "usage") : usageMap
  };
}

export default async function Page({ params }: DocsParams) {
  const segment = (await params).docs;
  const doc = getDocFromParams(segment);
  const files = getFilesWithPrefix(segment);
  const { code, css, usages } = await getCode(segment, files);
  const codes: { [key: string]: React.JSX.Element | null } = {};

  if (css) {
    codes.css = (
      <Code
        ext=".css"
        code={css}
        title={`${getSlug(segment)}.css`}
        setInnerHTML={await highlightCode(css)}
      />
    );
  }
  if (code) {
    codes.code = (
      <Code
        title={`${getSlug(segment)}${code.extension}`}
        repo={`${sourceFile(segment)}${code.extension}`}
        ext={code.extension || ".ts"}
        code={code.content}
        setInnerHTML={await highlightCode(code.content)}
      />
    );
  }

  return (
    <article className="relative mx-auto w-full">
      {code && <Demos {...{ doc, files, segment, usages, ...code }} />}
      {doc && <Mdx code={doc?.body?.code} />}
      <Tabs defaultValue="code" className="mb-12 w-full">
        <Playground childrens={codes} />
      </Tabs>
    </article>
  );
}
