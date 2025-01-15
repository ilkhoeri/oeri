import { Tabs } from "@/ui/tabs";
import { PlayTabs } from "@/source/assets/playtabs";
import { allDocs } from "contentlayer/generated";
import { pathParams } from "@/resource/docs_demo/assets/mdx/utils";
import { Code } from "@/resource/docs_demo/assets/mdx/mdx-customizer";
import { MDXComponent } from "@/resource/docs_demo/assets/mdx/mdx-context";
import { configMetadata, siteConfig } from "@/app/site/config";
import { prefixName, getSlug, sourceFile } from "@/source/utils";
import { removeTrailingDash } from "@/source/ondevelopment/utils";
import { highlightCode } from "@/resource/docs_demo/assets/rehype/rehype-customizer";
import { getFilesWithPrefix, readdirPrefix } from "@/source/generated/fs-get-demos";
import { getContent, getCssContent /* , getRepo */ } from "@/source/generated/fs-get-contents";
import { Demos } from "./demo";

import type { Metadata, ResolvingMetadata } from "next";

interface DocsParams {
  params: Promise<{
    docs: string[];
  }>;
}

function getDocFromParams(slug: string[]) {
  const { path, segment } = pathParams("docs", slug);
  const doc = allDocs.find(doc => doc.url === (slug ? path : segment));
  if (!doc) return null;
  return doc;
}

export async function generateMetadata({ params }: DocsParams, parent: ResolvingMetadata): Promise<Metadata> {
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

async function loadCodes(segment: string[], files: string[]) {
  const usageMap: { [key: string]: string | null } = {};
  const resource = `/resource/docs/${sourceFile(segment)}`;
  const content = await getContent(resource, [".tsx", ".ts"]);

  for (const file of files) {
    const usage = await getContent(`source/docs_demo/${readdirPrefix("readdir", segment)}/${file}`, undefined, {
      Demo: `${prefixName(segment, removeTrailingDash(file))}Demo`
    });
    usageMap[file] = usage.content;
  }

  // const git_raw = "https://raw.githubusercontent.com/ilkhoeri/oeri/refs/heads/master";
  return {
    code: {
      // content: content.content || (await getRepo(`${git_raw}/resource/docs/${sourceFile(segment)}`, undefined, { ext: ".tsx" })),
      content: content.content,
      extension: content.extension || ".ts"
    },
    css: await getCssContent(getSlug(segment) /* resource */),
    usages: usageMap
  };
}

export default async function Page({ params }: DocsParams) {
  const segment = (await params).docs;
  const doc = getDocFromParams(segment);
  const files = getFilesWithPrefix(segment);
  const { code, css, usages } = await loadCodes(segment, files);
  const codes: Record<string, React.JSX.Element | null> = {};

  if (css.content) {
    codes.css = <Code ext=".css" code={css.content} title={css.source} setInnerHTML={await highlightCode(css.content)} />;
  }
  if (code.content) {
    codes.code = (
      <Code
        code={code.content}
        ext={code.extension || ".ts"}
        title={`${getSlug(segment)}${code.extension}`}
        repo={`${sourceFile(segment)}${code.extension}`}
        setInnerHTML={await highlightCode(code.content)}
      />
    );
  }

  return (
    <article className="relative mx-auto w-full md:max-lg:pr-6">
      {code && <Demos {...{ doc, files, segment, usages, ...code }} />}
      {doc && <MDXComponent code={doc?.body?.code} />}
      {codes && (
        <Tabs defaultValue="code" className="mb-12 w-full">
          <PlayTabs defaultValue="code" childrens={codes} />
        </Tabs>
      )}
    </article>
  );
}
