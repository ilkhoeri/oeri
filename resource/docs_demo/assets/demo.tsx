import { DemoSlot, type DataTrees } from "./demo-slot";
import { ConstructorWebComponentsDemos, demosMap } from "./demo-manifest-component";
import { ConstructorWebHooksDemos } from "./demo-manifest-hook";

export type ConstructorKeys<U extends [string, unknown]> = {
  [K in U as K[0]]: `${K[0]}.${Extract<keyof K[1], string>}`;
}[U[0]];

export type DocsDemoEntries = ConstructorKeys<ConstructorWebComponentsDemos> | ConstructorKeys<ConstructorWebHooksDemos>;

export interface DocsDemoProps {
  manifest: DocsDemoEntries;
}

export function dataManifest({ manifest }: DocsDemoProps) {
  const [category, key] = manifest.split(".") as [keyof typeof demosMap, string];
  // Type assertion to narrow the key type for the specific category
  const data = demosMap[category]?.[key as keyof (typeof demosMap)[typeof category]];
  if (!data || !(category in demosMap && key in demosMap[category])) {
    console.warn(`Invalid manifest or data not found for manifest: ${manifest}`);
    return null;
  }
  return data;
}
export function DocsDemo({ manifest }: { manifest?: DataTrees }) {
  // const data = dataManifest({ manifest });
  if (!manifest || typeof manifest === "string") return null;
  return <DemoSlot data={manifest} />;
}
