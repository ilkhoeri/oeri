import React from "react";

type Components = (string | false | React.JSXElementConstructor<any>)[];
/**
 * Check if children contain specific components.
 *
 * @param children - React children nodes.
 * @param components - Array of valid component types to check against.
 * @param method - Whether to check if "some" or "every" child matches the components.
 * @param minCount
 * @returns `true` if the condition is met, otherwise `false`.
 */
export function hasSpecificChildren(
  children: React.ReactNode,
  components: Components,
  method: "some" | "every" = "some",
  minCount?: number | Record<string, number>
): boolean {
  const childArray = React.Children.toArray(children);
  const counts: Record<string, number> = {};

  childArray.forEach(child => {
    if (React.isValidElement(child)) {
      const childType = child.type;
      if (components.includes(childType)) {
        const typeName = typeof childType === "string" ? childType : childType.name || "Unknown";
        counts[typeName] = (counts[typeName] || 0) + 1;
      }
    }
  });

  if (minCount === undefined) {
    return components[method](component => counts[(component as any).name || "Unknown"] > 0);
  }

  if (typeof minCount === "number") {
    return components[method](component => {
      const typeName = (component as any).name || "Unknown";
      return counts[typeName] >= minCount;
    });
  }

  if (typeof minCount === "object") {
    return Object.entries(minCount).every(([key, min]) => counts[key] >= min);
  }

  return false;
}
