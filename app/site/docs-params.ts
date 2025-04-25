import { pathParams } from "@/resource/docs_demo/assets/mdx/utils";
import { allDocs } from "contentlayer/generated";

export function getDocFromParams(slug: string[]) {
  const { path, segment } = pathParams("docs", slug);
  const doc = allDocs.find(doc => doc.url === (slug ? path : `/docs/${segment}`));
  if (!doc) return null;
  return doc;
}
