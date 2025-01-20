import { Typography } from "@/ui/typography";
import { allDocs } from "contentlayer/generated";
import { Polymorphic } from "@/ui/polymorphic-slot";
import { configMetadata, siteConfig } from "@/app/site/config";
import { pathParams } from "@/resource/docs_demo/assets/mdx/utils";
import { MDXComponent } from "@/resource/docs_demo/assets/mdx/mdx-context";

import type { Metadata, ResolvingMetadata } from "next";

interface DocsParams {
  params: Promise<{ docs: string[] }>;
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

export default async function Page({ params }: DocsParams) {
  const segment = (await params).docs;
  const doc = getDocFromParams(segment);

  if (!doc) return null;

  return (
    <Polymorphic el="article" className="relative mx-auto w-full md:max-lg:pr-6">
      <Typography prose="h1">{doc?.title}</Typography>
      {/* <Typography prose="p">{doc?.description}</Typography> */}
      <MDXComponent segment={segment} code={doc?.body?.code} />
    </Polymorphic>
  );
}
