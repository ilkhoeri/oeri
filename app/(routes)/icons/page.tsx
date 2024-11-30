// import { Demos } from "./demo";
import { LoadComponent } from "./client";
import { configMetadata, siteConfig } from "@/app/site/config";

import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  return configMetadata({
    url: "/icons",
    title: "Icons",
    description: siteConfig.description,
    images: (await parent).openGraph?.images
  });
}

import path from "path";
import fs from "fs";
import { highlightCode } from "@/source/utils/escape-code";
import { getContent } from "@/source/generated/fs-get-contents";
import { prefixName } from "@/source/utils";

/**
export function getFilesDir(): string[] {
  const iconsDir = path.join(process.cwd(), "resource/docs/icons");
  try {
    const files = fs.readdirSync(iconsDir);
    return files.filter(file => file.endsWith(".tsx"));
  } catch (err) {
    console.error("Error reading icons directory:", err);
    return [];
  }
}
 */

 // with asynchronous
 export async function getFilesDir(): Promise<string[]> {
  const iconsDir = path.join(process.cwd(), "resource/docs/icons");
  try {
    const files = await fs.readdir(iconsDir);
    return files.filter(file => file.endsWith(".tsx"));
  } catch (err) {
    console.error("Error reading directory:", err);
    return [];
  }
 }

async function Icons({ file }: { file: string }) {
  const segment = ["resource", "docs", "icons"];
  const { content } = await getContent(`/${segment.join("/")}/${file}`, [""], {
    Icon: `${prefixName(segment, file.replace(".tsx", "Icon"))}`
  });
  return (
    <LoadComponent
      {...{ file, segment, content }}
      setInnerHTML={await highlightCode(content)}
    />
  );
}

export default async function Page() {
  const files = await getFilesDir();

  //log.warn(JSON.stringify(files));

  return (
    <article className="relative mx-auto mt-20 min-h-screen w-full px-6 [--sz:24px] md:px-8 lg:px-10 xl:px-12 [&_svg]:transition-colors [&_svg]:sizer [&_svg]:[will-change:width,height,stroke-width,stroke]">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-4 pb-16 pt-10 sm:pt-11 md:pt-12">
        {files.map(i => (
          <Icons key={i} file={i} />
        ))}
      </div>
      {/* {doc && <Mdx code={doc?.body?.code} />} */}
    </article>
  );
}
