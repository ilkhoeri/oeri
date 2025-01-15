import fs from "fs";

export function readdirPrefix(has: "readdir" | "prefix", segment: string[] | undefined): string {
  if (!segment) {
    return "";
  }
  switch (has) {
    case "readdir":
      return segment?.slice(0, -1).join("/");
    case "prefix":
      return segment?.slice(-1)[0];
  }
}

export function getFilesWithPrefixWithExtension(segment: string[]) {
  const files = fs.readdirSync(`source/docs_demo/${readdirPrefix("readdir", segment)}`);
  return files.filter(file => file.startsWith(readdirPrefix("prefix", segment)));
}

export function getFilesWithPrefix(segment: string[]): string[] {
  const directoryPath = `source/docs_demo/${readdirPrefix("readdir", segment)}`;
  const prefix = readdirPrefix("prefix", segment);
  const files = fs.readdirSync(directoryPath);
  return files.filter(file => file.startsWith(prefix) && file.endsWith(".tsx")).map(file => file.replace(".tsx", ""));
}
