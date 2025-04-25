import { capitalizeWords } from "@/source/ondevelopment/utils";

export function cleanedIds(ids: string[], id: string): string[] {
  return ids.map(i => {
    const slugIndex = i.indexOf(id);
    if (slugIndex !== -1) {
      return i.slice(0, slugIndex - 1); // -1 to remove the preceding '-'
    }
    return i;
  });
}

export function cleanedIdSlug(pathname: string, id: string): string {
  const lastSegment = pathname.split("/").pop();
  const usagePrefix = "usage-";

  if (id.startsWith(usagePrefix) && id.includes(`-${lastSegment}`)) {
    return capitalizeWords(id.replace(new RegExp(`-${lastSegment}.*`), ""));
  }

  return capitalizeWords(id);
}

export function retitled(docs: string[] | string | undefined, defaultText: string = "Docs") {
  if (docs === undefined) return defaultText;

  if (Array.isArray(docs)) {
    const length = docs?.length;
    // const secondLast = length ? texts[texts?.length - 2] : " ";
    const last = length ? docs[docs?.length - 1] : " ";
    return capitalizeWords(last);
  } else {
    return capitalizeWords(docs);
  }
}

export function prefixName(docs: string[] | undefined, name: string): string {
  if (!docs) return "";

  // const prefix = docs[docs.length - 1];
  const prefix = docs[docs.length];
  let strippedName = name;

  if (name.startsWith(prefix)) {
    strippedName = name.replace(prefix, "").replace(/^-/, "");
  }

  if (prefix === name) {
    strippedName = name;
  }

  return strippedName
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

export function sourceFiles(segment: string[] | undefined) {
  if (segment === undefined) return null;
  const sourceFolder = segment.join("/");
  const nameFiles = segment[segment.length - 1];
  return `${sourceFolder}/${nameFiles}`;
}

export function sourceFile(segment: string[] | undefined) {
  if (segment === undefined) return null;
  const sourceFolder = segment.join("/");
  return `${sourceFolder}`;
}

export function getSlug(segment: string[] | undefined) {
  return segment === undefined ? " " : segment[segment.length - 1];
}

export function tocopy(text: string) {
  const regex = /^```.*\n|\n```\s*$/gm;
  text = text.replace(regex, "");

  return text;
}

export function nextValue<T>(currentValue: T, values: T[]): T {
  const currentIndex = values.indexOf(currentValue);
  const nextIndex = (currentIndex + 1) % values.length;
  return values[nextIndex];
}

export function getDisplayName(title: string): string {
  if (title?.startsWith("use")) {
    // Optimized kebabToCamelCase
    let result = "";
    let upperNext = false;
    for (let i = 0; i < title?.length; i++) {
      const char = title[i];
      if (char === "-") {
        upperNext = true;
      } else {
        result += upperNext ? char?.toUpperCase() : char;
        upperNext = false;
      }
    }
    return result;
  }

  if (title?.endsWith(".d")) return `${title}.ts`;

  // Optimized capitalizeWords
  let result = "";
  let capitalize = true;
  for (let i = 0; i < title?.length; i++) {
    const char = title[i];
    if (char === "-") {
      result += " ";
      capitalize = true;
    } else {
      result += capitalize ? char?.toUpperCase() : char?.toLowerCase();
      capitalize = false;
    }
  }

  return result || "---";
}

/** @deprecated `displayName` akan dihapus, gunakan `getDisplayName` */
export const displayName = getDisplayName;
