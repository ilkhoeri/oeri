import { LayoutIconsPage, LoadComponent } from "./client";
import { prefixName } from "@/source/utils";
import { highlightCode } from "@/source/utils/escape-code";
import { configMetadata, siteConfig } from "@/app/site/config";
import { getRawIcons } from "@/source/generated/fs-get-contents";
import files from "contentlayer/generated/resources/icons.json";

import type { Metadata } from "next";
import type { RawToJsonProps } from "@/source/generated/generated";

export async function generateMetadata(): Promise<Metadata> {
  return configMetadata({
    url: "/icons",
    title: "Icons",
    description: siteConfig.description
  });
}

async function Icons({ files }: { files: RawToJsonProps }) {
  const segment = ["resource", "docs", "icons"];
  const content = await getRawIcons(`/${segment.join("/")}/${files.file}`, {
    Icon: `${prefixName(segment, files.file.replace(".tsx", "Icon"))}`
  });
  const _raw = {
    raw: files.raw,
    content: await highlightCode(`\`\`\`tsx\n${files.raw}\n\`\`\``.trimEnd())
  };
  return (
    <LoadComponent
      {...{ files, segment, content, _raw }}
      setInnerHTML={await highlightCode(content)}
    />
  );
}

export default async function Page() {
  return (
    <LayoutIconsPage>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-4 pb-16">
        {files?.map(i => <Icons key={i.file} files={i} />)}
      </div>
    </LayoutIconsPage>
  );
}
