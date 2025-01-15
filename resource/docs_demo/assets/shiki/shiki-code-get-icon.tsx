import { BrandCssFillIcon, BrandTypescriptFillIcon } from "@/icons/*";

export function getCodeFileIcon(fileName: string) {
  if (fileName.endsWith(".ts") || fileName.endsWith(".tsx")) {
    return <BrandTypescriptFillIcon size={18} />;
  }

  if (fileName.endsWith(".css") || fileName.endsWith(".scss")) {
    return <BrandCssFillIcon size={18} />;
  }

  return null;
}