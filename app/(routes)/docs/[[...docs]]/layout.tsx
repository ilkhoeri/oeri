import { RestDocs } from "./client";
import { notFound } from "next/navigation";
import { Comp } from "@/source/assets/components";
import { NavBottom } from "@/source/assets/nav-prev-next";
import { AsideLeft } from "@/source/assets/nav-aside-left";
import { docsRoutes, resRoutes } from "@/source/generated/gen-routes";
import { NavigationBreadcrumb } from "@/source/assets/nav-breadcrumb";
import { getTableOfContents } from "@/source/assets/toc/config";
import { InnerRoutes, SingleRoute } from "@/source/routes";
import { TableOfContents } from "@/source/assets/toc/toc";
import { allDocs } from "contentlayer/generated";
import { pathParams } from "@/resource/docs_demo/assets/mdx/utils";
import { MDXComponent } from "@/resource/docs_demo/assets/mdx/mdx-context";

interface DocsParams {
  children: React.ReactNode;
  params: Promise<{ docs: string[] }>;
}

function getDocFromParams(slug: string[]) {
  const { path, segment } = pathParams("docs", slug);
  const doc = allDocs.find(doc => doc.url === (slug ? path : `/docs/${segment}`));
  if (!doc) return null;
  return doc;
}

export default async function Layout({ children, params }: DocsParams) {
  const slug = (await params).docs;
  const doc = getDocFromParams(slug);
  const toc = await getTableOfContents(doc?.body?.raw || "");

  function Template({ children }: { children: React.ReactNode }) {
    return (
      <Comp>
        <AsideLeft />
        <Comp el="section" className="min-[1334px]:px-[1.5px]">
          <NavigationBreadcrumb />
          {children}
          <NavBottom routes={docsRoutes} />
        </Comp>
        <TableOfContents toc={toc} sub={5} />
      </Comp>
    );
  }

  if (!slug) {
    return <Template>{doc && <MDXComponent code={doc?.body.code} />}</Template>;
  }

  if (slug.length === 2) {
    const routesMap: { [key: string]: any } = resRoutes;
    const slugMap = routesMap[slug[1]];
    return (
      <Template>
        <RestDocs id={slug[1]} routes={slugMap} />
      </Template>
    );
  }

  if (!findMatchingRoute(slug, docsRoutes)) notFound();

  return <Template>{children}</Template>;
}

const findMatchingRoute = (slug: string[], routes: (InnerRoutes | SingleRoute)[]): boolean => {
  const matcher = `/docs/${slug.join("/")}`;

  for (const route of routes) {
    if ("href" in route && route.href === matcher) return true;

    if ("data" in route) {
      const matchingData = route.data.some(data => data.href === matcher);
      if (matchingData) return true;
    }
  }
  return false;
};
