import { LayoutIconsPage, LoadComponent } from "./client";
import { prefixName } from "@/source/utils";
import { highlightCode } from "@/source/utils/escape-code";
import { configMetadata, siteConfig } from "@/app/site/config";
import { getRawIcons } from "@/source/generated/fs-get-contents";
// import { iconsPath } from "@/source/generated/older/fs-get-paths";
import { log } from "@/source/log/development";
import files from "contentlayer/generated/resources/icons.json";
// import fs from "fs-extra";
// import files from "./temporary-files.json";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return configMetadata({
    url: "/icons",
    title: "Icons",
    description: siteConfig.description
  });
}

async function getRepo(url: string, options: { lang?: string } = {}) {
  const { lang = "tsx" } = options;
  try {
    const response = await fetch(url);
    const text = await response.text();
    return `\`\`\`${lang}\n${text}\n\`\`\``.trimEnd();
  } catch (error: any) {
    log.error(error);
  }
}

async function getRaw(file: string) {
  const gitRaw = await getRepo(
    `https://raw.githubusercontent.com/ilkhoeri/oericons/refs/heads/master/resource/svg/${file.replace(".tsx", ".svg")}`
  );

  return {
    _raw: gitRaw,
    content: !gitRaw?.includes("404: Not Found")
      ? await highlightCode(gitRaw || null)
      : undefined
  };
}

async function Icons({ file }: { file: string }) {
  const segment = ["resource", "docs", "icons"];
  const content = await getRawIcons(`/${segment.join("/")}/${file}`, {
    Icon: `${prefixName(segment, file.replace(".tsx", "Icon"))}`
  });
  const _raw = await getRaw(file);
  return (
    <LoadComponent
      {...{ file, segment, _raw, content }}
      setInnerHTML={await highlightCode(content)}
    />
  );
}

// async function getFilesIcons(source: string) {
//   return (await fs.readdir(source)).filter(file => file.endsWith(".tsx"));
// }

export default async function Page() {
  // const files = await iconsPath("resource/docs/icons");
  // const files = await getFilesIcons("resource/docs/icons");
  // log.warn(JSON.stringify(files));
  // const files = await fs.readdir("resource/docs/icons");

  return (
    <LayoutIconsPage>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-4 pb-16">
        {files?.map(i => <Icons key={i} file={i} />)}
      </div>
      {/* {doc && <Mdx code={doc?.body?.code} />} */}
    </LayoutIconsPage>
  );
}
