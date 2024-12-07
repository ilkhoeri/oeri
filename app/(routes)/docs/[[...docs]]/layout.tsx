import { RestDocs } from "./client";
import { notFound } from "next/navigation";
import { Comp } from "@/source/ui/components";
import { NavBottom } from "@/source/assets/nav-prev-next";
import { AsideLeft } from "@/source/assets/nav-aside-left";
import { docFilterBySegment } from "@/source/generated/gen-routes";
import { NavigationBreadcrumb } from "@/source/assets/nav-breadcrumb";
import { getTableOfContents } from "@/source/md/toc/config";
import { InnerRoutes, SingleRoute } from "@/source/routes";
import { TableOfContents } from "@/source/md/toc/toc";
import { allDocs } from "contentlayer/generated";
import { pathParams } from "@/source/md/config";
import { Mdx } from "@/source/md/mdx-component";

interface DocsParams {
  children: React.ReactNode;
  params: Promise<{
    docs: string[];
  }>;
}

function getDocFromParams(slug: string[]) {
  const { path, segment } = pathParams("docs", slug);
  const doc = allDocs.find(
    doc => doc.url === (slug ? path : `/docs/${segment}`)
  );

  if (!doc) {
    return null;
  }
  return doc;
}

export default async function Layout({ children, params }: DocsParams) {
  const slug = (await params).docs;
  const doc = getDocFromParams(slug);
  const docsRoutes = allDocs.map(i => i.url);

  const utility = docFilterBySegment(docsRoutes, "utility").single;
  const hooks = docFilterBySegment(docsRoutes, "hooks").single;

  const components = docFilterBySegment(docsRoutes, "components").nested;
  const componentsIsSinggle = components.map(i => i.data).flat();
  const configurations = docFilterBySegment(
    docsRoutes,
    "configurations"
  ).nested;
  const configurationsIsSinggle = configurations.map(i => i.data).flat();

  const toc = await getTableOfContents(doc?.body?.raw || "");

  function Template({ children }: { children: React.ReactNode }) {
    return (
      <Comp>
        <AsideLeft />
        <Comp el="section">
          <NavigationBreadcrumb />
          {children}
          <NavBottom
            routes={[
              ...configurationsIsSinggle,
              ...utility,
              ...componentsIsSinggle,
              ...hooks
            ]}
          />
        </Comp>
        <TableOfContents toc={toc} sub={5} />
      </Comp>
    );
  }

  if (!slug) {
    return <Template>{doc && <Mdx code={doc?.body.code} />}</Template>;
  }

  if (slug.length === 1) {
    const routesMap: { [key: string]: any } = {
      configurations,
      utility,
      components,
      hooks
    };
    const slugMap = routesMap[slug[0]];
    return (
      <Template>
        <RestDocs id={slug[0]} routes={slugMap} />
      </Template>
    );
  }

  const matchingRoutes = findMatchingRoute(slug, [
    ...configurationsIsSinggle,
    ...componentsIsSinggle,
    ...utility,
    ...hooks
  ]);
  if (!matchingRoutes) notFound();

  return <Template>{children}</Template>;
}

const findMatchingRoute = (
  slug: string[],
  routes: (InnerRoutes | SingleRoute)[]
): boolean => {
  const matcher = `/docs/${slug.join("/")}`;

  for (const route of routes) {
    if ("href" in route && route.href === matcher) {
      return true;
    }
    if ("data" in route) {
      const matchingData = route.data.some(data => data.href === matcher);
      if (matchingData) {
        return true;
      }
    }
  }
  return false;
};

/**
import { Docs } from "./docs";
import { RestDocs } from "./client";
import { notFound } from "next/navigation";
import { NavBottom } from "@/module/assets/nav-prev-next";
import { AsideLeft } from "@/module/assets/nav-aside-left";
import { ChildWrapper } from "@/module/context/app-context";
import { AsideRight } from "@/module/assets/nav-aside-right";
import { Comp } from "@/module/ui/components";
import { getPath, getPaths } from "@/module/generated/older/fs-get-paths";
import { NavigationBreadcrumb } from "@/module/assets/nav-breadcrumb";
import { InnerRoutes, SingleRoute } from "@/module/routes";

// export const runtime = "nodejs";
// export const dynamicParams = true;
// export const dynamic = "force-dynamic";
// export const fetchCache = "only-no-store";

interface DocsParams {
  children: React.ReactNode;
  params: Promise<{
    docs: string[];
  }>;
}

async function getRoutes() {
  return {
    utility: await getPath(["resource", "docs", "utility"]),
    nested: await getPaths(["resource", "docs", "components"]),
    hooks: await getPath(["resource", "docs", "hooks"]),
    examples: await getPath(["resource", "examples"])
  };
}

export default async function Layout({
  children,
  params
}: Readonly<DocsParams>) {
  const slug = (await params).docs;

  const routes = await getRoutes();
  const components = routes.nested.map(i => i.data).flat();

  function Template({ children }: { children: React.ReactNode }) {
    return (
      <Comp>
        <AsideLeft
          routes={[
            ...routes.utility,
            ...routes.nested,
            ...routes.hooks,
            ...routes.examples
          ]}
        />
        <Comp el="section">
          <NavigationBreadcrumb />
          {children}
          <NavBottom
            routes={[...routes.utility, ...components, ...routes.hooks]}
          />
        </Comp>
        <AsideRight />
      </Comp>
    );
  }

  if (!slug) {
    return (
      <Template>
        <Docs />
      </Template>
    );
  }

  if (slug.length === 1) {
    const routesMap: { [key: string]: any } = {
      components: routes.nested,
      utility: routes.utility,
      hooks: routes.hooks
    };
    const slugMap = routesMap[slug[0]];
    return (
      <Template>
        <RestDocs id={slug[0]} routes={slugMap} />
      </Template>
    );
  }

  const matchingRoutes = findMatchingRoute(slug, [
    ...components,
    ...routes.utility,
    ...routes.hooks
  ]);
  if (!matchingRoutes) notFound();

  return <Template>{children}</Template>;
}

const findMatchingRoute = (
  slug: string[],
  routes: (InnerRoutes | SingleRoute)[]
): boolean => {
  const matcher = `/docs/${slug.join("/")}`;

  for (const route of routes) {
    if ("href" in route && route.href === matcher) {
      return true;
    }
    if ("data" in route) {
      const matchingData = route.data.some(data => data.href === matcher);
      if (matchingData) {
        return true;
      }
    }
  }
  return false;
};

 */
