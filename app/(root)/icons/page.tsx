import { LoadComponent } from "./client";
import { prefixName } from "@/source/utils";
import { highlightCode } from "@/source/utils/escape-code";
import { configMetadata, siteConfig } from "@/app/site/config";
import { getContent } from "@/source/generated/fs-get-contents";
import { getFilesDir } from "@/source/generated/older/fs-get-paths";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return configMetadata({
    url: "/icons",
    title: "Icons",
    description: siteConfig.description
  });
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
