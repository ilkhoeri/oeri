import { allDocs } from "contentlayer/generated";
import { compareWords } from "@/utility/text-parser";
import type { NestedRoute, SingleRoute } from "../routes/index";

export function getSlug(segment: string | undefined) {
  if (!segment) {
    return " ";
  }
  const slug = segment.split("/").slice(1).join("/");
  return slug[slug.length - 1];
}

/**
function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// Helper function to group by the first segment
function groupBy<T>(array: T[], keyFn: (item: T) => string) {
  return array.reduce(
    (acc, item) => {
      const key = keyFn(item);
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

 */
// Function to map routes
// Function to generate routes dynamically
export function docsToRoutes(docs: string[]) {
  const singleRoutes: SingleRoute[] = [];
  const nestedRoutes: NestedRoute[] = [];

  docs.forEach(path => {
    const segments = path.split("/").slice(3).filter(Boolean);

    if (segments.length === 2) {
      // Contoh: /utility/cnx
      const [parent, child] = segments;

      let route = singleRoutes.find(r => r.title === parent);
      if (!route) {
        route = { title: parent, data: [] };
        singleRoutes.push(route);
      }

      route.data.push({ title: child, href: path });
    } else if (segments.length === 3) {
      // Contoh: /components/native/popover
      const [parent, subParent, child] = segments;
      let route = nestedRoutes.find(r => r.title === parent);
      if (!route) {
        route = { title: parent, data: [] };
        nestedRoutes.push(route);
      }

      let subRoute = route.data.find(r => r.title === subParent);
      if (!subRoute) {
        subRoute = { title: subParent, data: [] };
        route.data.push(subRoute);
      }

      subRoute.data.push({ title: child, href: path });
    }
  });

  return {
    single: singleRoutes,
    nested: nestedRoutes
  };
}

export function docFilterBySegment(allDocs: string[], targetSegment: string): { single: SingleRoute[]; nested: NestedRoute[] } {
  // Filter berdasarkan segmen pertama
  const filteredDocs = allDocs.filter(path => {
    const [firstSegment] = path.split("/").slice(3).filter(Boolean); // Ambil segmen pertama
    return compareWords(firstSegment, targetSegment); // Cocokkan dengan target
  });
  return docsToRoutes(filteredDocs); // Gunakan fungsi docsToRoutes untuk memetakan hasil filter
}
const routes = allDocs.map(i => i.url);
const utility = docFilterBySegment(routes, "utility").single;
const hooks = docFilterBySegment(routes, "hooks").single;
const components = docFilterBySegment(routes, "components").single;
const configurations = docFilterBySegment(routes, "configurations").single;

export const docsRoutes = [...configurations, ...utility, ...components, ...hooks];
export const resRoutes = {
  configurations,
  utility,
  components,
  hooks
};
