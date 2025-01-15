import { configMetadata, siteConfig } from "@/app/site/config";
import { Comp } from "@/source/assets/components";
import Link from "next/link";

import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return configMetadata({
    url: "/contributors",
    title: "Contributors",
    description: siteConfig.description
  });
}

export default function Page() {
  return (
    <Comp>
      <div className="flex size-full max-w-full flex-col items-start justify-center gap-4 p-8">
        <h1 className="font-geist-sans font-bold text-muted-foreground text-h1">Thank&apos;s for contributors</h1>

        <Link href="https://github.com/ilkhoeri/ioeri/graphs/contributors">
          <picture className="p-4">
            <img src="https://contrib.rocks/image?repo=ilkhoeri/oeri" alt="contributors" height={64} width={64} />
          </picture>
        </Link>
      </div>
    </Comp>
  );
}
