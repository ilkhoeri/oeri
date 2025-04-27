import { RestDocs } from "./client";
import { notFound } from "next/navigation";
import { NavBottom } from "@/source/assets/nav-prev-next";
import { getDocFromParams } from "@/app/site/docs-params";
import { TableOfContents } from "@/source/assets/toc/toc";
import { NavigationBreadcrumb } from "@/source/assets/nav-breadcrumb";
import { MDXComponent } from "@/resource/docs_demo/assets/mdx/mdx-context";
import { restRoutes, metaDocsRoute, MetaDocsRoute, NestedMetaDocsRoute } from "@/routes";
import { TableOfContentsProvider } from "@/source/assets/toc/context";
import { getTableOfContents } from "@/source/assets/toc/config";

interface DocsParams {
  children: React.ReactNode;
  params: Promise<{ docs: string[] }>;
}

export default async function Layout({ children, params }: DocsParams) {
  const slug = (await params).docs;
  const doc = getDocFromParams(slug);
  const toc = await getTableOfContents(doc?.body?.raw);

  function template(content: React.ReactNode) {
    return (
      <TableOfContentsProvider>
        <section className="relative flex w-full max-w-full flex-col overflow-x-hidden pt-9 max-md:px-6 min-[1334px]:px-[1.5px]">
          <NavigationBreadcrumb />
          {content}
          <NavBottom routes={metaDocsRoute} />
        </section>
        <TableOfContents toc={toc} sub={5} />
      </TableOfContentsProvider>
    );
  }

  if (!slug) return template(doc && <MDXComponent code={doc?.body.code} />);

  if (slug.length === 2) {
    const routesMap: { [key: string]: any } = restRoutes;
    const slugMap = routesMap[slug[1]];
    return template(<RestDocs id={slug[1]} routes={slugMap} />);
  }

  if (!findMatchingRoute(slug, metaDocsRoute)) notFound();

  return template(children);
}

const findMatchingRoute = (slug: string[], routes: (MetaDocsRoute | NestedMetaDocsRoute)[]): boolean => {
  const matcher = `/docs/${slug.join("/")}`;

  for (const route of routes) {
    if ("path" in route && route.path === matcher) return true;

    if ("data" in route) {
      const matchingData = route.data.some(data => (data as any).path === matcher);
      if (matchingData) return true;
    }
  }
  return false;
};
